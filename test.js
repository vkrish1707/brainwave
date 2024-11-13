const adjustColumnSizes = (gridApi) => {
  // Get all column IDs
  const allColumnIds = gridApi.getAllColumns().map((col) => col.getColId());

  // Auto-size the first column
  const firstColumnId = allColumnIds[0]; // Assuming the first column needs auto-sizing
  gridApi.autoSizeColumns([firstColumnId]);

  // Apply sizeColumnsToFit for remaining columns
  const otherColumns = allColumnIds.slice(1); // Exclude the first column
  if (otherColumns.length > 0) {
    // Temporarily hide the first column, then sizeColumnsToFit for the rest
    gridApi.setColumnVisible(firstColumnId, false); // Hide first column
    gridApi.sizeColumnsToFit(); // Fit remaining visible columns
    gridApi.setColumnVisible(firstColumnId, true); // Show first column back
  }
};