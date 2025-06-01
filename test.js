function mergeMainWithTargets(mainArray, targetArray) {
  const groupMap = new Map();

  // Step 1: Group and aggregate main data
  for (const item of mainArray) {
    const node1 = item.EBVP_TOP_NODE || '';
    const node2 = item.EBVP_TOP_NODE_2 || '';
    const node3 = item.EBVP_TOP_NODE_3 ?? ''; // Keep empty string if null
    const key = `${node1}||${node2}||${node3}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        EBVP_TOP_NODE: node1,
        EBVP_TOP_NODE_2: node2,
        EBVP_TOP_NODE_3: node3,
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

  // Step 2: Merge targets from targetArray — fallback on 2-node match if 3-node fails
  for (const target of targetArray) {
    const node1 = target.EBVP_TOP_NODE || '';
    const node2 = target.EBVP_TOP_NODE_2 || '';
    const node3 = target.EBVP_TOP_NODE_3 ?? '';
    const fullKey = `${node1}||${node2}||${node3}`;
    const fallbackKey = `${node1}||${node2}||`;

    let group = groupMap.get(fullKey);

    if (!group && node3 === '') {
      // fallback to 2-node match only when node3 is missing/null
      for (const [key, value] of groupMap.entries()) {
        if (key.startsWith(fallbackKey)) {
          group = value;
          break;
        }
      }
    }

    if (group) {
      group.target += Number(target.target || 0);
    } else {
      console.warn('⚠️ No match found for target', target);
    }
  }

  return Array.from(groupMap.values());
}