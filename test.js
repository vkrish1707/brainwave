
function getVisibleColumns(gridApi) {
  const visibleColumns = gridApi.getAllColumns()
    .filter((col) => col.isVisible())
    .map((col) => col.getColId());
  return visibleColumns;
}
function encrypt(data) {
  const jsonString = JSON.stringify(data);
  let base64 = btoa(jsonString); // Convert to Base64
  base64 = base64.replace(/=/g, "").slice(0, 16); // Trim to 16 characters
  return base64;
}
function updateUrlWithEncryptedColumns(gridApi) {
  const visibleColumns = getVisibleColumns(gridApi);

  if (visibleColumns.length === gridApi.getAllColumns().length) {
    // All columns visible; no need to add to URL
    const url = new URL(window.location.href);
    url.searchParams.delete("columns");
    window.history.replaceState(null, "", url);
    return;
  }
  
  

  const encryptedColumns = encrypt(visibleColumns);

  const url = new URL(window.location.href);
  url.searchParams.set("columns", encryptedColumns);
  window.history.replaceState(null, "", url);
}
function restoreColumnsFromUrl(gridApi) {
  const url = new URL(window.location.href);
  const encryptedColumns = url.searchParams.get("columns");

  if (!encryptedColumns) {
    return; // No specific columns in URL, all columns remain visible
  }

  const visibleColumns = decrypt(encryptedColumns);

  if (!visibleColumns) {
    console.error("Failed to restore columns from URL");
    return;
  }

  const allColumns = gridApi.getAllColumns();

  allColumns.forEach((col) => {
    const isVisible = visibleColumns.includes(col.getColId());
    gridApi.setColumnVisible(col.getColId(), isVisible);
  });
}

function encrypt(data) {
  const jsonString = JSON.stringify(data);
  let base64 = btoa(jsonString); // Convert to Base64
  base64 = base64.replace(/=/g, "").slice(0, 16); // Trim to 16 characters
  return base64;
}
function decrypt(encryptedString) {
  try {
    let base64 = encryptedString + "=".repeat((4 - encryptedString.length % 4) % 4); // Re-pad base64
    const jsonString = atob(base64); // Decode Base64
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}