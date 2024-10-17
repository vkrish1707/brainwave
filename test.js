const handleColorFilterApply = () => {
  const activeColors = Object.keys(selectedColors)
    .filter((color) => selectedColors[color].state)
    .map((color) => selectedColors[color].value);

  // Process and sanitize the row data in a single pass
  const sanitizedRows = backendData.data.map((item) => {
    let sanitizedItem = { ...item };

    // Filter through the object's keys once, avoid extra loops
    Object.keys(sanitizedItem).forEach((key) => {
      if (key.startsWith("ipType") && Array.isArray(sanitizedItem[key])) {
        sanitizedItem[key] = sanitizedItem[key].map((obj) => {
          const cellColor = obj.color.toLowerCase();
          if (activeColors.includes(cellColor)) {
            return obj;
          }
          // Return object with value and color white if no match
          return { value: "", color: "ffffff" };
        });
      }
    });
    
    // Return the sanitized item
    return sanitizedItem;
  });

  const filteredRows = sanitizedRows.filter((row) => {
    return Object.keys(row).some((key) => {
      if (key.startsWith("ipType") && Array.isArray(row[key])) {
        return row[key].some(
          (obj) => obj.value !== "" && obj.color !== "ffffff"
        );
      }
      return false;
    });
  });

  const updatedData = isDataProvidersEnabled
    ? [dataProviders, ...filteredRows]
    : filteredRows;

  setRowData(updatedData);
  setIsColorFilterEnabled(true);
};