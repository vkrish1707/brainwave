import React, { useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = () => {
  const gridRef = useRef(null);

  const onGridReady = (params) => {
    const gridApi = params.api;
    const gridColumnApi = params.columnApi;

    // Auto-size the first column based on its content
    gridColumnApi.autoSizeColumn("col1");

    // Get the total available width for the grid
    const availableWidth = gridApi.gridPanel.eCenterContainer.clientWidth;

    // Get the width of the first column after auto-sizing it
    const firstColumnWidth = gridColumnApi.getColumnState().find(col => col.colId === "col1").width;

    // Calculate the remaining width for other columns
    const remainingWidth = availableWidth - firstColumnWidth;

    // Get the list of other columns (excluding the first column)
    const otherColumns = gridColumnApi.getAllColumns().filter(col => col.getColId() !== "col1");

    // Set the width of each remaining column proportionally
    const eachColumnWidth = remainingWidth / otherColumns.length;
    otherColumns.forEach(column => {
      gridColumnApi.setColumnWidth(column, eachColumnWidth);
    });
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "100vh", width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        onGridReady={onGridReady}
        rowData={[
          { col1: "Row 1", col2: "Some data", col3: "More data" },
          { col1: "Row 2", col2: "Another data", col3: "Even more data" },
        ]}
        columnDefs={[
          { headerName: "Column 1", field: "col1", colId: "col1" }, // First column
          { headerName: "Column 2", field: "col2" },
          { headerName: "Column 3", field: "col3" },
        ]}
      />
    </div>
  );
};

export default MyGridComponent;