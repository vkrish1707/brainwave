import { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

function ExcelGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample data
  const data = [
    {
      id: '1',
      name: [{ value: 'Alice', color: 'FFFF00' }],
      score: [{ value: '95', color: '00FF00' }],
    },
    {
      id: '2',
      name: [
        { value: 'vams', color: '0000FF' },
        { value: 'bans', color: '0000FF' },
      ],
      score: [
        { value: '85', color: 'FFFF00' },
        { value: '90', color: 'FF0000' },
        { value: '88', color: '00FF00' },
      ],
    },
    {
      id: '3',
      name: [{ value: 'Eve', color: 'FF00FF' }],
      score: [{ value: '100', color: '00FFFF' }],
    },
  ];

  // Helper function to get headers from data
  const getHeaders = (data) => {
    if (!data || data.length === 0) {
      throw new Error('No data provided for Excel generation');
    }
    return Object.keys(data[0]).map((key) => key.toUpperCase());
  };

  // Helper function to get maximum row span
  const getMaxRowSpan = (data) => {
    return data.reduce((maxSpan, row) => {
      const rowSpan = Object.values(row).reduce((max, cell) => {
        if (Array.isArray(cell)) {
          return Math.max(max, cell.length);
        }
        return max;
      }, 1);
      return Math.max(maxSpan, rowSpan);
    }, 1);
  };

  // Apply styles to header row
  const applyHeaderStyles = (row) => {
    row.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' },
      };
    });
  };

  // Apply styles to data cells
  const applyCellStyles = (cell, value, color) => {
    cell.value = value;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    if (color) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF' + color },
      };
    }
  };

  // Process a single row of data
  const processDataRow = (worksheet, item, startRow, maxRowSpan) => {
    Object.entries(item).forEach(([key, cellData], columnIndex) => {
      const columnNumber = columnIndex + 1;

      if (Array.isArray(cellData)) {
        const rowSpan = cellData.length;

        if (rowSpan === 1) {
          // Merge cells vertically if only one value
          worksheet.mergeCells(
            startRow,
            columnNumber,
            startRow + maxRowSpan - 1,
            columnNumber
          );
          const cell = worksheet.getCell(startRow, columnNumber);
          applyCellStyles(cell, cellData[0].value, cellData[0].color);
        } else {
          // Add individual cells for multiple values
          cellData.forEach((data, index) => {
            const cell = worksheet.getCell(startRow + index, columnNumber);
            applyCellStyles(cell, data.value, data.color);
          });
        }
      } else {
        // Handle non-array values
        worksheet.mergeCells(
          startRow,
          columnNumber,
          startRow + maxRowSpan - 1,
          columnNumber
        );
        const cell = worksheet.getCell(startRow, columnNumber);
        applyCellStyles(cell, cellData, null);
      }
    });
  };

  // Main function to generate Excel file
  const generateExcel = async () => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data format provided');
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Set up headers
      const headers = getHeaders(data);
      worksheet.columns = headers.map((header) => ({
        header,
        key: header.toLowerCase(),
        width: 15,
      }));

      // Style headers
      applyHeaderStyles(worksheet.getRow(1));

      // Calculate dimensions and process data
      const maxRowSpan = getMaxRowSpan(data);
      let currentRow = 2;

      // Add data rows
      data.forEach((item) => {
        processDataRow(worksheet, item, currentRow, maxRowSpan);
        currentRow += maxRowSpan;
      });

      // Generate and save file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'DynamicData.xlsx');
    } catch (error) {
      console.error('Excel generation error:', error);
      throw new Error(`Failed to generate Excel file: ${error.message}`);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await generateExcel();
    } catch (err) {
      setError(err.message || 'Failed to generate Excel file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dynamic Data");

    // Sample Data
    const sampleData = [
      {
        id: "1",
        name: [{ value: "Alice", color: "FFFF00" }],
        score: [{ value: "95", color: "00FF00" }]
      },
      {
        id: "2",
        name: [{ value: "Charlie", color: "0000FF" }],
        score: [
          { value: "85", color: "FFFF00" },
          { value: "90", color: "FF0000" },
          { value: "88", color: "00FF00" }
        ]
      },
      {
        id: "3",
        name: [{ value: "Eve", color: "FF00FF" }],
        score: [{ value: "100", color: "00FFFF" }]
      }
    ];

    // Dynamically generate headers
    const headers = Object.keys(sampleData[0]).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 20
    }));

    // Add headers to the worksheet
    worksheet.columns = headers;

    // Helper function to check if a cell range is already merged
    const isRangeMerged = (worksheet, startRow, endRow, col) => {
      return worksheet._merges.some(
        (merge) =>
          merge.tl.row <= startRow &&
          merge.br.row >= endRow &&
          merge.tl.col === col &&
          merge.br.col === col
      );
    };

    // Add data rows dynamically
    sampleData.forEach((row) => {
      const maxObjects = Math.max(
        ...Object.values(row).map((value) => (Array.isArray(value) ? value.length : 1))
      );

      for (let i = 0; i < maxObjects; i++) {
        const rowData = {};
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key])) {
            rowData[key] = row[key][i]?.value || "";
          } else if (i === 0) {
            rowData[key] = row[key];
          } else {
            rowData[key] = "";
          }
        });

        const newRow = worksheet.addRow(rowData);

        // Apply styles dynamically
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key]) && row[key][i]) {
            newRow.getCell(key).fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: row[key][i]?.color || "FFFFFF" }
            };
          }
        });

        newRow.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      }

      // Merge cells dynamically for each key
      Object.keys(row).forEach((key) => {
        const startRow = worksheet.rowCount - maxObjects + 1;
        const endRow = worksheet.rowCount;

        if (
          Array.isArray(row[key]) &&
          row[key].length === 1 &&
          !isRangeMerged(worksheet, startRow, endRow, headers.findIndex((h) => h.key === key) + 1)
        ) {
          worksheet.mergeCells(startRow, headers.findIndex((h) => h.key === key) + 1, endRow, headers.findIndex((h) => h.key === key) + 1);
        } else if (
          !Array.isArray(row[key]) &&
          !isRangeMerged(worksheet, startRow, endRow, headers.findIndex((h) => h.key === key) + 1)
        ) {
          worksheet.mergeCells(startRow, headers.findIndex((h) => h.key === key) + 1, endRow, headers.findIndex((h) => h.key === key) + 1);
        }
      });
    });

    // Style headers
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "DynamicData.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="download-container">
      <button
        onClick={handleDownload}
        className={`download-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Download Excel'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ExcelGenerator;
