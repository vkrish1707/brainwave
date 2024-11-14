const processDataRow = (worksheet, item, startRow, maxRowSpan) => {
    Object.entries(item).forEach(([key, cellData], columnIndex) => {
        const columnNumber = columnIndex + 1;

        if (Array.isArray(cellData)) {
            const rowSpan = cellData.length;

            if (rowSpan === 1) {
                // Merge cells vertically for a single value
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

                // Fill remaining rows if rowSpan < maxRowSpan
                if (rowSpan < maxRowSpan) {
                    const remainingRows = maxRowSpan - rowSpan;
                    const lastData = cellData[cellData.length - 1]; // Get last data entry

                    for (let i = 0; i < remainingRows; i++) {
                        const cell = worksheet.getCell(startRow + rowSpan + i, columnNumber);
                        applyCellStyles(cell, '', lastData.color); // Leave value empty but apply color
                    }
                }
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