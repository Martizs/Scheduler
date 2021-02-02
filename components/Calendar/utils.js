export function daysEqual(dayItem, selDay) {
  const { day, month, year } = selDay;
  return (
    dayItem.day === day && dayItem.month === month && dayItem.year === year
  );
}
