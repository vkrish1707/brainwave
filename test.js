const columnWidths = [
  { key: "siDieId", width: 150 },
  { key: "node", width: 150 },
  { key: "type", width: 100 },
  { key: "socName", width: 200 },
  { key: "orderId", width: 100 },
  { key: "nodeColor", width: 100 },
  { key: "por", width: 120 },
  { key: "reportDate", width: 200 },
  { key: "isLive", width: 80 },
  { key: "soc", width: 150 },
  { key: "ipType1", width: 150 },
  { key: "ipType2", width: 150 },
  { key: "ipType3", width: 150 },
  { key: "ipType4", width: 150 },
  { key: "ipType5", width: 150 },
  { key: "ipType6", width: 150 },
  { key: "ipType7", width: 150 },
  { key: "ipType8", width: 150 },
  { key: "ipType9", width: 150 },
  { key: "ipType10", width: 150 },
  { key: "ipType11", width: 150 },
  { key: "ipType12", width: 150 },
  { key: "ipType13", width: 150 },
  { key: "ipType14", width: 150 },
  { key: "ipType15", width: 150 },
  { key: "ipType16", width: 150 },
  { key: "ipType17", width: 150 },
  { key: "ipType18", width: 150 },
  { key: "ipType19", width: 150 },
  { key: "ipType20", width: 150 },
  { key: "ipType21", width: 150 },
  { key: "ipType22", width: 150 },
  { key: "ipType23", width: 150 },
  { key: "ipType24", width: 150 },
  { key: "ipType25", width: 150 },
  { key: "ipType26", width: 150 },
  { key: "ipType27", width: 150 },
  { key: "ipType28", width: 150 },
  { key: "ipType29", width: 150 },
  { key: "ipType30", width: 150 },
  { key: "ipType31", width: 150 },
  { key: "ipType32", width: 150 },
  { key: "ipType33", width: 150 },
  { key: "ipType34", width: 150 },
  { key: "ipType35", width: 150 },
  { key: "ipType36", width: 150 },
  { key: "ipType37", width: 150 },
  { key: "ipType38", width: 150 },
  { key: "ipType39", width: 150 },
  { key: "ipType40", width: 150 },
];


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