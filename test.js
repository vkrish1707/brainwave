import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

const GridWithUrlToggle = ({ backendData }) => {
  const [isUrlFilters, setIsUrlFilters] = useState(false); // State to track toggle
  const [encryptedData, setEncryptedData] = useState(""); // Store encrypted filters
  const [columnDefs, setColumnDefs] = useState([]); // Grid column definitions
  const [rowData, setRowData] = useState([]); // Grid row data
  const gridApiRef = useRef(null); // Grid API reference

  // Function to restore grid state from encrypted data
  const restoreGridStateFromURL = () => {
    const gridApi = gridApiRef.current?.api;
    if (!gridApi || !encryptedData) return;

    const filtersParams = decrypt(encryptedData);

    if (filtersParams.filters) {
      gridApi.setFilterModel(filtersParams.filters);
    }

    if (filtersParams.visibleColumns) {
      const allColumns = gridApi.getAllDisplayedColumns();
      const visibleColumnIds = filtersParams.visibleColumns;

      allColumns.forEach((col) => {
        const colId = col.getColId();
        const isVisible = visibleColumnIds.includes(colId);
        gridApi.setColumnVisible(colId, isVisible);
      });

      visibleColumnIds.forEach((colId, index) => {
        gridApi.moveColumns([colId], index);
      });
    }

    // Optional: Restore row order
    if (filtersParams.rowOrder) {
      const updatedRowData = [];
      const rowDataMap = new Map(rowData.map((row) => [row.id, row]));
      filtersParams.rowOrder.forEach((id) => {
        if (rowDataMap.has(id)) {
          updatedRowData.push(rowDataMap.get(id));
        }
      });
      setRowData(updatedRowData);
    }
  };

  // Function to update URL with encrypted data
  const updateUrlWithFilters = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("data", encryptedData);
    window.history.replaceState(null, "", currentUrl.toString());
  };

  // Function to remove encrypted data from URL
  const removeUrlFilters = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("data");
    window.history.replaceState(null, "", currentUrl.toString());
  };

  // Toggle logic for URL filters
  const handleUrlFiltersToggle = (checked) => {
    setIsUrlFilters(checked);
    if (checked) {
      updateUrlWithFilters();
      restoreGridStateFromURL();
    } else {
      removeUrlFilters();
      setColumnDefs(backendData.headers); // Reset to default columns
      setRowData(backendData.rows); // Reset to default row data
    }
  };

  // useEffect to initialize encrypted data from URL (on mount)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const encryptedDataFromUrl = queryParams.get("data");
    if (encryptedDataFromUrl) {
      setEncryptedData(encryptedDataFromUrl);
      setIsUrlFilters(true); // Enable checkbox if data exists in URL
    }
  }, []);

  return (
    <div>
      {/* Checkbox to toggle URL filters */}
      <label>
        <input
          type="checkbox"
          checked={isUrlFilters}
          onChange={(e) => handleUrlFiltersToggle(e.target.checked)}
        />
        Apply URL Filters
      </label>

      {/* Grid Component */}
      <AgGridReact
        ref={gridApiRef}
        columnDefs={columnDefs}
        rowData={rowData}
        onFirstDataRendered={() => {
          if (isUrlFilters) {
            restoreGridStateFromURL(); // Apply filters on first render
          }
        }}
      />
    </div>
  );
};

export default GridWithUrlToggle;