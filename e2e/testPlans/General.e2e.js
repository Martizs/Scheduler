import { addItemRem, addReminder } from '../testCases/add';
import { dismissNotif, openApp } from '../testCases/general';
import { editTaskNav, navigate } from '../testCases/nav';
import { elNotVis, pressItem } from '../testCases/testSteps/general';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { taskData } from '../testCases/consts/task';
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskIds } from '../../screens/Task/testIds';
import { remPrevIds } from '../../components/RemPrev/testIds';
import { checkNotif, checkTimeClear } from '../testCases/check';
import { updateTask } from '../testCases/update';
import { remTask } from '../testCases/remove';

describe('General tests', () => {
  // TODO: remove this after finishing all them test plans
  // it('General rng test', () => openApp());

  // it('Clear time test - on time rem', async function () {
  //   await checkTimeClear(120000, 240000, 180000, 0);
  // });

  // it('Clear time test - bef mins rem', async function () {
  //   await checkTimeClear(240000, 240000, 180000, 2, '2', 'mins');
  // });

  // it('Clear time test - bef hours rem', async function () {
  //   await checkTimeClear(3720000, 240000, 180000, 2, '1', 'hours');
  // });

  it('After ring clear time test', async function () {
    const time = genFutTime(240000);

    await addItemRem(
      actMenIds.calAct,
      taskData.title,
      '',
      2,
      true,
      false,
      false,
      time.futHours,
      time.futMins,
      '2',
      false,
      '2',
      false,
      'mins'
    );

    await checkNotif();
    await dismissNotif();

    await checkNotif();
    await dismissNotif();

    await navigate(actMenIds.calAct);

    await editTaskNav(taskData.title);

    await pressItem(taskIds.clearTime);

    await elNotVis(remPrevIds.mainRemBut(0));

    await pressItem(taskIds.addBut);

    await checkNotif(true);

    const newTime = genFutTime(120000);

    await navigate(actMenIds.todAct);

    await updateTask(taskData.title, newTime.futHours, newTime.futMins);

    await editTaskNav(taskData.title);

    await addReminder(0, true, false, false, false, false, '2');

    await pressItem(taskIds.addBut);

    await checkNotif();
    await dismissNotif();

    await checkNotif();
    await dismissNotif();

    await remTask(actMenIds.todAct, taskData.title);
  });
});
