function handleChartData(data, ebvpField, ebvpValue) {
  if (!Array.isArray(data)) return [];

  // Optional filtering based on selected EBVP level and value
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Grouping result map
  const weekMap = new Map();

  filteredData.forEach(item => {
    const week = item.WEEK_NUM;

    if (!weekMap.has(week)) {
      weekMap.set(week, {
        week,
        hc: 0,
        offer: 0,
        attrition: 0,
        ytdAttrition: 0
      });
    }

    const entry = weekMap.get(week);
    entry.hc += Number(item.HC || 0);
    entry.offer += Number(item.OFFERS || 0);
    entry.attrition += Number(item.TERMINATIONS || 0);
  });

  // Convert map to array and calculate YTD attrition cumulatively
  const sortedWeeks = Array.from(weekMap.values()).sort((a, b) =>
    a.week.localeCompare(b.week)
  );

  let cumulativeAttrition = 0;
  for (const row of sortedWeeks) {
    cumulativeAttrition += row.attrition;
    row.ytdAttrition = cumulativeAttrition;
  }

  return sortedWeeks;
}