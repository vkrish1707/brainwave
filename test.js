const restoreRowOrder = (desiredOrder, gridApi) => {
  if (!gridApi || !Array.isArray(desiredOrder)) return;

  const idToIndexMap = new Map();

  // Create a map of row IDs to their desired indices
  desiredOrder.forEach((id, index) => {
    idToIndexMap.set(id, index);
  });

  // Apply custom row order after filtering and sorting
  gridApi.forEachNodeAfterFilterAndSort((node) => {
    const desiredIndex = idToIndexMap.get(node.data.id); // Assuming `id` is the unique row identifier

    if (desiredIndex !== undefined) {
      node.setRowIndex(desiredIndex);
    }
  });

  // Refresh the grid to reflect the custom row order
  gridApi.onSortChanged();
};


const handleSocSuggestions = () => {
  callDB({}, "getsoc", "post", "api", (response) => {
    const socSuggestions = {
      allSocSuggestions: response.allSocSuggestions,
      liveSocSuggestions: response.liveSocSuggestions,
    };

    // Store suggestions if needed
    setSuggestions(socSuggestions);

    // Update column definitions without setting state
    const columnState = gridApi.columnApi.getAllColumns().map((column) => {
      const colId = column.getColId();
      const userProvidedColDef = column.getUserProvidedColDef();

      // Update cellRendererParams or any other property dynamically
      return {
        colId,
        cellRendererParams: {
          ...userProvidedColDef.cellRendererParams,
          suggestions: socSuggestions,
        },
      };
    });

    // Apply the updated column state back to the grid
    gridApi.columnApi.applyColumnState({
      state: columnState,
      applyOrder: false, // Maintain the current column order
    });

    // Restore the grid state from the URL if needed
    restoreGridStateFromURL();
  });
};