function mergeEBVPArrays(primaryArray, additionalSources) {
  const getKey = (obj, level = 3) =>
    level === 3
      ? `${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}|${obj.EBVP_TOP_NODE_3}`
      : `${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}`;

  const getSafeValue = (obj, key) => obj && obj[key] != null ? Number(obj[key]) : 0;

  const sumColumn = (arr, col) => arr.reduce((acc, obj) => acc + getSafeValue(obj, col), 0);

  console.log("🔹 Before Merge Totals:");
  console.log("   - HIRED_Q2:", sumColumn(primaryArray, 'HIRED_Q2'));
  for (const { valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(primaryArray, valueKey));
  }

  // Prepare source maps for all additional sources
  const sourceMaps = additionalSources.map(({ array, valueKey }) => {
    return {
      valueKey,
      map3: Object.fromEntries(array.map(obj => [getKey(obj), obj])),
      map2: Object.fromEntries(array.map(obj => [getKey(obj, 2), obj])),
      usedFallbacks: new Set(), // 🛡️ Add this to prevent reuse
    };
  });

  const merged = primaryArray.map(item => {
    const key3 = getKey(item);
    const key2 = getKey(item, 2);

    const result = { ...item };

    for (const { valueKey, map3, map2, usedFallbacks } of sourceMaps) {
      let match = map3[key3];
      if (!match && map2[key2] && !usedFallbacks.has(key2)) {
        match = map2[key2];
        usedFallbacks.add(key2); // ✅ Mark fallback used
      }

      result[valueKey] = getSafeValue(match, valueKey);
    }

    return result;
  });

  console.log("🔸 After Merge Totals:");
  console.log("   - HIRED_Q2:", sumColumn(merged, 'HIRED_Q2'));
  for (const { valueKey } of additionalSources) {
    console.log(`   - ${valueKey}:`, sumColumn(merged, valueKey));
  }

  return merged;
}