function sanitizeData(data, validColors) {
  // Iterate through each item in the data array
  return data.map(item => {
    // Create a copy of the item to avoid mutating the original object
    let sanitizedItem = { ...item };

    // Loop over each key in the item
    Object.keys(sanitizedItem).forEach(key => {
      // If the key starts with 'IPType' and the value is an array
      if (key.startsWith('IPType') && Array.isArray(sanitizedItem[key])) {
        // Iterate through the array and check for matching colors
        const updatedArray = sanitizedItem[key].map(obj => {
          // If the color is in the validColors array, keep the object
          if (validColors.includes(obj.color.toLowerCase())) {
            return obj;
          } else {
            // If not, replace with empty value and white color
            return { value: "", color: "white" };
          }
        });

        // Update the key with the sanitized array
        sanitizedItem[key] = updatedArray;
      }
    });

    return sanitizedItem; // Return the sanitized item
  });
}

// Example usage
const rawData = [
  {
    siDieId: "1",
    IPType1: [{ value: "A", color: "#00B050" }, { value: "B", color: "#FF0000" }],
    IPType2: [{ value: "C", color: "#00B050" }],
  },
  {
    siDieId: "2",
    IPType1: [{ value: "D", color: "#0000FF" }],
    IPType3: [{ value: "E", color: "#00B050" }, { value: "F", color: "#FFFFFF" }],
  }
];

const validColors = ["#00b050", "#0000ff"]; // Colors to