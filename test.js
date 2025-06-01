function getMondayFromWorkWeek(workWeekStr) {
  const match = workWeekStr.match(/ww(\d{2})(\d{2})/i);
  if (!match) return null;

  const week = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10); // e.g., 25 -> 2025

  // Set date to the first day of the year
  const firstJan = new Date(year, 0, 1);
  const dayOfWeek = firstJan.getDay(); // 0 (Sun) to 6 (Sat)
  const dayOffset = (dayOfWeek <= 4 ? dayOfWeek - 1 : dayOfWeek - 8); // Shift to Monday
  const firstMonday = new Date(firstJan);
  firstMonday.setDate(firstJan.getDate() - dayOffset);

  // Add weeks
  const targetMonday = new Date(firstMonday);
  targetMonday.setDate(firstMonday.getDate() + (week - 1) * 7);

  return targetMonday.toISOString().split('T')[0]; // Return YYYY-MM-DD
}