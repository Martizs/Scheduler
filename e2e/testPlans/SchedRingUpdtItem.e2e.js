import {
  addEarLaterRems,
  addEarLaterTaskRem,
  addItemRem,
  addRemToTask,
} from '../testCases/add';
import { checkNotif } from '../testCases/check';
import { dismissNotif, openApp } from '../testCases/general';
import { remRem, remTask } from '../testCases/remove';
import { updateRem, updateTask } from '../testCases/update';
import { editTaskNav, navigate } from '../testCases/nav';
import { pressItem, waitElVis } from '../testCases/testSteps/general';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from './../testCases/consts/task';
import { daySelIds } from '../../components/DaySelection/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';

describe('ScheduleRing - Update Item', () => {
  // TODO: remove this after finishing all them test plans
  it('Random test update item', () => openApp());
  // it('Update earliest reminder to earlier time', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   // we do both that late so we would make sure that
  //   // the newly updated reminder to be only +2mins
  //   // would actually ring
  //   // cause if it don't ring in 2mins and rings in 20mins instead
  //   // the test will fail cause of timeout
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     1200000,
  //     false,
  //     latTit,
  //     1800000,
  //     false,
  //     1
  //   );
  //   const earlTime = genFutTime(120000);
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(earlTit, 0, 1, true, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update earliest reminder to later time', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   // +2mins & +30mins & same day rems
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 1800000, false, 1);
  //   // +4mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(earlTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update later reminder to earliest time', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     1200000,
  //     false,
  //     latTit,
  //     1800000,
  //     false,
  //     1
  //   );
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(latTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update later reminder to later time', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +20mins & same day rems
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 1200000, false, 1);
  //   // +30mins
  //   const laterTime = genFutTime(1800000);
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(latTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove earliest reminder leaving another rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);
  //   await remRem(earlTit, 0);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove later reminder', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);
  //   await remRem(latTit, 0);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove, update, add reminders at the same time', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +4mins & +6mins & same day rems
  //   await addEarLaterTaskRem(earlTit, 240000, false, latTit, 360000, false, 1);
  //   await remRem(earlTit, 0);
  //   const earlTime = genFutTime(120000);
  //   await updateRem(latTit, 0, 1, true, earlTime.futHours, earlTime.futMins);
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTRemTit = taskData.title + ' new';
  //   const newTime = genFutTime(480000);
  //   // adding new later rem for +8mins
  //   await addItemRem(
  //     actMenIds.todAct,
  //     newTRemTit,
  //     '',
  //     1,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins,
  //     false,
  //     false
  //   );
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  //   await remTask(actMenIds.calAct, newTRemTit);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateRem(earlTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update earliest reminder to earlier time using on time rems', async function () {
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & on time rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0
  //   );
  //   const earlTime = genFutTime(120000);
  //   await updateTask(earlTit, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - on time rems', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, false, 120000, latTit, false, 240000, 0);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update later reminder to earliest time - on time rems', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0
  //   );
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   await updateTask(latTit, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update task time to later with an on time reminder for it to be the earliest', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +30mins
  //   await addEarLaterTaskRem(earlTit, false, 120000, latTit, false, 1800000, 0);
  //   // +4 mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('remove all reminders so none would be scheduled', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +30mins
  //   await addEarLaterTaskRem(earlTit, false, 120000, latTit, false, 240000, 0);
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  //   await checkNotif(true);
  // });
  // // ------------------------------------------------------------------------
  // // REP TASK TESTS
  // // ------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   // we do both that late so we would make sure that
  //   // the newly updated reminder to be only +2mins
  //   // would actually ring
  //   // cause if it don't ring in 2mins and rings in 20mins instead
  //   // the test will fail cause of timeout
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     1200000,
  //     false,
  //     latTit,
  //     1800000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const earlTime = genFutTime(120000);
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(earlTit, 0, 1, true, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update earliest reminder to later time - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   // +2mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     1800000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +4mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(earlTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update later reminder to earliest time - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     1200000,
  //     false,
  //     latTit,
  //     1800000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(latTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update later reminder to later time - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +20mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     1200000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +30mins
  //   const laterTime = genFutTime(1800000);
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(latTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove earliest reminder leaving another rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     240000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   await remRem(earlTit, 0);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove later reminder', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     240000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   await remRem(latTit, 0);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove, update, add reminders at the same time - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +4mins & +6mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     240000,
  //     false,
  //     latTit,
  //     360000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   await remRem(earlTit, 0);
  //   const earlTime = genFutTime(120000);
  //   await updateRem(latTit, 0, 1, true, earlTime.futHours, earlTime.futMins);
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTRemTit = taskData.title + ' new';
  //   const newTime = genFutTime(480000);
  //   // adding new later rem for +8mins
  //   await addItemRem(
  //     actMenIds.todAct,
  //     newTRemTit,
  //     '',
  //     1,
  //     true,
  //     newTime.futHours,
  //     newTime.futMins,
  //     false,
  //     false,
  //     false,
  //     '1'
  //   );
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   await remTask(actMenIds.calAct, newTRemTit, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     240000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateRem(earlTit, 0, 1, true, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update earliest reminder to earlier time using on time rems - rep task', async function () {
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & on time rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const earlTime = genFutTime(120000);
  //   await updateTask(earlTit, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - on time rems - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     120000,
  //     latTit,
  //     false,
  //     240000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update later reminder to earliest time - on time rems - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   await updateTask(latTit, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update task time to later with an on time reminder for it to be the earliest - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +30mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     120000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +4 mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('remove all reminders so none would be scheduled - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +30mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     120000,
  //     latTit,
  //     false,
  //     240000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   await checkNotif(true);
  // });
  // // ------------------------------------------------------------------------
  // // REP TO SING TASK
  // // ------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time using on time rems - rep task - turned into single', async function () {
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & on time rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const earlTime = genFutTime(120000);
  //   await updateTask(earlTit, earlTime.futHours, earlTime.futMins, true);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   // and here we have to remove the repeated/updated tasks brethren
  //   // so we'll navigate to the next day ourselves and then remove the task without
  //   // default navigation
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   await waitElVis(`${tItemIds.mainBut}-${earlTit}`, 3000);
  //   await remTask(false, earlTit, true, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - on time rems - rep task - to single', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     120000,
  //     latTit,
  //     false,
  //     240000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins, true);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   // and here we have to remove the repeated/updated tasks brethren
  //   // so we'll navigate to the next day ourselves and then remove the task without
  //   // default navigation
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   await waitElVis(`${tItemIds.mainBut}-${earlTit}`, 3000);
  //   await remTask(false, earlTit, true, true);
  // });
  // it('Update later reminder to earliest time - on time rems - rep task - to sing', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   await updateTask(latTit, laterTime.futHours, laterTime.futMins, true);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   await waitElVis(`${tItemIds.mainBut}-${latTit}`, 3000);
  //   await remTask(false, latTit, true, true);
  // });
  // it('Update task time to later with an on time reminder for it to be the earliest - rep task - to sing', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2mins & +30mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     120000,
  //     latTit,
  //     false,
  //     1800000,
  //     0,
  //     false,
  //     false,
  //     '1'
  //   );
  //   // +4 mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(earlTit, laterTime.futHours, laterTime.futMins, true);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   await waitElVis(`${tItemIds.mainBut}-${earlTit}`, 3000);
  //   await remTask(false, earlTit, true, true);
  // });
  // // ---------------------------------------------------------------------------
  // // BEF REMS
  // // ---------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time - bef rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '1'
  //   );
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(earlTit, 0, 2, true, false, false, '17');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update earliest reminder to later time - bef rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(earlTit, 0, 2, true, false, false, '16');
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update later reminder to earliest time - bef rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '1'
  //   );
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(latTit, 0, 2, true, false, false, '28');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Update later reminder to later time - bef rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +40mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     2400000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(latTit, 0, 2, true, false, false, '1');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove earliest reminder leaving another rem - bef rems', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   // +20mins & +22mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   await remRem(earlTit, 0);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove later reminder - bef rem', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +22mins & bef rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   await remRem(latTit, 0);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // it('Remove, update, add reminders at the same time - bef rems', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +22mins & +24mins & bef rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1320000,
  //     latTit,
  //     false,
  //     1440000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   await remRem(earlTit, 0);
  //   await updateRem(latTit, 0, 2, true, false, false, '22');
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTRemTit = taskData.title + ' new';
  //   const newTime = genFutTime(1200000);
  //   // adding new later rem for +8mins
  //   await addItemRem(
  //     actMenIds.todAct,
  //     newTRemTit,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     newTime.futHours,
  //     newTime.futMins,
  //     '12'
  //   );
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  //   await remTask(actMenIds.calAct, newTRemTit);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - bef rems', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +20mins & +22mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18'
  //   );
  //   await updateRem(earlTit, 0, 2, true, false, false, '1');
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });
  // // ---------------------------------------------------------------------------
  // // REP TASK TESTS AND BEF REMS
  // // ---------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time - bef rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '1',
  //     '1'
  //   );
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(earlTit, 0, 2, true, false, false, '17');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update earliest reminder to later time - bef rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(earlTit, 0, 2, true, false, false, '16');
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update later reminder to earliest time - bef rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1800000,
  //     2,
  //     false,
  //     '1',
  //     '1'
  //   );
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(latTit, 0, 2, true, false, false, '28');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Update later reminder to later time - bef rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +40mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     2400000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(latTit, 0, 2, true, false, false, '1');
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove earliest reminder leaving another rem - bef rems - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   // +20mins & +22mins & same day rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   await remRem(earlTit, 0);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove later reminder - bef rem - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +20mins & +22mins & bef rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   await remRem(latTit, 0);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // it('Remove, update, add reminders at the same time - bef rems - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   // +22mins & +24mins & bef rems
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1320000,
  //     latTit,
  //     false,
  //     1440000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   await remRem(earlTit, 0);
  //   await updateRem(latTit, 0, 2, true, false, false, '22');
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTRemTit = taskData.title + ' new';
  //   const newTime = genFutTime(1200000);
  //   // adding new later rem for +8mins
  //   await addItemRem(
  //     actMenIds.todAct,
  //     newTRemTit,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     newTime.futHours,
  //     newTime.futMins,
  //     '12',
  //     '1'
  //   );
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  //   await remTask(actMenIds.calAct, newTRemTit, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - bef rems - rep task', async function () {
  //   // adding earlier reminder
  //   const earlTit = taskData.title + ' earlier';
  //   const latTit = taskData.title + ' later';
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   // +20mins & +22mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     false,
  //     1200000,
  //     latTit,
  //     false,
  //     1320000,
  //     2,
  //     false,
  //     '18',
  //     '1'
  //   );
  //   await updateRem(earlTit, 0, 2, true, false, false, '1');
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, earlTit, true);
  //   await remTask(actMenIds.todAct, latTit, true, true);
  // });
  // // ---------------------------------------------------------------------------------------------
  // // SAME TASK
  // // ---------------------------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time - same task - same day rem', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(false, 1200000, 1, 1800000, 1);
  //   const earlTime = genFutTime(120000);
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     earlTime.futHours,
  //     earlTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update earliest reminder to later time - same task - same day rem', async function () {
  //   // +2mins & +30mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 1800000, 1);
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   // +4mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // it('Update later reminder to earliest time  - same task - same day rem', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(false, 1200000, 1, 1800000, 1);
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update later reminder to later time  - same task - same day rem', async function () {
  //   // +2mins & +20mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 1200000, 1);
  //   // +30mins
  //   const laterTime = genFutTime(1800000);
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // it('Remove earliest reminder leaving another rem - same task - same day rem', async function () {
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 240000, 1);
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   await remRem(taskData.title, 0, 1);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Remove later reminder - same task - same day rem', async function () {
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 240000, 1);
  //   await remRem(taskData.title, 1);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // it('Remove, update, add reminders at the same time - same task - same day rem', async function () {
  //   // +4mins & +6mins & same day rems
  //   await addEarLaterRems(false, 240000, 1, 360000, 1);
  //   await remRem(taskData.title, 0, 1);
  //   const earlTime = genFutTime(120000);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     earlTime.futHours,
  //     earlTime.futMins
  //   );
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTime = genFutTime(480000);
  //   await addRemToTask(taskData.title, newTime.futHours, newTime.futMins, 1);
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - same task - same day rem', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterRems(false, 120000, 1, 240000, 1);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // it('Update earliest reminder to earlier time using on time rem - same task - same day rem', async function () {
  //   // +20mins & +40mins & on time rems
  //   await addEarLaterRems(1200000, false, 0, 2400000, 1);
  //   const earlTime = genFutTime(120000);
  //   await updateTask(taskData.title, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - on time rems - same task - same day rem', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterRems(120000, false, 0, 240000, 1);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(taskData.title, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // it('Update later reminder to earliest time - on time rems - same task - same day rem', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(1200000, false, 0, 1800000, 1);
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title);
  // });
  // it('Update task time to later with an on time reminder for it to be the earliest - same task - same day rem', async function () {
  //   // +2mins & +30mins
  //   await addEarLaterRems(120000, false, 0, 1800000, 1);
  //   // +4 mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(taskData.title, laterTime.futHours, laterTime.futMins);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });
  // // -----------------------------------------------------------------------------------------------------------------
  // // REP TASK TESTS - SAME TASK
  // // -----------------------------------------------------------------------------------------------------------------
  // it('Update earliest reminder to earlier time - same task - same day rem - rep task', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(false, 1200000, 1, 1800000, 1, false, '1');
  //   const earlTime = genFutTime(120000);
  //   // and so we update the earlier reminder to +2mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     earlTime.futHours,
  //     earlTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Update earliest reminder to later time - same task - same day rem - rep task', async function () {
  //   // +2mins & +30mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 1800000, 1, false, '1');
  //   // so this will be +2mins
  //   // and the time that the notification is cought will
  //   // need to exceed this as it will need to ring +4mins
  //   // from current time
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 120000);
  //   // +4mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +4mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
  // it('Update later reminder to earliest time  - same task - same day rem - rep task', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(false, 1200000, 1, 1800000, 1, false, '1');
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   // and so we update the later reminder to +2mins from current time
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Update later reminder to later time  - same task - same day rem - rep task', async function () {
  //   // +2mins & +20mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 1200000, 1, false, '1');
  //   // +30mins
  //   const laterTime = genFutTime(1800000);
  //   // and so we update the later reminder to +30mins from current time
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
  // it('Remove earliest reminder leaving another rem - same task - same day rem - rep task', async function () {
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 240000, 1, false, '1');
  //   // +2.5mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 150000);
  //   await remRem(taskData.title, 0, 1);
  //   // so we wait for later reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //      time that should have been earlier than current: ${timeToMatch}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Remove later reminder - same task - same day rem - rep task', async function () {
  //   // +2mins & +4mins & same day rems
  //   await addEarLaterRems(false, 120000, 1, 240000, 1, false, '1');
  //   await remRem(taskData.title, 1);
  //   // so we wait for earlier reminder to ring
  //   await checkNotif();
  //   await dismissNotif();
  //   // and we wait for later reminder to NOT ring
  //   await checkNotif(true);
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
  // it('Remove, update, add reminders at the same time - same task - same day rem - rep task', async function () {
  //   // +4mins & +6mins & same day rems
  //   await addEarLaterRems(false, 240000, 1, 360000, 1, false, '1');
  //   await remRem(taskData.title, 0, 1);
  //   const earlTime = genFutTime(120000);
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     earlTime.futHours,
  //     earlTime.futMins
  //   );
  //   let min3Time = new Date();
  //   min3Time = new Date(min3Time.getTime() + 180000);
  //   const newTime = genFutTime(480000);
  //   await addRemToTask(taskData.title, newTime.futHours, newTime.futMins, 1);
  //   let min65Time = new Date();
  //   min65Time = new Date(min65Time.getTime() + 390000);
  //   let min9Time = new Date();
  //   min9Time = new Date(min9Time.getTime() + 540000);
  //   // we do checks for the first notif
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime1 = new Date();
  //   if (currTime1 >= min3Time) {
  //     throw `First notification rung too late, currTime: ${currTime1},
  //     time that has been exceeded ${min3Time}`;
  //   }
  //   // we do checks for the second notif
  //   // adding 10min timeout to wait for notif
  //   await checkNotif(false, 600000);
  //   await dismissNotif();
  //   const currTime2 = new Date();
  //   if (currTime2 <= min65Time || currTime2 >= min9Time) {
  //     throw `Second notification rung at an incorrect time, currTime: ${currTime2},
  //     time that should have been before ${min65Time},
  //     time that should have been after ${min9Time}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - same task - same day rem - rep task', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterRems(false, 120000, 1, 240000, 1, false, '1');
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateRem(
  //     taskData.title,
  //     0,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
  // it('Update earliest reminder to earlier time using on time rem - same task - same day rem - rep task', async function () {
  //   // +20mins & +40mins & on time rems
  //   await addEarLaterRems(1200000, false, 0, 2400000, 1, false, '1');
  //   const earlTime = genFutTime(120000);
  //   await updateTask(taskData.title, earlTime.futHours, earlTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Update earliest reminder to later time so that another reminder would become earlier - on time rems - same task - same day rem - rep task', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterRems(120000, false, 0, 240000, 1, false, '1');
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   const laterTime = genFutTime(1200000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(taskData.title, laterTime.futHours, laterTime.futMins);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
  // it('Update later reminder to earliest time - on time rems - same task - same day rem - rep task', async function () {
  //   // +20mins & +30mins & same day rems
  //   await addEarLaterRems(1200000, false, 0, 1800000, 1, false, '1');
  //   // +2mins
  //   const laterTime = genFutTime(120000);
  //   await updateRem(
  //     taskData.title,
  //     1,
  //     1,
  //     true,
  //     laterTime.futHours,
  //     laterTime.futMins
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   // aand after all that we clean up
  //   await remTask(actMenIds.calAct, taskData.title, true);
  // });
  // it('Update task time to later with an on time reminder for it to be the earliest - same task - same day rem - rep task', async function () {
  //   // +2mins & +30mins
  //   await addEarLaterRems(120000, false, 0, 1800000, 1, false, '1');
  //   // +4 mins
  //   const laterTime = genFutTime(240000);
  //   // and so we update the earlier reminder to +20mins from current time
  //   await updateTask(taskData.title, laterTime.futHours, laterTime.futMins);
  //   let timeToCheck = new Date();
  //   // +3mins
  //   timeToCheck = new Date(timeToCheck.getTime() + 180000);
  //   await checkNotif();
  //   await dismissNotif();
  //   const currTime = new Date();
  //   if (timeToCheck > currTime) {
  //     throw `Reminder rung too early. Current time: ${currTime},
  //             time that should have been before: ${timeToCheck}`;
  //   }
  //   // aand after all that we clean up
  //   await remTask(actMenIds.todAct, taskData.title, true, true);
  // });
});
