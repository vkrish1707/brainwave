const handleApply = () => {
  console.log("🎨 handleApply ~ selectedColors:", selectedColors);

  const activeColors = Object.keys(selectedColors)
    .filter(color => selectedColors[color].state)
    .map(color => selectedColors[color].value);

  console.log("Active Colors:", activeColors);

  // Step 1: Filter rows based on selected colors
  let filteredRows = rowData.map(item => {
    let updatedItem = { ...item };
    Object.keys(item).forEach(key => {
      if (key.startsWith("IPType") && Array.isArray(item[key])) {
        const filteredObjects = item[key].filter(obj =>
          activeColors.includes(obj.color.toLowerCase())
        );
        updatedItem[key] = filteredObjects.length > 0
          ? filteredObjects
          : [{ value: "", color: "white" }];
      }
    });
    return updatedItem;
  });

  // Step 2: Remove rows where all objects have empty values or white color
  const sanitizedRows = filteredRows.filter(row => {
    return Object.keys(row).some(key => {
      if (key.startsWith("IPType") && Array.isArray(row[key])) {
        return row[key].some(obj => obj.value !== "" && obj.color !== "white");
      }
      return true; // Keep other non-IPType keys as they are
    });
  });

  // Step 3: Set the filtered and sanitized rows to the grid
  setRowData(sanitizedRows);
};