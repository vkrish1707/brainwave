function filterZeroKeyRows(array, key1, key2) {
  if (!Array.isArray(array)) return [];

  return array.filter(item => {
    const val1 = item[key1] || 0;
    const val2 = item[key2] || 0;
    return val1 !== 0 || val2 !== 0;
  });
}