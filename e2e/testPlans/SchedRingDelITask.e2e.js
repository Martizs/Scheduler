import { addEarLaterTaskRem } from '../testCases/add';
import { remTask } from '../testCases/remove';
import { checkNotif } from '../testCases/check';
import { dismissNotif, openApp } from '../testCases/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';

describe('ScheduleRing - Delete Task', () => {
  // TODO: remove this after finishing all them test plans
  it('Random test delete task', () => openApp());

  // const earlTit = taskData.title + ' earlier';
  // const latTit = taskData.title + ' later';

  // // will be using same day rems
  // it('delete task with earliest reminder for another reminder to get set', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   // +3mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);

  //   await remTask(actMenIds.todAct, earlTit, false, true);

  //   await checkNotif();
  //   await dismissNotif();

  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //        time that should have been earlier than current: ${timeToMatch}`;
  //   }

  //   // clean up
  //   await remTask(actMenIds.todAct, latTit);
  // });

  // it('delete task with later reminder', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   await remTask(actMenIds.todAct, latTit);

  //   await checkNotif();
  //   await dismissNotif();

  //   await checkNotif(true);

  //   // clean up
  //   await remTask(actMenIds.calAct, earlTit, false, true);
  // });

  // it('delete task with reminder in the past', async function () {
  //   // -2mins & -4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     -120000,
  //     false,
  //     latTit,
  //     -240000,
  //     false,
  //     1
  //   );

  //   await remTask(actMenIds.todAct, latTit);
  //   await remTask(actMenIds.calAct, earlTit, false, true);

  //   await checkNotif(true);
  // });
  // it('delete task with reminder in the past, but that a reminder would still trigger', async function () {
  //   // +2mins & -4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, -240000, false, 1);

  //   await remTask(actMenIds.todAct, latTit);

  //   await checkNotif();
  //   await dismissNotif();

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, earlTit);
  // });

  // // --------------------------------------------
  // // REP TASK TEST
  // // --------------------------------------------

  // it('delete task with earliest reminder for another reminder to get set - rep task', async function () {
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

  //   // +3mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);

  //   await remTask(actMenIds.todAct, earlTit, true, true);

  //   await checkNotif();
  //   await dismissNotif();

  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //            time that should have been earlier than current: ${timeToMatch}`;
  //   }

  //   // clean up
  //   await remTask(actMenIds.todAct, latTit, true);
  // });

  // it('delete task with later reminder - rep task', async function () {
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

  //   await remTask(actMenIds.todAct, latTit, true);

  //   await checkNotif();
  //   await dismissNotif();

  //   await checkNotif(true);

  //   // clean up
  //   await remTask(actMenIds.calAct, earlTit, true, true);
  // });

  // it('delete task with reminder in the past - rep task', async function () {
  //   // -2mins & -4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     -120000,
  //     false,
  //     latTit,
  //     -240000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );

  //   await remTask(actMenIds.todAct, latTit, true);
  //   await remTask(actMenIds.calAct, earlTit, true, true);

  //   await checkNotif(true);
  // });
  // it('delete task with reminder in the past, but that a reminder would still trigger - rep task', async function () {
  //   // +2mins & -4mins
  //   await addEarLaterTaskRem(
  //     earlTit,
  //     120000,
  //     false,
  //     latTit,
  //     -240000,
  //     false,
  //     1,
  //     false,
  //     false,
  //     '1'
  //   );

  //   await remTask(actMenIds.todAct, latTit, true);

  //   await checkNotif();
  //   await dismissNotif();

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, earlTit, true);
  // });
});
