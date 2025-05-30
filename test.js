const setReportsData = (data, selectedNode = null) => {
  if (!Array.isArray(data)) return [];

  // Choose group key: if selectedNode exists, use EBVP_TOP_NODE_2 else use EBVP_TOP_NODE
  const groupKey = selectedNode ? "EBVP_TOP_NODE_2" : "EBVP_TOP_NODE";

  const groupedMap = new Map();

  data.forEach((item) => {
    const topNode = item[groupKey];
    const vp = item.VP;
    const q2HC = Number(item.Q2_TO_DATE_HC || 0);

    if (!groupedMap.has(topNode)) {
      groupedMap.set(topNode, new Map());
    }

    const vpMap = groupedMap.get(topNode);

    if (!vpMap.has(vp)) {
      vpMap.set(vp, { ebvpNode: topNode, vpName: vp, q2HC: 0 });
    }

    vpMap.get(vp).q2HC += q2HC;
  });

  // Flatten the result for AG Grid
  const result = [];
  groupedMap.forEach((vpMap, topNode) => {
    vpMap.forEach((vpData) => {
      result.push(vpData);
    });
  });

  return result;
};