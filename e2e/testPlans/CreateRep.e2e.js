import { addItemRem, addRemToTask } from '../testCases/add';
import { dismissNotif, openApp } from '../testCases/general';
import { containTxt, elVis, pressItem } from '../testCases/testSteps/general';
import { remTask } from '../testCases/remove';
import { editTaskNav, navigate, navToDay } from '../testCases/nav';
import { checkNotif } from '../testCases/check';
/* utils */
import { addZeroT, genFutTime } from '../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';
import { tItemIds } from '../../components/TaskItem/testIds';
import { remPrevIds } from '../../screens/Task/components/RemPrev/testIds';
import { daySelIds } from '../../components/DaySelection/testIds';

describe('Create rep', () => {
  // TODO: remove this after finishing all them test plans
  // it('Random test create rep', () => openApp());
  it('Seeing if reminders get created for repeatable tasks with createRep', async function () {
    // adding on time rem
    const time1 = genFutTime(1200000);
    await addItemRem(
      actMenIds.calAct,
      taskData.title,
      '',
      0,
      true,
      false,
      false,
      time1.futHours,
      time1.futMins,
      false,
      '1'
    );
    // adding same time rem
    await addRemToTask(taskData.title, time1.futHours, time1.futMins, 1);
    // adding before rem
    await addRemToTask(taskData.title, false, false, 2, '40');
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    date = new Date(year + 1, month, day);
    // then we move 1 year into the future
    await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
    // wait for our task to be visible
    await elVis(`${tItemIds.mainBut}-${taskData.title}`);
    // we go into the task
    await editTaskNav(taskData.title);
    // and we check if reminders are present
    // checking for on time
    await containTxt('on time', remPrevIds.mainRemText(0));
    // checking same day
    await containTxt(
      `same day ${addZeroT(time1.futHours)}:${addZeroT(time1.futMins)}`,
      remPrevIds.mainRemText(1)
    );
    // checking before rem
    await containTxt('40 mins before', remPrevIds.mainRemText(2));
    // and after we've checked this we can clean up
    await remTask(actMenIds.todAct, taskData.title, true);
  });
  it('Seeing if schedule ring activates for reminders created by create rep', async function () {
    // so first we go into the past
    const date = new Date();
    // so first we go to january 1st of current year
    await navToDay(date.getFullYear(), 0, 1);
    // then we move back by one day putting us into last year
    await pressItem(daySelIds.backArr);
    // and then we go to january first of last year
    await navToDay(false, 0, 1, true);
    // adding same time rem
    const time1 = genFutTime(180000);
    await addItemRem(
      false,
      taskData.title,
      '',
      1,
      true,
      time1.futHours,
      time1.futMins,
      false,
      false,
      false,
      '1'
    );
    // then we go to today, for our tasks with reminders
    // to be generated
    await navigate(actMenIds.todAct);
    // and finally we wait for the ring
    await checkNotif();
    await dismissNotif();
    // and after we've checked this we can clean up
    await remTask(actMenIds.calAct, taskData.title, true, true, true);
  });
});
