function mergeEBVPArrays(primaryArray, primaryKey, additionalSources = []) {
  const getKey = (obj) =>
    `${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}|${obj.EBVP_TOP_NODE_3 ?? ''}`;

  const getSafeValue = (obj, key) =>
    obj && obj[key] != null ? Number(obj[key]) : 0;

  const sumColumn = (arr, col) =>
    arr.reduce((acc, obj) => acc + getSafeValue(obj, col), 0);

  const primaryMap = new Map();
  for (const obj of primaryArray) {
    primaryMap.set(getKey(obj), { ...obj });
  }

  const unmatchedBySource = {};
  for (const { array, valueKey } of additionalSources) {
    unmatchedBySource[valueKey] = [];

    for (const obj of array) {
      const key = getKey(obj);
      const value = getSafeValue(obj, valueKey);

      if (primaryMap.has(key)) {
        primaryMap.get(key)[valueKey] = value;
      } else {
        unmatchedBySource[valueKey].push({ key, value });
        primaryMap.set(key, {
          EBVP_TOP_NODE: obj.EBVP_TOP_NODE,
          EBVP_TOP_NODE_2: obj.EBVP_TOP_NODE_2,
          EBVP_TOP_NODE_3: obj.EBVP_TOP_NODE_3,
          [valueKey]: value,
          is_not_found: true
        });
      }
    }
  }

  // Before totals
  console.log(`🔹 Before Merge Totals:`);
  console.log(`   - ${primaryKey}:`, sumColumn(primaryArray, primaryKey));
  for (const { array, valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(array, valueKey));
  }

  const merged = Array.from(primaryMap.values());

  // After totals
  console.log(`🔸 After Merge Totals:`);
  console.log(`   - ${primaryKey}:`, sumColumn(merged, primaryKey));
  for (const { valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(merged, valueKey));
  }

  // Log missing keys
  for (const [key, items] of Object.entries(unmatchedBySource)) {
    if (items.length) {
      console.warn(`⚠️ Items in "${key}" not found in primaryArray:`);
      for (const item of items) {
        console.warn(`   - ${item.key}: ${item.value}`);
      }
    }
  }

  return merged;
}