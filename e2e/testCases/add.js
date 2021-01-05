// KEYWORDS - ADD
import { remFill, taskFillNav } from './fill';
import { hasTxt, pressItem, waitElNotVis } from './testSteps/general';
import { dismissNotif } from './general';
import { remTask } from './remove';
import { checkNotif } from './check';
import { editTaskNav } from './nav';
/* utils */
import { genFutTime, getTitText } from './utils/general';
/* consts */
import { taskData } from './consts/task';
import { taskIds } from './../../screens/Task/testIds';
import { remIds } from '../../screens/Reminder/testIds';
import { titBarIds } from '../../components/TitleBar/testIds';
import { remPrevIds } from '../../screens/Task/components/RemPrev/testIds';
import { actMenIds } from '../../screens/ActionMenu/testIds';

export async function addTask(
  navId,
  title,
  desc,
  tHours,
  tMins,
  repNum,
  repType
) {
  await taskFillNav(navId, title, desc, tHours, tMins, repNum, repType);
  await pressItem(taskIds.addBut);
  await hasTxt(getTitText(navId), titBarIds.titText);
}

// already assumes that its able to press on the
// add reminder button with no other preconditions
export async function addReminder(
  sameTime,
  notif,
  hours,
  mins,
  befMins,
  befType,
  repRem,
  testCheck
) {
  await pressItem(remPrevIds.addRem);
  await remFill(
    sameTime,
    notif,
    hours,
    mins,
    befMins,
    befType,
    repRem,
    false,
    testCheck
  );
  await pressItem(remIds.addUptBut);
}

// adds an item with a rem
export async function addItemRem(
  navId,
  title,
  desc,
  sameTime,
  notif,
  remHours,
  remMins,
  tHours,
  tMins,
  befMins,
  repNum,
  repRem,
  testCheck,
  befType
) {
  await taskFillNav(navId, title, desc, tHours, tMins, repNum);
  if (sameTime > 0) {
    if (tHours?.length && tMins?.length) {
      // so if its NOT an on time reminder and the task
      // got a task time we have to remove the on time reminder
      await pressItem(remPrevIds.delRemBut(0));

      // and we also check if it has been removed
      await waitElNotVis(remPrevIds.mainRemBut(0), 2000);
    }

    await addReminder(
      sameTime,
      notif,
      remHours,
      remMins,
      befMins,
      befType,
      repRem,
      testCheck
    );
  }

  await pressItem(taskIds.addBut);

  if (navId) {
    await hasTxt(getTitText(navId), titBarIds.titText);
  }
}

// adds an item with a rem with full
// checking validations and after task clean up
export async function addFullItemRem(
  navId,
  sameTime,
  notif,
  remHours,
  remMins,
  tHours,
  tMins,
  befMins,
  repNum
) {
  await addItemRem(
    navId,
    taskData.title,
    '',
    sameTime,
    notif,
    remHours,
    remMins,
    tHours,
    tMins,
    befMins,
    repNum
  );

  await checkNotif();
  await dismissNotif();

  // and then we remove the task
  await remTask(navId, taskData.title, repNum, true);
}

// convenience helper function
// creates one earlier and one later task rems
// tasks are different
// always adds in
export async function addEarLaterTaskRem(
  earlTit,
  earlRTime,
  earlTTime,
  latTit,
  latRTime,
  latTTime,
  sameTime,
  reverse,
  befMins,
  repNum
) {
  if (reverse) {
    const lTTime = latTTime && genFutTime(latTTime);
    const lRTime = latRTime && genFutTime(latRTime);
    await addItemRem(
      actMenIds.todAct,
      latTit,
      '',
      sameTime,
      true,
      lRTime && lRTime.futHours,
      lRTime && lRTime.futMins,
      lTTime && lTTime.futHours,
      lTTime && lTTime.futMins,
      befMins,
      repNum
    );

    const eTTime = earlTTime && genFutTime(earlTTime);
    const eRTime = earlRTime && genFutTime(earlRTime);
    await addItemRem(
      actMenIds.calAct,
      earlTit,
      '',
      sameTime,
      true,
      eRTime && eRTime.futHours,
      eRTime && eRTime.futMins,
      eTTime && eTTime.futHours,
      eTTime && eTTime.futMins,
      befMins,
      repNum
    );
  } else {
    const eTTime = earlTTime && genFutTime(earlTTime);
    const eRTime = earlRTime && genFutTime(earlRTime);
    await addItemRem(
      actMenIds.calAct,
      earlTit,
      '',
      sameTime,
      true,
      eRTime && eRTime.futHours,
      eRTime && eRTime.futMins,
      eTTime && eTTime.futHours,
      eTTime && eTTime.futMins,
      befMins,
      repNum
    );

    const lTTime = latTTime && genFutTime(latTTime);
    const lRTime = latRTime && genFutTime(latRTime);
    await addItemRem(
      actMenIds.todAct,
      latTit,
      '',
      sameTime,
      true,
      lRTime && lRTime.futHours,
      lRTime && lRTime.futMins,
      lTTime && lTTime.futHours,
      lTTime && lTTime.futMins,
      befMins,
      repNum
    );
  }
}

// convenience helper function
// creates a task and adds in an
// earlier and later reminders to it.
// using same time reminders
// NOTE
export async function addEarLaterRems(
  taskTime,
  earlRTime,
  eSameTime,
  latRTime,
  lSameTime,
  befMins,
  repNum
) {
  const tTime = taskTime && genFutTime(taskTime);
  const eRTime = earlRTime && genFutTime(earlRTime);
  await addItemRem(
    actMenIds.calAct,
    taskData.title,
    '',
    eSameTime,
    true,
    eRTime && eRTime.futHours,
    eRTime && eRTime.futMins,
    tTime && tTime.futHours,
    tTime && tTime.futMins,
    befMins,
    repNum
  );

  const lRTime = latRTime && genFutTime(latRTime);

  await addRemToTask(
    taskData.title,
    lRTime.futHours,
    lRTime.futMins,
    lSameTime,
    befMins
  );
}

// convenience function to add reminder to an existing task
// from the day tasks list
export async function addRemToTask(
  taskTitle,
  hours,
  minutes,
  sameTime,
  befMins,
  notCal
) {
  await editTaskNav(taskTitle);

  await addReminder(sameTime, true, hours, minutes, befMins);

  await hasTxt('Task', titBarIds.titText);

  await pressItem(taskIds.addBut);

  if (!notCal) {
    await hasTxt('Calendar', titBarIds.titText);
  }
}
