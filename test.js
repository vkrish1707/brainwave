function mergeMainWithTargets(mainArray, targetArray) {
  const groupMap = new Map();

  // Step 1: Group and accumulate VP data
  for (const item of mainArray) {
    const key = `${item.EBVP_TOP_NODE}||${item.EBVP_TOP_NODE_2}||${item.EBVP_TOP_NODE_3 || ''}`;
    
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3 || null,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        target: 0,
        vpDetails: []
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
        openReqsAfterQ2: Number(item.OPEN_REQS_AFTER_Q2 || 0)
      });
    }
  }

  // Step 2: Add targets using best-effort fallback (node3 → node2 match)
  for (const target of targetArray) {
    const fullKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||${target.EBVP_TOP_NODE_3 || ''}`;
    const fallbackKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||`;

    let group = groupMap.get(fullKey);
    if (!group) {
      group = groupMap.get(fallbackKey);
    }

    if (group) {
      group.target += Number(target.target || 0);
    }
  }

  return Array.from(groupMap.values());
}