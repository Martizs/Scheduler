/* consts */
import { tItemIds } from '../../components/TaskItem/testIds';
import { titBarIds } from '../../components/TitleBar/testIds';
import { taskIds } from '../../screens/Task/testIds';
import { dropDownIds } from './../../components/DropDownList/testIds';
import { appIds } from './../../appIds';
/* steps */
import { editTaskNav, navigate } from './nav';
import {
  pressItem,
  txtNotVis,
  waitElVis,
  longPressIt,
  hasTxt,
  waitElNotVis,
  scrollTo,
  scrollToEnd,
  containTxt,
} from './testSteps/general';
/* utils */
import { getTitText } from './utils/general';
import { remPrevIds } from '../../components/RemPrev/testIds';

export async function remTask(navId, taskTitle, rep, viaOpts, lPress) {
  if (navId) {
    await navigate(navId);
    // we wait to be redirected to the previous screen
    await containTxt(getTitText(navId), titBarIds.titText);
  }

  // so we open up the task item options
  // we longpress or via the option but press
  if (lPress) {
    // and we long press the main button and NOT the options but
    await longPressIt(`${tItemIds.mainBut}-${taskTitle}`);
  } else {
    await pressItem(`${tItemIds.optBut}-${taskTitle}`);
  }

  // we wait for the options first item to appear
  await waitElVis(dropDownIds.ddItem(0), 3000);

  if (viaOpts) {
    // and then we press on the second option to remove the task
    await pressItem(dropDownIds.ddItem(2));

    if (rep) {
      await waitElVis(appIds.modBut(0), 3000);
      // if task is repeatable we want to press the modal
      // button delete all, at least curently
      await pressItem(appIds.modBut(0));
      // then we gotta wait for the modal to dissapear
      await waitElNotVis(appIds.modBut(0), 3000);
    }

    // and to make sure that it has been removed we wait for the task title to NOT be visible
    await txtNotVis(taskTitle);
  } else {
    // in NOT viaOpts case
    // we navigate to the task screen
    // via the options edit button
    await pressItem(dropDownIds.ddItem(0));
    // wait for the task screen to load up
    await hasTxt('Task', titBarIds.titText);
    // and we remove the task
    await pressItem(taskIds.delBut);

    if (rep) {
      await waitElVis(appIds.modBut(0), 3000);
      // if task is repeatable we want to press the modal
      // button delete all, at least curently
      await pressItem(appIds.modBut(0));
      // then we gotta wait for the modal to dissapear
      await waitElNotVis(appIds.modBut(0), 3000);
    }

    if (navId) {
      // we wait to be redirected to the previous screen
      await containTxt(getTitText(navId), titBarIds.titText);
    }

    // and to make sure that it has been removed we wait for the task title to NOT be visible
    await txtNotVis(taskTitle);
  }
}

// assumes that the daytask list is visible already
export async function remRem(taskTitle, updtInd, checkIndex = updtInd) {
  await editTaskNav(taskTitle);

  await scrollToEnd(remPrevIds.remPrevScroll, 'right');

  await pressItem(remPrevIds.delRemBut(updtInd));

  // and we also check if it has been removed
  await waitElNotVis(remPrevIds.mainRemBut(checkIndex), 2000);

  await pressItem(taskIds.addBut);
}
