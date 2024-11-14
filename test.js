const data = [
  { id: 1, SOC: "Value1", unwantedKey1: "removeMe", unwantedKey2: "removeThisToo" },
  { id: 2, SOC: "Value2", unwantedKey1: "removeMe", unwantedKey2: "removeThisToo" },
  { id: 3, SOC: "Value3", unwantedKey1: "removeMe", unwantedKey2: "removeThisToo" }
];

// Keys to remove
const keysToRemove = ["unwantedKey1", "unwantedKey2"];

// Transform SOC to array and remove unwanted keys
const updatedData = data.map(item => {
  // Create a new object without the unwanted keys
  const filteredItem = Object.keys(item)
    .filter(key => !keysToRemove.includes(key)) // Exclude unwanted keys
    .reduce((acc, key) => {
      acc[key] = item[key]; // Copy over allowed keys
      return acc;
    }, {});

  // Update SOC to be an array of objects
  return {
    ...filteredItem,
    SOC: [{ value: item.SOC }]
  };
});

console.log(updatedData);