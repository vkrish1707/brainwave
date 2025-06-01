function mergeWithTarget(mainArray, targetArray) {
  // Create a lookup map from the targetArray
  const targetMap = new Map();

  targetArray.forEach(item => {
    const key = `${item.EBVP_TOP_NODE}|${item.EBVP_TOP_NODE_2}|${item.EBVP_TOP_NODE_3}`;
    targetMap.set(key, item.target);
  });

  // Merge into mainArray
  return mainArray.map(obj => {
    const key = `${obj.EBVP_TOP_NODE}|${obj.EBVP_TOP_NODE_2}|${obj.EBVP_TOP_NODE_3}`;
    const target = targetMap.get(key) || 0;
    return { ...obj, target };
  });
}