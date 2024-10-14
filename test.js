const applyYearFilter = async (startYear, endYear) => {
    const gridApi = gridRef.current.api;

    const filterInstance = await gridApi.getColumnFilterInstance('por');

    if (filterInstance) {
        const startDate = new Date(startYear, 0, 1);
        const endDate = new Date(endYear, 11, 31);

        // Set up a filter model with a custom comparator that skips the first row
        filterInstance.setModel({
            type: "inRange",
            comparator: (filterDate, cellValue, node) => {
                // If it's the first row, return true to keep it visible
                if (node.rowIndex === 0) {
                    return true; // Skip filtering for the first row
                }

                // Otherwise, apply the date filter logic
                const firstObj = cellValue && cellValue[0];
                const cellDate = new Date(firstObj?.value || "");

                if (isNaN(cellDate)) {
                    return -1; // Treat non-date values as less than any date
                }

                return cellDate.getTime() - filterDate.getTime();
            },
            dateFrom: startDate.toISOString().split("T")[0],
            dateTo: endDate.toISOString().split("T")[0],
        });

        // Trigger the filter in the grid
        gridApi.onFilterChanged();
    }
};