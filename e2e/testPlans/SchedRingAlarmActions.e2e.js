import { dismissNotif, dontRemNot, openApp } from '../testCases/general';
import { checkAlarmScreen, checkNotif } from '../testCases/check';
import { addItemRem } from '../testCases/add';
import { remTask } from '../testCases/remove';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';

describe('Schedule Ring - Alarm actions test', () => {
  // TODO: remove this after finishing all them test plans
  // it('Alarm actions rng test', () => openApp());
  it('Make sure alarm repeats after pressing "Go to app"', async function () {
    await checkAlarmScreen('app');
  });
  it('Make sure alarm repeats after pressing "Dismiss"', async function () {
    await checkAlarmScreen('dism');
  });
  it('Make sure alarm repeats after pressing sending app to background', async function () {
    await checkAlarmScreen('bac');
  });
  it('Make sure alarm DOES NOT repeat after pressing "Dont remind again"', async function () {
    await checkAlarmScreen('dontRem');
  });
  it('Make sure alarm DOES NOT repeat after pressing NOTIFICATIONS "Dont remind again"', async function () {
    const time = genFutTime(120000);
    await addItemRem(
      actMenIds.calAct,
      taskData.title,
      '',
      1,
      true,
      time.futHours,
      time.futMins,
      false,
      false,
      false,
      false,
      '2'
    );
    await checkNotif();
    await dismissNotif();
    // we double check to see if notif is repeating
    await checkNotif();
    await dontRemNot();
    await checkNotif(true);
    await remTask(actMenIds.todAct, taskData.title);
  });
});
