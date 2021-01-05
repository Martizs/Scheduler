// KEYWORDS - fill/type/etc.
import {
  hasTxt,
  pressItem,
  elVis,
  replaceTxt,
  pressBack,
  waitElVis,
  checkPress,
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
// Note for before reminders, if rHours and rMinutes have been passed in
// its assumed that tHours and tMins are not present on the task
export async function remFill(
  sameTime,
  notif,
  hours,
  mins,
  befMins,
  befType,
  repRem,
  repUpt,
  testCheck
) {
  await hasTxt('Reminder', titBarIds.titText);

  //   presses one of the radio buttons
  if (sameTime === 0) {
    await pressItem(remIds.onTimeCheck);
  } else if (sameTime === 1) {
    await pressItem(remIds.sameDayCheck);
    if (hours && mins) {
      await autoFillDDInp(remIds.hourInp, hours);
      await autoFillDDInp(remIds.minInp, mins);
    }
  } else {
    await pressItem(remIds.befCheck);

    // we do this cause of stupid leftover input focus
    // in task screen
    await checkPress(remIds.befDDBut, remIds.befCheck);

    if (befType) {
      await pressItem(remIds.befDDBut);

      await waitElVis(dropDownIds.ddItem(0));

      switch (befType) {
        case 'mins':
          await pressItem(dropDownIds.ddItem(0));
          break;
        case 'hours':
          await pressItem(dropDownIds.ddItem(1));
          break;
        case 'days': {
          if (hours && mins) {
            await pressItem(dropDownIds.ddItem(0));
          } else {
            await pressItem(dropDownIds.ddItem(2));
          }
          break;
        }
        case 'weeks':
          if (hours && mins) {
            await pressItem(dropDownIds.ddItem(1));
          } else {
            await pressItem(dropDownIds.ddItem(3));
          }
          break;
      }
    }

    if (hours && mins && (befType === 'days' || befType === 'weeks')) {
      await autoFillDDInp(remIds.hourInp, hours);
      await autoFillDDInp(remIds.minInp, mins);
    }

    if (befMins) {
      await replaceTxt(remIds.befInput, befMins);
    }
  }

  if (testCheck) {
    await pressItem(remIds.testCheck);
  }

  if (notif) {
    await pressItem(remIds.notCheck);
  } else {
    await pressItem(remIds.alCheck);
  }

  if (repRem) {
    if (!repUpt) {
      await pressItem(repCompIds.repCheck + 'rem');
    }

    if (repRem !== '0') {
      await replaceTxt(repCompIds.repInp + 'rem', repRem);
      // closing the keyboard
      await pressBack();
    }
  }
}

// task screen fill
// also checks if the task screen has opened
// fills values only if values are provided
// will press on the hour dropdown
// and will press on the minutes
// NOTE: for everything to work properly, task title should be
// kept unique
export async function taskFill(tit, desc, hours, mins, repNum, updt, repType) {
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

      if (repType) {
        await pressItem(repCompIds.repDD);

        await waitElVis(dropDownIds.ddItem(0));

        switch (repType) {
          case 'days':
            await pressItem(dropDownIds.ddItem(0));
            break;
          case 'weeks':
            await pressItem(dropDownIds.ddItem(1));
            break;
          case 'months':
            await pressItem(dropDownIds.ddItem(2));
            break;
          case 'years':
            await pressItem(dropDownIds.ddItem(3));
            break;
          default:
            await pressItem(dropDownIds.ddItem(0));
            break;
        }
      }

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
export async function taskFillNav(
  navId,
  tit,
  desc,
  hours,
  mins,
  repNum,
  repType
) {
  if (navId) {
    await navigate(navId);
  }

  await pressItem(appIds.floatAdd);
  await taskFill(tit, desc, hours, mins, repNum, false, repType);
}
