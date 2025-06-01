function sumTargetsByEBVPNode(data) {
  const result = {};

  data.forEach(item => {
    const node = item.EBVP_TOP_NODE;
    const target = Number(item.target);

    if (!Number.isFinite(target)) return; // Skip NaN targets

    if (!result[node]) {
      result[node] = 0;
    }

    result[node] += target;
  });

  return result;
}