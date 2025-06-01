// Updated handleReportsData function
const handleReportsData = (data, ebvpField, ebvpValue) => {
  if (!Array.isArray(data)) return [];

  // Filter based on selected EBVP level and value
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Determine grouping field
  let groupByField = "EBVP_TOP_NODE"; // default
  if (ebvpField === "EBVP_TOP_NODE") groupByField = "EBVP_TOP_NODE_2";
  if (ebvpField === "EBVP_TOP_NODE_2") groupByField = "EBVP_TOP_NODE_3";

  // Aggregate based on grouping field
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
        vpDetails: []
      });
    }

    const agg = groupedMap.get(groupKey);
    agg.q2HC += Number(item.Q2_TO_DATE_HC || 0);
    agg.hiredByQ2 += Number(item.HIRED_BY_Q2 || 0);
    agg.openReqsAfterQ2 += Number(item.OPEN_REQS_AFTER_Q2 || 0);
    agg.target = item.target !== undefined ? item.target : agg.target;

    if (item.VP) {
      agg.vpDetails.push({
        vpName: item.VP,
        q2HC: Number(item.Q2_TO_DATE_HC || 0),
        hiredByQ2: Number(item.HIRED_BY_Q2 || 0),
        openReqsAfterQ2: Number(item.OPEN_REQS_AFTER_Q2 || 0)
      });
    }
  });

  // Convert Map to array
  const result = Array.from(groupedMap.values());
  setRowData(result);
};