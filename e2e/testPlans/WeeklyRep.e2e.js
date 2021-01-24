import { dismissNotif, openApp } from '../testCases/general';
import { addItemRem, addTask } from '../testCases/add';
import { checkNotif } from '../testCases/check';
import { remTask } from '../testCases/remove';
import { editTaskNav, navigate, navToDay } from '../testCases/nav';
import {
  pressItem,
  waitElNotVis,
  waitElVis,
} from '../testCases/testSteps/general';
import { updateTask } from '../testCases/update';
/* utils */
import moment from 'moment';
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { daySelIds } from '../../components/DaySelection/testIds';
import { taskData } from '../testCases/consts/task';
import { tItemIds } from '../../components/TaskItem/testIds';
import { taskIds } from '../../screens/Task/testIds';

describe('Weekly repeatability', () => {
  // TODO: remove this after finishing all them test plans
  it('Weekly rep rng test', () => openApp());
  // it('Create weekly rep from another day for today and yesterday and check reminder ring and repeat', async function () {
  //   const todayWName = moment().format('dddd');
  //   const yestWName = moment().subtract(1, 'days').format('dddd');
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '2',
  //     false,
  //     false,
  //     [todayWName, yestWName]
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, true, true, true);
  // });
  //   it('Weekly rep and createRep for it test', async function () {
  //     const todayWName = moment().format('dddd');
  //     const yestWName = moment().subtract(1, 'days').format('dddd');
  //     const checkDate = moment();
  //     // so we'll start at monday for the checks
  //     checkDate.day(1);
  //     const repWDays = [todayWName, yestWName];
  //     await addTask(
  //       actMenIds.calAct,
  //       taskData.title,
  //       '',
  //       false,
  //       false,
  //       false,
  //       false,
  //       repWDays
  //     );
  //     // then checking the current and next week days to have the weekly rep created
  //     for (let i = 0; i < 14; i++) {
  //       await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //       let checkWName = checkDate.format('dddd');
  //       if (repWDays.indexOf(checkWName) !== -1) {
  //         // the task needs to exists
  //         await waitElVis(`${tItemIds.mainBut}-${taskData.title}`, 3000);
  //       } else {
  //         // the task needs to NOT exist
  //         await waitElNotVis(`${tItemIds.mainBut}-${taskData.title}`, 3000);
  //       }
  //       checkDate.add(1, 'days');
  //     }
  //     // then we go to +4months from current and check 3months to have the
  //     // correct data, so we'll use +44 days
  //     checkDate.add(4, 'months');
  //     // aaaand we check the rest of the days to
  //     for (let i = 0; i < 44; i++) {
  //       console.log('checkDate', checkDate.toString());
  //       await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //       let checkWName = checkDate.format('dddd');
  //       if (repWDays.indexOf(checkWName) !== -1) {
  //         // the task needs to exists
  //         await waitElVis(`${tItemIds.mainBut}-${taskData.title}`, 3000);
  //       } else {
  //         // the task needs to NOT exist
  //         await waitElNotVis(`${tItemIds.mainBut}-${taskData.title}`, 3000);
  //       }
  //       checkDate.add(1, 'days');
  //     }
  //     await remTask(actMenIds.calAct, taskData.title, true, true, true);
  //   });
  //   it('Two Weekly reps and createRep for it test', async function () {
  //     const todayWName = moment().format('dddd');
  //     const yestWName = moment().subtract(1, 'days').format('dddd');
  //     const checkDate = moment();
  //     // so we'll start at monday for the checks
  //     checkDate.day(1);
  //     const tit1 = taskData.title + '1';
  //     const tit2 = taskData.title + '2';
  //     const repWDays = [todayWName, yestWName];
  //     await addTask(
  //       actMenIds.calAct,
  //       tit1,
  //       '',
  //       false,
  //       false,
  //       false,
  //       false,
  //       repWDays
  //     );
  //     await addTask(
  //       actMenIds.todAct,
  //       tit2,
  //       '',
  //       false,
  //       false,
  //       false,
  //       false,
  //       repWDays
  //     );
  //   // then checking the current and next week days to have the weekly rep created
  //   for (let i = 0; i < 14; i++) {
  //     await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //     let checkWName = checkDate.format('dddd');
  //     if (repWDays.indexOf(checkWName) !== -1) {
  //       // the task needs to exists
  //       await waitElVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //       await waitElVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //     } else {
  //       // the task needs to NOT exist
  //       await waitElNotVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //       await waitElNotVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //     }
  //     checkDate.add(1, 'days');
  //   }
  //   // then we go to +4months from current and check 3months to have the
  //   // correct data, so we'll use +44 days
  //   checkDate.add(4, 'months');
  //   // aaaand we check the rest of the days to
  //   for (let i = 0; i < 44; i++) {
  //     console.log('checkDate', checkDate.toString());
  //     await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //     let checkWName = checkDate.format('dddd');
  //     if (repWDays.indexOf(checkWName) !== -1) {
  //       // the task needs to exists
  //       await waitElVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //       await waitElVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //     } else {
  //       // the task needs to NOT exist
  //       await waitElNotVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //       await waitElNotVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //     }
  //     checkDate.add(1, 'days');
  //   }
  //     await remTask(actMenIds.calAct, tit1, true, true, true);
  //     await remTask(actMenIds.todAct, tit2, true, true, true);
  //   });
  //   it('Two Weekly reps and one period rep and createRep for it test', async function () {
  //     const todayWName = moment().format('dddd');
  //     const yestWName = moment().subtract(1, 'days').format('dddd');
  //     const checkDate = moment();
  //     // so we'll start at monday for the checks
  //     checkDate.day(1);
  //     const tit1 = taskData.title + '1';
  //     const tit2 = taskData.title + '2';
  //     const tit3 = taskData.title + '3';
  //     const repWDays = [todayWName, yestWName];
  //     await addTask(
  //       actMenIds.calAct,
  //       tit1,
  //       '',
  //       false,
  //       false,
  //       false,
  //       false,
  //       repWDays
  //     );
  //     await addTask(
  //       actMenIds.todAct,
  //       tit2,
  //       '',
  //       false,
  //       false,
  //       false,
  //       false,
  //       repWDays
  //     );
  //     await addTask(actMenIds.todAct, tit3, '', false, false, '1', 'days');
  //     let startPerCheck = false;
  //     const today = moment();
  //     // then checking the current and next week days to have the weekly rep created
  //     for (let i = 0; i < 14; i++) {
  //       await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //       if (!startPerCheck && checkDate.diff(today, 'days') === 0) {
  //         startPerCheck = true;
  //       }
  //       if (startPerCheck) {
  //         await waitElVis(`${tItemIds.mainBut}-${tit3}`, 3000);
  //       }
  //       let checkWName = checkDate.format('dddd');
  //       if (repWDays.indexOf(checkWName) !== -1) {
  //         // the task needs to exists
  //         await waitElVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //         await waitElVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //       } else {
  //         // the task needs to NOT exist
  //         await waitElNotVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //         await waitElNotVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //       }
  //       checkDate.add(1, 'days');
  //     }
  //     // then we go to +4months from current and check 3months to have the
  //     // correct data, so we'll use +44 days
  //     checkDate.add(4, 'months');
  //     // aaaand we check the rest of the days to
  //     for (let i = 0; i < 44; i++) {
  //       console.log('checkDate', checkDate.toString());
  //       await navToDay(checkDate.year(), checkDate.month(), checkDate.date());
  //       let checkWName = checkDate.format('dddd');
  //       if (repWDays.indexOf(checkWName) !== -1) {
  //         // the task needs to exists
  //         await waitElVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //         await waitElVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //       } else {
  //         // the task needs to NOT exist
  //         await waitElNotVis(`${tItemIds.mainBut}-${tit1}`, 3000);
  //         await waitElNotVis(`${tItemIds.mainBut}-${tit2}`, 3000);
  //       }
  //       checkDate.add(1, 'days');
  //     }
  //     await remTask(actMenIds.calAct, tit1, true, true, true);
  //     await remTask(actMenIds.todAct, tit2, true, true, true);
  //     await remTask(actMenIds.calAct, tit3, true);
  //   });
  //   it('Weekly rep turned to single, will do el not vis and ring check', async function () {
  //     const todayWName = moment().format('dddd');
  //     const time = genFutTime(120000);
  //     await addItemRem(
  //       actMenIds.calAct,
  //       taskData.title,
  //       '',
  //       1,
  //       true,
  //       time.futHours,
  //       time.futMins,
  //       false,
  //       false,
  //       false,
  //       false,
  //       '2',
  //       false,
  //       false,
  //       [todayWName]
  //     );
  //     await updateTask(taskData.title, false, false, true);
  //     await editTaskNav(taskData.title);
  //     await waitElNotVis(taskIds.repToSing, 3000);
  //     await checkNotif();
  //     await dismissNotif();
  //     await checkNotif();
  //     await dismissNotif();
  //     await remTask(actMenIds.calAct, taskData.title);
  //     const today = moment();
  //     today.add(1, 'weeks');
  //     await navToDay(today.year(), today.month(), today.date());
  //     await remTask(false, taskData.title, true, true, true);
  //   });
  // NOTE this needs to be the last day in test plan because of the way it works
  //   it('Create weekly rep from another day for yesterday and day before and check reminder NOT ringing', async function () {
  //     const yestWName = moment().subtract(1, 'days').format('dddd');
  //     const dayBef = moment().subtract(2, 'days').format('dddd');
  //     await navigate(actMenIds.todAct);
  //     // then we go to the next day
  //     await pressItem(daySelIds.forwArr);
  //     const time = genFutTime(120000);
  //     await addItemRem(
  //       false,
  //       taskData.title,
  //       '',
  //       1,
  //       true,
  //       time.futHours,
  //       time.futMins,
  //       false,
  //       false,
  //       false,
  //       false,
  //       '2',
  //       false,
  //       false,
  //       [dayBef, yestWName]
  //     );
  //     await checkNotif(true);
  //   });
});
