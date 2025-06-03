const year = '25';
const fullWeeks = Array.from({ length: 52 }, (_, i) => `WW${String(i + 1).padStart(2, '0')}${year}`);
const weekMap = new Map(reportData.map(item => [item.week, item]));

const paddedData = fullWeeks.map(week => {
  return weekMap.get(week) || {
    week,
    hc: null,
    offer: null,
    attrition: null,
    ytdAttrition: null,
  };
});