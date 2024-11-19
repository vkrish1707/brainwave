const handleExportExcel = () => {
  try {
    const gridApi = gridRef.current.api;
    const columnApi = gridRef.current.columnApi;

    // Collect visible columns
    const visibleColumns = columnApi
      .getAllDisplayedColumns()
      .map((col) => col.colId);

    // Collect filtered rows
    const filteredRows = [];
    gridApi.forEachNodeAfterFilter((node) => {
      const filteredRow = {};
      visibleColumns.forEach((colId) => {
        filteredRow[colId] = node.data[colId];
      });
      filteredRows.push(filteredRow);
    });

    // Generate Excel using the filtered and visible data
    generateExcel(filteredRows);
  } catch (error) {
    console.error("Error exporting filtered grid data to Excel:", error);
  }
};