function handleChartData(data, ebvpField, ebvpValue) {
  if (!Array.isArray(data)) return [];

  // Step 1: Optional filter by EBVP level
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  // Step 2: Group by EBVP + WEEK_NUM to preserve uniqueness
  const groupMap = new Map();
  const getKey = (item) => 
    `${item.EBVP_TOP_NODE}|${item.EBVP_TOP_NODE_2}|${item.EBVP_TOP_NODE_3}|${item.WEEK_NUM}`;

  for (const item of filteredData) {
    const key = getKey(item);
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        week: item.WEEK_NUM,
        hc: 0,
        offer: 0,
        attrition: 0
      });
    }

    const group = groupMap.get(key);
    group.hc += Number(item.HC || 0);
    group.offer += Number(item.OFFERS || 0);
    group.attrition += Number(item.TERMINATIONS || 0);
  }

  // Step 3: Collapse all grouped keys to weekly totals
  const weekTotals = new Map();
  for (const group of groupMap.values()) {
    const week = group.week;
    if (!weekTotals.has(week)) {
      weekTotals.set(week, {
        week,
        hc: 0,
        offer: 0,
        attrition: 0,
        ytdAttrition: 0
      });
    }

    const weekData = weekTotals.get(week);
    weekData.hc += group.hc;
    weekData.offer += group.offer;
    weekData.attrition += group.attrition;
  }

  // Step 4: Sort and calculate YTD attrition
  const sortedWeeks = Array.from(weekTotals.values()).sort((a, b) =>
    a.week.localeCompare(b.week)
  );

  let cumulativeAttrition = 0;
  for (const row of sortedWeeks) {
    cumulativeAttrition += row.attrition;
    row.ytdAttrition = cumulativeAttrition;
  }

  return sortedWeeks;
}