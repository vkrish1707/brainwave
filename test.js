const weekData = sorted.at(-1);  // Last element (most recent week)
const previousWeekData = sorted.at(-2);  // Second-last element (previous week)

const weekToFind = weekData?.week || '';
const previousWeek = previousWeekData?.week || '';