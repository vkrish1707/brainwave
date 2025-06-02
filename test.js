function mergeMetrics(q2HCArray, hiredArray, openReqsArray) {
  const mergedMap = new Map();

  const buildKey = (item) =>
    `${item.EBVP_TOP_NODE}|${item.EBVP_TOP_NODE_2}|${item.EBVP_TOP_NODE_3 || ''}`;

  // Step 1: Insert Q2 HC
  for (const item of q2HCArray) {
    const key = buildKey(item);
    mergedMap.set(key, {
      EBVP_TOP_NODE: item.EBVP_TOP_NODE,
      EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
      EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
      q2HC: item.q2HC || 0,
      hiredByQ2: 0,
      openReqsAfterQ2: 0,
    });
  }

  // Step 2: Merge Hired
  for (const item of hiredArray) {
    const key = buildKey(item);
    if (!mergedMap.has(key)) {
      mergedMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: item.hiredByQ2 || 0,
        openReqsAfterQ2: 0,
      });
    } else {
      mergedMap.get(key).hiredByQ2 = item.hiredByQ2 || 0;
    }
  }

  // Step 3: Merge Open Reqs
  for (const item of openReqsArray) {
    const key = buildKey(item);
    if (!mergedMap.has(key)) {
      mergedMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: item.openReqsAfterQ2 || 0,
      });
    } else {
      mergedMap.get(key).openReqsAfterQ2 = item.openReqsAfterQ2 || 0;
    }
  }

  return Array.from(mergedMap.values());
}