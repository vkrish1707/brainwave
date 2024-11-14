const processDataRow = (worksheet, item, startRow, maxRowSpan) => {
  Object.entries(item).forEach(([key, cellData], columnIndex) => {
    const columnNumber = columnIndex + 1;

    if (Array.isArray(cellData)) {
      const rowSpan = cellData.length;

      if (rowSpan === maxRowSpan) {
        // Fill all cells normally if maxRowSpan matches the data length
        cellData.forEach((data, index) => {
          const cell = worksheet.getCell(startRow + index, columnNumber);
          applyCellStyles(cell, data.value, data.color);
        });
      } else {
        // Fill existing cells and propagate the last value to remaining cells
        cellData.forEach((data, index) => {
          const cell = worksheet.getCell(startRow + index, columnNumber);
          applyCellStyles(cell, data.value, data.color);
        });

        // Propagate the last value to fill the remaining cells
        const lastValue = cellData[cellData.length - 1].value;
        const lastColor = cellData[cellData.length - 1].color;

        for (let i = rowSpan; i < maxRowSpan; i++) {
          const cell = worksheet.getCell(startRow + i, columnNumber);
          applyCellStyles(cell, lastValue, lastColor);
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
