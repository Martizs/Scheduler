import Database from '../Database';
/* utils */
import find from 'lodash/find';
/* consts */
import { monthData, wDays } from '../consts/dateConts';
import { setCalDays, setSelDay } from '../redux/dates/actions';
import { dispatchDbCall } from '../database/helpers';
import { createRep } from '../database';

export function getMonthName(month) {
  const monName = find(monthData, ['value', month]);
  return monName ? monName.title : 'Not Found';
}

// Helper function to add 0 to the day or month
// if the length of it is 1
export function addZero(item) {
  // we turn it into string just in case
  const itemz = item + '';

  return itemz && itemz.length === 1 ? `0${itemz}` : itemz;
}

// helper function to form named date
// 'Today' 'this Wednesday' etc.
export function formNamedDate(year, month, day, alterName, adjDayName) {
  return new Promise((resolve, reject) => {
    if (year !== undefined && month !== undefined && day !== undefined) {
      Database.formatNamedDate(
        addZero(year),
        addZero(month + 1),
        addZero(day),
        !!adjDayName,
        !!alterName,
        (dateStr) => {
          resolve(dateStr);
        },
        (err) => {
          reject(`Date naming error ${err}`);
        }
      );
    } else {
      resolve('');
    }
  });
}

// util function to generate the day array for the
// calendar for the passed in month year
// or for the current month/year if none is passed in
export function genCalDays(mon, yea, forCurrMonth) {
  const items = [];

  let month = mon;
  let year = yea;

  let initToday = null;

  let keyIncr = 0;

  const date = new Date();
  const today = date.getDate();
  if (mon === undefined || yea === undefined) {
    month = date.getMonth();
    year = date.getFullYear();
  }
  const currMonth = date.getMonth() === month;
  const currYear = date.getFullYear() === year;

  let initDay = {};

  if (!forCurrMonth) {
    // first we push in the weekDays
    for (let i = 0; i < 7; i++) {
      items.push({
        key: wDays[i].key,
        title: wDays[i].key,
        opaque: true,
        weekDay: true,
      });
    }

    const firstDayDate = new Date(year, month, 1);

    // so here we push in the previous month days
    // form the previous month last monday as
    // first items of the day array
    if (firstDayDate.getDay() !== 1) {
      const prevDate = new Date(year, month);
      // so basically, set month works with indexes from 1 to 12
      // whereas new Date works with indexes from 0 to 11
      // fuking retarded Date shit
      prevDate.setMonth(month);
      prevDate.setDate(0);

      const prevMonthLastDay = prevDate.getDate();
      const prevMonthMonday = prevMonthLastDay - (prevDate.getDay() - 1);

      for (let i = prevMonthMonday; i < prevMonthLastDay + 1; i++) {
        items.push({
          key: keyIncr + '',
          title: i + '',
          opaque: true,
          today: false,
          year: prevDate.getFullYear(),
          month: prevDate.getMonth(),
          day: i,
        });
        keyIncr += 1;
      }
    }
  }

  const lastDayDate = new Date(year, month + 1, 0);
  const lastMonthDay = lastDayDate.getDate();

  // here we push the current months days
  for (let i = 1; i < lastMonthDay + 1; i++) {
    const isCurrent = currMonth && currYear;
    const item = {
      key: keyIncr + '',
      title: i + '',
      opaque: false,
      today: i === today && isCurrent,
      day: i,
      year,
      month,
    };
    if (isCurrent) {
      if (i === today) {
        initDay = item;
        initToday = item;
      }
    } else if (i === 1) {
      initDay = item;
    }

    items.push(item);
    keyIncr += 1;
  }

  if (forCurrMonth) {
    return items;
  }

  // and here we push the last remaining
  // days to fill our 42 day array
  const currLength = items.length;
  // we'll also want to store the next months
  // year and month to it as well
  const nextDate = new Date(year, month + 1);

  // we use 49 as we add in the weekdays to this
  // day generation
  for (let i = 1; i < 49 - currLength + 1; i++) {
    items.push({
      key: keyIncr + '',
      title: i + '',
      opaque: true,
      today: false,
      day: i,
      month: nextDate.getMonth(),
      year: nextDate.getFullYear(),
    });
    keyIncr += 1;
  }

  return { items, initDay, initToday };
}

export function genDays(selDay, daySwitch, dispatch, callBack) {
  const gen = genCalDays(selDay.month, selDay.year);
  dispatch(setCalDays(gen.items, selDay.month, selDay.year, gen.initToday));
  dispatchDbCall(() =>
    createRep(selDay.year, selDay.month, () => {
      // so here we want to set a new selected day
      // ONLY if there's no day switching occuring
      // meaning if just the month has been changed
      // OR component has mounted
      if (selDay.day) {
        dispatch(setSelDay(selDay));
      } else if (!daySwitch) {
        // These get set as number values
        dispatch(setSelDay(gen.initDay));
      }

      callBack && callBack();
    })
  );
}
