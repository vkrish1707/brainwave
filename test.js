const restoreGridStateFromURL = () => {
  const gridApi = gridRef.current?.api;
  if (!gridApi) return;

  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get("data");
  if (!data) return;

  const filtersParams = decrypt(data);
  console.log("🚀 ~ filtersParams:", filtersParams);

  // Restore Filters
  if (filtersParams?.filters) {
    gridApi.setFilterModel(filtersParams.filters);
  }

  // Restore Filtered Year Range (Example)
  if (filtersParams?.filters?.por) {
    const tapeOutDateFilters = filtersParams.filters.por;
    const startYear = new Date(tapeOutDateFilters.dateFrom).getFullYear();
    const endYear = new Date(tapeOutDateFilters.dateTo).getFullYear();
    setFilteredYearRange({ startYear, endYear });
  }

  // Restore Visible Columns and Column Order
  if (filtersParams?.visibleColumns) {
    const allColumns = gridApi.getAllColumns();
    const visibleColumnIds = filtersParams.visibleColumns;

    // Make only specific columns visible and set their order
    const orderedColumns = [];
    allColumns.forEach((col) => {
      const colId = col.getColId();
      const isVisible = visibleColumnIds.includes(colId);

      gridApi.setColumnVisible(colId, isVisible);

      // Add visible columns in the specified order
      if (isVisible) {
        const columnIndex = visibleColumnIds.indexOf(colId);
        orderedColumns[columnIndex] = col;
      }
    });

    // Set column order
    const updatedColumnDefs = orderedColumns
      .filter((col) => col) // Remove undefined entries
      .map((col) => col.getColDef());
    gridApi.setColumnDefs(updatedColumnDefs);
  }

  // Restore Row Order
  if (filtersParams?.rowOrder) {
    const desiredRowOrder = filtersParams.rowOrder;
    const idToIndexMap = new Map();
    desiredRowOrder.forEach((id, index) => idToIndexMap.set(id, index));

    gridApi.forEachNode((node) => {
      const desiredIndex = idToIndexMap.get(node.data.id);
      if (desiredIndex !== undefined) {
        node.setRowIndex(desiredIndex);
      }
    });

    gridApi.refreshCells({ force: true });
  }
};