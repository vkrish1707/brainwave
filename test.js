import React from "react";
import ExcelJS from "exceljs";

const ExportExcel = () => {
  const handleDownloadExcel = async () => {
    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sample Data");

    // Sample Data
    const sampleData = [
      {
        id: "1",
        name: [
          { value: "Alice", color: "FFFF00" },
          { value: "Bob", color: "FF0000" }
        ],
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
      }
    ];

    // Add headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Score", key: "score", width: 15 }
    ];

    // Add rows dynamically
    sampleData.forEach((row) => {
      const maxObjects = Math.max(
        row.name.length || 0,
        row.score.length || 0
      ); // Calculate max objects to merge rows

      for (let i = 0; i < maxObjects; i++) {
        const rowData = {};
        rowData.id = i === 0 ? row.id : ""; // Merge ID column
        rowData.name =
          row.name[i]?.value || ""; // Display name values or empty cell
        rowData.score =
          row.score[i]?.value || ""; // Display score values or empty cell

        const newRow = worksheet.addRow(rowData);

        // Apply styles for each cell in this row
        if (row.name[i]) {
          newRow.getCell("name").fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: row.name[i].color }
          };
        }

        if (row.score[i]) {
          newRow.getCell("score").fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: row.score[i].color }
          };
        }
      }

      // Merge ID cells for maxObjects
      if (maxObjects > 1) {
        worksheet.mergeCells(
          `A${worksheet.rowCount - maxObjects + 1}:A${worksheet.rowCount}`
        );
      }
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
    anchor.download = "SampleData.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownloadExcel}>Download Excel</button>
    </div>
  );
};

export default ExportExcel;
