function extractUniqueTopNodes(dataArray) {
  const result = {
    EBVPTopNode: new Set(),
    EBVPTopNode2: new Set(),
    EBVPTopNode3: new Set()
  };

  for (const item of dataArray) {
    if (item.EBVPTopNode) result.EBVPTopNode.add(item.EBVPTopNode);
    if (item.EBVPTopNode2) result.EBVPTopNode2.add(item.EBVPTopNode2);
    if (item.EBVPTopNode3) result.EBVPTopNode3.add(item.EBVPTopNode3);
  }

  return {
    EBVPTopNode: Array.from(result.EBVPTopNode),
    EBVPTopNode2: Array.from(result.EBVPTopNode2),
    EBVPTopNode3: Array.from(result.EBVPTopNode3)
  };
}