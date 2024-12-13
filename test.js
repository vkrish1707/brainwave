// utils.js

/**
 * Extracts visible columns and filtered rows from the grid.
 * @param {object} gridApi - The grid API instance from AG Grid.
 * @returns {{ visibleColumns: string[], visibleHeaderKeys: string[], filteredRows: object[] }}
 */
export function getFilteredGridData(gridApi) {
  // Extract displayed columns
  const visibleColumns = gridApi
    .getAllDisplayedColumns()
    .map((col) => col.userProvidedColDef.headerName);

  const visibleHeaderKeys = gridApi
    .getAllDisplayedColumns()
    .map((col) => col.colId);

  // Extract filtered rows
  const filteredRows = [];
  gridApi.forEachNodeAfterFilter((node) => {
    const filteredRow = {};
    // Example condition - adjust as needed
    if (!Array.isArray(node.data.soc)) {
      visibleHeaderKeys.forEach((colId) => {
        filteredRow[colId] = node.data[colId];
      });
      filteredRows.push(filteredRow);
    }
  });

  return { visibleColumns, visibleHeaderKeys, filteredRows };
}

/**
 * Calls the backend endpoint to download Excel and triggers the file download.
 * @param {Array} gridData - The filtered rows of data.
 * @param {Array} headers - The visible columns or header keys.
 * @param {string} activeView - The current active view.
 * @param {function} callDB - The function to call backend endpoints.
 * @param {function} downloadFile - The function to trigger file download.
 * @param {string} [fileNameOverride] - Optional custom filename.
 * @returns {Promise<void>}
 */
export async function downloadExcelFile(gridData, headers, activeView, callDB, downloadFile, fileNameOverride) {
  const fileName = fileNameOverride || `IP-SOC-${activeView}-Dashboard.xlsx`;
  
  const blob = await callDB(
    { gridData, headers, activeView },
    "downloadIpAlignmentExcel", // your backend endpoint identifier
    "POST",
    "file"
  );

  downloadFile(fileName, blob);
}




import React, { useRef, useState } from 'react';
import { getFilteredGridData, downloadExcelFile } from './utils';
import { callDB, downloadFile } from './yourApiAndDownloadHelpers'; // assume these exist

function YourComponent() {
  const gridRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("someView");
  const [action, setAction] = useState(null);

  const handleExportExcel = async () => {
    try {
      setIsLoading(true);
      const gridApi = gridRef.current.api;
      const { visibleColumns, filteredRows } = getFilteredGridData(gridApi);

      // Download the Excel
      await downloadExcelFile(filteredRows, visibleColumns, activeView, callDB, downloadFile);

      // After success
      setIsLoading(false);
      setAction("actions");
    } catch (error) {
      console.error("Error exporting filtered grid data to Excel:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Your AG Grid and button */}
      <button onClick={handleExportExcel}>Export to Excel</button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default YourComponent;