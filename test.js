const getColumnDefs = (isSecondGrid = false) => {
  return columnDefs.map((colDef, index) => {
    if (index === 0) {
      return {
        ...colDef,
        rowDrag: !isSecondGrid, // Enable rowDrag only for the first grid
      };
    }
    return colDef;
  });
};