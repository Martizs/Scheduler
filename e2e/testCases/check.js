import { editTaskNav, navigate } from './nav';
import {
  containTxt,
  elNotVis,
  hasTxt,
  openAppBackgr,
  pressItem,
  toBackground,
  waitElVis,
  waitTextToBe,
  waitTextToNotAppear,
} from './testSteps/general';
import { addItemRem, addReminder } from './add';
import { remTask } from './remove';
import { dismissNotif } from './general';
/* utils */
import { genFutTime } from './utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { nativeIds } from '../../screens/NativeTestScreen/testIds';
import { notifTimeout } from './consts/general';
import { taskData } from './consts/task';
import { alarmIds } from '../../screens/Alarm/testIds';
import { titBarIds } from '../../components/TitleBar/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';
import { taskIds } from '../../screens/Task/testIds';
import { remPrevIds } from '../../components/RemPrev/testIds';

// simply checks for notification to appear or NOT appear
// via our workaround
export async function checkNotif(
  notAppear,
  timeout = notifTimeout,
  checkExtra = 0
) {
  // since when the notification comes up
  // our menu button(which we use for the testing screen)
  // cannot be seen, we need to open the testing screen
  // BEFORE the notification triggers, to see the results
  await navigate(actMenIds.testAct);

  if (notAppear) {
    await waitTextToNotAppear(nativeIds.mainText, 'true', 180000);
  } else {
    // and here we wait until our test screen shows the
    // words 'true' meaning the notification has opened
    await waitTextToBe(nativeIds.mainText, 'true', timeout);

    if (checkExtra) {
      // mainly used for a number of reminders triggering at once
      await waitTextToBe(nativeIds.extraText, checkExtra + '', timeout);
    }
  }
}

// full alarm screen functionality checking
export async function checkAlarmScreen(type) {
  const time = genFutTime(120000);
  // same day rem
  await addItemRem(
    actMenIds.calAct,
    taskData.title,
    taskData.desc,
    1,
    true,
    time.futHours,
    time.futMins,
    false,
    false,
    false,
    false,
    '2',
    true
  );

  await waitElVis(alarmIds.toApp);

  switch (type) {
    case 'app': {
      await pressItem(alarmIds.toApp);
      await hasTxt('Calendar', titBarIds.titText);
      await hasTxt(taskData.title, `${tItemIds.titText}-${taskData.title}`);
      await hasTxt(taskData.desc, `${tItemIds.descText}-${taskData.title}`);
      break;
    }
    case 'dism': {
      await pressItem(alarmIds.dismiss);
      await openAppBackgr();
      break;
    }
    case 'bac': {
      await toBackground();
      await openAppBackgr();
      break;
    }
    case 'dontRem': {
      await pressItem(alarmIds.dontRem);
      await openAppBackgr();
      await hasTxt('Calendar', titBarIds.titText);
      break;
    }
  }

  if (type === 'dontRem') {
    await waitTextToNotAppear(alarmIds.toAppTxt, 'Show in app', 180000);
  } else {
    await waitElVis(alarmIds.toApp);
    await pressItem(alarmIds.toApp);
  }

  // clean up
  await remTask(actMenIds.todAct, taskData.title);
}

export async function checkTimeClear(
  taskTimeOut,
  remTimeout,
  checkTimeOut,
  sameTime,
  befMins,
  befType
) {
  const time = genFutTime(taskTimeOut);

  // adding rems
  await addItemRem(
    actMenIds.calAct,
    taskData.title,
    '',
    sameTime,
    true,
    false,
    false,
    time.futHours,
    time.futMins,
    befMins,
    false,
    false,
    false,
    befType
  );

  await editTaskNav(taskData.title);

  const time4 = genFutTime(remTimeout);

  await addReminder(1, true, time4.futHours, time4.futMins);

  await pressItem(taskIds.addBut);

  await hasTxt('Calendar', titBarIds.titText);

  let timeToCheck = new Date();
  //   // +3mins
  timeToCheck = new Date(timeToCheck.getTime() + checkTimeOut);

  // clearing task
  await editTaskNav(taskData.title);

  await pressItem(taskIds.clearTime);

  await elNotVis(remPrevIds.mainRemBut(1));
  await containTxt('same', remPrevIds.mainRemText(0));

  // then we update and recheck if it updated correctly
  await pressItem(taskIds.addBut);

  await hasTxt('Calendar', titBarIds.titText);

  await editTaskNav(taskData.title);

  await elNotVis(remPrevIds.mainRemBut(1));
  await containTxt('same', remPrevIds.mainRemText(0));

  await checkNotif();
  await dismissNotif();

  const currTime = new Date();

  if (timeToCheck > currTime) {
    throw `Reminder rung too early. Current time: ${currTime},
              time that should have been before: ${timeToCheck}`;
  }

  await remTask(actMenIds.todAct, taskData.title, false, true);
}
