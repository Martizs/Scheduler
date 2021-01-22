/* consts */
import {
  befTypeObjects,
  repTypeDay,
  repTypeWeek,
} from '../../consts/dateConts';
// util function to set reminder name
// according to the data
export function getRemName(rem) {
  if (rem.sameTime === 0) {
    return 'On Time';
  }

  if (rem.sameTime === 1) {
    return `Same Day ${rem.selHour}:${rem.selMin}`;
  }

  let befString = `${rem.before.number} ${
    befTypeObjects[rem.before.type]
  } before`;

  if (
    rem.sameTime === 2 &&
    (rem.before.type === repTypeWeek || rem.before.type === repTypeDay)
  ) {
    befString += `, ${rem.selHour}:${rem.selMin}`;
  }

  return befString;
}
