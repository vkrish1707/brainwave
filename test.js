function calculateTargetTotalsByNode(targetArray) {
  const targetTotals = new Map();

  for (const item of targetArray) {
    const key = item.EBVP_TOP_NODE;

    const prev = targetTotals.get(key) || 0;
    const add = Number(item.target || 0);

    targetTotals.set(key, prev + add);
  }

  return targetTotals;
}

function mergeMainWithTargets(mainArray, targetArray) {
  const groupMap = new Map();

  // Step 1: Group & aggregate from main array
  for (const item of mainArray) {
    const key = `${item.EBVP_TOP_NODE}||${item.EBVP_TOP_NODE_2}||${item.EBVP_TOP_NODE_3}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        EBVP_TOP_NODE: item.EBVP_TOP_NODE,
        EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
        EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        vpDetails: [],
        target: 0,
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

  // Step 2: Merge targets using 3-node key (fallback to 2-node key if 3rd is missing)
  for (const target of targetArray) {
    const fullKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||${target.EBVP_TOP_NODE_3}`;
    const partialKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||null`;

    const group = groupMap.get(fullKey) || groupMap.get(partialKey);
    if (group) {
      group.target = Number(target.target || 0);
    }
  }

  return Array.from(groupMap.values());
}
function validateTargetTotals(groupedArray, originalTargetTotals) {
  const afterTotals = new Map();

  for (const item of groupedArray) {
    const key = item.EBVP_TOP_NODE;
    const prev = afterTotals.get(key) || 0;
    const current = Number(item.target || 0);

    afterTotals.set(key, prev + current);
  }

  for (const [key, expected] of originalTargetTotals.entries()) {
    const actual = afterTotals.get(key) || 0;
    if (expected !== actual) {
      console.warn(`❌ Mismatch in target for ${key} — Expected: ${expected}, Found: ${actual}`);
    } else {
      console.log(`✅ Target match for ${key}: ${actual}`);
    }
  }
}
const targetTotals = calculateTargetTotalsByNode(targetArray);
const merged = mergeMainWithTargets(mainArray, targetArray);
validateTargetTotals(merged, targetTotals);


