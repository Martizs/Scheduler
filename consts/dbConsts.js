export const tasksTable = 'tasks';
// NOTE: these fields exclude id
// cause id will always be id
export const taskTFields = {
  title: 'title',
  desc: 'desc',
  repeatability: 'repeatability',
  rep_end_time: 'rep_end_time',
  hours: 'hours',
  minutes: 'minutes',
  afterLinks: 'afterLinks',
};
export const timesTable = 'times';
export const timesTFields = {
  year: 'year',
  month: 'month',
  day: 'day',
  done: 'done',
  task_id: 'task_id',
};
export const remTable = 'reminders';
export const remTFields = {
  before: 'before',
  notif: 'notif',
  repeatability: 'repeatability',
  hours: 'hours',
  minutes: 'minutes',
  ring_date: 'ring_date',
  same_time: 'same_time',
  done: 'done',
  req_code: 'req_code',
  task_rem_id: 'task_rem_id',
  task_done: 'task_done',
  time_id: 'time_id',
  test_check: 'test_check',
};
export const setTable = 'settings';
export const setTFields = { defSort: 'defSort', homePage: 'homePage' };
