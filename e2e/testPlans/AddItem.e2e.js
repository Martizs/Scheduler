import { addItemRem, addRemToTask, addTask } from '../testCases/add';
import { editTaskNav, navigate, navToDay } from '../testCases/nav';
import { updateTask } from '../testCases/update';
import { remTask } from '../testCases/remove';
import { containTxt, waitTextToBe } from '../testCases/testSteps/general';
import { openApp } from '../testCases/general';
import { checkNotif } from '../testCases/check';
/* utils */
import { addZeroT, genFutTime } from './../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';
import { remPrevIds } from '../../screens/Task/components/RemPrev/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';

describe('Create rep', () => {
  // TODO: remove this after finishing all them test plans
  // it('Random test Add itemz', () => openApp());
  //   it('Add in reminders into a future repeatable task time and see if its added into the past one as well', async function () {
  //     await addTask(actMenIds.calAct, taskData.title, '', false, false, '1');
  //     let date = new Date();
  //     date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  //     await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //     const time = genFutTime(1200000);
  //     // adding on time rem
  //     await updateTask(taskData.title, time.futHours, time.futMins);
  //     // adding same time rem
  //     await addRemToTask(
  //       taskData.title,
  //       time.futHours,
  //       time.futMins,
  //       1,
  //       false,
  //       true
  //     );
  //     // adding before rem
  //     await addRemToTask(taskData.title, false, false, 2, '1', true);
  //     await editTaskNav(taskData.title);
  //     await containTxt('on time', remPrevIds.mainRemText(0));
  //     // checking same day
  //     await containTxt(
  //       `same day ${addZeroT(time.futHours)}:${addZeroT(time.futMins)}`,
  //       remPrevIds.mainRemText(1)
  //     );
  //     // checking before rem
  //     await containTxt('1 mins before', remPrevIds.mainRemText(2));
  //     await remTask(actMenIds.todAct, taskData.title, true);
  //   });
  // it('Add in reminder into a future repeatable task, but "edit only this"', async function () {
  //   await addTask(actMenIds.calAct, taskData.title, '', false, false, '1');
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   // adding on time rem
  //   await updateTask(taskData.title, time.futHours, time.futMins, true);
  //   await editTaskNav(taskData.title);
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title, true);
  // });
  it('Add task with days repeatability', async function () {
    await addTask(
      actMenIds.calAct,
      taskData.title,
      '',
      false,
      false,
      '1',
      'days'
    );

    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    await navToDay(date.getFullYear(), date.getMonth(), date.getDate());

    await waitTextToBe(tItemIds.titText, taskData.title, 3000);

    await remTask(actMenIds.todAct, taskData.title, true);
  });
});