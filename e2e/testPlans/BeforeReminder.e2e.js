import { addItemRem } from '../testCases/add';
import { dismissNotif, openApp } from '../testCases/general';
/* utils */
import { genFutTime } from '../testCases/utils/general';
/* consts */
import { taskData } from '../testCases/consts/task';
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { checkNotif } from '../testCases/check';
import { remTask } from '../testCases/remove';
import { navToDay } from '../testCases/nav';

describe('Before reminder testing', () => {
  // TODO: remove this after finishing all them test plans
  it('Before reminder  rng test', () => openApp());
  // it('Before reminder mins', async function () {
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     false,
  //     false,
  //     'mins'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Before reminder hours', async function () {
  //   //  1 hour 2 mins
  //   const time = genFutTime(3720000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '1',
  //     false,
  //     false,
  //     false,
  //     'hours'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Before reminder days', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     false,
  //     false,
  //     'days'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
  // it('Before reminder weeks', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     false,
  //     false,
  //     'weeks'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
  // // -----------------------------------------------------------------------------
  // // REP REM
  // // -----------------------------------------------------------------------------
  // it('Before reminder mins - rep rem', async function () {
  //   const time = genFutTime(1200000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '18',
  //     false,
  //     '2',
  //     false,
  //     'mins'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Before reminder hours - rep rem', async function () {
  //   //  1 hour 2 mins
  //   const time = genFutTime(3720000);
  //   await addItemRem(
  //     actMenIds.calAct,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     false,
  //     false,
  //     time.futHours,
  //     time.futMins,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'hours'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await remTask(actMenIds.todAct, taskData.title, false, true, true);
  // });
  // it('Before reminder days - rep rem', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'days'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
  // it('Before reminder weeks - rep rem', async function () {
  //   let date = new Date();
  //   date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   const time = genFutTime(120000);
  //   await addItemRem(
  //     false,
  //     taskData.title,
  //     '',
  //     2,
  //     true,
  //     time.futHours,
  //     time.futMins,
  //     false,
  //     false,
  //     '1',
  //     false,
  //     '2',
  //     false,
  //     'weeks'
  //   );
  //   await checkNotif();
  //   await dismissNotif();
  //   await checkNotif();
  //   await dismissNotif();
  //   await navToDay(date.getFullYear(), date.getMonth(), date.getDate());
  //   await remTask(false, taskData.title, false, true, true);
  // });
});
