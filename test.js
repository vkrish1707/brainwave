label: {
  enabled: true,
  fontWeight: "bold",
  formatter: ({ datum, index, series }) => {
    const lastIndex = series.processedData?.data?.length - 1;
    return index === lastIndex ? datum.ytdAttrition.toFixed(0) : '';
  },
  placement: 'top',
}