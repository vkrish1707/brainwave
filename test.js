const createAopSeries = (label, startWeek, endWeek, yValue, color = 'orange') => {
  const startIndex = fullWeeks.indexOf(startWeek);
  const endIndex = fullWeeks.indexOf(endWeek);
  const data = fullWeeks
    .slice(startIndex, endIndex + 1)
    .map(week => ({ week, value: yValue }));

  return {
    type: 'line',
    xKey: 'week',
    yKey: 'value',
    yName: label,
    stroke: color,
    strokeWidth: 2,
    lineDash: [6, 4], // dashed line
    data,
    marker: { enabled: false },
    yAxisKey: 'leftAxis',
    tooltip: { enabled: false },
    label: {
      enabled: true,
      fontWeight: 'bold',
      formatter: ({ datum }) => (datum.week === endWeek ? `${label} ${yValue}` : ''),
      placement: 'top',
    }
  };
};

const chartOptions = {
  height: 800,
  theme: 'ag-default-dark',
  background: { fill: '#000000' },
  title: {
    text: `${ebvpValue} AOP Attainment Summary`,
    fontSize: 18,
    color: 'white',
  },
  zoom: {
    anchorPointX: 'pointer',
    anchorPointY: 'pointer',
  },
  dataSource: {
    getData: () => {
      return new Promise((resolve) => {
        if (dataLoading) return;
        resolve(paddedData);
      });
    },
  },
  series: [
    {
      type: 'line',
      xKey: 'week',
      yKey: 'hc',
      yName: 'Head Count',
      stroke: '#00BFFF',
      marker: { enabled: true },
      yAxisKey: 'leftAxis',
      connectMissingData: true,
      label: {
        enabled: true,
        fontWeight: 'bold',
        formatter: ({ datum }) => datum.showLabel ? datum.hc?.toString() : '',
        placement: 'right',
      },
    },
    {
      type: 'line',
      xKey: 'week',
      yKey: 'ytdOffers',
      yName: 'Gross hiring',
      stroke: 'green',
      connectMissingData: true,
      marker: {
        fill: 'orange',
        size: 10,
        stroke: 'black',
        strokeWidth: 3,
      },
      yAxisKey: 'rightAxis',
      label: {
        enabled: true,
        fontWeight: 'bold',
        formatter: ({ datum }) => datum.showLabel ? datum.ytdOffers?.toString() : '',
        placement: 'top',
      },
    },
    // Flat AOP lines added here:
    createAopSeries('Q1 AOP', 'WW0125', 'WW1325', targetData.Q1_target),
    createAopSeries('Q2 AOP', 'WW1425', 'WW2625', targetData.Q2_target),
    createAopSeries('Q3 AOP', 'WW2725', 'WW3925', targetData.Q3_target),
  ],
};