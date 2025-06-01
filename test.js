// Step 2: Apply targets with fallback for null TOP_NODE_3
for (const target of targetArray) {
  const node3Part = target.EBVP_TOP_NODE_3 ?? '';
  const fullKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||${node3Part}`;
  const fallbackKey = `${target.EBVP_TOP_NODE}||${target.EBVP_TOP_NODE_2}||`;

  let group = groupMap.get(fullKey);

  if (!group && target.EBVP_TOP_NODE_3 === null) {
    group = groupMap.get(fallbackKey); // fallback if node3 is explicitly null
  }

  if (group) {
    group.target += Number(target.target || 0);
  }
}