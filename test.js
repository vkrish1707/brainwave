const applyYearFilter = async (startYear, endYear) => {
  const gridApi = gridRef.current.api;
  const allRowData = []; // Array to hold all data in the grid

  // Extract all data from the grid and store it in allRowData
  gridApi.forEachNodeAfterFilterAndSort((node) => {
    allRowData.push(node.data);
  });

  // Convert startYear and endYear to Date objects
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);

  // Filter the data manually, excluding row 0
  const filteredData = allRowData.filter((row, index) => {
    if (index === 0) return true; // Always include row 0
    const rowDate = new Date(row.por); // Assuming 'por' is your date field
    return rowDate >= startDate && rowDate <= endDate;
  });

  // Apply the filtered data back to the grid
  gridApi.setRowData(filteredData);

  // Optionally update any UI elements or state if needed
  setIsFilterEnabled(startYear !== yearRange.startYear || endYear !== yearRange.endYear);
};