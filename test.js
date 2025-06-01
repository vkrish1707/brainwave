const handleReportsData = (data, ebvpField, ebvpValue) => {
  if (!Array.isArray(data)) return [];

  const filteredData = (ebvpField && ebvpValue)
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  const groupedMap = new Map();

  filteredData.forEach(item => {
    const key = `${item.EBVP_TOP_NODE}||${item.EBVP_TOP_NODE_2}||${item.EBVP_TOP_NODE_3}`;

    const q2HC = Number(item.Q2_TO_DATE_HC || 0);
    const hired = Number(item.HIRED_BY_Q2 || 0);
    const openReqs = Number(item.OPEN_REQS_AFTER_Q2 || 0);
    const target = Number(item.target || 0);

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        ebvpTopNode: item.EBVP_TOP_NODE,
        ebvpTopNode2: item.EBVP_TOP_NODE_2,
        ebvpTopNode3: item.EBVP_TOP_NODE_3,
        q2HC: 0,
        hiredByQ2: 0,
        openReqsAfterQ2: 0,
        target: 0
      });
    }

    const group = groupedMap.get(key);
    group.q2HC += q2HC;
    group.hiredByQ2 += hired;
    group.openReqsAfterQ2 += openReqs;
    group.target += target;
  });

  return Array.from(groupedMap.values());
};