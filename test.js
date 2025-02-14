const findArrayDifference = (arr1, arr2, keys) => {
    const createKey = (obj) => keys.map(key => obj[key]).join("|"); // Unique key for comparison
    const set1 = new Set(arr1.map(createKey));
    const set2 = new Set(arr2.map(createKey));

    // Find the object that is extra in arr2 (added)
    for (const obj of arr2) {
        if (!set1.has(createKey(obj))) {
            return { differenceObject: obj, changeType: "added" };
        }
    }

    // Find the object that is extra in arr1 (removed)
    for (const obj of arr1) {
        if (!set2.has(createKey(obj))) {
            return { differenceObject: obj, changeType: "removed" };
        }
    }

    return null; // No difference found
};