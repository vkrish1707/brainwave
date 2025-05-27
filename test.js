const setChartsData = (data, ebvpField, ebvpValue, hireTermData = []) => {
  // Filter data by EBVP level if present
  const filteredHireTermData = ebvpField && ebvpValue
    ? hireTermData.filter((item) => item[ebvpField] === ebvpValue)
    : hireTermData;

  // Group by week
  const weekMap = {};

  for (const row of filteredHireTermData) {
    const week = row.week_num;
    if (!weekMap[week]) {
      weekMap[week] = { week, hires: 0, terminations: 0 };
    }
    weekMap[week].hires += row.hires;
    weekMap[week].terminations += row.terminations;
  }

  const scatterData = Object.values(weekMap);

  // Pass it to chart
  setScatterChartData(scatterData);
};
