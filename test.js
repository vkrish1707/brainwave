const options = {
  data: reportData,
  series: [...],
  axes: [...],
  annotations: [
    {
      type: 'line',
      axis: 'x',
      value: 'WW20',
      stroke: 'cyan',
      strokeWidth: 2,
      lineDash: [4, 4],
      label: {
        text: 'WW20',
        fontSize: 14,
        color: 'cyan',
        position: 'top',
      },
    },
  ],
};