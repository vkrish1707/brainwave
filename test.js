const adjustColumnWidths = () => {
  console.log("Adjusting SS Grid column widths");

  const mainGridApi = mainGridRef.current?.api; // Main grid reference
  const ssGridApi = ssGridRef.current?.api; // SS Grid reference

  if (!mainGridApi || !ssGridApi) return;

  // Step 1: Get visible columns from the main grid
  const visibleColumns = mainGridApi.getAllDisplayedColumns().map((col) => col.getColId());

  // Step 2: Filter widths from ssGridColsWidth based on visible columns
  const visibleWidths = ssGridColsWidth
    .filter((col) => visibleColumns.includes(col.key)) // Match keys
    .map((col) => col.width); // Extract widths

  // Step 3: Calculate the sum of visible widths
  const totalVisibleWidth = visibleWidths.reduce((sum, width) => sum + width, 0);

  // Step 4: Get the scaling factor based on the dashboard viewport
  const dashboardViewWidth = handlesSsGridWidth(activeView); // Get vw (viewport width)
  const scalingFactor = dashboardViewWidth / totalVisibleWidth;

  console.log("Scaling Factor:", scalingFactor);

  // Step 5: Adjust column widths for the SS Grid
  ssGridColsWidth.forEach(({ key, width }) => {
    const adjustedWidth = Math.round(width * scalingFactor); // Scale the width
    ssGridApi.setColumnWidth(key, adjustedWidth);
  });

  // Step 6: Refresh the header to apply changes
  ssGridApi.refreshHeader();
};