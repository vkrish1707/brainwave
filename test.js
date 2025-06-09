const parseWeek = (wwStr) => parseInt(wwStr.replace('WW', ''), 10);
const paddedData = fullWeeks.map(week => {
  const isLast = week === workWeekDetails.currentWorkWeek;
  const data = weekMap.get(week) || {
    week,
    hc: null,
    offer: null,
    attrition: null,
    ytdAttrition: null,
    ytdOffers: null,
  };

  const weekNum = parseWeek(week);
  let aopTarget = null;

  if (weekNum >= 125 && weekNum <= 1325) {
    aopTarget = targetData.Q1_target;
  } else if (weekNum >= 1425 && weekNum <= 2625) {
    aopTarget = targetData.Q2_target;
  } else if (weekNum >= 2725 && weekNum <= 3925) {
    aopTarget = targetData.Q3_target;
  } else if (weekNum >= 4025 && weekNum <= 5225) {
    aopTarget = targetData.Q4_target;
  }

  return {
    ...data,
    aopTarget,
    showLabel: isLast,
  };
});

{
  type: 'line',
  xKey: 'week',
  yKey: 'aopTarget',
  yName: 'AOP Target',
  stroke: 'orange',
  strokeWidth: 2,
  lineDash: [6, 4],
  marker: { enabled: false },
  connectMissingData: true,
  yAxisKey: 'leftAxis',
  label: {
    enabled: true,
    fontWeight: 'bold',
    formatter: ({ datum }) => datum.showLabel ? `AOP ${datum.aopTarget}` : '',
    placement: 'top',
  }
}
