import { elVis, hasTxt, pressItem, waitElVis } from './testSteps/general';
import { openApp } from './general';
/* utils */
import { getTitText } from './utils/general';
/* consts */
import { titBarIds } from './../../components/TitleBar/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';
import { dropDownIds } from '../../components/DropDownList/testIds';

export async function navigate(actId) {
  await openApp();
  await pressItem(titBarIds.menuIcon);

  const titleTxt = getTitText(actId);
  await elVis(actId);
  await pressItem(actId);
  await hasTxt(titleTxt, titBarIds.titText);
}

// assumes that day task list is already viewable
export async function editTaskNav(taskTitle) {
  await pressItem(`${tItemIds.optBut}-${taskTitle}`);

  // we wait for the options first item to appear
  await waitElVis(dropDownIds.ddItem(0), 3000);

  await pressItem(dropDownIds.ddItem(0));

  // we wait for the task screen to load
  await hasTxt('Task', titBarIds.titText);
}
