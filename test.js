{
  type: 'number',
  position: 'left',
  nice: false,
  min: 0, // start Y-axis from 0
  interval: 1, // force integer steps
  tick: {
    count: 6, // optional: number of ticks (adjust if needed)
  },
  title: {
    text: 'Count',
    color: '#d1d5db'
  },
  label: {
    formatter: (params) => `${Math.floor(params.value)}`, // ensures no decimals
    color: '#d1d5db'
  }
}