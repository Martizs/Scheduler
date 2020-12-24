// SEL DAY ACTIONS
export const SET_SEL_DAY = 'SET_SEL_DAY';

export function setSelDay(selDay) {
  return { type: SET_SEL_DAY, selDay };
}

export const SET_SEL_SPEC_DAY = 'SET_SEL_SPEC_DAY';
export function setSelSpecDay(specDay) {
  return { type: SET_SEL_SPEC_DAY, specDay };
}

export const SET_SEL_MONTH = 'SET_SEL_MONTH';
export function setSelMonth(selMonth) {
  return { type: SET_SEL_MONTH, selMonth };
}

export const SET_SEL_YEAR = 'SET_SEL_YEAR';
export function setSelYear(selYear) {
  return { type: SET_SEL_YEAR, selYear };
}

// CAL DAYS ACTIONS
export const SET_CAL_DAYS = 'SET_CAL_DAYS';
export function setCalDays(calDays, mainMonth, mainYear) {
  return { type: SET_CAL_DAYS, items: { calDays, mainMonth, mainYear } };
}
