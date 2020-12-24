import { db } from './index';
/* consts */
import {
  tasksTable,
  timesTable,
  timesTFields,
  remTable,
  remTFields,
  setTable,
  setTFields,
} from '../consts/dbConsts';
/* utils */
import { addZero, formNamedDate } from '../utils/dateUtils';

// callback setData is where the retrieved data will be passed in as an argument
export function getTimeTasks(dayTasks, qParams, setData) {
  return new Promise((resolve) => {
    let query = '';
    let params = [];

    if (dayTasks) {
      const year = qParams.year + '';
      const month = addZero(qParams.month);
      const day = addZero(qParams.day);

      if (year && month && day) {
        params = [year, month, day];
        query = `SELECT *, ${timesTable}.id as times_id FROM ${timesTable} 
        LEFT JOIN ${tasksTable} ON ${timesTable}.${timesTFields.task_id} = ${tasksTable}.id 
        WHERE ${timesTFields.year}=? AND ${timesTFields.month}=? AND ${timesTFields.day}=?`;
      }
    } else {
      params = [qParams.timeId];
      query = `SELECT *, ${timesTable}.id as times_id FROM ${timesTable} 
      LEFT JOIN ${tasksTable} ON ${timesTable}.${timesTFields.task_id} = ${tasksTable}.id 
      WHERE times_id=?`;
    }

    if (params.length > 0) {
      db.transaction((tx0) => {
        // NOTE: so there needs to be as many question marks as there are values you inserting
        tx0.executeSql(
          query,
          params,
          async (tx1, res1) => {
            const formedData = [];
            for (let i = 0; i < res1.rows.length; i++) {
              const timeTaskItem = res1.rows.item(i);

              let dateName = '';

              dateName = await formNamedDate(
                timeTaskItem.year,
                parseInt(timeTaskItem.month, 10) - 1,
                timeTaskItem.day
              ).catch((err) => {
                console.log('formNamedDate error in getTimeTasks', err);
              });

              const timeId = timeTaskItem.times_id;

              const tTaskFormed = {
                key: timeId + '',
                task_id: timeTaskItem.task_id,
                title: timeTaskItem.title,
                description: timeTaskItem.desc,
                hours: timeTaskItem.hours,
                minutes: timeTaskItem.minutes,
                year: timeTaskItem.year + '',
                month: timeTaskItem.month,
                day: timeTaskItem.day,
                done: timeTaskItem.done,
                repEndTime: timeTaskItem.rep_end_time,
                repeatability: timeTaskItem.repeatability,
                dateName,
                afterLinks:
                  timeTaskItem.afterLinks &&
                  JSON.parse(timeTaskItem.afterLinks),
              };

              formedData.push(tTaskFormed);
            }
            setData(formedData);
            // console.log('formedData', formedData);
            resolve();
          },
          (err) => {
            setData([]);
            console.log('Error loading day tasks', err);
            resolve();
          }
        );
      });
    } else {
      setData([]);
      resolve();
    }
  });
}

export function getRems(timeTaskId, extraRes, callBack, errCallback) {
  return new Promise((resolve, reject) => {
    db.transaction((tx0) => {
      // NOTE: so there needs to be as many question marks as there are values you inserting
      tx0.executeSql(
        `SELECT * FROM ${remTable} WHERE ${remTFields.time_id}=?`,
        [timeTaskId],
        (tx1, res1) => {
          const reminders = [];
          for (let i = 0; i < res1.rows.length; i++) {
            const reminder = res1.rows.item(i);
            reminders.push({
              before: reminder.before && JSON.parse(reminder.before),
              id: reminder.id,
              notif: reminder.notif,
              repRem: !!reminder.repeatability,
              repeat:
                reminder.repeatability && JSON.parse(reminder.repeatability),
              sameTime: reminder.same_time,
              selHour: reminder.hours,
              selMin: reminder.minutes,
              ring_date: reminder.ring_date,
              taskRemId: reminder.task_rem_id,
              ...extraRes,
            });
          }
          if (callBack) {
            callBack(reminders);
          }

          resolve(reminders);
        },
        (err) => {
          if (errCallback) {
            errCallback(
              `error retrieving reminders for task: ${timeTaskId}  Error: ${err}`
            );
            resolve();
          } else {
            reject(
              `error retrieving reminders for task: ${timeTaskId}  Error: ${err}`
            );
          }
        }
      );
    });
  });
}

export function getDefSort(callBack) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${setTable} WHERE id=?`,
        [1],
        (tx1, res1) => {
          if (res1.rows.length) {
            callBack(res1.rows.item(0)[setTFields.defSort]);
          } else {
            console.log('nothing found in settings, wut?');
          }
          resolve();
        },
        (err) => {
          console.log('error retrieving defSort from settings', err);
          resolve();
        }
      );
    });
  });
}
