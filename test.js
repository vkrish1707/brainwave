function getWorkWeekDetails(workWeekStr) {
  const match = workWeekStr.match(/^WW(\d{2})(\d{2})$/);
  if (!match) return null;

  const week = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);

  const pad = (num) => String(num).padStart(2, '0');
  const format = (d) => d.toISOString().split('T')[0];
  const getWorkWeekCode = (week, year) => `WW${pad(week)}${String(year).slice(-2)}`;

  function getMonday(week, year) {
    const jan1 = new Date(year, 0, 1);
    const jan1Day = jan1.getDay();
    const offset = (jan1Day <= 4 ? jan1Day - 1 : jan1Day - 8);
    const monday = new Date(jan1);
    monday.setDate(jan1.getDate() - offset + (week - 1) * 7);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  function getFriday(monday) {
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    return friday;
  }

  const quarterWeeks = {
    Q1: { start: 1, end: 13 },
    Q2: { start: 14, end: 26 },
    Q3: { start: 27, end: 39 },
    Q4: { start: 40, end: 52 }
  };

  const quarters = Object.keys(quarterWeeks);
  let currentQuarter = null;

  for (const [q, range] of Object.entries(quarterWeeks)) {
    if (week >= range.start && week <= range.end) {
      currentQuarter = q;
      break;
    }
  }

  const result = {
    year,
    workWeek: workWeekStr,
    currentWorkWeek: getWorkWeekCode(week, year),
    previousWorkWeek: getWorkWeekCode(Math.max(week - 1, 1), year),
    nextWorkWeek: getWorkWeekCode(Math.min(week + 1, 52), year),
    currentWeekMonday: format(getMonday(week, year)),
    previousWeekMonday: format(getMonday(Math.max(week - 1, 1), year)),
    nextWeekMonday: format(getMonday(Math.min(week + 1, 52), year)),
    currentQuarter,
    previousQuarter: (() => {
      const i = quarters.indexOf(currentQuarter);
      return i > 0 ? quarters[i - 1] : null;
    })(),
    nextQuarter: (() => {
      const i = quarters.indexOf(currentQuarter);
      return i < 3 ? quarters[i + 1] : null;
    })(),
  };

  // Add full quarter details including start/end weeks
  for (const q of quarters) {
    const { start, end } = quarterWeeks[q];
    result[q] = {
      start: format(getMonday(start, year)),
      end: format(getFriday(getMonday(end, year))),
      startWeek: getWorkWeekCode(start, year),
      endWeek: getWorkWeekCode(end, year),
    };
  }

  // Add PBA Target Category
  if (currentQuarter) {
    const quarterNumber = currentQuarter.replace('Q', '');
    result.pbaTargetCategory = `0000000${quarterNumber}${String(year).slice(-2)}`;
  }

  return result;
}