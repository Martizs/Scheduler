import { containTxt, hasTxt, pressItem } from './testSteps/general';
import { editTaskNav } from './nav';
import { remFill, taskFill } from './fill';
/* consts */
import { remPrevIds } from '../../screens/Task/components/RemPrev/testIds';
import { titBarIds } from './../../components/TitleBar/testIds';
import { remIds } from '../../screens/Reminder/testIds';
import { taskIds } from '../../screens/Task/testIds';

// update reminder helper
// NOTE: already assumes that the Day task list is opened
export async function updateRem(
  taskTitle,
  updtInd,
  sameTime,
  notif,
  hours,
  mins,
  befMins
) {
  await editTaskNav(taskTitle);

  // we open reminder to edit it
  await pressItem(remPrevIds.mainRemBut(updtInd));

  // we fill the reminder dets
  await remFill(sameTime, notif, hours, mins, befMins);

  // and we press the update button on the reminder
  await pressItem(remIds.addUptBut);

  // we wait for the task screen to load
  await hasTxt('Task', titBarIds.titText);

  // so now we check if the reminder has been updated correctly
  // in the rem preview
  if (hours && mins) {
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
