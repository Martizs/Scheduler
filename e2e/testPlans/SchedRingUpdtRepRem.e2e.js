import { addItemRem } from '../testCases/add';
import { checkNotif } from '../testCases/check';
import { dismissNotif, openApp } from '../testCases/general';
import { updateRem, updateTask, updateTaskRem } from '../testCases/update';
import { remTask } from '../testCases/remove';
import { navigate, navToDay } from '../testCases/nav';
import { pressItem } from '../testCases/testSteps/general';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { taskData } from '../testCases/consts/task';
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { daySelIds } from '../../components/DaySelection/testIds';

describe('Schedule Ring - Update rep reminder', () => {
  // TODO: remove this after finishing all them test plans
  it('Updt rep rem rng test', () => openApp());
  // it('Updating a task time, for a ringed, once repeated on time reminder', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const tTime = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     tTime.futHours,
  //     tTime.futMins,
  //     false,
  //     false
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTTime.futHours, newTTime.futMins);
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //        time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // another time to match to see if it repeats itself UNDER 3 mins
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //        time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Updating a task time, for a ringed, once repeated SAME DAY reminder', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const tTime = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     tTime.futHours,
  //     tTime.futMins,
  //     tTime.futHours,
  //     tTime.futMins,
  //     false,
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTTime.futHours, newTTime.futMins);
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //        time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //        time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Updating a reminder time, for a ringed, once repeated SAME DAY reminder', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
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
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins
  //   );
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //        time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //        time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Update repeating reminders repeatability', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
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
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '4',
  //     true
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //        time that should have been before: ${timeMatch3},
  //        time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update repeating reminders notif', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
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
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.todAct);
  //   await updateRem(taskData.title, 0, 1, false, time.futHours, time.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });
  // it('Removing repeating of reminder and setting a new time', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
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
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4 mins
  //   const newTime = genFutTime(240000);
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     false,
  //     newTime.futHours,
  //     newTime.futMins,
  //     false,
  //     '0',
  //     false
  //   );
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //          time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Removing repeating of reminder', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
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
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0',
  //     false
  //   );
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Updating simple reminder to repeatable', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 1, false, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true, true);
  // });
  // // ---------------------------------------------------------------------------
  // // ON TIME REM
  // // ---------------------------------------------------------------------------
  // it('Updating a reminder time, for a ringed, once repeated ON TIME reminder', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTime.futHours, newTime.futMins);
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //          time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //          time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Update repeating reminders repeatability - on time reminder', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '4', true);
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //            time that should have been before: ${timeMatch3},
  //            time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update repeating reminders notif - on time reminder', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.todAct);
  //   await updateRem(taskData.title, 0, 0);
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });
  // it('Removing repeating of reminder and setting a new time - on time rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     0,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0',
  //     false
  //   );
  //   // +4 mins
  //   const newTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTime.futHours, newTime.futMins);
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //              time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Removing repeating of reminder - on time rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     0,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0',
  //     false
  //   );
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Updating simple reminder to repeatable - on time rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 0, false, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true, true);
  // });
  // // ---------------------------------------------------------------------------
  // // BEF REM
  // // ---------------------------------------------------------------------------
  // it('Update repeating reminders repeatability - bef rem', async function () {
  //   // +20mins before rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 2, true, false, false, false, '4', true);
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //          time that should have been before: ${timeMatch3},
  //          time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update repeating reminders notif - bef rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.todAct);
  //   await updateRem(taskData.title, 0, 2);
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });
  // it('Removing repeating of reminder and setting a new time - bef rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4 mins
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     2,
  //     false,
  //     false,
  //     false,
  //     '12',
  //     '0',
  //     false
  //   );
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //            time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Removing repeating of reminder - bef rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     2,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0',
  //     false
  //   );
  //   await checkNotif(true);
  //   await remTask(actMenIds.calAct, taskData.title, false, false, true);
  // });
  // it('Updating simple reminder to repeatable - bef rem', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18'
  //   );
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 2, false, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true, true);
  // });
  // // -------------------------------------------------------------------------
  // // REP TO SING
  // // -------------------------------------------------------------------------
  // it('Updating a task time, for a ringed, once repeated on time reminder - rep to sing', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const tTime = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     tTime.futHours,
  //     tTime.futMins,
  //     false,
  //     '1'
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTTime = genFutTime(240000);
  //   await updateTaskRem(
  //     taskData.title,
  //     newTTime.futHours,
  //     newTTime.futMins,
  //     true,
  //     0,
  //     0,
  //     true
  //   );
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //          time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // another time to match to see if it repeats itself UNDER 3 mins
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //          time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Updating a task time, for a ringed, once repeated SAME DAY reminder - rep to sing', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const tTime = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     tTime.futHours,
  //     tTime.futMins,
  //     tTime.futHours,
  //     tTime.futMins,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTTime.futHours, newTTime.futMins, true);
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //          time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //          time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Updating a reminder time, for a ringed, once repeated SAME DAY reminder - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTime = genFutTime(240000);
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins
  //   );
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //          time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //          time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Update repeating reminders repeatability - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '4',
  //     true
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //          time that should have been before: ${timeMatch3},
  //          time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Update repeating reminders notif - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     false,
  //     time.futHours,
  //     time.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Removing repeating of reminder and setting a new time - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4 mins
  //   const newTime = genFutTime(240000);
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     false,
  //     newTime.futHours,
  //     newTime.futMins,
  //     false,
  //     '0',
  //     false
  //   );
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //            time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Removing repeating of reminder - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0',
  //     false
  //   );
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Updating simple reminder to repeatable - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     1,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     false,
  //     '1'
  //   );
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     1,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '2',
  //     false
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // // ---------------------------------------------------------------------------
  // // ON TIME REM - REP TO SING
  // // ---------------------------------------------------------------------------
  // it('Updating a reminder time, for a ringed, once repeated ON TIME reminder', async function () {
  //   // +2mins on time rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '1'
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4mins
  //   const newTime = genFutTime(240000);
  //   await navigate(actMenIds.todAct);
  //   await updateTask(taskData.title, newTime.futHours, newTime.futMins, true);
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //            time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   currTime = new Date();
  //   if (currTime >= timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //            time that should have been later than current: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Update repeating reminders repeatability - on time reminder - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '1'
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     0,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '4',
  //     true
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //              time that should have been before: ${timeMatch3},
  //              time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Update repeating reminders notif - on time reminder - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '1'
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(taskData.title, false, false, true, 0, 0, false);
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Removing repeating of reminder and setting a new time - on time rem - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     0,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     '1'
  //   );
  //   await updateRem(taskData.title, 0, 0, true, false, false, false, '2');
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   // +4 mins
  //   const newTime = genFutTime(240000);
  //   await updateTaskRem(
  //     taskData.title,
  //     newTime.futHours,
  //     newTime.futMins,
  //     true,
  //     0,
  //     0,
  //     false,
  //     false,
  //     false,
  //     false,
  //     '0'
  //   );
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //                time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // // ---------------------------------------------------------------------------
  // // BEF REM - REP TO SING
  // // ---------------------------------------------------------------------------
  // it('Update repeating reminders repeatability - bef rem - rep to sing', async function () {
  //   // +20mins before rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     2,
  //     true,
  //     false,
  //     false,
  //     false,
  //     '4',
  //     true
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   let timeMatch5 = new Date();
  //   timeMatch5 = new Date(timeMatch5.getTime() + 300000);
  //   await checkNotif();
  //   await dismissNotif();
  //   let currTime = new Date();
  //   if (currTime <= timeMatch3 || currTime >= timeMatch5) {
  //     throw `Reminder rung incorrectly, currentTime: ${currTime},
  //            time that should have been before: ${timeMatch3},
  //            time that should have been after: ${timeMatch5}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Update repeating reminders notif - bef rem - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(taskData.title, false, false, true, 0, 2, true);
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Removing repeating of reminder and setting a new time - bef rem - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   // +4 mins
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     2,
  //     true,
  //     false,
  //     false,
  //     '12',
  //     '0'
  //   );
  //   let timeMatch3 = new Date();
  //   timeMatch3 = new Date(timeMatch3.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeMatch3) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //              time that should have been before: ${timeMatch3}`;
  //   }
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Removing repeating of reminder - bef rem - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     '1',
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     2,
  //     true,
  //     false,
  //     false,
  //     false,
  //     '0'
  //   );
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Updating simple reminder to repeatable - bef rem - rep to sing', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     '1'
  //   );
  //   await updateTaskRem(
  //     taskData.title,
  //     false,
  //     false,
  //     true,
  //     0,
  //     2,
  //     true,
  //     false,
  //     false,
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  //   await pressItem(daySelIds.forwArr);
  //   await remTask(false, taskData.title, true, true);
  // });
  // it('Updating before rem mins repeatability', async function () {
  //   // +2mins same day rem, repeating every 2mins
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.todAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.calAct);
  //   await updateRem(taskData.title, 0, 2, true, false, false, false, '4', true);
  //   await checkNotif();
  //   await dismissNotif();
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `reminder rung too early with currTime: ${currTime},
  //           time that should have been earlier: ${timeToMatch}`;
  //   }
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Updating before reminders notif - rep rem', async function () {
  //   //  1 hour 2 mins
  //   const time = genFutTime(3720000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'hours'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navigate(actMenIds.todAct);
  //   await updateRem(taskData.title, 0, 2);
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.calAct, taskData.title, false, true, true);
  // });
  // it('Updating set time for before days reminder', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'days'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   const newTime = genFutTime(240000);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     2,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins,
  //     '1',
  //     false,
  //     false,
  //     'days'
  //   );
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `reminder rung too early with currTime: ${currTime},
  //               time that should have been earlier: ${timeToMatch}`;
  //   }
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
  // it('Updating set time for before weeks reminder', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'weeks'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   const newTime = genFutTime(240000);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     2,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins,
  //     '1',
  //     false,
  //     false,
  //     'weeks'
  //   );
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `reminder rung too early with currTime: ${currTime},
  //               time that should have been earlier: ${timeToMatch}`;
  //   }
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
});
