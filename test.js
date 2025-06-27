series: [
  ...yourOtherSeries,
  {
    type: 'line',
    data: [
      { x: 'WW2225', y: 0 },
      { x: 'WW2225', y: 100000 } // large enough to span the chart
    ],
    xKey: 'x',
    yKey: 'y',
    stroke: 'white',
    strokeWidth: 2,
    marker: { enabled: false },
    tooltip: { enabled: false },
    legendItemName: '',  // hide from legend
    highlightStyle: { item: { fill: 'none', stroke: 'none' } }
  }
]