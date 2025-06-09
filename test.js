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

  // Assign aopTarget per quarter
  let aopTarget = null;
  if (week >= 'WW0125' && week <= 'WW1325') {
    aopTarget = targetData.Q1_target;
  } else if (week >= 'WW1425' && week <= 'WW2625') {
    aopTarget = targetData.Q2_target;
  } else if (week >= 'WW2725' && week <= 'WW3925') {
    aopTarget = targetData.Q3_target;
  } else if (week >= 'WW4025' && week <= 'WW5225') {
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
