import { elVis, hasTxt, pressItem, waitElVis } from './testSteps/general';
import { openApp } from './general';
import { autoFillDDInp } from './fill';
/* utils */
import { getTitText } from './utils/general';
/* consts */
import { titBarIds } from './../../components/TitleBar/testIds';
import { tItemIds } from '../../components/TaskItem/testIds';
import { dropDownIds } from '../../components/DropDownList/testIds';
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { daySelIds } from '../../components/DaySelection/testIds';
import { monthData } from '../../consts/dateConts';

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

// function that navigates to a specific day
// on the day task screen
export async function navToDay(year, month, day, noMenNav) {
  if (!noMenNav) {
    await navigate(actMenIds.todAct);

    await hasTxt('Today', titBarIds.titText);
  }

  const monthName = monthData[parseInt(month, 10)].title;

  if (year) {
    await autoFillDDInp(daySelIds.yearInp, year + '');
  }
  await autoFillDDInp(daySelIds.monthInp, monthName);
  await autoFillDDInp(daySelIds.dayInp, day + '');
}
