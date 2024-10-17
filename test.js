const updateRowData = (rowData, action) => {
  const gridApi = gridRef.current.api; // Access the grid API

  // Define the transaction object
  let transaction = {};

  // Switch based on the action type: add, update, delete
  switch (action) {
    case 'add':
      // Add the new row to the top (index 0)
      transaction = {
        add: [rowData], // rowData should be the object with the data to be added
        addIndex: 0,    // This will place the row at the top
      };
      break;

    case 'update':
      // Update the row in place (it will automatically update where the row exists based on its ID)
      transaction = {
        update: [rowData], // rowData should have the updated values along with the row's ID
      };
      break;

    case 'delete':
      // Remove the row
      transaction = {
        remove: [rowData], // rowData should include the ID of the row to be deleted
      };
      break;

    default:
      console.error('Invalid action provided:', action);
      return;
  }

  // Apply the transaction
  gridApi.applyTransaction(transaction);

  // Refresh the grid after changes if necessary
  gridApi.refreshCells();
};

// Example usage:
// For adding a new row
updateRowData({ id: 'row_123', name: 'John', age: 30 }, 'add');

// For updating an existing row
updateRowData({ id: 'row_123', name: 'John Doe', age: 31 }, 'update');

// For deleting a row
updateRowData({ id: 'row_123' }, 'delete');