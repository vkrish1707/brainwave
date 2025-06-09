const handleTableData = (data, ebvpField, ebvpValue) => {
  if (!data?.length) {
    setTableData([]);
    return;
  }

  // Step 1: Filter if EBVP filter is applied
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Step 2: Optional sort by Grand Total descending (optional)
  const sortedData = [...filteredData].sort(
    (a, b) => (b["Grand Total"] || 0) - (a["Grand Total"] || 0)
  );

  // Step 3: Set to state
  setTableData(sortedData);
};