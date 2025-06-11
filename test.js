function filterZeroKeyRows(array, ...keys) {
  if (!Array.isArray(array)) return [];

  return array.filter(item => {
    const hasAnyNonZero = keys.some(key => Number(item[key] || 0) !== 0);
    return hasAnyNonZero;
  });
}