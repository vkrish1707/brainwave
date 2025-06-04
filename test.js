function handleChartData(data, ebvpField, ebvpValue, pbaTargets = []) {
  if (!Array.isArray(data)) return [];

  // Step 1: Optional EBVP filtering
  const filteredData = ebvpField && ebvpValue
    ? data.filter(item => item[ebvpField] === ebvpValue)
    : data;

  const filteredPBAs = ebvpField && ebvpValue
    ? pbaTargets.filter(item => item[ebvpField] === ebvpValue)
    : pbaTargets;

  // Step 2: Compute cumulative targets for Q1–Q4
  const targetTotals = filteredPBAs.reduce((acc, item) => {
    acc.Q1_target += Number(item.Q1_target || 0);
    acc.Q2_target += Number(item.Q2_target || 0);
    acc.Q3_target += Number(item.Q3_target || 0);
    acc.Q4_target += Number(item.Q4_target || 0);
    return acc;
  }, { Q1_target: 0, Q2_target: 0, Q3_target: 0, Q4_target: 0 });

  console.log('🎯 Cumulative Targets:', targetTotals);

  // Continue with your weekly map logic
  const weeklyMap = new Map();
  for (const item of filteredData) {
    const week = item.WEEK_NUM;
    if (!week) continue;

    if (!weeklyMap.has(week)) {
      weeklyMap.set(week, {
        week,
        hc: 0,
        offer: 0,
        attrition: 0,
        ytdAttrition: 0,
        ytdOffers: 0,
      });
    }

    const weekData = weeklyMap.get(week);
    weekData.hc += Number(item.HC || 0);
    weekData.offer += Number(item.OFFERS || 0);
    weekData.attrition += Number(item.TERMINATIONS || 0);
  }

  const sorted = Array.from(weeklyMap.values()).sort((a, b) =>
    (a.week || '').localeCompare(b.week || '')
  );

  let totalAttrition = 0;
  let totalOffers = 0;

  for (const row of sorted) {
    totalAttrition += row.attrition;
    totalOffers += row.offer;
    row.ytdAttrition = totalAttrition;
    row.ytdOffers = totalOffers;
  }

  // Optional: You can return targetTotals alongside sorted
  return { sorted, targetTotals };
}