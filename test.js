function handleChartData(data, ebvpField, ebvpValue) {
  if (!Array.isArray(data)) return [];

  // Step 1: Optional EBVP filter
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Step 2: Aggregate by WEEK_NUM
  const weeklyMap = new Map();

  for (const item of filteredData) {
    const week = item.WEEK_NUM;
    if (!weeklyMap.has(week)) {
      weeklyMap.set(week, {
        week,
        hc: 0,
        offer: 0,
        attrition: 0,
        ytdAttrition: 0
      });
    }

    const weekData = weeklyMap.get(week);
    weekData.hc += Number(item.HC || 0);
    weekData.offer += Number(item.OFFERS || 0);
    weekData.attrition += Number(item.TERMINATIONS || 0);
  }

  // Step 3: Sort and calculate YTD Attrition
  const sorted = Array.from(weeklyMap.values()).sort((a, b) =>
    a.week.localeCompare(b.week)
  );

  let totalAttrition = 0;
  for (const row of sorted) {
    totalAttrition += row.attrition;
    row.ytdAttrition = totalAttrition;
  }

  return sorted;
}