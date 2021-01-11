import { openDatabase } from 'react-native-sqlite-storage';
import Database from '../Database';
/* const */
import {
  tasksTable,
  taskTFields,
  timesTable,
  timesTFields,
  remTable,
  remTFields,
  setTable,
  setTFields,
} from '../consts/dbConsts';
import { titleLength, desLength } from '../consts/generalConsts';
import { sortItems } from '../components/DayTaskList/const';
import { exeSqlPromise } from './helpers';
/* redux */
import { store } from '../StoreApp';
import { toggleLoading } from '../redux/general/actions';
import { cancelTime } from '../schedule';

export const db = openDatabase({ name: 'TestDatabase.db' });
db.executeSql('PRAGMA foreign_keys=ON');

// helper function that creates the database with all needed tables fields etc.
// a table does not already exist
export async function createDb() {
  // tasks table
  /* rep_end_time - stores the last saved time of the current repeatable task
    this along with the field repeatability is only for repeatable tasks
    so whenever a new month is opened, a calendar is opened or a task is triggered
    the current date is checked against the tasks rep_end_time and if it is equal or exceeds
    then we create a bunch of these tasks up to the current date +1 year or if repeatability
    is MORE than one year, then just create one extra subsequent task INSTEAD of +1 year.
    DONT FORGET - set up the last repeatable tasks for the whole month*/
  /* repeatability - the sequence of how the task should be repeated */
  return new Promise(async (resolve) => {
    const createDbProm = [];

    const createTasks = exeSqlPromise(
      `CREATE TABLE IF NOT EXISTS ${tasksTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${taskTFields.title} VARCHAR(${titleLength}),
      ${taskTFields.desc} VARCHAR(${desLength}),
      ${taskTFields.repeatability} VARCHAR(100),
      ${taskTFields.rep_end_time} VARCHAR(30),
      ${taskTFields.hours} VARCHAR(2),
      ${taskTFields.minutes} VARCHAR(2),
      ${taskTFields.afterLinks} VARCHAR(1000000000))`,
      []
    );
    createDbProm.push(createTasks);

    const createTimes = exeSqlPromise(
      `CREATE TABLE IF NOT EXISTS ${timesTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${timesTFields.year} VARCHAR(4),
        ${timesTFields.month} VARCHAR(2),
        ${timesTFields.day} VARCHAR(2),
        ${timesTFields.done} BOOLEAN,
        ${timesTFields.task_id} INTEGER NOT NULL,
        FOREIGN KEY (${timesTFields.task_id}) REFERENCES tasks(id) ON DELETE CASCADE
        )`,
      []
    );
    createDbProm.push(createTimes);

    const createRems = exeSqlPromise(
      `CREATE TABLE IF NOT EXISTS ${remTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${remTFields.before} VARCHAR(100),
        ${remTFields.notif} BOOLEAN,
        ${remTFields.repeatability} VARCHAR(100),
        ${remTFields.hours} VARCHAR(2),
        ${remTFields.minutes}  VARCHAR(2),
        ${remTFields.ring_date} VARCHAR(30),
        ${remTFields.same_time} INTEGER NOT NULL,
        ${remTFields.done} BOOLEAN,
        ${remTFields.req_code} INTEGER,
        ${remTFields.task_rem_id} VARCHAR(20),
        ${remTFields.task_done} BOOLEAN,
        ${remTFields.time_id} INTEGER NOT NULL,
        ${remTFields.test_check} BOOLEAN DEFAULT 0,
        FOREIGN KEY (${remTFields.time_id}) REFERENCES times(id) ON DELETE CASCADE
        )`,
      []
    );
    createDbProm.push(createRems);

    const createSet = await exeSqlPromise(
      `CREATE TABLE IF NOT EXISTS ${setTable}(id INTEGER PRIMARY KEY AUTOINCREMENT, ${setTFields.defSort} BOOLEAN)`,
      []
    );

    if (createSet.rows) {
      const checkSet = await exeSqlPromise(`SELECT * FROM ${setTable}`, []);

      if (checkSet.rows) {
        if (!checkSet.rows.length) {
          const insertInitialSet = exeSqlPromise(
            `INSERT INTO ${setTable} (${setTFields.defSort}) VALUES (?)`,
            [sortItems[0].key]
          );
          createDbProm.push(insertInitialSet);
        } else {
          console.log('initial settings table created');
        }

        // AAAND here we initiate all the promises
        Promise.all(createDbProm)
          .then(() => {
            console.log('initial settings table created');
            resolve();
          })
          .catch((err) => {
            console.log('Error creating initial database', err);
            resolve();
          });
      } else {
        console.log('error checking setting table records');
        resolve();
      }
    } else {
      console.log('error creating settings table');
      resolve();
    }
  });
}

// NOTE: This function is only for development
export function createFreshRemCanc() {
  db.transaction((txz) => {
    txz.executeSql(
      `SELECT * FROM ${remTable} WHERE ${remTFields.req_code} IS NOT NULL`,
      [],
      (txz1, resz) => {
        if (resz.rows.length) {
          cancelTime(resz.rows.item(0).req_code, () => createFresh());
        } else {
          createFresh();
        }
      },
      (err) => {
        console.log(
          'createFreshRemCanc - error finding req code NOT null reminder',
          err
        );
      }
    );
  });
}

function createFresh() {
  db.transaction((tx0) => {
    tx0.executeSql(
      `DROP TABLE ${tasksTable}`,
      [],
      (tx1, res1) => {
        tx1.executeSql(
          `CREATE TABLE ${tasksTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
          ${taskTFields.title} VARCHAR(${titleLength}),
          ${taskTFields.desc} VARCHAR(${desLength}),
          ${taskTFields.repeatability} VARCHAR(100),
          ${taskTFields.rep_end_time} VARCHAR(30),
          ${taskTFields.hours} VARCHAR(2),
          ${taskTFields.minutes} VARCHAR(2),
          ${taskTFields.afterLinks} VARCHAR(1000000000))`,
          [],
          (tx2, res2) => {
            console.log('task table droped and recreated');
          },
          (err) => {
            console.log('Error creating fressh task table', err);
          }
        );
      },
      (err) => {
        console.log('Error creating dropping task table', err);
      }
    );
  });
  db.transaction((tx0) => {
    tx0.executeSql(
      `DROP TABLE ${timesTable}`,
      [],
      (tx1, res1) => {
        tx1.executeSql(
          `CREATE TABLE ${timesTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
          ${timesTFields.year} VARCHAR(4),
          ${timesTFields.month} VARCHAR(2),
          ${timesTFields.day} VARCHAR(2),
          ${timesTFields.done} BOOLEAN,
          ${timesTFields.task_id} INTEGER NOT NULL,
          FOREIGN KEY (${timesTFields.task_id}) REFERENCES tasks(id) ON DELETE CASCADE
          )`,
          [],
          (tx2, res2) => {
            console.log('time table droped and recreated');
          },
          (err) => {
            console.log('Error creating fressh times table', err);
          }
        );
      },
      (err) => {
        console.log('Error creating dropping times table', err);
      }
    );
  });
  db.transaction((tx0) => {
    tx0.executeSql(
      `DROP TABLE ${remTable}`,
      [],
      (tx1, res1) => {
        tx1.executeSql(
          `CREATE TABLE IF NOT EXISTS ${remTable}(id INTEGER PRIMARY KEY AUTOINCREMENT,
          ${remTFields.before} VARCHAR(100),
          ${remTFields.notif} BOOLEAN,
          ${remTFields.repeatability} VARCHAR(100),
          ${remTFields.hours} VARCHAR(2),
          ${remTFields.minutes}  VARCHAR(2),
          ${remTFields.ring_date} VARCHAR(30),
          ${remTFields.same_time} INTEGER NOT NULL,
          ${remTFields.done} BOOLEAN,
          ${remTFields.req_code} INTEGER,
          ${remTFields.task_rem_id} VARCHAR(20),
          ${remTFields.task_done} BOOLEAN,
          ${remTFields.time_id} INTEGER NOT NULL,
          ${remTFields.test_check} BOOLEAN DEFAULT 0,
          FOREIGN KEY (${remTFields.time_id}) REFERENCES times(id) ON DELETE CASCADE
          )`,
          [],
          (tx2, res2) => {
            console.log('reminders table droped and recreated');
          },
          (err) => {
            console.log('Error creating fressh reminders table', err);
          }
        );
      },
      (err) => {
        console.log('Error creating dropping reminders table', err);
      }
    );
  });
  db.transaction((tx0) => {
    //  dTaskOrd - so if true general tasks on top, otherwise timed tasks o top
    tx0.executeSql(
      `DROP TABLE ${setTable}`,
      [],
      (tx1, res1) => {
        tx1.executeSql(
          `CREATE TABLE IF NOT EXISTS ${setTable}(id INTEGER PRIMARY KEY AUTOINCREMENT, ${setTFields.defSort} BOOLEAN)`,
          [],
          (tx2, res2) => {
            console.log('settings table droped and recreated');
            tx2.executeSql(
              `INSERT INTO ${setTable} (${setTFields.defSort}) VALUES (?)`,
              [sortItems[0].key],
              () => {
                // console.log('sortItems[0].key', sortItems[0].key);
                console.log('initial settings table created and record added');
              },
              (err) =>
                console.log('error inserting default settings record', err)
            );
          },
          (err) => {
            console.log('Error creating fressh settings table', err);
          }
        );
      },
      (err) => {
        console.log('Error creating dropping settings table', err);
      }
    );
  });
}

export function test(params) {
  // Database.reqCodeNotNull(
  //   (msg1, dat1, msg2, dat2, msg3, dat3) => {
  //     console.log(msg1, dat1);
  //     console.log(msg2, dat2);
  //     console.log(msg3, dat3);
  //   }
  // );

  db.transaction((txn) => {
    // NOTE: so there needs to be as many question marks as there are values you inserting
    txn.executeSql(
      `SELECT * FROM ${tasksTable}`,
      [],
      (tx0, res0) => {
        console.log('results.rows.length', res0.rows.length);
        for (let i = 0; i < res0.rows.length; i++) {
          console.log('task', res0.rows.item(i));
        }
      },
      (err) => console.log('test error', err)
    );
  });
}

export async function scheduleRing() {
  return new Promise((resolve) => {
    Database.scheduleRing(() => {
      resolve();
    });
  });
}

export async function createRep(year, month, callBack) {
  return new Promise((resolve) => {
    if (year && month + 1) {
      store.dispatch(toggleLoading(true));

      Database.createRep(year, month, () => {
        store.dispatch(toggleLoading(false));
        !!callBack && callBack();
        resolve();
      });
    } else {
      !!callBack && callBack();
      resolve();
    }
  });
}
