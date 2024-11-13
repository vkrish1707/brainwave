const adjustGridColumns = (gridApi, gridDiv) => {
  const allColumnIds = gridApi.getAllColumns().map((col) => col.getColId());
  const firstColumnId = allColumnIds[0]; // Assume the first column is the one to auto-size

  // Step 1: Auto-size the first column
  gridApi.autoSizeColumns([firstColumnId]);

  // Step 2: Size remaining columns to fit
  const remainingColumns = allColumnIds.slice(1);
  if (remainingColumns.length > 0) {
    gridApi.setColumnVisible(firstColumnId, false); // Temporarily hide the first column
    gridApi.sizeColumnsToFit(); // Fit remaining visible columns
    gridApi.setColumnVisible(firstColumnId, true); // Show the first column again
  }

  // Step 3: Adjust grid container width dynamically
  setTimeout(() => {
    const totalColumnWidth = gridApi.getAllColumns().reduce((acc, col) => acc + col.getActualWidth(), 0);
    gridDiv.style.width = `${totalColumnWidth}px`; // Set grid width dynamically
    gridApi.sizeColumnsToFit(); // Reapply column size fit
  }, 0);
};

<AgGridReact
  onGridReady={(params) => {
    const gridApi = params.api;
    const gridDiv = document.getElementById('gridDiv'); // Your grid's container div
    adjustGridColumns(gridApi, gridDiv);
  }}
  columnDefs={columnDefs}
  rowData={rowData}
  defaultColDef={{
    resizable: true, // Ensure columns are resizable
  }}
/>
