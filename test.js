const gridApi = gridRef.current.api;

// Function to control visibility of the first row
const toggleFirstRowVisibility = (shouldShowFirstRow) => {
  const allNodes = [];
  gridApi.forEachNode((node) => allNodes.push(node));  // Get all row nodes

  const firstRowNode = allNodes[0];  // Access the first row node

  // Set first row visibility based on the toggle
  firstRowNode.setRowVisible(shouldShowFirstRow);
};

// Apply Filter for the other rows starting from the second row
const applyFilterForOtherRows = (filterModel) => {
  const allNodes = [];
  gridApi.forEachNode((node) => allNodes.push(node));  // Get all row nodes

  allNodes.slice(1).forEach((node) => {
    // Apply your filter logic here for rows starting from index 1
    gridApi.onFilterChanged();
  });
};

// Example usage
toggleFirstRowVisibility(true);  // Show the first row
applyFilterForOtherRows(filterModel);  // Apply filters starting from the second row