import { actMenIds } from '../../../screens/ActionMenu/testIds';

export function getTitText(navId) {
  switch (navId) {
    case actMenIds.calAct:
      return 'Calendar';
    case actMenIds.todAct:
      return 'Today';
    case actMenIds.homAct:
      return 'Home';
    case actMenIds.testAct:
      return 'Test';
  }
}

// helper function mainly used for waiting
// for notifications to appear
export async function awaitSleep() {
  return new Promise((resolve) => setTimeout(resolve, 120000));
}

export function genFutTime(extraTime) {
  let date = new Date();
  date = new Date(date.getTime() + extraTime);
  const futHours = date.getHours() + '';
  const futMins = date.getMinutes() + '';

  return { futHours, futMins };
}

export function addZeroT(item) {
  // we turn it into string just in case
  const itemz = item + '';

  return itemz && itemz.length === 1 ? `0${itemz}` : itemz;
}
