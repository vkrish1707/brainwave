import * as XLSX from 'xlsx';

// Sample function to export data using XLSX
const exportToExcel = (data) => {
  const worksheetData = [];

  // Generate headers from the first item’s keys
  const headers = Object.keys(data[0]);
  worksheetData.push(headers);

  // Generate rows with data and apply color background if applicable
  data.forEach((item) => {
    const row = headers.map((key) => {
      // Extract color and value
      const cellData = item[key];
      const cellValue = cellData.value || '';
      const cellColor = cellData.color ? cellData.color : 'FFFFFF'; // Use default if no color provided

      // Return cell information in a structure
      return { v: cellValue, color: cellColor };
    });

    worksheetData.push(row);
  });

  // Create the workbook and worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set cell styling with colors
  worksheetData.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          fill: {
            fgColor: { rgb: cell.color }, // Apply color directly without hashtag
          },
        };
      }
    });
  });

  // Create a workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, 'exported_data.xlsx');
};

// Sample data
const sampleData = [
  {
    column1: { value: 'Item 1', color: 'FF0000' }, // Color in hex without #
    column2: { value: 'Description 1', color: '00FF00' },
  },
  {
    column1: { value: 'Item 2', color: '0000FF' },
    column2: { value: 'Description 2', color: 'FFFF00' },
  },
];

// Use the function to export data
exportToExcel(sampleData);