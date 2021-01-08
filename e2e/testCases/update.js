import { containTxt, hasTxt, pressItem, scrollTo } from './testSteps/general';
import { editTaskNav, navigate } from './nav';
import { remFill, taskFill } from './fill';
/* consts */
import { remPrevIds } from '../../screens/Task/components/RemPrev/testIds';
import { titBarIds } from './../../components/TitleBar/testIds';
import { remIds } from '../../screens/Reminder/testIds';
import { taskIds } from '../../screens/Task/testIds';
import { actMenIds } from '../../screens/ActionMenu/testIds';

// update reminder helper
// NOTE: already assumes that the Day task list is opened
export async function updateRem(
  taskTitle,
  updtInd,
  sameTime,
  notif,
  hours,
  mins,
  befMins,
  repRem,
  repUpt,
  befType
) {
  if (taskTitle) {
    await editTaskNav(taskTitle);
  }

  await scrollTo(
    remPrevIds.mainRemBut(updtInd),
    remPrevIds.remPrevScroll,
    'right'
  );

  // we open reminder to edit it
  await pressItem(remPrevIds.mainRemBut(updtInd));

  // we fill the reminder dets
  await remFill(sameTime, notif, hours, mins, befMins, befType, repRem, repUpt);

  // and we press the update button on the reminder
  await pressItem(remIds.addUptBut);

  // we wait for the task screen to load
  await hasTxt('Task', titBarIds.titText);

  // so now we check if the reminder has been updated correctly
  // in the rem preview
  if (hours && mins && sameTime === 1) {
    // so if hours and mins were passed in to be updated we'll cross check that
    await containTxt(hours + '', remPrevIds.mainRemText(updtInd));
    await containTxt(mins + '', remPrevIds.mainRemText(updtInd));
  }

  // aaand if its a before reminder it needs to had the updated
  // number
  if (befMins) {
    await containTxt(befMins + '', remPrevIds.mainRemText(updtInd));
  }

  // after all validations are correct we press update on the
  // task itself to update its reminder
  await pressItem(taskIds.addBut);
}

// assumes that the day task list is visible
export async function updateTask(taskTitle, hours, mins, repNum) {
  await editTaskNav(taskTitle);
  await taskFill(taskTitle, '', hours, mins, repNum, true);
  await pressItem(taskIds.addBut);
}

// function that updates task and reminder
export async function updateTaskRem(
  taskTitle,
  tHours,
  tMins,
  tRep,
  updtInd,
  sameTime,
  notif,
  rHours,
  rMins,
  befMins,
  repRem,
  repRemUpt
) {
  await navigate(actMenIds.calAct);

  await editTaskNav(taskTitle);
  await taskFill(taskTitle, '', tHours, tMins, tRep, true);

  if (!tHours && !tMins) {
    // so because these tests are stupid here
    // and on press apperantly just removes the keyboard and the focus
    // for when text is added only for the task title
    // we'll do a prepress for everything to work fine
    await pressItem(remPrevIds.mainRemBut(updtInd));
  }

  await updateRem(
    false,
    updtInd,
    sameTime,
    notif,
    rHours,
    rMins,
    befMins,
    repRem,
    repRemUpt
  );

  await hasTxt('Calendar', titBarIds.titText);
}
