const setChartsData = (data) => {
  if (!data?.length) return;

  // Grouping by JOB_POSTING_COUNTRY and counting
  const countryCountsMap = data.reduce((acc, item) => {
    const country = item.JOB_POSTING_COUNTRY;
    if (country) {
      acc[country] = (acc[country] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to array format expected by pie chart
  const countryCountsArray = Object.entries(countryCountsMap).map(([country, count]) => ({
    country,
    count,
  }));

  console.log("✅ Pie Data:", countryCountsArray);
  setPieChartData(countryCountsArray); // This updates the prop in ActivelyRecruitingPieChart
};