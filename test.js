const restoreGridStateFromURL = () => {
  const gridApi = gridRef.current?.api;

  if (!gridApi) return;

  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get("data");

  if (!data) return;

  const filtersParams = decrypt(data);

  // Restore Filters
  filtersParams?.filters && gridApi.setFilterModel(filtersParams.filters);

  // Restore Filtered Year Range (example)
  if (filtersParams?.filters?.por) {
    const tapeOutDateFilters = filtersParams.filters.por;
    const startYear = Number(new Date(tapeOutDateFilters.dateFrom).getFullYear());
    const endYear = Number(new Date(tapeOutDateFilters.dateTo).getFullYear());
    setFilteredYearRange({ startYear, endYear });
  }

  // Restore Visible Columns
  if (filtersParams?.visibleColumns) {
    const visibleColumnIds = filtersParams.visibleColumns;
    gridApi.getAllGridColumns().forEach((col) => {
      const isVisible = visibleColumnIds.includes(col.getColId());
      gridApi.setColumnVisible(col.getColId(), isVisible);
    });
  }

  // Restore Column Order
  if (filtersParams?.colOrder) {
    const columnState = filtersParams.colOrder.map((colId) => ({
      colId,
      hide: false, // Ensure columns are shown
    }));
    gridApi.setColumnState(columnState);
  }

  // Restore Row Order
  if (filtersParams?.rowOrder) {
    const rowOrderIds = filtersParams.rowOrder;

    // Update row order without re-setting the data
    const allRows = gridApi.getDisplayedRowData();
    const reorderedRows = rowOrderIds.map((id) =>
      allRows.find((row) => row.data?.id === id)
    ).filter(Boolean); // Ensure valid rows are included

    reorderedRows.forEach((row, index) => {
      gridApi.getRowNode(row.data.id)?.setRowIndex(index);
    });
  }
};