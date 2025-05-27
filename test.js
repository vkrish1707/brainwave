const setChartsData = (data, ebvpField = '', ebvpValue = '') => {
  if (!data?.length) return;

  let groupByField = 'EBVP_TOP_NODE'; // default
  let filteredData = data;

  // If a field and value are given, filter first
  if (ebvpField && ebvpValue) {
    filteredData = data.filter(item => item[ebvpField] === ebvpValue);

    // Decide what to group by next
    if (ebvpField === 'EBVP_TOP_NODE') groupByField = 'EBVP_TOP_NODE_2';
    else if (ebvpField === 'EBVP_TOP_NODE_2') groupByField = 'EBVP_TOP_NODE_3';
  }

  // Grouping logic
  const groupedMap = filteredData.reduce((acc, item) => {
    const key = item[groupByField];
    if (!key) return acc;

    if (!acc[key]) {
      acc[key] = { label: key, hires: 0, terminations: 0 };
    }

    acc[key].hires += item.hires || 0;
    acc[key].terminations += item.terminations || 0;

    return acc;
  }, {});

  const chartData = Object.values(groupedMap);

  console.log('🚀 Chart Data:', chartData);
  setHireTermChartData(chartData); // your state handler
};
