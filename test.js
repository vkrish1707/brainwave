// ✅ Utility Function: getWeeklyMondayMapUntil(workWeekStr)
function getWeeklyMondayMapUntil(workWeekStr) {
  const match = workWeekStr.match(/^WW(\d{2})(\d{2})$/);
  if (!match) return null;

  const targetWeek = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);

  const pad = (num) => String(num).padStart(2, '0');
  const format = (d) => d.toISOString().split('T')[0];

  function getMonday(week, year) {
    const jan1 = new Date(year, 0, 1);
    const jan1Day = jan1.getDay();
    const offset = (jan1Day <= 4 ? jan1Day - 1 : jan1Day - 8);
    const monday = new Date(jan1);
    monday.setDate(jan1.getDate() - offset + (week - 1) * 7);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  const map = {};
  for (let week = 1; week <= targetWeek; week++) {
    const key = `WW${pad(week)}${String(year).slice(-2)}`;
    const monday = getMonday(week, year);
    map[key] = format(monday);
  }

  return map;
}

SELECT
  EBVP_TOP_NODE,
  EBVP_TOP_NODE_2,
  EBVP_TOP_NODE_3,
  WEEK_NUM,
  SUM(
    CASE
      WHEN
        ACTUAL_START_DATE <= '<MAX_DATE>' AND
        ACTUAL_START_DATE >= '<MIN_DATE>' AND
        STATUS IN ('Future Hire', 'On Hold', 'Opened', 'Pending Approval')
      THEN 1
      WHEN
        ACTUAL_START_DATE = WEEK_MONDAY AND
        STATUS = 'Closed'
      THEN 1
      ELSE 0
    END
  ) AS HIRED_BY_QTD
FROM Global_requisitions
GROUP BY EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3, WEEK_NUM
ORDER BY WEEK_NUM;

function enrichWithMondayMapping(sqlResults, weekMondayMap) {
  return sqlResults.map(row => {
    const week = row.WEEK_NUM;
    const monday = weekMondayMap[week];

    return {
      ...row,
      week,
      monday,
      minQuarterStartDate: getQuarterStartDateForWeek(week, weekMondayMap),
      maxQuarterEndDate: getQuarterEndDateForWeek(week, weekMondayMap),
    };
  });
}

function getQuarterStartDateForWeek(weekStr, weekMondayMap) {
  const week = parseInt(weekStr.slice(2, 4), 10); // from 'WW1925' get '19'
  if (week <= 13) return getMinMonday(1, 13, weekMondayMap);
  if (week <= 26) return getMinMonday(14, 26, weekMondayMap);
  if (week <= 39) return getMinMonday(27, 39, weekMondayMap);
  return getMinMonday(40, 52, weekMondayMap);
}

function getQuarterEndDateForWeek(weekStr, weekMondayMap) {
  const week = parseInt(weekStr.slice(2, 4), 10);
  if (week <= 13) return getMaxMonday(1, 13, weekMondayMap);
  if (week <= 26) return getMaxMonday(14, 26, weekMondayMap);
  if (week <= 39) return getMaxMonday(27, 39, weekMondayMap);
  return getMaxMonday(40, 52, weekMondayMap);
}

function getMinMonday(start, end, map) {
  for (let i = start; i <= end; i++) {
    const w = `WW${String(i).padStart(2, '0')}25`;
    if (map[w]) return map[w];
  }
  return null;
}

function getMaxMonday(start, end, map) {
  for (let i = end; i >= start; i--) {
    const w = `WW${String(i).padStart(2, '0')}25`;
    if (map[w]) return map[w];
  }
  return null;
}