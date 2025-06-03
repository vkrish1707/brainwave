function mergeEBVPArrays(primaryArray, primaryKey, additionalSources = []) {
  const getKey = (obj) =>
    `${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}|${obj.EBVP_TOP_NODE_3 ?? ''}`;

  const getSafeValue = (obj, key) =>
    obj && obj[key] != null ? Number(obj[key]) : 0;

  const sumColumn = (arr, col) =>
    arr.reduce((acc, obj) => acc + getSafeValue(obj, col), 0);

  // 🔹 Before Merge Totals
  console.log("🔹 Before Merge Totals:");
  console.log(`   - ${primaryKey}:`, sumColumn(primaryArray, primaryKey));
  for (const { array, valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(array, valueKey));
  }

  // 🔁 Build lookup maps for each additional source
  const sourceMaps = additionalSources.map(({ array }) =>
    Object.fromEntries(array.map(obj => [getKey(obj), obj]))
  );

  // 🔄 Merge logic
  const merged = primaryArray.map(item => {
    const key = getKey(item);
    const result = { ...item };

    for (let i = 0; i < additionalSources.length; i++) {
      const { valueKey } = additionalSources[i];
      const match = sourceMaps[i][key];
      result[valueKey] = getSafeValue(match, valueKey);
    }

    return result;
  });

  // 🔸 After Merge Totals
  console.log("🔸 After Merge Totals:");
  console.log(`   - ${primaryKey}:`, sumColumn(merged, primaryKey));
  for (const { valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(merged, valueKey));
  }

  return merged;
}