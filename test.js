function filterObjectsByColor(mainArray, colorArray) {
  return mainArray.map(item => {
    const updatedItem = { ...item };
    
    Object.keys(item).forEach(key => {
      if (key.startsWith("IPType") && Array.isArray(item[key])) {
        const filteredObjects = item[key].filter(obj => colorArray.includes(obj.color));

        updatedItem[key] = filteredObjects.length > 0 
          ? filteredObjects 
          : [{ value: "", color: "white" }];
      }
    });

    return updatedItem;
  });
}

// Example usage:
const inputData = [
  {
    "name": "item1",
    "IPType1": [
      { "value": "data1", "color": "green" },
      { "value": "data2", "color": "red" }
    ],
    "IPType2": [
      { "value": "data3", "color": "blue" },
      { "value": "data4", "color": "green" }
    ]
  },
  {
    "name": "item2",
    "IPType1": [
      { "value": "data5", "color": "yellow" },
      { "value": "data6", "color": "red" }
    ]
  }
];

const colorArray = ["green", "blue"];
const filteredData = filterObjectsByColor(inputData, colorArray);
console.log(filteredData);