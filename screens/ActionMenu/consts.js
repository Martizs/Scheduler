import {
  HOME_TITLE,
  MONTH,
  DAY,
  screenTitles,
  TEST_TITLE,
} from '../../consts/generalConsts';
import { environment } from '../../env';
import { actMenIds } from './testIds';

export const menuItems = [
  {
    key: MONTH,
    title: screenTitles[MONTH],
    icon: 'today',
    testId: actMenIds.calAct,
  },
  {
    key: DAY,
    title: screenTitles[DAY],
    icon: 'assignment',
    testId: actMenIds.todAct,
  },
];

if (environment === 'development') {
  menuItems.push({
    key: TEST_TITLE,
    title: screenTitles[TEST_TITLE],
    icon: 'assignment',
    testId: actMenIds.testAct,
  });
}
