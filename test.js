const restoreRowOrder = (desiredOrder, gridApi) => {
  if (!gridApi || !Array.isArray(desiredOrder)) return;

  // Create a map of row IDs to their desired indices
  const idToIndexMap = new Map();
  desiredOrder.forEach((id, index) => {
    idToIndexMap.set(id, index);
  });

  // Iterate over all row nodes and update their indices
  gridApi.forEachNode((node) => {
    const desiredIndex = idToIndexMap.get(node.data.id);
    if (desiredIndex !== undefined) {
      node.setRowIndex(desiredIndex);
    }
  });

  // Refresh the grid to apply the new order
  gridApi.refreshCells({ force: true });
};