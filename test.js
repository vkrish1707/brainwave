const applyYearRangeFilter = (startYear, endYear) => {
  const gridApi = gridRef.current.api; // Assuming gridRef is the ref for AG Grid
  const columnKey = "yourDateColumn"; // Replace this with the correct column key

  // Extract the filter instance for the specific column
  const filterInstance = gridApi.getFilterInstance(columnKey);
  
  if (filterInstance) {
    // Get the current data for the column (array of objects)
    const filterValues = filterInstance.getModel() || { values: [] };

    // Function to filter dates based on startYear and endYear, taking into account the nested array
    const filterDatesByYear = (porArray) => {
      if (Array.isArray(porArray) && porArray.length > 0) {
        // Assuming the first object contains the date we need in the 'value' field
        const dateValue = porArray[0]?.value;
        const year = new Date(dateValue).getFullYear();
        return year >= startYear && year <= endYear;
      }
      return false;
    };

    // Filter values that fall within the selected year range, based on the first object's 'value' field
    const updatedFilterValues = filterValues.values.filter(value => filterDatesByYear(value));

    // Update the filter model with the filtered values
    filterInstance.setModel({
      values: updatedFilterValues
    });

    // Apply the new filter to the grid
    gridApi.onFilterChanged();
  }
};