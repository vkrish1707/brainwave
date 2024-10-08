const GREEN_COLOR_CODE = "#00B050";
const WHITE_COLOR_CODE = "#FFFFFF";

const filterAndModifyObjects = (mainObjects) => {
  mainObjects.forEach(mainObj => {
    // Iterate through each key in the main object
    Object.keys(mainObj).forEach(key => {
      if (key.startsWith("IP type") && Array.isArray(mainObj[key])) {
        let hasGreenColor = false;

        // Modify the sub-objects based on the presence of the green color
        mainObj[key] = mainObj[key].map(subObj => {
          if (subObj.color === GREEN_COLOR_CODE) {
            hasGreenColor = true;  // Mark that we found a green-colored object
            return subObj;  // Keep the object with the green color
          } else {
            // Modify non-green sub-objects: set value to empty and color to white
            return {
              ...subObj,
              value: "",
              color: WHITE_COLOR_CODE
            };
          }
        });

        // If no green-colored object was found, remove the whole key from the main object
        if (!hasGreenColor) {
          delete mainObj[key];
        }
      }
    });
  });

  return mainObjects;  // Return the modified main objects
};