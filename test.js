const handleReportsData = (data, ebvpField, ebvpValue) => {
  if (!Array.isArray(data)) return [];

  const filteredData = (ebvpField && ebvpValue)
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  let groupByField = "EBVP_TOP_NODE";
  if (ebvpField === "EBVP_TOP_NODE") groupByField = "EBVP_TOP_NODE_2";
  if (ebvpField === "EBVP_TOP_NODE_2") groupByField = "EBVP_TOP_NODE_3";

  const groupedMap = new Map();

  filteredData.forEach(item => {
    const groupKey = item[groupByField];

    if (!groupedMap.has(groupKey)) {
      groupedMap.set(groupKey, {
        ebvpNode: item.EBVP_TOP_NODE,
        ebvpNode2: item.EBVP_TOP_NODE_2,
        ebvpNode3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        target: 0,
        vpNames: new Set() // Collect unique VP names
      });
    }

    const agg = groupedMap.get(groupKey);

    agg.q2HC += Number(item.Q2_TO_DATE_HC || 0);
    agg.hiredByQ2 += Number(item.HIRED_BY_Q2 || 0);
    agg.openReqsAfterQ2 += Number(item.OPEN_REQS_AFTER_Q2 || 0);
    agg.target += Number(item.target || 0);
    if (item.VP) {
      agg.vpNames.add(item.VP); // Track VP
    }
  });

  // Convert Set to Array for serialization/display
  const result = Array.from(groupedMap.values()).map(obj => ({
    ...obj,
    vpNames: Array.from(obj.vpNames) // optional: remove if not needed
  }));

  const rowSpannedData = transformForRowSpan(result);
  setRowData(rowSpannedData);
};