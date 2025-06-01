function mergeWithTargets(mainArray, targetArray) {
  const targetMap = new Map();

  // Build key and assign target only once
  targetArray.forEach(item => {
    const key = `${item.EBVP_TOP_NODE}~${item.EBVP_TOP_NODE_2}~${item.EBVP_TOP_NODE_3}`;
    targetMap.set(key, item.target);
  });

  const seenKeys = new Set();

  return mainArray.map(obj => {
    const key = `${obj.EBVP_TOP_NODE}~${obj.EBVP_TOP_NODE_2}~${obj.EBVP_TOP_NODE_3}`;
    
    // Only assign target once per unique EBVP group
    const target = !seenKeys.has(key) ? (targetMap.get(key) || 0) : undefined;

    seenKeys.add(key);
    return { ...obj, target };
  });
}