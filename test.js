const hideColumns = () => {
  // Get the current column definitions
  let newColumnDefs = [...columnDefs]; // Assuming columnDefs is your state

  // Loop through column definitions from index 4 to 20 and set hide to true
  newColumnDefs = newColumnDefs.map((colDef, index) => {
    if (index >= 4 && index <= 20) {
      return { ...colDef, hide: true }; // Set the hide property to true for columns
    }
    return colDef;
  });

  // Update the column definitions with the hidden columns
  setColumnDefs(newColumnDefs);
};

// Example usage on a button click
<Button onClick={hideColumns}>Hide Columns 4 to 20</Button>