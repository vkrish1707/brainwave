const applyYearFilter = async (startYear, endYear) => {
    const gridApi = gridRef.current.api;

    // Extract the first row data before applying the filter
    const firstRowNode = gridApi.getDisplayedRowAtIndex(0);
    const firstRowData = firstRowNode ? firstRowNode.data : null;

    const filterInstance = await gridApi.getColumnFilterInstance('por');

    if (filterInstance) {
        const startDate = new Date(startYear, 0, 1);
        const endDate = new Date(endYear, 11, 31);

        // Apply the date range filter
        filterInstance.setModel({
            type: "inRange",
            dateFrom: startDate.toISOString().split("T")[0],
            dateTo: endDate.toISOString().split("T")[0],
        });

        // Trigger the filtering logic
        gridApi.onFilterChanged();

        // After applying filter, add the first row back to the top of the grid
        if (firstRowData) {
            const transaction = {
                add: [firstRowData],  // Add the first row data back
                addIndex: 0           // Ensure it's added at index 0
            };
            gridApi.applyTransaction(transaction);
        }
    }
};