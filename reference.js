// goes through the reminders and schedules a new ring if needed
// and ofcourse removes a ring if none is needed
// TODO: remove this before release
// export async function scheduleRing() {
//   return new Promise(async resolve => {
//     console.log('schedule ring started');
//     exeSqlPromise(
//       `SELECT * FROM ${remTable} WHERE ${remTFields.req_code} IS NOT NULL`,
//       [],
//     )
//       .then(res1 => {
//         let currDate = moment();
//         currDate.subtract(4, 'minutes');
//         currDate = currDate.format();
//         currDate = currDate.substring(0, currDate.indexOf('+'));
//         if (res1.rows.length) {
//           const oldSched = res1.rows.item(0);
//           exeSqlPromise(
//             `UPDATE ${remTable} SET ${remTFields.req_code}=? WHERE id=?`,
//             [null, oldSched.id],
//           )
//             .then(() => {
//               cancelTime(oldSched.req_code, msg => {
//                 // And theeen after cancelling and nulling down the previous
//                 // scheduled time, we set the new one
//                 exeSqlPromise(
//                   `SELECT * FROM ${remTable} WHERE ${remTFields.done}=? AND ${
//                     remTFields.task_done
//                   }=? AND ${remTFields.ring_date}>? ORDER BY ${
//                     remTFields.ring_date
//                   } ASC LIMIT 1`,
//                   [false, false, currDate],
//                 )
//                   .then(res3 => {
//                     if (res3.rows.length) {
//                       const newSched = res3.rows.item(0);
//                       updateSchedTime(newSched, () => {
//                         resolve();
//                       });
//                     } else {
//                       resolve();
//                     }
//                   })
//                   .catch(err => {
//                     console.log(
//                       'Error finding earliest reminder to schedule',
//                       err,
//                     );
//                     resolve();
//                   });
//               });
//             })
//             .catch(err => {
//               console.log(
//                 'Error updating previous reminders req_code to null',
//                 'remId',
//                 oldSched.id,
//                 'Error ',
//                 err,
//               );
//               resolve();
//             });
//         } else {
//           exeSqlPromise(
//             `SELECT * FROM ${remTable} WHERE ${remTFields.done}=? AND ${
//               remTFields.task_done
//             }=? AND ${remTFields.ring_date}>? ORDER BY ${
//               remTFields.ring_date
//             } ASC LIMIT 1`,
//             [false, false, currDate],
//           )
//             .then(res3 => {
//               if (res3.rows.length) {
//                 const newSched = res3.rows.item(0);
//                 updateSchedTime(newSched, () => {
//                   resolve();
//                 });
//               } else {
//                 resolve();
//               }
//             })
//             .catch(err => {
//               console.log('Error finding earliest reminder to schedule', err);
//               resolve();
//             });
//         }
//       })
//       .catch(err => {
//         console.log(
//           'Schedule ring - Error finding reminder where req_code is NOT null',
//           err,
//         );
//         resolve();
//       });
//   });
// }

// function that checks the tasks of the passed in month
// and if there should be any repeatable tasks in it it creates them
// up to the current month +1 year
// export async function createRep(year, month, callBack) {
//   return new Promise(async resolve => {
//     if (year && month) {
//       store.dispatch(toggleLoading(true));
//       let monthDate = moment.utc(`${year}-${addZero(month)}-01T00:00:00Z`);
//       // now here we'll be checking and making sure
//       // that there's always +4 months of tasks that are created
//       // mainly because our reminders can be max 3months+ before
//       // a certain task, so we need to make sure that we always
//       // have a task created for any reminders
//       monthDate.add(4, repTypeMonth);
//       // and here we'll set the date to be the last day of the month
//       monthDate.endOf('month');
//       exeSqlPromise(
//         `SELECT * FROM ${tasksTable} WHERE ${taskTFields.repeatability
//         } IS NOT NULL AND ${taskTFields.rep_end_time}<?`,
//         [monthDate.toISOString()],
//       )
//         .then(res1 => {
//           if (res1.rows.length) {
//             // okay so for each task found we'll repeat them
//             // till the currently passed in date +1 year
//             // so here we add the +1 year to the current month date the user is checking
//             const tData = [];
//             const taskFields = [
//               {
//                 name: taskTFields.rep_end_time,
//                 valueKey: 'repEndTime',
//               },
//             ];
//             let dates = [];
//             const taskTimeIdProm = [];
//             const endDate = monthDate;

//             for (let i = 0; i < res1.rows.length; i++) {
//               const task = res1.rows.item(i);

//               const startDate = moment.utc(task.rep_end_time);
//               const repeatability = JSON.parse(task.repeatability);
//               // we also want to make one addition to the startDate
//               // according to the repeatability as we want to start
//               // adding dates from the subsequent date as the current rep_end_time
//               // already has a task added
//               startDate.add(repeatability.number, repeatability.type);

//               const datesData = createRepArray(
//                 startDate,
//                 endDate,
//                 repeatability,
//                 {
//                   taskId: task.id,
//                   tHours: task.hours,
//                   tMinutes: task.minutes,
//                 },
//               );

//               dates = [...dates, ...datesData.dates];
//               const repEndTime = datesData.repEndTime;
//               tData.push({
//                 id: task.id,
//                 repEndTime: repEndTime.toISOString(),
//               });

//               // here we get the very first time id of
//               // the current task
//               const taskTimeId = exeSqlPromise(
//                 `SELECT id FROM ${timesTable} WHERE ${timesTFields.task_id
//                 }=? ORDER BY id ASC LIMIT 1`,
//                 [task.id],
//                 {
//                   taskId: task.id,
//                 },
//               );
//               taskTimeIdProm.push(taskTimeId);
//             }

//             Promise.all(taskTimeIdProm)
//               .then(ttIdData => {
//                 bulkUpdate(
//                   'id=?',
//                   ['id'],
//                   'tasks',
//                   taskFields,
//                   tData,
//                   () => {
//                     const updtFields = [];
//                     updtFields.push({
//                       name: timesTFields.year,
//                       valueKey: 'year',
//                     });
//                     updtFields.push({
//                       name: timesTFields.month,
//                       valueKey: 'month',
//                     });
//                     updtFields.push({
//                       name: timesTFields.day,
//                       valueKey: 'day',
//                     });
//                     updtFields.push({
//                       name: timesTFields.done,
//                       value: false,
//                     });
//                     updtFields.push({
//                       name: timesTFields.task_id,
//                       valueKey: 'taskId',
//                     });

//                     // insert times
//                     bulkInsert(
//                       timesTable,
//                       updtFields,
//                       dates,
//                       timeIds => {
//                         const remProm = [];
//                         for (let i = 0; i < ttIdData.length; i++) {
//                           const taskTimeId = ttIdData[i].rows.item(0).id;
//                           const rems = getRems(taskTimeId, {
//                             taskId: ttIdData[i].taskId,
//                           });
//                           remProm.push(rems);
//                         }
//                         Promise.all(remProm)
//                           .then(baseRems => {
//                             // NOW the base rems data retrieved
//                             let joinedBaseRems = [];
//                             // we join them all in one array, cause currently they retrieved
//                             // as array of arrays
//                             baseRems.forEach(baseRemArr => {
//                               joinedBaseRems = [
//                                 ...joinedBaseRems,
//                                 ...baseRemArr,
//                               ];
//                             });

//                             if (joinedBaseRems.length) {
//                               const remFields = [];

//                               remFields.push({
//                                 name: remTFields.before,
//                                 valueKey: 'before',
//                               });
//                               remFields.push({
//                                 name: remTFields.notif,
//                                 valueKey: 'notif',
//                               });
//                               remFields.push({
//                                 name: remTFields.repeatability,
//                                 valueKey: 'repeat',
//                               });
//                               remFields.push({
//                                 name: remTFields.hours,
//                                 valueKey: 'selHour',
//                               });
//                               remFields.push({
//                                 name: remTFields.minutes,
//                                 valueKey: 'selMin',
//                               });
//                               remFields.push({
//                                 name: remTFields.ring_date,
//                                 valueKey: 'ringDate',
//                               });
//                               remFields.push({
//                                 name: remTFields.same_time,
//                                 valueKey: 'sameTime',
//                               });
//                               remFields.push({
//                                 name: remTFields.done,
//                                 valueKey: 'done',
//                               });
//                               remFields.push({
//                                 name: remTFields.task_rem_id,
//                                 valueKey: 'taskRemId',
//                               });
//                               remFields.push({
//                                 name: remTFields.task_done,
//                                 value: false,
//                               });
//                               remFields.push({
//                                 name: remTFields.time_id,
//                                 valueKey: 'timeId',
//                               });

//                               // and this will be all of the reminders data for inserting
//                               // cause we wanna do the bulk insert in ONE GO
//                               const allReminders = [];

//                               let currDate = moment();
//                               currDate = currDate.format();
//                               currDate = currDate.substring(
//                                 0,
//                                 currDate.indexOf('+'),
//                               );

//                               // note here, the amount of dates and timeIds should be
//                               // the same, if they are not, then we have a problem
//                               // with our timeIds generating code OR the inserting
//                               // of date items
//                               timeIds.forEach((timeId, index) => {
//                                 const dateItem = dates[index];

//                                 const addRems = filter(joinedBaseRems, [
//                                   'taskId',
//                                   dateItem.taskId,
//                                 ]);

//                                 const taskDate = `${dateItem.year}-${dateItem.month
//                                   }-${dateItem.day}`;

//                                 addRems.forEach(reminder => {
//                                   const repeat = reminder.repRem
//                                     ? JSON.stringify(reminder.repeat)
//                                     : null;

//                                   let ringDate = moment.utc(
//                                     `${taskDate}T${reminder.selHour}:${reminder.selMin
//                                     }:00Z`,
//                                   );

//                                   let before = JSON.stringify({
//                                     number: null,
//                                     type: befTypes[0].key,
//                                   });

//                                   if (reminder.sameTime === 0) {
//                                     ringDate.set({
//                                       hour: parseInt(dateItem.tHours, 10),
//                                       minute: parseInt(dateItem.tMinutes, 10),
//                                     });
//                                   } else if (reminder.sameTime === 2) {
//                                     before = JSON.stringify(reminder.before);
//                                     ringDate.subtract(
//                                       reminder.before.number,
//                                       reminder.before.type,
//                                     );
//                                   }
//                                   //
//                                   allReminders.push({
//                                     ...reminder,
//                                     before,
//                                     repeat,
//                                     selHour: reminder.selHour + '',
//                                     selMin: reminder.selMin + '',
//                                     ringDate: ringDate.toISOString(),
//                                     done: currDate > ringDate.toISOString(),
//                                     timeId,
//                                   });
//                                 });
//                               });
//                               bulkInsert(
//                                 remTable,
//                                 remFields,
//                                 allReminders,
//                                 () => {
//                                   // and thats it folks, all reminders have been bulk inserted
//                                   store.dispatch(toggleLoading(false));
//                                   !!callBack && callBack(true);
//                                   dispatchDbCall(Database.scheduleRing);
//                                   resolve();
//                                 },
//                                 err => {
//                                   store.dispatch(toggleLoading(false));
//                                   !!callBack && callBack();
//                                   console.log(
//                                     'error Bulk inserting reminders in createRep',
//                                     err,
//                                   );
//                                   resolve();
//                                 },
//                               );
//                             } else {
//                               store.dispatch(toggleLoading(false));
//                               !!callBack && callBack(true);
//                               dispatchDbCall(Database.scheduleRing);
//                               resolve();
//                             }
//                           })
//                           .catch(err => {
//                             store.dispatch(toggleLoading(false));
//                             !!callBack && callBack();
//                             console.log(
//                               'Error getting reminders for taskTimeId in createRep',
//                               err,
//                             );
//                             resolve();
//                           });
//                       },
//                       err => {
//                         store.dispatch(toggleLoading(false));
//                         !!callBack && callBack();
//                         console.log(
//                           'error Bulk inserting times in createRep',
//                           err,
//                         );
//                         resolve();
//                       },
//                     );
//                   },
//                   err => {
//                     store.dispatch(toggleLoading(false));
//                     !!callBack && callBack();
//                     console.log('error Bulk updating tasks in createRep', err);
//                     resolve();
//                   },
//                 );
//               })
//               .catch(err => {
//                 store.dispatch(toggleLoading(false));
//                 !!callBack && callBack();
//                 console.log('error getting task time ids in createRep', err);
//                 resolve();
//               });
//           } else {
//             store.dispatch(toggleLoading(false));
//             !!callBack && callBack();
//             resolve();
//           }
//         })
//         .catch(err => {
//           store.dispatch(toggleLoading(false));
//           !!callBack && callBack();
//           console.log('Error finding repeatable tasks in createRep', err);
//           resolve();
//         });
//     } else {
//       !!callBack && callBack();
//       resolve();
//     }
//   });
// }

// helper function to use less code basically
// for the setting and updating db of new, earlier reminder
// export function updateSchedTime(newSched, callBack) {
//     const setDate = moment.utc(newSched.ring_date);
//     // und here we set the schedule time for the earlier
//     // found time
//     setTime(
//       newSched.id,
//       setDate.year(),
//       setDate.month(),
//       setDate.date(),
//       setDate.hours(),
//       setDate.minutes(),
//       data => {
//         db.transaction(tx => {
//           tx.executeSql(
//             `UPDATE ${remTable} SET ${remTFields.req_code}=? WHERE id=?`,
//             [data.reqCode, newSched.id],
//             () => {
//               // Und thats it folks
//               callBack();
//             },
//             err => {
//               console.log(
//                 'Error updating reminder req code, rem Id',
//                 newSched.id,
//                 ' Error: ',
//                 err,
//               );
//               callBack();
//             },
//           );
//         });
//       },
//     );
//   }

// export function manageAlarmRems(remId, callBack) {
//   return new Promise(resolve => {
//     store.dispatch(toggleLoading(true));
//     let currDate = moment();
//     currDate.add(1, 'minutes');
//     currDate = currDate.format();
//     currDate = currDate.substring(0, currDate.indexOf('+'));
//     exeSqlPromise(
//       `SELECT *, ${remTable}.id as rem_id, ${remTable}.${remTFields.repeatability
//       } as rem_rep, ${remTable}.${remTFields.hours} as rem_hours, ${remTable}.${remTFields.minutes
//       } as rem_minutes FROM ${remTable} LEFT JOIN ${timesTable} ON (${remTable}.${remTFields.time_id
//       } = ${timesTable}.id) LEFT JOIN ${tasksTable} ON (${timesTable}.${timesTFields.task_id
//       } = ${tasksTable}.id) WHERE (rem_id=? OR (${remTable}.${remTFields.done
//       }=? AND ${remTFields.task_done}=? AND ${remTFields.ring_date
//       }<?)) ORDER BY ${remTFields.ring_date}`,
//       [remId, false, false, currDate],
//     )
//       .then(res1 => {
//         const reminders = [];
//         if (res1.rows.length) {
//           const updtFields = [];
//           updtFields.push({
//             name: remTFields.done,
//             valueKey: 'updtDone',
//           });
//           updtFields.push({
//             name: remTFields.ring_date,
//             valueKey: 'updtRing',
//           });

//           for (let i = 0; i < res1.rows.length; i++) {
//             const reminder = res1.rows.item(i);

//             const repeat = reminder.rem_rep && JSON.parse(reminder.rem_rep);

//             let ringDate = reminder.ring_date;
//             let done = true;

//             if (repeat && repeat.type) {
//               currDate = moment.utc(currDate);
//               ringDate = moment.utc(ringDate);
//               // and we always have to add a ring date at least once
//               // cause of time differences at least in development mode
//               ringDate.add(repeat.number, repeat.type);
//               // so here we cover the reminders triggering from the past
//               while (currDate.isAfter(ringDate)) {
//                 ringDate.add(repeat.number, repeat.type);
//               }
//               ringDate = ringDate.toISOString();
//               done = false;
//             }

//             reminders.push({
//               title: `Reminder - ${reminder.title}`,
//               before: reminder.before && JSON.parse(reminder.before),
//               id: reminder.rem_id,
//               key: reminder.rem_id + '',
//               notif: reminder.notif,
//               repRem: !!reminder.rem_rep,
//               repeat,
//               sameTime: reminder.same_time,
//               selHour: reminder.rem_hours,
//               selMin: reminder.rem_minutes,
//               ring_date: reminder.ring_date,
//               taskRemId: reminder.task_rem_id,
//               selected: false,
//               timeDif: '',
//               updtDone: done,
//               updtRing: ringDate,
//             });

//           }

//           bulkUpdate(
//             'id=?',
//             ['id'],
//             remTable,
//             updtFields,
//             reminders,
//             () => {
//               store.dispatch(toggleLoading(false));
//               callBack(reminders);
//               dispatchDbCall(scheduleRing);
//               resolve();
//             },
//             err => {
//               store.dispatch(toggleLoading(false));
//               callBack([]);
//               console.log('error Bulk updating reminders in alarm screen', err);
//               resolve();
//             },
//           );
//         } else {
//           store.dispatch(toggleLoading(false));
//           dispatchDbCall(scheduleRing);
//           callBack(reminders);
//           resolve();
//         }
//       })
//       .catch(err => {
//         store.dispatch(toggleLoading(false));
//         callBack([]);
//         dispatchDbCall(scheduleRing);
//         console.log('error finding reminders for the alarm', err);
//         resolve();
//       });
//   });
// }