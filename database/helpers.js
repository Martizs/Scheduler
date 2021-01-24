import { db } from './index';
import Database from '../Database';
/* utils */
import moment from 'moment';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import { addZero } from '../utils/dateUtils';
import {
  repTypeHours,
  repTypeMins,
  repWeeklyKey,
  wDays,
} from '../consts/dateConts';

// helper function that takes in moment js start & end dates
// and creates date array according to the passed in repeatability
// also returns the last added value as the repEndTime
// and the repEndTime is also a moment js object
// @extraRes - just some extra results we want to retrieve with this
// dates object, so we wouldn't need to reloop and reformat too much
export function createRepArray(startDate, endDate, repeatability, extraRes) {
  const dates = [];
  let repEndTime = null;

  if (repeatability.type === repWeeklyKey) {
    do {
      // we add in one day here to the date cause
      // moment js treats start of week as sunday,
      // fucking retard formats left and right
      const from_date = moment(startDate);
      if (startDate.format('dddd') === wDays[6].title) {
        // so if the currently selected day is sunday, we want it
        // to be set to saturday, so that moment does not fuk up our
        // start of week with its retarded association of Sunday as
        // start of week.
        from_date.subtract(1, 'days');
      }

      from_date.startOf('week');
      from_date.add(1, 'days');
      const to_date = moment(startDate);
      to_date.endOf('week');
      to_date.add(1, 'days');

      do {
        if (repeatability.values.indexOf(from_date.format('dddd')) !== -1) {
          // this is where the adding magic happens
          dates.push({
            year: from_date.year() + '',
            month: addZero(from_date.month() + 1),
            day: addZero(from_date.date()),
            // value will be used for auto doning tasks
            // which get set to be in the past by this rep creator
            canDone: true,
            ...extraRes,
          });

          // NOTE: weekly repeatabilities rep end time is always MONDAY
          // is intended, less extra logic in createRep
          repEndTime = from_date;
        }

        from_date.add(1, 'days');
      } while (from_date.isSameOrBefore(to_date));

      startDate.add(1, 'weeks');
    } while (startDate.isBefore(endDate));
  } else {
    // IMPORTANT: we use do while here because we want
    // the dates to be added at least once, for such
    // edge cases where there's a rep task for every two years
    // and no other tasks or app interaction is happening
    // and the task also has a reminder set, so we want to make sure
    // that they always get created, when the last rep end time has been
    // exceeded
    do {
      // this is where the adding magic happens
      dates.push({
        year: startDate.year() + '',
        month: addZero(startDate.month() + 1),
        day: addZero(startDate.date()),
        ...extraRes,
      });
      // this should happen at ze end
      startDate.add(repeatability.number, repeatability.type);
    } while (startDate.isBefore(endDate));
  }

  if (repeatability.type !== repWeeklyKey) {
    repEndTime = startDate.subtract(repeatability.number, repeatability.type);
  }

  return {
    dates,
    repEndTime,
  };
}

export function exeSqlPromise(query, parameters, result) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        parameters,
        (tx0, res) => {
          resolve({
            ...res,
            ...result,
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

// compares the previous db reminder array
// with the new db reminder array
// and returns arrays to add reminders
// to update reminders and to delete reminders
export function getRemCrudArr(prevRems, reminders, tTimeChange) {
  // 1st we populate addRems array
  // NOTE: reminders coming from db will always have an
  // int ID, new reminders will always be string
  const addRems = [];
  // 2nd we populate updateRems array
  const updateRems = [];
  // okay so we do normal for loops cause
  // for each dont wait for the arrays to be filled so
  // we get arrays of undefined
  reminders.forEach((rem) => {
    if (typeof rem.id === 'string') {
      addRems.push(rem);
    } else {
      const updateFields = [];
      const updtRem = find(prevRems, ['taskRemId', rem.taskRemId]);

      if (
        tTimeChange &&
        (rem.sameTime === 0 ||
          (rem.sameTime === 2 &&
            (rem.before.type === repTypeMins ||
              rem.before.type === repTypeHours)))
      ) {
        updateFields.push('task_time');
      }

      if (updtRem) {
        if (!isEqual(rem.before, updtRem.before)) {
          updateFields.push('before');
        }
        if (rem.notif !== updtRem.notif) {
          updateFields.push('notif');
        }
        if (!isEqual(rem.repeat, updtRem.repeat)) {
          if (updtRem.repeat && !rem.repeat) {
            // that means that the repeatability has been
            // removed, and we gotta stop the reminders
            // repeating
            updateFields.push('rep_removed');
          } else {
            updateFields.push('repeatability');
          }
        }
        if (rem.sameTime !== updtRem.sameTime) {
          updateFields.push('same_time');
        }
        if (
          rem.sameTime !== 0 &&
          !(
            rem.sameTime === 2 &&
            (rem.before.type === repTypeMins ||
              rem.before.type === repTypeHours)
          )
        ) {
          if (rem.selHour !== updtRem.selHour) {
            updateFields.push('hours');
          }
          if (rem.selMin !== updtRem.selMin) {
            updateFields.push('minutes');
          }
        }
      }

      if (updateFields.length) {
        updateRems.push({
          ...rem,
          updateFields,
        });
      }
    }
  });
  // 3d we populate delRems array
  const delRems = [];
  prevRems.forEach((prevRem) => {
    const delRem = find(reminders, ['taskRemId', prevRem.taskRemId]);
    if (!delRem) {
      delRems.push(prevRem);
    }
  });

  return {
    addRems,
    updateRems,
    delRems,
  };
}

// okay so we use this to do a setTimout, cause for some reason
// sometimes doing a bulkinsert/bulkupdate one after another
// makes the db file locked, xui znajet why
// so we use a timeout of 10ms(which actually does not wait for 10ms)
// but it actually solves the locked db nonsense
async function bulkManage(
  insert,
  whereClause,
  whereVals,
  tableName,
  data,
  callBack,
  errCallback
) {
  Database.bulkManage(
    insert,
    whereClause,
    whereVals,
    tableName,
    data,
    (res) => {
      callBack(res);
    },
    (err) => {
      console.log(`Error bulk ${insert ? 'inserting' : 'updating'}`);
      errCallback(err);
    }
  );
}

// This function has to be called within db.transaction and it needs to get
// the tx from it. We do this, to NOT openup a new connection if one is already
// open, this should speed up everything
// @fields - will have to be an array of objects with keys: 'name', 'valueKey' or 'value'
// where 'name' - is the fields to be updated name as it is called in the db (STRING)
// 'valueKey' - the key of the update value in the data array (STRING)
// 'value' - this can be passed in instead of 'valueKey' if we want to set the same (any type)
// value for all items
// ALSO, fields have to have the maximum amount of fields you'll be updating, even if some
// SO SO SO, if one of the items would NOT need its field updated, just don't pass in
// the dataKey associated with the field into the dataItem
// items won't need to update all fields, and won't pass in the values to update
// @data - contains ids of items and values for fields to be updated,
// and the values are stored in the passed in 'valueKey'
// @whereClause - specific where clause for bulk updating, cause not all things
// might be updated by the id
// @whereKeys - a STRING array for bulk updating containing keys which are in the
// passed in data, which will be used with the passed in whereClause
// according to each data item, NOTE where keys need to be cautious of their placement
// in the array, example if you have a where clause: 'time_id AND task_rem_id' then
// the where Keys need to be like ['timeId', 'taskRemId'].
export async function bulkUpdate(
  whereClause,
  whereVals,
  tableName,
  data,
  callBack,
  errCallback
) {
  // here first var is true if for inserting
  // and false is for updating
  if (tableName && data.length) {
    // NOTE: we used this set timeout because we'd get
    // some db lock errors, but now it lags the debugger a bit
    // so we comment it out
    // setTimeout(
    //   () =>
    //     bulkManage(
    //       false,
    //       whereClause,
    //       whereKeys,
    //       tableName,
    //       data,
    //       callBack,
    //       errCallback,
    //     ),
    //   10,
    // );
    bulkManage(
      false,
      whereClause,
      whereVals,
      tableName,
      data,
      callBack,
      errCallback
    );
  } else {
    errCallback('Bulk update - bad base arguments provided');
  }
}

// promise wrapper function around the bulk update
export function bulkUpdateProm(whereClause, whereVals, tableName, data) {
  return new Promise((resolve, reject) => {
    bulkUpdate(
      whereClause,
      whereVals,
      tableName,
      data,
      (resp) => resolve(resp),
      (err) => reject(err)
    );
  });
}

// @fields - will have to be an array of objects with keys: 'name', 'valueKey' or 'value'
// where 'name' - is the fields to be updated name as it is called in the db (STRING)
// 'valueKey' - the key of the update value in the data array (STRING)
// 'value' - this can be passed in instead of 'valueKey' if we want to set the same (any type)
// value for all items for that field
export async function bulkInsert(tableName, data, callBack, errCallback) {
  // here first var is true if for inserting
  // and false is for updating
  if (tableName && data.length) {
    // NOTE: we used this set timeout because we'd get
    // some db lock errors, but now it lags the debugger a bit
    // so we comment it out
    // setTimeout(
    //   () =>
    //     bulkManage(
    //       true,
    //       '',
    //       [],
    //       tableName,
    //       data,
    //       insertedIds => {
    //         callBack(insertedIds);
    //       },
    //       errCallback,
    //     ),
    //   10,
    // );
    bulkManage(
      true,
      '',
      [],
      tableName,
      data,
      (insertedIds) => {
        callBack(insertedIds);
      },
      errCallback
    );
  } else {
    errCallback('Bulk insert - bad base arguments provided');
  }
}

// DB CALLS SAGAS
let dbCalls = [];

export async function dispatchDbCall(dbCall) {
  if (!dbCalls.length) {
    dbCalls.push(dbCall);
    handleDbCalls();
  } else {
    dbCalls.push(dbCall);
  }
}

async function handleDbCalls(i = 0) {
  let index = i;

  while (index < dbCalls.length) {
    // console.log('db call dispatch started with index', index);
    // console.log('dbCalls', dbCalls[index]);
    await dbCalls[index]();
    index++;
  }

  // so we will aply a bit of recursiveness here
  // if for any reason for a split milisecond the
  // while ends and right after it ends a new function
  // gets pushed
  if (index < dbCalls.length) {
    handleDbCalls(index);
  } else {
    // console.log('handle Db calls ended');
    dbCalls = [];
  }
}
