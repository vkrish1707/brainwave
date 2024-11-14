const processDataRow = (worksheet, item, startRow, maxRowSpan) => {
  Object.entries(item).forEach(([key, cellData], columnIndex) => {
    const columnNumber = columnIndex + 1;

    if (Array.isArray(cellData)) {
      const rowSpan = cellData.length;

      if (rowSpan === maxRowSpan) {
        // If the rowSpan matches maxRowSpan, process normally
        cellData.forEach((data, index) => {
          const cell = worksheet.getCell(startRow + index, columnNumber);
          applyCellStyles(cell, index === 0 ? data.value : '', data.color);
        });
      } else {
        // Fill with colors but only show the value in the first cell
        cellData.forEach((data, index) => {
          const cell = worksheet.getCell(startRow + index, columnNumber);
          applyCellStyles(cell, index === 0 ? data.value : '', data.color);
        });

        // Fill remaining cells with just colors
        const lastColor = cellData[cellData.length - 1].color;

        for (let i = rowSpan; i < maxRowSpan; i++) {
          const cell = worksheet.getCell(startRow + i, columnNumber);
          applyCellStyles(cell, '', lastColor);
        }
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
