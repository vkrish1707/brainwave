import * as XLSX from 'xlsx';

const exportToExcel = (data) => {
  const worksheetData = [];
  const mergeCells = [];

  // Generate headers from the first item’s keys
  const headers = Object.keys(data[0]).filter(key => key !== 'max_Objects');
  worksheetData.push(headers);

  // Populate rows based on data
  data.forEach((item, rowIndex) => {
    const row = headers.map((key, colIndex) => {
      const cellData = item[key];
      const maxCount = item.max_Objects || 1;

      // If cellData is an array of objects, extract values and colors
      if (Array.isArray(cellData)) {
        const cellValues = cellData.map(subItem => subItem.value).join(', ');
        const cellColor = cellData[0]?.color || 'FFFFFF';

        // If max_Objects > 1, mark cells for merging
        if (maxCount > 1 && rowIndex % maxCount === 0) {
          const endRow = rowIndex + maxCount - 1;
          mergeCells.push({
            s: { r: rowIndex + 1, c: colIndex },
            e: { r: endRow + 1, c: colIndex },
          });
        }

        return { v: cellValues, color: cellColor };
      }
      // If cellData is a simple string, boolean, or number, use it directly
      return { v: cellData, color: 'FFFFFF' };
    });
    worksheetData.push(row);
  });

  // Create the worksheet and set up merges
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Apply merge configuration
  worksheet['!merges'] = mergeCells;

  // Set cell styles for colors
  worksheetData.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          fill: {
            fgColor: { rgb: cell.color },
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

// Sample data to test
const sampleData = [
    {
      column1: [{ value: 'Merged Item 1', color: 'FF0000' }], 
      column2: 'Simple Text',
      column3: true,
      column4: 123,
      max_Objects: 1
    },
    {
      column1: [{ value: 'Merged Item 2', color: '00FF00' }, { value: 'Merged Item 3', color: '00FF00' }],
      column2: [{ value: 'Text with color', color: '0000FF' }],
      column3: false,
      column4: 456,
      max_Objects: 2
    },
    {
      column1: 'Non-merged Text',
      column2: 'Another Text',
      column3: [{ value: 'Boolean Text', color: 'FFFF00' }],
      column4: 789,
      max_Objects: 1
    },
];

// Call the function to export
exportToExcel(sampleData);
