const toggleFirstRowPinOnFilter = () => {
    const gridApi = gridRef.current.api;  // Assuming gridRef is your AG Grid reference
    const isFilterApplied = checkForFilters(gridApi);

    if (isFilterApplied) {
        // Pin the first row
        const firstRowData = {/* Your first row data */};
        gridApi.setPinnedTopRowData([firstRowData]);
    } else {
        // Unpin the first row
        gridApi.setPinnedTopRowData([]);
    }
};

const checkForFilters = (gridApi) => {
    const filterModel = gridApi.getFilterModel();
    return Object.keys(filterModel).length > 0;  // Returns true if any filters are applied
};

// AG Grid options with filter event listener
const gridOptions = {
    onFilterChanged: () => {
        toggleFirstRowPinOnFilter();
    },
};