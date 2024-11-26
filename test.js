const restoreRowOrder = (desiredOrder, gridApi) => {
  if (!gridApi || !Array.isArray(desiredOrder)) return;

  // Get the current row data
  const rowData = [];
  gridApi.forEachNode((node) => {
    rowData.push(node.data);
  });

  // Create a map of ID to row data for faster lookup
  const idToDataMap = new Map(rowData.map((data) => [data.id, data]));

  // Reorder the row data based on the desiredOrder array
  const reorderedData = desiredOrder
    .map((id) => idToDataMap.get(id))
    .filter((data) => !!data); // Filter out any undefined values

  // Reapply the reordered data to the grid
  gridApi.setRowData(reorderedData);
};
