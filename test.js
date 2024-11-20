const onGridStateChange = () => {
  const gridApi = gridRef.current?.api;

  if (gridApi) {
    // Get the current filters
    const filters = gridApi.getFilterModel();

    // Get visible columns
    const visibleColumns = gridApi.getAllColumns()
      .filter((col) => col.isVisible())
      .map((col) => col.getColId());

    // Add filters and visible columns to the URL
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set("filters", JSON.stringify(filters)); // Save filters as a string
    queryParams.set("visibleColumns", JSON.stringify(visibleColumns)); // Save visible columns as a string

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl); // Update the URL without refreshing the page
  }
};

const restoreGridStateFromURL = () => {
  const gridApi = gridRef.current?.api;

  if (gridApi) {
    const queryParams = new URLSearchParams(window.location.search);

    // Retrieve filters and visible columns from URL
    const filters = queryParams.get("filters");
    const visibleColumns = queryParams.get("visibleColumns");

    // Apply filters
    if (filters) {
      gridApi.setFilterModel(JSON.parse(filters));
    }

    // Apply column visibility
    if (visibleColumns) {
      const allColumns = gridApi.getAllColumns();
      const visibleColumnIds = JSON.parse(visibleColumns);

      allColumns.forEach((col) => {
        const isVisible = visibleColumnIds.includes(col.getColId());
        gridApi.setColumnVisible(col.getColId(), isVisible);
      });
    }
  }
};
