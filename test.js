const adjustColumnWidths = () => {
  console.log("Adjusting SS Grid column widths");

  const mainGridApi = gridRef.current?.api; // Main grid reference
  const ssGridApi = ssGridRef.current?.api; // SS Grid reference

  if (!mainGridApi || !ssGridApi) return;

  // Step 1: Get visible columns from the main grid
  const visibleColumns = mainGridApi.getAllDisplayedColumns().map((col) => col.getColId());

  // Step 2: Filter the widths from `ssGridColsWidth` for all columns
  const allColumnWidths = ssGridColsWidth.map((col) => col.width); // All column widths
  const visibleColumnWidths = ssGridColsWidth
    .filter((col) => visibleColumns.includes(col.key)) // Match visible columns
    .map((col) => col.width); // Extract visible widths

  const hiddenColumns = ssGridColsWidth.filter((col) => !visibleColumns.includes(col.key)); // Hidden columns

  // Step 3: Check if there are hidden columns
  if (hiddenColumns.length === 0) {
    console.log("No hidden columns detected. Setting default widths.");
    // No hidden columns, set the column widths directly
    ssGridColsWidth.forEach(({ key, width }) => {
      ssGridApi.setColumnWidth(key, width); // Set original width
    });
    ssGridApi.refreshHeader();
    return; // Exit since no scaling is needed
  }

  // Step 4: Calculate the total visible width and deficit
  const totalVisibleWidth = visibleColumnWidths.reduce((sum, width) => sum + width, 0); // Sum of visible widths
  const totalAllColumnsWidth = allColumnWidths.reduce((sum, width) => sum + width, 0); // Total width of all columns
  const deficit = totalAllColumnsWidth - totalVisibleWidth; // Width deficit caused by hidden columns
  const adjustmentPerColumn = Math.round(deficit / visibleColumns.length); // Distribute deficit across visible columns

  console.log(`Deficit: ${deficit}, Adjustment per column: ${adjustmentPerColumn}`);

  // Step 5: Adjust visible column widths
  ssGridColsWidth.forEach(({ key, width }) => {
    if (visibleColumns.includes(key)) {
      // Adjust visible column widths
      const adjustedWidth = width + adjustmentPerColumn;
      ssGridApi.setColumnWidth(key, adjustedWidth);
    } else {
      // Set original width for hidden columns
      ssGridApi.setColumnWidth(key, width);
    }
  });

  // Step 6: Refresh the header to reflect changes
  ssGridApi.refreshHeader();
};