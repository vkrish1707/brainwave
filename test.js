const handleTableData = (data, ebvpField, ebvpValue) => {
  if (!data?.length) {
    setTableData([]);
    return;
  }

  // Step 1: Filter by EBVP level if selected
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Step 2: Define default grouping field
  let groupByField = "EBVP_TOP_NODE";
  if (ebvpField === "EBVP_TOP_NODE_2") groupByField = "EBVP_TOP_NODE_2";
  else if (ebvpField === "EBVP_TOP_NODE_3") groupByField = "EBVP_TOP_NODE_3";

  // Step 3: Aggregate status counts per EBVP node
  const groupedMap = filteredData.reduce((acc, item) => {
    const key = item[groupByField];
    const status = item.APPLICATION_STATUS;

    if (!key) return acc;

    if (!acc[key]) {
      acc[key] = {
        node: key,
        pendingApproval: 0,
        activelyRecruiting: 0,
        offersInProgress: 0,
        onboarding: 0,
        closedHired: 0,
        grandTotal: 0
      };
    }

    // Count logic
    if (status === 'Offer Pending Approval') acc[key].pendingApproval += 1;
    if (status === 'Offer Extended') acc[key].activelyRecruiting += 1;
    if (status === 'Offer Approved') acc[key].offersInProgress += 1;
    if (status === 'Onboarding' || status === '') acc[key].onboarding += 1;
    if (status === 'Hired') acc[key].closedHired += 1;

    acc[key].grandTotal += 1;

    return acc;
  }, {});

  // Step 4: Convert to array and sort
  const groupedArray = Object.values(groupedMap).sort(
    (a, b) => b.grandTotal - a.grandTotal
  );

  setTableData(groupedArray);
};