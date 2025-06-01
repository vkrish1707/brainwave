function mergeMainWithTargets(mainArray, targetArray) {
  const groupMap = new Map();

  // Step 1: Group main data
  for (const item of mainArray) {
    const key = `${item.EBVP_TOP_NODE}||${item.EBVP_TOP_NODE_2}`;
    
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3 || null,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        target: 0,
        vpDetails: [],
      });
    }

    const group = groupMap.get(key);
    group.q2HC += Number(item.Q2_TO_DATE_HC || 0);
    group.hiredByQ2 += Number(item.HIRED_BY_Q2 || 0);
    group.openReqsAfterQ2 += Number(item.OPEN_REQS_AFTER_Q2 || 0);

    if (item.VP) {
      group.vpDetails.push({
        vpName: item.VP,
        q2HC: Number(item.Q2_TO_DATE_HC || 0),
        hiredByQ2: Number(item.HIRED_BY_Q2 || 0),
        openReqsAfterQ2: Number(item.OPEN_REQS_AFTER_Q2 || 0),
      });
    }
  }

  // Step 2: Apply targets — using fallback on 2-node match
  for (const target of targetArray) {
    const fullKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}`;
    const group = groupMap.get(fullKey);
    if (group) {
      group.target += Number(target.target || 0);
    }
  }

  return Array.from(groupMap.values());
}