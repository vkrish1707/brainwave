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
