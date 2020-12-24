// KEYWORDS - fill/type/etc.
import {
  hasTxt,
  pressItem,
  elVis,
  replaceTxt,
  pressBack,
} from './testSteps/general';
import { navigate } from './nav';
/* consts */
import { titBarIds } from './../../components/TitleBar/testIds';
import { taskIds } from './../../screens/Task/testIds';
import { remIds } from '../../screens/Reminder/testIds';
import { appIds } from './../../appIds';
import { dropDownIds } from '../../components/DropDownList/testIds';
import { repCompIds } from './../../components/RepeatComp/testIds';

// handles input into autofill search dropdowns
export async function autoFillDDInp(inpId, txt) {
  await replaceTxt(inpId, txt);
  try {
    await elVis(dropDownIds.dropDown);
    await pressItem(dropDownIds.ddItem(0));
  } catch (err) {
    // so if dropdown was not found
    // means autofill has happened and we can just continue on
    return true;
  }
}

// reminder screen fill
// also checks if the reminder screen has opened
// fills values only if values are provided
export async function remFill(sameTime, notif, hours, mins, befMins) {
  await hasTxt('Reminder', titBarIds.titText);
  //   presses one of the radio buttons
  if (sameTime === 0) {
    await pressItem(remIds.onTimeCheck);
  } else if (sameTime === 1) {
    await pressItem(remIds.sameDayCheck);
    await autoFillDDInp(remIds.hourInp, hours);
    await autoFillDDInp(remIds.minInp, mins);
  } else {
    await pressItem(remIds.befCheck);
    await replaceTxt(remIds.befInput, befMins);
  }

  if (notif) {
    await pressItem(remIds.notCheck);
  } else {
    await pressItem(remIds.alCheck);
  }
}

// task screen fill
// also checks if the task screen has opened
// fills values only if values are provided
// will press on the hour dropdown
// and will press on the minutes
// NOTE: for everything to work properly, task title should be
// kept unique
export async function taskFill(tit, desc, hours, mins, repNum, updt) {
  await hasTxt('Task', titBarIds.titText);

  // NOTE: this currently works only with the default
  // repeatability selection which is the day
  // selection
  // ALSO: we do this before other necesary task inputs
  // as there's no focus removal after backing out
  // from this keyboard, and it should be properly
  // applied after other inputs
  if (repNum) {
    if (!updt) {
      await pressItem(repCompIds.repCheck);

      await replaceTxt(repCompIds.repInp, repNum);
      // after typing text we have to remove the keyboard
      await pressBack();
    } else {
      // so if its update that means that we're turning
      // a repeatable task into a singular task
      await pressItem(taskIds.repToSing);
    }
  }

  await replaceTxt(taskIds.titInp, tit);
  if (desc) {
    await replaceTxt(taskIds.descInp, desc);
  }
  // after typing text we have to remove the keyboard
  await pressBack();

  if (hours && mins) {
    await autoFillDDInp(taskIds.hourInp, hours);
    await autoFillDDInp(taskIds.minInp, mins);
  }
}

// entering task screen and filling it
// TODO: you can do it via day tasks
export async function taskFillNav(navId, tit, desc, hours, mins, repNum) {
  await navigate(navId);
  await pressItem(appIds.floatAdd);
  await taskFill(tit, desc, hours, mins, repNum);
}
