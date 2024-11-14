const processDataRow = (worksheet, item, startRow, maxRowSpan) => {
  Object.entries(item).forEach(([key, cellData], columnIndex) => {
    const columnNumber = columnIndex + 1;

    if (Array.isArray(cellData)) {
      const rowSpan = cellData.length;

      // Merge cells for the column
      worksheet.mergeCells(
        startRow,
        columnNumber,
        startRow + maxRowSpan - 1,
        columnNumber
      );

      // Handle the first cell
      const firstCell = worksheet.getCell(startRow, columnNumber);
      applyCellStyles(firstCell, cellData[0].value, cellData[0].color);

      // Fill remaining rows with background color
      for (let i = 1; i < maxRowSpan; i++) {
        const cell = worksheet.getCell(startRow + i, columnNumber);
        applyCellStyles(cell, '', cellData[Math.min(i, rowSpan - 1)].color);
      }
    } else {
      // Non-array values are treated as single cells
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
