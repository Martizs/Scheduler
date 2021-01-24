import {
  addEarLaterTaskRem,
  addItemRem,
  addReminder,
  addTask,
} from '../testCases/add';
import { hasTxt, pressItem } from '../testCases/testSteps/general';
import { checkNotif } from '../testCases/check';
import { dismissNotif, openApp } from '../testCases/general';
import { remTask } from '../testCases/remove';
import { editTaskNav, navigate, navToDay } from '../testCases/nav';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { taskData } from '../testCases/consts/task';
import { tItemIds } from '../../components/TaskItem/testIds';
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { titBarIds } from '../../components/TitleBar/testIds';
import { taskIds } from '../../screens/Task/testIds';
import { updateRem } from '../testCases/update';

describe('ScheduleRing - Done Task', () => {
  // TODO: remove this after finishing all them test plans
  it('Random test done task', () => openApp());

  // const earlTit = taskData.title + ' earlier';
  // const latTit = taskData.title + ' later';

  // // using same day rems
  // it('Earliest reminders task getting doned', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   // +3mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);

  //   await pressItem(`${tItemIds.checkBox}-${earlTit}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   const currTime = new Date();
  //   if (currTime <= timeToMatch) {
  //     throw `Reminder rung too early, currentTime: ${currTime},
  //        time that should have been earlier than current: ${timeToMatch}`;
  //   }

  //   await remTask(actMenIds.calAct, earlTit, false, true, true);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });

  // it('Later reminders task getting doned', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   await pressItem(`${tItemIds.checkBox}-${latTit}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, earlTit, false, true, true);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });

  // it('Earliest  reminders task getting doned and undoned', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   // +3mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);

  //   await pressItem(`${tItemIds.checkBox}-${earlTit}`);
  //   await pressItem(`${tItemIds.checkBox}-${earlTit}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   const currTime = new Date();
  //   if (currTime > timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //            time that should have been later than current: ${timeToMatch}`;
  //   }

  //   await remTask(actMenIds.calAct, earlTit, false, true, true);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });

  // it('Later  reminders task getting doned and undoned', async function () {
  //   // +2mins & +4mins
  //   await addEarLaterTaskRem(earlTit, 120000, false, latTit, 240000, false, 1);

  //   // +3mins
  //   let timeToMatch = new Date();
  //   timeToMatch = new Date(timeToMatch.getTime() + 180000);

  //   await pressItem(`${tItemIds.checkBox}-${latTit}`);
  //   await pressItem(`${tItemIds.checkBox}-${latTit}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   const currTime = new Date();
  //   if (currTime > timeToMatch) {
  //     throw `Reminder rung too late, currentTime: ${currTime},
  //            time that should have been later than current: ${timeToMatch}`;
  //   }

  //   await checkNotif();
  //   await dismissNotif();

  //   await remTask(actMenIds.calAct, earlTit, false, true, true);
  //   await remTask(actMenIds.todAct, latTit, false, true);
  // });

  // it('Adding reminder to a doned task', async function () {
  //   await addTask(actMenIds.calAct, taskData.title);
  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   const newTime = genFutTime(120000);

  //   await editTaskNav(taskData.title);

  //   await addReminder(1, 1, newTime.futHours, newTime.futMins);

  //   await pressItem(taskIds.addBut);

  //   await hasTxt('Calendar', titBarIds.titText);

  //   await checkNotif(true);

  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });

  // it('Adding reminder to a doned task and then undoning', async function () {
  //   await addTask(actMenIds.calAct, taskData.title);
  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   const newTime = genFutTime(120000);

  //   await editTaskNav(taskData.title);

  //   await addReminder(1, 1, newTime.futHours, newTime.futMins);

  //   await pressItem(taskIds.addBut);

  //   await hasTxt('Calendar', titBarIds.titText);

  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   await remTask(actMenIds.todAct, taskData.title, false, true);
  // });

  // it('Updating a doned tasks reminder', async function () {
  //   const time = genFutTime(1200000);
  //   // `task with bef rem +4mins
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
  //     '16'
  //   );

  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await updateRem(taskData.title, 0, 2, true, false, false, '18');

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });

  // it('Updating a doned tasks reminder and then undoning', async function () {
  //   const time = genFutTime(1200000);
  //   // `task with bef rem +4mins
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
  //     '16'
  //   );

  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await updateRem(taskData.title, 0, 2, true, false, false, '18');

  //   await hasTxt('Today', titBarIds.titText);

  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });

  // it('Done a repeatable task in the past so that another would still trigger', async function () {
  //   // first we navigate to yesterday
  //   const date = new Date();
  //   date.setDate(date.getDate() - 1);

  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());

  //   const time = genFutTime(120000);
  //   // on time rem
  //   await addItemRem(
  //     false,
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

  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await checkNotif();
  //   await dismissNotif();

  //   await remTask(actMenIds.calAct, taskData.title, true, true);
  // });

  // it('Done a repeated reminders task', async function () {
  //   const time = genFutTime(120000);
  //   // on time rem
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

  //   await checkNotif();
  //   await dismissNotif();

  //   await navigate(actMenIds.todAct);
  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });

  // it('Doning and undoning a task after its reminder has doned itself ', async function () {
  //   const time = genFutTime(120000);
  //   // on time rem
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
  //     false
  //   );

  //   await checkNotif();
  //   await dismissNotif();

  //   await navigate(actMenIds.todAct);
  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);
  //   await pressItem(`${tItemIds.checkBox}-${taskData.title}`);

  //   await checkNotif(true);

  //   await remTask(actMenIds.calAct, taskData.title, false, true);
  // });
});
