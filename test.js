const columnDefs = [
  // Other columns...
  {
    field: 'yourField', // Field for column 4
    headerName: 'Your Column Name',
    filter: 'agDateColumnFilter', // Use AG Grid's built-in date filter
    filterParams: {
      comparator: (filterDate, cellValue) => {
        // Extract date from the value field in the first object of the array
        const firstObj = cellValue && cellValue[0];
        const cellDate = new Date(firstObj?.value);
        if (isNaN(cellDate)) {
          // If it's not a date, treat it as text (always passes the date filter)
          return 0;
        }
        return cellDate.getTime() - filterDate.getTime();
      }
    },
    valueGetter: (params) => {
      // Get the value for this column
      return params.data.yourField && params.data.yourField[0]?.value;
    },
    valueFormatter: (params) => {
      // Format date to show correctly
      const value = params.value;
      if (isNaN(new Date(value))) return value; // Return the text as-is
      return new Date(value).toLocaleDateString();
    }
  },
  // Other columns...
];

const applyDateRangeFilter = (startYear, endYear) => {
  const gridApi = gridRef.current.api; // Assuming gridRef is your AG Grid ref
  
  // Get the filter instance for the column with the date (replace with your actual column field)
  const filterInstance = gridApi.getFilterInstance('yourField');
  
  if (filterInstance) {
    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31);
    
    // Set the filter model with the date range
    filterInstance.setModel({
      type: 'inRange',
      dateFrom: startDate,
      dateTo: endDate
    });

    // Apply the filter to the grid
    gridApi.onFilterChanged();
  }
};
