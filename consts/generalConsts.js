import { RFValue } from 'react-native-responsive-fontsize';
import {
  titleBorderWidth,
  titlePadding,
  iconSize,
  simpleTextFS,
  simpleBorderWidth,
  txtInputPad,
  smallIconSize,
} from '../styles/theme';

export const HOME_TITLE = 'Home';
export const TEST_TITLE = 'Test';
export const MONTH = 'Month';
export const DAY = 'DAY';
export const TASK = 'TASK';
export const REMINDER = 'Reminder';

export const screenTitles = {
  [HOME_TITLE]: 'Home',
  [MONTH]: 'Calendar',
  [DAY]: 'Today',
  [TASK]: 'Task',
  [REMINDER]: 'Reminder',
  [TEST_TITLE]: TEST_TITLE,
};

export const backgroundImage = require('../background/darkOcean.png');

export const sectionSorts = {
  timedTasks: 'timedTasks',
  genTasks: 'genTasks',
};

export const timedTaskTit = 'Timed tasks';
export const genTaskTit = 'General tasks';

export const titleLength = 500;
export const desLength = 3000;

export const invItems = [
  {
    key: 'rnd1',
    invisible: true,
  },
  {
    key: 'rnd2',
    invisible: true,
  },
];

export const titleBarHeight = titleBorderWidth + titlePadding * 2 + iconSize;

export const searchInpHeight =
  simpleTextFS + simpleBorderWidth + 2 * txtInputPad;

export const simpleDDButHeight = smallIconSize + 2 * simpleBorderWidth;

export const rndTxtInputOffset = RFValue(10);
