function mergeMainWithTargets(mainArray, targetArray) {
  const groupMap = new Map();

  // Step 1: Aggregate VPs under their EBVP node group
  for (const item of mainArray) {
    const key = `${item.EBVP_TOP_NODE}|${item.EBVP_TOP_NODE_2}|${item.EBVP_TOP_NODE_3}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        vpDetails: [],
      });
    }

    const group = groupMap.get(key);
    group.q2HC += Number(item.Q2_TO_DATE_HC || 0);
    group.hiredByQ2 += Number(item.HIRED_BY_Q2 || 0);
    group.openReqsAfterQ2 += Number(item.OPEN_REQS_AFTER_Q2 || 0);

    group.vpDetails.push({
      vpName: item.VP,
      q2HC: Number(item.Q2_TO_DATE_HC || 0),
      hiredByQ2: Number(item.HIRED_BY_Q2 || 0),
      openReqsAfterQ2: Number(item.OPEN_REQS_AFTER_Q2 || 0),
    });
  }

  // Step 2: Add targets to each grouped node
  for (const target of targetArray) {
    const key = `${target.EBVP_TOP_NODE}|${target.EBVP_TOP_NODE_2}|${target.EBVP_TOP_NODE_3}`;
    const group = groupMap.get(key);
    if (group) {
      group.target = Number(target.target || 0);
    }
  }

  return Array.from(groupMap.values());
}