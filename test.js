import React from "react";
import ExcelJS from "exceljs";

const ExportExcelDynamic = () => {
  const handleDownloadExcel = async () => {
    // Create a new workbook and add a worksheet
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

    // Dynamically extract all keys from the sample data to create headers
    const headers = Object.keys(sampleData[0]).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 30
    }));

    // Add headers dynamically
    worksheet.columns = headers;

    // Add rows dynamically
    sampleData.forEach((row) => {
      // Find the maximum objects in any key's array (for row merging)
      const maxObjects = Math.max(
        ...Object.values(row).map((value) => (Array.isArray(value) ? value.length : 1))
      );

      for (let i = 0; i < maxObjects; i++) {
        const rowData = {};

        // Populate each column dynamically
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key])) {
            rowData[key] = row[key][i]?.value || ""; // Use value if exists, else empty
          } else if (i === 0) {
            rowData[key] = row[key]; // For non-array fields, use value only for the first row
          } else {
            rowData[key] = ""; // Empty for subsequent rows
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

        // Center-align all cells
        newRow.eachCell((cell) => {
          cell.alignment = {
            vertical: "middle",
            horizontal: "center"
          };
        });
      }

      // Merge cells dynamically for all keys with fewer objects than maxObjects
      Object.keys(row).forEach((key) => {
        const cellRangeStart = worksheet.rowCount - maxObjects + 1;
        const cellRangeEnd = worksheet.rowCount;

        if (Array.isArray(row[key]) && row[key].length === 1) {
          worksheet.mergeCells(`${key}${cellRangeStart}:${key}${cellRangeEnd}`);
        } else if (!Array.isArray(row[key])) {
          worksheet.mergeCells(`${key}${cellRangeStart}:${key}${cellRangeEnd}`);
        }
      });
    });

    // Style headers
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Generate the Excel file and trigger download
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
    <div>
      <button onClick={handleDownloadExcel}>Download Excel</button>
    </div>
  );
};

export default ExportExcelDynamic;
