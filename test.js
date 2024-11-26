const columnWidths = [
  { key: "col1", width: 150 },
  { key: "col2", width: 200 },
  { key: "col3", width: 300 },
  // Add more column configurations here
];

const onFirstDataRendered = (params) => {
  adjustColumnWidths(params.api, columnWidths);
};

const adjustColumnWidths = (gridApi, columnWidthsArray) => {
  if (!gridApi || !columnWidthsArray) return;

  // Loop through the array and set the widths
  columnWidthsArray.forEach(({ key, width }) => {
    gridApi.columnApi.setColumnWidth(key, width);
  });

  // Refresh the grid to reflect the changes
  gridApi.refreshHeader(); // Optional: Refresh header if necessary
};

// AG Grid React component
<AgGridReact
  ref={gridRef}
  rowData={rowData}
  columnDefs={columnDefs}
  onFirstDataRendered={onFirstDataRendered} // Trigger function after first render
/>;