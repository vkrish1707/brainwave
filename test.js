function transformData(inputObj, excludeFields = []) {
    const transformedObj = {};

    Object.keys(inputObj).forEach((key) => {
        // Skip transformation for excluded fields
        if (excludeFields.includes(key)) {
            transformedObj[key] = inputObj[key];
            return;
        }

        // Process each field
        const fieldData = inputObj[key];

        if (Array.isArray(fieldData)) {
            // If array contains objects with userName
            if (fieldData.length > 0 && fieldData[0]?.userName) {
                transformedObj[key] = fieldData.map(item => ({
                    value: item.userName,
                    color: "#000000" // Default color, modify as needed
                }));
            } 
            // If it's an array of empty strings
            else if (fieldData.length === 0 || fieldData.every(i => i === "")) {
                transformedObj[key] = [{ value: "", color: "#CCCCCC" }]; // Default placeholder object
            } 
            // If it's some other array, retain original
            else {
                transformedObj[key] = fieldData;
            }
        } 
        // Retain any non-array values as-is
        else {
            transformedObj[key] = fieldData;
        }
    });

    return transformedObj;
}