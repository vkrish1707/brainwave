import XLSX from "xlsx";

function exportToExcel(data) {
  const wb = XLSX.utils.book_new();
  const wsData = [];
  const merge = [];

  // Extract columns
  const columns = Object.keys(data[0]);

  // Prepare headers
  wsData.push(columns.map((key) => key.toUpperCase()));

  // Fill in data
  data.forEach((row, rowIndex) => {
    const rowData = [];
    columns.forEach((col, colIndex) => {
      if (typeof row[col] === "object" && row[col] !== null) {
        rowData.push(row[col].value || "");

        // Set the color for the cell
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
        wsData[cellAddress] = { s: { fill: { fgColor: { rgb: row[col].color.replace("#", "") } } } };

        // If there are multiple values, merge cells
        if (row[col].comments && row[col].comments.length > 1) {
          merge.push({
            s: { r: rowIndex + 1, c: colIndex },
            e: { r: rowIndex + row[col].comments.length, c: colIndex },
          });
        }
      } else {
        rowData.push(row[col]);
      }
    });
    wsData.push(rowData);
  });

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Apply merges
  ws["!merges"] = merge;

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Export the workbook
  XLSX.writeFile(wb, "DataExport.xlsx");
}