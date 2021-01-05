// // IMPORTANT FLOW OF LOGIC TEST PLANS - call it
// // for each testcase in it and use single or a combination
// // of testcase arrangements, for the actual test case of the
// // testplan

/* testCases */
import {
  addEarLaterTaskRem,
  addFullItemRem,
  addItemRem,
} from '../testCases/add';
import { remTask } from '../testCases/remove';
import { checkNotif } from '../testCases/check';
import { dismissNotif, openApp } from '../testCases/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';
/* utils */
import { genFutTime } from '../testCases/utils/general';

describe('ScheduleRing - Add Item Basic', () => {
  //   /* via calendar */
  // TODO: remove this after finishing all them test plans
  it('Random test', () => openApp());

  // it('Add item and on time rem via calendar', async function () {
  //   const tTime = genFutTime(120000);
  //   await addFullItemRem(
  //     actMenIds.calAct,
  //     0,
  //     true,
  //     false,
  //     false,
  //     tTime.futHours,
  //     tTime.futMins
  //   );
  // });
  //   it('Add item and same day rem via calendar', async function () {
  //     const remTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins
  //     );
  //   });
  //   it('Add item and before rem via calendar', async function () {
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       2,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       '18'
  //     );
  //   });
  //   it('Add item and same time rem via calendar with a task time', async function () {
  //     const remTime = genFutTime(120000);
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       tTime.futHours,
  //       tTime.futMins
  //     );
  //   });
  //   /* via day tasks */
  //   it('Add item and on time rem via day tasks', async function () {
  //     const tTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       0,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins
  //     );
  //   });
  //   it('Add item and same day rem via day tasks', async function () {
  //     const remTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins
  //     );
  //   });
  //   it('Add item and before rem via day tasks', async function () {
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       2,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       '18'
  //     );
  //   });
  //   it('Add item and same time rem via day tasks with a task time', async () => {
  //     const remTime = genFutTime(120000);
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       tTime.futHours,
  //       tTime.futMins
  //     );
  //   });
  //   // REPEATABLE PART
  //   /* via calendar */
  //   it('Add repeatable item and on time rem via calendar', async function () {
  //     const tTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       0,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       false,
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and same day rem via calendar', async function () {
  //     const remTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       false,
  //       false,
  //       false,
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and before rem via calendar', async function () {
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       2,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       '18',
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and same time rem via calendar with a task time', async function () {
  //     const remTime = genFutTime(120000);
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.calAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       tTime.futHours,
  //       tTime.futMins,
  //       false,
  //       '1'
  //     );
  //   });
  //   /* via day tasks */
  //   it('Add repeatable item and on time rem via day tasks', async function () {
  //     const tTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       0,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       false,
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and same day rem via day tasks', async function () {
  //     const remTime = genFutTime(120000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       false,
  //       false,
  //       false,
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and before rem via day tasks', async function () {
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       2,
  //       true,
  //       false,
  //       false,
  //       tTime.futHours,
  //       tTime.futMins,
  //       '18',
  //       '1'
  //     );
  //   });
  //   it('Add repeatable item and same time rem via day tasks with a task time', async () => {
  //     const remTime = genFutTime(120000);
  //     const tTime = genFutTime(1200000);
  //     await addFullItemRem(
  //       actMenIds.todAct,
  //       1,
  //       true,
  //       remTime.futHours,
  //       remTime.futMins,
  //       tTime.futHours,
  //       tTime.futMins,
  //       false,
  //       '1'
  //     );
  //   });
});

// describe('ScheduleRing - Add Item Rest', () => {
// it('Add item with a newer reminder than a previous item', async () => {
//   // so here we'll be using on time reminders
//   const earlTit = taskData.title + ' earlier';
//   const laterTit = taskData.title + ' later';

// await addEarLaterTaskRem(
//   earlTit,
//   false,
//   120000,
//   laterTit,
//   false,
//   1200000,
//   0,
//   true
// );

//   await checkNotif();
//   await dismissNotif();

//   // and we just need to clean up the tasks
//   await remTask(actMenIds.calAct, laterTit, false, true);
//   await remTask(actMenIds.todAct, earlTit);
// });

// it('Add item with a later reminder than a previous item', async () => {
//   // so here we'll be using on time reminders

//   const newerTit = taskData.title + ' newer';

//   const laterTit = taskData.title + ' later';

// await addEarLaterTaskRem(newerTit, false, 180000, laterTit, false, 1200000, 0);

//   await checkNotif();
//   await dismissNotif();

//   // and we just need to clean up the times after
//   // a successfull check
//   await remTask(actMenIds.todAct, newerTit, true);
//   await remTask(actMenIds.calAct, laterTit, false);
// });

// it('Add item with reminder set for the past', async () => {
//   // so here we'll be using on time reminders

//   // adding newer time
//   const pastTime = genFutTime(-120000);
//   await addItemRem(
//     actMenIds.calAct,
//     taskData.title,
//     '',
//     0,
//     true,
//     false,
//     false,
//     pastTime.futHours,
//     pastTime.futMins
//   );

//   // and here we'll check if the notification does NOT appear
//   await checkNotif(true);

//   // and we just need to clean up the task
//   await remTask(actMenIds.todAct, taskData.title, false);
// });

//   // REPEATABLE PART
// it('Add repeatable item with a newer reminder than a previous item', async () => {
//   // so here we'll be using on time reminders

//   // adding later time
//   const laterTit = taskData.title + ' later';
//   const earlTit = taskData.title + ' earlier';

// await addEarLaterTaskRem(
//   earlTit,
//   false,
//   120000,
//   laterTit,
//   false,
//   1200000,
//   0,
//   true,
//   false,
//   '1'
// );

//   await checkNotif();
//   await dismissNotif();

//   // and we just need to clean up the later time
//   await remTask(actMenIds.calAct, laterTit, true, true);
//   await remTask(actMenIds.todAct, earlTit);
// });

// it('Add repeatable item with a later reminder than a previous item', async () => {
//   // so here we'll be using on time reminders

//   // adding newer time
//   const newerTit = taskData.title + ' newer';
//   const laterTit = taskData.title + ' later';

// await addEarLaterTaskRem(
//   newerTit,
//   false,
//   180000,
//   laterTit,
//   false,
//   1200000,
//   0,
//   false,
//   false,
//   '1'
// );

//   await checkNotif();
//   await dismissNotif();

//   // and we just need to clean up the times after
//   // a successfull check
//   await remTask(actMenIds.todAct, newerTit, true, true);
//   await remTask(actMenIds.calAct, laterTit, true, false);
// });

//   it('Add repeatable item with reminder set for the past', async () => {
//     // so here we'll be using on time reminders

//     // adding newer time
//     const pastTime = genFutTime(-120000);
//     await addItemRem(
//       actMenIds.calAct,
//       taskData.title,
//       '',
//       0,
//       true,
//       false,
//       false,
//       pastTime.futHours,
//       pastTime.futMins,
//       false,
//       '1'
//     );

//     // and here we'll check if the notification does NOT appear
//     await checkNotif(true);

//     // and we just need to clean up the task
//     await remTask(actMenIds.todAct, taskData.title, true, false);
//   });
// });
