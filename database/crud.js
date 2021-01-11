import Database from '../Database';
import { db, scheduleRing } from './index';
/* utils */
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import {
  exeSqlPromise,
  getRemCrudArr,
  createRepArray,
  bulkUpdate,
  bulkInsert,
  dispatchDbCall,
  bulkUpdateProm,
} from './helpers';
import { addZero } from '../utils/dateUtils';
/* consts */
import {
  remTFields,
  remTable,
  tasksTable,
  taskTFields,
  timesTable,
  timesTFields,
  setTable,
  setTFields,
} from '../consts/dbConsts';
import { befTypes, repTypeMins, repTypeMonth } from '../consts/dateConts';
/* schedule */
import { cancelTime } from '../schedule';
/* redux */
import { store } from '../StoreApp';
import { toggleLoading } from '../redux/general/actions';
import { repTypeHours } from './../consts/dateConts';

// taskDate: YYYY-MM-DD
// @timesData - array of objects where each object should contain
// id, year, month, day, done(done field of task time)
// @crud - 0 = add, 1 = update, 2 = delete
export async function remCrud(
  crud,
  reminders,
  timesData,
  tHours,
  tMinutes,
  repToSingId
) {
  return new Promise(async (resolve, reject) => {
    if (!reminders.length) {
      resolve();
    } else {
      if (crud !== 2) {
        let currDate = moment();
        currDate = currDate.format();
        currDate = currDate.substring(0, currDate.indexOf('+'));
        const remDataz = [];
        const whereVals = [];

        timesData.forEach((tTime) => {
          const timeId = tTime.id;
          const taskDate = `${tTime.year}-${tTime.month}-${tTime.day}`;
          const tDone = tTime.done;

          for (let i = 0; i < reminders.length; i++) {
            const reminder = reminders[i];
            const repeatability = reminder.repRem
              ? JSON.stringify(reminder.repeat)
              : null;
            let ringDate = moment.utc(
              `${taskDate}T${reminder.selHour}:${reminder.selMin}:00Z`
            );
            let before = JSON.stringify({
              number: null,
              type: befTypes[0].key,
            });
            if (reminder.sameTime === 0) {
              ringDate.set({
                hour: parseInt(tHours, 10),
                minute: parseInt(tMinutes, 10),
              });
            } else if (reminder.sameTime === 2) {
              before = JSON.stringify(reminder.before);

              if (
                reminder.before.type === repTypeMins ||
                reminder.before.type === repTypeHours
              ) {
                ringDate.set({
                  hour: parseInt(tHours, 10),
                  minute: parseInt(tMinutes, 10),
                });
              }
              ringDate.subtract(reminder.before.number, reminder.before.type);
            }

            // NOTE: SOOO since we only want the reminder to reset itself(the ring date to be updated) ONLY when a
            // ring date related field is updated, we'll apply some logic here for the ring date to NOT update
            // when a NOT relevant field to ring date is updated

            // fields that affect the ringDate/should reset the reminder time
            const arrToValidate = [
              'task_time',
              'before',
              'same_time',
              'hours',
              'minutes',
              'rep_removed',
            ];

            // so we'll be updating the task rem id here
            // if its a repeatable task turned to a single task
            // since we don't want the other repeated task reminders
            // to be affected by this repeatable task turned to single
            // reminders
            const taskRemId =
              crud === 1 && repToSingId
                ? Math.random().toString(36).substr(2, 22)
                : reminder.taskRemId;

            if (
              crud === 1 &&
              !arrToValidate.some(
                (val) => reminder.updateFields.indexOf(val) !== -1
              )
            ) {
              remDataz.push({
                notif: reminder.notif ? 1 : 0,
                repeatability,
                task_rem_id: taskRemId,
                time_id: timeId,
              });
            } else {
              remDataz.push({
                before,
                notif: reminder.notif ? 1 : 0,
                repeatability,
                hours: reminder.selHour + '',
                minutes: reminder.selMin + '',
                ring_date: ringDate.toISOString(),
                same_time: reminder.sameTime,
                done: currDate > ringDate.toISOString() ? 1 : 0,
                task_rem_id: taskRemId,
                time_id: timeId,
                test_check: reminder.testCheck,
              });
            }

            if (crud === 0) {
              remDataz[remDataz.length - 1].task_done = !!tDone ? 1 : 0;
            }

            if (crud === 1) {
              if (!repToSingId) {
                // IMPORTANT: just incase you forget again, we do the where
                // clause not by id, when we updating reminders for times
                // but by the time_id and task_rem_id, BECAUSE, the initial
                // update array of reminders that we do retrieve is for a single task
                // and the ids are also for only one task, but we want to update
                // all of the other reminders for a given task time and with the
                // same task_rem_id thats why we do the where clause update
                // by time_id and task_rem_id
                whereVals.push([timeId + '', taskRemId + '']);
              } else {
                // only in this case where a repeatable task
                // is turned into a single task
                // do we want to update reminders by the passed in id
                // cause its only going to be one array of reminders for
                // one time, so its okay
                whereVals.push([reminder.id + '']);
              }
            }
          }
        });

        if (crud === 0) {
          bulkInsert(
            remTable,
            remDataz,
            () => {
              resolve();
            },
            (err) => {
              reject(err);
            }
          );
        } else if (crud === 1) {
          // IMPORTANT: just incase you forget again, we do the where
          // clause not by id, when we updating reminders for times
          // but by the time_id and task_rem_id, BECAUSE, the initial
          // update array of reminders that we do retrieve is for a single task
          // and the ids are also for only one task, but we want to update
          // all of the other reminders for a given task time and with the
          // same task_rem_id thats why we do the where clause update
          // by time_id and task_rem_id
          let whereClause = `${remTFields.time_id}=? AND ${remTFields.task_rem_id}=?`;

          if (repToSingId) {
            // only in this case where a repeatable task
            // is turned into a single task
            // do we want to update reminders by the passed in id
            // cause its only going to be one array of reminders for
            // one time, so its okay
            whereClause = 'id=?';
          }

          bulkUpdate(
            whereClause,
            whereVals,
            remTable,
            remDataz,
            () => {
              resolve();
            },
            (err) => {
              reject(err);
            }
          );
        }
      } else {
        // so we will be deleting by the time id AND the task rem id IF
        // its a repeatable task turned to single and ofcourse some reminders
        // have been removed on this single task
        const delByTime = repToSingId
          ? `${remTFields.time_id}=${repToSingId} AND`
          : '';
        const questions = new Array(reminders.length).fill('?');
        const remQ = `DELETE FROM ${remTable} WHERE ${delByTime} ${
          remTFields.task_rem_id
        } IN(${questions.join()})`;

        const remPar = [];
        reminders.forEach((rem) => {
          remPar.push(rem.taskRemId);
        });

        // okay so here we gotta cancel any scheduled ring ring
        // for a reminder that would be deleted
        const res1 = await exeSqlPromise(
          `SELECT ${remTFields.req_code} FROM ${remTable} WHERE ${delByTime} ${
            remTFields.task_rem_id
          } IN(${questions.join()}) AND ${remTFields.req_code} IS NOT NULL`,
          remPar
        );

        if (res1.rows && res1.rows.length) {
          // and there should only be one reminder with a set req_code
          // in the entire database, so we dont need to worry about looping
          const cancReqCode = res1.rows.item(0).req_code;
          cancelTime(cancReqCode);
        } else if (!res1.rows) {
          console.log(
            'error checking for reminder to be deleted and its req_code',
            'taskRemIds',
            remPar
          );
        }

        db.transaction((tx) => {
          tx.executeSql(
            remQ,
            remPar,
            () => {
              resolve();
            },
            (err) => {
              reject(
                `error deleting reminders, taskRemIds: ${remPar}.  Error: ${err}`
              );
            }
          );
        });
      }
    }
  });
}

export async function updateItem(
  time_id,
  task_id,
  editAll,
  title,
  desc,
  year,
  month,
  day,
  hourz,
  prevHours,
  minutez,
  prevMinutes,
  prevRems,
  newRems,
  tDone,
  afterLinks,
  repTask,
  callBack
) {
  return new Promise(async (resolve) => {
    const monStr = addZero(month);
    const dayStr = addZero(day);
    const hours = addZero(hourz);
    const minutes = addZero(minutez);

    const tTimeChanged = prevHours !== hours || prevMinutes !== minutes;

    let newAfterLinks = afterLinks && JSON.stringify(afterLinks);
    // so we gonna cover afterLink configuration here
    // this only matters for when a repeatable task gets turned
    // into a single task and when a general task gets turned into
    // a timed task
    if (
      tTimeChanged &&
      (!prevHours || !prevHours.length || !prevMinutes || !prevMinutes.length)
    ) {
      newAfterLinks = null;
    }

    if (!editAll) {
      // so this happens only when a user wants to edit a single
      // task from all of the repeatable tasks
      // so first we create a new non repeatable task
      exeSqlPromise(
        `INSERT INTO ${tasksTable} (${taskTFields.title}, ${taskTFields.desc}, ${taskTFields.hours}, ${taskTFields.minutes}, ${taskTFields.afterLinks}) VALUES (?,?,?,?,?)`,
        [title, desc, hours, minutes, newAfterLinks]
      )
        .then(async (res1) => {
          // here we also want to find and update after links of previously repeatable task
          // linked tasks, to also include this newly created single task
          const linkedTaskQ = await exeSqlPromise(
            `SELECT ${taskTFields.afterLinks}, id FROM ${tasksTable} WHERE ${taskTFields.afterLinks} LIKE '%${task_id},%' OR ${taskTFields.afterLinks} LIKE '%${task_id}]'`
          );

          if (linkedTaskQ.rows && linkedTaskQ.rows.length) {
            const linkedTaskData = [];
            const updtIds = [];
            for (let i = 0; i < linkedTaskQ.rows.length; i++) {
              const linkedTask = linkedTaskQ.rows.item(i);

              const newLinks = JSON.parse(linkedTask.afterLinks);
              newLinks.push(res1.insertId);

              linkedTaskData.push({ afterLinks: JSON.stringify(newLinks) });

              updtIds.push([linkedTask.id + '']);
            }

            await bulkUpdateProm('id=?', updtIds, tasksTable, linkedTaskData);
          }

          // then we update the given time of the task
          // with the new tasks id
          // BOOM, super easy
          exeSqlPromise(
            `UPDATE ${timesTable} SET ${timesTFields.task_id}=? WHERE id=?`,
            [res1.insertId, time_id]
          )
            .then(() => {
              if (!isEqual(prevRems, newRems) || tTimeChanged) {
                const crudRems = getRemCrudArr(prevRems, newRems, tTimeChanged);

                const timesData = [
                  {
                    id: time_id,
                    year,
                    month: monStr,
                    day: dayStr,
                    done: tDone,
                  },
                ];

                // add
                remCrud(0, crudRems.addRems, timesData, hours, minutes, time_id)
                  .then(() => {
                    // update
                    remCrud(
                      1,
                      crudRems.updateRems,
                      timesData,
                      hours,
                      minutes,
                      time_id
                    )
                      .then(() => {
                        // delete
                        remCrud(
                          2,
                          crudRems.delRems,
                          timesData,
                          hours,
                          minutes,
                          time_id
                        )
                          .then(() => {
                            callBack();
                            dispatchDbCall(scheduleRing);
                            resolve();
                          })
                          .catch((err) => {
                            callBack();
                            dispatchDbCall(scheduleRing);
                            console.log('Error deleting reminders: ', err);
                            resolve();
                          });
                      })
                      .catch((err) => {
                        callBack();
                        dispatchDbCall(scheduleRing);
                        console.log('Error updating reminders: ', err);
                        resolve();
                      });
                  })
                  .catch((err) => {
                    callBack();
                    console.log('Error adding reminders: ', err);
                    resolve();
                  });
              } else {
                callBack();
                resolve();
              }
            })
            .catch((err) => {
              callBack();
              console.log('error updating tasks times new task id', err);
              resolve();
            });
        })
        .catch((err) => {
          callBack();
          console.log(
            'Error creating new task for the single repeatable task edit',
            err
          );
          resolve();
        });
    } else {
      repTask && store.dispatch(toggleLoading(true));
      exeSqlPromise(
        `UPDATE ${tasksTable} SET ${taskTFields.title}=?, ${taskTFields.desc}=?, ${taskTFields.hours}=?, ${taskTFields.minutes}=?, ${taskTFields.afterLinks}=? WHERE id=?`,
        [title, desc, hours, minutes, newAfterLinks, task_id]
      )
        .then(() => {
          // und here we update reminders if there was a change in them
          if (!isEqual(prevRems, newRems) || tTimeChanged) {
            exeSqlPromise(
              `SELECT * FROM ${timesTable} WHERE ${timesTFields.task_id}=?`,
              [task_id]
            )
              .then((res2) => {
                const crudRems = getRemCrudArr(prevRems, newRems, tTimeChanged);
                if (res2.rows.length) {
                  const timesData = res2.rows.raw();

                  // add
                  remCrud(0, crudRems.addRems, timesData, hours, minutes)
                    .then(() => {
                      // update
                      remCrud(1, crudRems.updateRems, timesData, hours, minutes)
                        .then(() => {
                          // delete
                          remCrud(
                            2,
                            crudRems.delRems,
                            timesData,
                            hours,
                            minutes
                          )
                            .then(() => {
                              repTask && store.dispatch(toggleLoading(false));
                              callBack();
                              dispatchDbCall(scheduleRing);
                              resolve();
                            })
                            .catch((err) => {
                              repTask && store.dispatch(toggleLoading(false));
                              callBack();
                              dispatchDbCall(scheduleRing);
                              console.log('Error deleting reminders: ', err);
                              resolve();
                            });
                        })
                        .catch((err) => {
                          repTask && store.dispatch(toggleLoading(false));
                          callBack();
                          dispatchDbCall(scheduleRing);
                          console.log('Error updating reminders: ', err);
                          resolve();
                        });
                    })
                    .catch((err) => {
                      repTask && store.dispatch(toggleLoading(false));
                      callBack();
                      console.log('Error adding reminders: ', err);
                      resolve();
                    });
                } else {
                  repTask && store.dispatch(toggleLoading(false));
                  callBack();
                  console.log('No times found for task that got updated, wut?');
                  resolve();
                }
              })
              .catch((err) => {
                repTask && store.dispatch(toggleLoading(false));
                callBack();
                console.log(
                  'error retrieving task times for reminder update, task id ',
                  task_id,
                  '. Error: ',
                  err
                );
                resolve();
              });
          } else {
            repTask && store.dispatch(toggleLoading(false));
            callBack();
            resolve();
          }
        })
        .catch((err) => {
          repTask && store.dispatch(toggleLoading(false));
          callBack();
          console.log('Error updating task', err);
          resolve();
        });
    }
  });
}

export async function addItem(
  title,
  desc,
  year,
  month,
  day,
  hourz,
  minutez,
  repeatability,
  reminders,
  callBack
) {
  return new Promise(async (resolve) => {
    const monStr = addZero(month);
    const dayStr = addZero(day);
    const hours = addZero(hourz);
    const minutes = addZero(minutez);

    if (repeatability) {
      store.dispatch(toggleLoading(true));
      // so we'll add Repeatable times
      // so repeatability - will be an object containing 'type' & 'number'
      // example - type: month, number: 2 == every two months

      const dateName = `${year}-${monStr}-${dayStr}`;

      let dateString = '';

      if (hours && minutes && hours.length && minutes.length) {
        dateString = `${dateName}T${hours}:${minutes}:00Z`;
      } else {
        dateString = `${dateName}T00:00:00Z`;
      }
      const newDate = moment.utc(dateString);

      const endDate = moment.utc(dateString);

      // so we'll be creating tasks for up to one year
      endDate.add(5, repTypeMonth);
      // and we'll create tasks for the whole last month
      // so we set the and date to be for the last day of the month
      endDate.endOf('month');

      const datesData = createRepArray(newDate, endDate, repeatability);

      const dates = datesData.dates;
      const repEndTime = datesData.repEndTime;

      exeSqlPromise(
        `INSERT INTO ${tasksTable} (${taskTFields.title}, ${taskTFields.desc}, ${taskTFields.repeatability}, ${taskTFields.rep_end_time}, ${taskTFields.hours}, ${taskTFields.minutes}) VALUES (?,?,?,?,?,?)`,
        [
          title,
          desc,
          JSON.stringify(repeatability),
          repEndTime.toISOString(),
          hours,
          minutes,
        ]
      )
        .then((res) => {
          const adjDates = [];

          dates.forEach((date) => {
            adjDates.push({
              ...date,
              done: 0,
              task_id: res.insertId,
            });
          });

          // insert times
          bulkInsert(
            timesTable,
            adjDates,
            (timeIds) => {
              if (reminders.length) {
                const timesData = [];
                // note here, the amount of dates and timeIds should be
                // the same, if they are not, then we have a problem
                // with out timeIds generating code OR the inserting
                // of date items
                timeIds.forEach((timeId, index) => {
                  const dateItem = dates[index];
                  timesData.push({
                    ...dateItem,
                    id: timeId,
                    done: false,
                  });
                });

                remCrud(0, reminders, timesData, hours, minutes)
                  .then(() => {
                    store.dispatch(toggleLoading(false));
                    callBack();
                    if (reminders.length) {
                      dispatchDbCall(scheduleRing);
                    }
                    resolve();
                  })
                  .catch((err) => {
                    store.dispatch(toggleLoading(false));
                    callBack();
                    console.log(
                      'Error adding reminders for repeatable task',
                      err
                    );
                    resolve();
                  });
              } else {
                store.dispatch(toggleLoading(false));
                callBack();
                resolve();
              }
            },
            (err) => {
              store.dispatch(toggleLoading(false));
              callBack();
              console.log('Error bulk inserting times', err);
              resolve();
            }
          );
        })
        .catch((error) => {
          store.dispatch(toggleLoading(false));
          callBack();
          console.log('error adding task', error);
          resolve();
        });
    } else {
      // NOTE: so there needs to be as many question marks as there are values you inserting
      exeSqlPromise(
        `INSERT INTO ${tasksTable} (${taskTFields.title}, ${taskTFields.desc}, ${taskTFields.hours}, ${taskTFields.minutes}) VALUES (?,?,?,?)`,
        [title, desc, hours, minutes]
      )
        .then((res1) => {
          exeSqlPromise(
            `INSERT INTO ${timesTable} (${timesTFields.year}, ${timesTFields.month}, ${timesTFields.day}, ${timesTFields.done}, ${timesTFields.task_id}) VALUES (?,?,?,?,?)`,
            [year, monStr, dayStr, false, res1.insertId]
          )
            .then((res2) => {
              remCrud(
                0,
                reminders,
                [
                  {
                    id: res2.insertId,
                    year,
                    month: monStr,
                    day: dayStr,
                    done: false,
                  },
                ],
                hours,
                minutes
              )
                .then(() => {
                  callBack();
                  if (reminders.length) {
                    dispatchDbCall(scheduleRing);
                  }
                  resolve();
                })
                .catch((err) => {
                  callBack();
                  console.log('Error adding reminders for single task', err);
                  resolve();
                });
            })
            .catch((err) => {
              callBack();
              console.log(
                'error inserting single task time for task',
                res1.insertId,
                'error',
                err
              );
              resolve();
            });
        })
        .catch((err) => {
          callBack();
          console.log('error inserting single task', err);
          resolve();
        });
    }
  });
}

export async function delTask(timeId, taskId, all, rep, callBack) {
  return new Promise(async (resolve) => {
    if (all) {
      rep && store.dispatch(toggleLoading(true));
      exeSqlPromise(
        `SELECT *, ${remTable}.id as rem_id FROM ${remTable} LEFT JOIN ${timesTable} ON ${remTable}.${remTFields.time_id} = ${timesTable}.id WHERE ${remTFields.req_code} IS NOT NULL`,
        []
      )
        .then((res1) => {
          if (res1.rows.length) {
            const schedRem = res1.rows.item(0);
            if (schedRem.task_id === taskId) {
              cancelTime(schedRem.req_code, () => {
                exeSqlPromise(`DELETE FROM ${tasksTable} WHERE id=?`, [taskId])
                  .then(() => {
                    // succesfully deleted task
                    rep && store.dispatch(toggleLoading(false));
                    callBack();
                    dispatchDbCall(scheduleRing);
                    resolve();
                  })
                  .catch((err) => {
                    rep && store.dispatch(toggleLoading(false));
                    callBack();
                    dispatchDbCall(scheduleRing);
                    console.log(
                      'Error deleting task and its cascade',
                      taskId,
                      err
                    );
                    resolve();
                  });
              });
            } else {
              exeSqlPromise(`DELETE FROM ${tasksTable} WHERE id=?`, [taskId])
                .then(() => {
                  // succesfully deleted task
                  rep && store.dispatch(toggleLoading(false));
                  callBack();
                  dispatchDbCall(scheduleRing);
                  resolve();
                })
                .catch((err) => {
                  rep && store.dispatch(toggleLoading(false));
                  callBack();
                  console.log(
                    'Error deleting task and its cascade',
                    taskId,
                    err
                  );
                  resolve();
                });
            }
          } else {
            exeSqlPromise(`DELETE FROM ${tasksTable} WHERE id=?`, [taskId])
              .then(() => {
                // succesfully deleted task
                rep && store.dispatch(toggleLoading(false));
                callBack();
                dispatchDbCall(scheduleRing);
                resolve();
              })
              .catch((err) => {
                rep && store.dispatch(toggleLoading(false));
                callBack();
                console.log('Error deleting task and its cascade', taskId, err);
                resolve();
              });
          }
        })
        .catch((err) => {
          rep && store.dispatch(toggleLoading(false));
          callBack();
          console.log('Error deleting task and its cascade', taskId, err);
          resolve();
        });
    } else {
      exeSqlPromise(
        `SELECT * FROM ${remTable} WHERE ${remTFields.time_id}=? AND ${remTFields.req_code} IS NOT NULL`,
        [timeId]
      )
        .then((res1) => {
          if (res1.rows.length) {
            const schedRem = res1.rows.item(0);
            cancelTime(schedRem.req_code, () => {
              exeSqlPromise(`DELETE FROM ${timesTable} WHERE id=?`, [timeId])
                .then(() => {
                  // succesfully deleted task'
                  callBack();
                  dispatchDbCall(scheduleRing);
                  resolve();
                })
                .catch((err) => {
                  callBack();
                  dispatchDbCall(scheduleRing);
                  console.log(
                    'Error deleting specific time for task',
                    timeId,
                    err
                  );
                  resolve();
                });
            });
          } else {
            exeSqlPromise(`DELETE FROM ${timesTable} WHERE id=?`, [timeId])
              .then(() => {
                // succesfully deleted task'
                callBack();
                dispatchDbCall(scheduleRing);
                resolve();
              })
              .catch((err) => {
                callBack();
                dispatchDbCall(scheduleRing);
                console.log(
                  'Error deleting specific time for task',
                  timeId,
                  err
                );
                resolve();
              });
          }
        })
        .catch((err) => {
          callBack();
          console.log('Error deleting specific time for task', timeId, err);
          resolve();
        });
    }
  });
}

export function doneTask(timeId, value, callBack, errCallBack) {
  return new Promise((resolve) => {
    db.transaction((tx0) => {
      tx0.executeSql(
        `UPDATE ${timesTable} SET ${timesTFields.done}=? WHERE id=?`,
        [value, timeId],
        (tx1) => {
          tx1.executeSql(
            `UPDATE ${remTable} SET ${remTFields.task_done}=? WHERE ${remTFields.time_id}=?`,
            [value, timeId],
            () => {
              dispatchDbCall(scheduleRing);
              callBack();
              resolve();
            },
            (err) => {
              errCallBack(
                `Error doning a reminder for task: ${err}, Tasks time id: ${timeId}`
              );
              resolve();
            }
          );
        },
        (err) => {
          errCallBack(err);
          resolve();
        }
      );
    });
  });
}

export async function dontRepRem(singleId, callBack, errCallback) {
  return new Promise((resolve) => {
    if (singleId !== undefined) {
      // native module called?
      Database.dontRepRem(
        singleId,
        () => {
          callBack();
          resolve();
        },
        (err) => {
          errCallback('dontRepRem error: ', err);
          resolve();
        }
      );
    } else {
      callBack();
      resolve();
    }
  });
}

export async function updateSort(value) {
  return new Promise((resolve) => {
    db.transaction((tx0) => {
      tx0.executeSql(
        `UPDATE ${setTable} SET ${setTFields.defSort}=? WHERE id=?`,
        [value, 1],
        () => {
          resolve();
        },
        (err) => {
          console.log('Error updating default sort', err);
          resolve();
        }
      );
    });
  });
}

export async function updateLinks(id, links, callBack) {
  return new Promise((resolve) => {
    db.transaction((tx0) => {
      tx0.executeSql(
        `UPDATE ${tasksTable} SET ${taskTFields.afterLinks}=? WHERE id=?`,
        [JSON.stringify(links), id],
        () => {
          callBack();
          resolve();
        },
        (err) => {
          console.log('Error updating default sort', err);
          resolve();
        }
      );
    });
  });
}
