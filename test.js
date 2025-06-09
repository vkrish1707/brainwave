tooltip: {
  renderer: ({ datum, yKey }) => ({
    title: datum.week,
    content: `${yKey === 'ytdOffers' ? 'Gross hiring' : 'Gross attrition'}: ${datum[yKey]}`,
  }),
},