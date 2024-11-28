const adjustColumnWidths = () => {
  console.log("Adjusting column widths");
  const gridApi = ssGridRef.current?.api;
  const mainGridApi = mainGridRef.current?.api; // Reference to the main visible grid
  
  if (!gridApi || !mainGridApi) return;

  // Get all columns in the main grid
  const mainColumns = mainGridApi.getAllDisplayedColumns().map((col) => ({
    key: col.getColId(),
    isVisible: col.isVisible(),
  }));

  // Determine visible and hidden columns
  const visibleColumns = mainColumns.filter((col) => col.isVisible);
  const hiddenColumns = mainColumns.filter((col) => !col.isVisible);

  // Calculate scaling factor for the visible grid's width
  const totalVisibleWidth = visibleColumns.reduce((sum, col) => {
    const width = ssGridColsWidth.find((c) => c.key === col.key)?.width || 100; // Default width
    return sum + width;
  }, 0);

  const viewportWidth = handlesSsGridWidth(activeView); // Get the view width (123vw, etc.)
  const scalingFactor = viewportWidth / totalVisibleWidth;

  // Apply adjusted widths to SSGrid
  visibleColumns.forEach((col) => {
    const originalWidth = ssGridColsWidth.find((c) => c.key === col.key)?.width || 100; // Default width
    const adjustedWidth = Math.floor(originalWidth * scalingFactor);
    gridApi.setColumnWidth(col.key, adjustedWidth);
  });

  // Set a default minimal width for hidden columns
  hiddenColumns.forEach((col) => {
    gridApi.setColumnWidth(col.key, 50); // Set minimal width for hidden columns
  });

  // Refresh the header to reflect changes
  gridApi.refreshHeader();
};