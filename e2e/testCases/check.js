import { navigate } from './nav';
import {
  hasTxt,
  openAppBackgr,
  pressItem,
  toBackground,
  waitElVis,
  waitTextToBe,
  waitTextToNotAppear,
} from './testSteps/general';
import { addItemRem } from './add';
import { remTask } from './remove';
/* utils */
import { genFutTime } from './utils/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { nativeIds } from '../../screens/NativeTestScreen/testIds';
import { notifTimeout } from './consts/general';
import { taskData } from './consts/task';
import { alarmIds } from '../../screens/Alarm/testIds';
import { homeIds } from '../../screens/home/testIds';

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
    '',
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
      await hasTxt('Welcome to the homescreen', homeIds.homeTxt);
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
      await hasTxt('Welcome to the homescreen', homeIds.homeTxt);
      break;
    }
  }

  if (type === 'dontRem') {
    await waitTextToNotAppear(alarmIds.toAppTxt, 'Go to app', 180000);
  } else {
    await waitElVis(alarmIds.toApp);
    await pressItem(alarmIds.toApp);
  }

  // clean up
  await remTask(actMenIds.todAct, taskData.title);
}
