function mergeWeeklyEBVPArrays(primaryArray, primaryKey, additionalSources = []) {
  const getKey = (obj) =>
    `${obj.WEEK_NUM}|${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}|${obj.EBVP_TOP_NODE_3 ?? ''}`;

  const getSafeValue = (obj, key) =>
    obj && obj[key] != null ? Number(obj[key]) : 0;

  const sumColumn = (arr, col) =>
    arr.reduce((acc, obj) => acc + getSafeValue(obj, col), 0);

  const primaryMap = new Map();

  // Track unmatched keys for logging
  const unmatchedBySource = {};

  for (const obj of primaryArray) {
    const key = getKey(obj);
    primaryMap.set(key, { ...obj });
  }

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
          WEEK_NUM: obj.WEEK_NUM,
          EBVP_TOP_NODE: obj.EBVP_TOP_NODE,
          EBVP_TOP_NODE_2: obj.EBVP_TOP_NODE_2,
          EBVP_TOP_NODE_3: obj.EBVP_TOP_NODE_3,
          [valueKey]: value,
          is_not_found: true
        });
      }
    }
  }

  // Logging before merge totals
  console.log(`🔹 Before Merge Totals:`);
  console.log(`   - ${primaryKey}:`, sumColumn(primaryArray, primaryKey));
  for (const { array, valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(array, valueKey));
  }

  const merged = Array.from(primaryMap.values());

  // Logging after merge totals
  console.log(`🔸 After Merge Totals:`);
  console.log(`   - ${primaryKey}:`, sumColumn(merged, primaryKey));
  for (const { valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(merged, valueKey));
  }

  // Log unmatched entries
  for (const [valueKey, items] of Object.entries(unmatchedBySource)) {
    if (items.length) {
      console.warn(`⚠️ Items in "${valueKey}" not found in primaryArray:`);
      items.forEach(({ key, value }) =>
        console.warn(`   - ${key}: ${value}`)
      );
    }
  }

  return merged;
}