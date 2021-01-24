import { dismissNotif, dontRemNot, openApp } from '../testCases/general';
import { checkAlarmScreen, checkNotif } from '../testCases/check';
import { addItemRem } from '../testCases/add';
import { remTask } from '../testCases/remove';
import { navigate } from '../testCases/nav';
import { hasTxt, pressItem, waitElVis } from '../testCases/testSteps/general';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { taskData } from '../testCases/consts/task';
import { daySelIds } from '../../components/DaySelection/testIds';
import { alarmIds } from '../../screens/Alarm/testIds';
import { titBarIds } from '../../components/TitleBar/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';

describe('Schedule Ring - Alarm actions test', () => {
  // TODO: remove this after finishing all them test plans
  it('Alarm actions rng test', () => openApp());
  // it('Make sure alarm repeats after pressing "Show in app"', async function () {
  //   await checkAlarmScreen('app');
  // });
  // it('Show in app for a task in another day', async function () {
  //   await navigate(actMenIds.todAct);
  //   // then we go to the next day
  //   await pressItem(daySelIds.forwArr);
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     taskData.desc,
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     false,
  //     true,
  //     'days'
  //   );
  //   await waitElVis(alarmIds.toApp);
  //   await pressItem(alarmIds.toApp);
  //   await hasTxt('Calendar', titBarIds.titText);
  //   await hasTxt(taskData.title, `${tItemIds.titText}-${taskData.title}`);
  //   await hasTxt(taskData.desc, `${tItemIds.descText}-${taskData.title}`);
  //   await remTask(false, taskData.title);
  // });
  // it('Make sure alarm repeats after pressing "Dismiss"', async function () {
  //   await checkAlarmScreen('dism');
  // });
  // it('Make sure alarm repeats after pressing sending app to background', async function () {
  //   await checkAlarmScreen('bac');
  // });
  // it('Make sure alarm DOES NOT repeat after pressing "Dont remind again"', async function () {
  //   await checkAlarmScreen('dontRem');
  // });
  // it('Make sure alarm DOES NOT repeat after pressing NOTIFICATIONS "Dont remind again"', async function () {
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
  //   // we double check to see if notif is repeating
  //   await checkNotif();
  //   await dontRemNot();
  //   await checkNotif(true);
  //   await remTask(actMenIds.todAct, taskData.title);
  // });
});
