import ScheduleTime from '../ScheduleTime';

export function cancelTime(reqCode, callBack) {
  ScheduleTime.cancelSetTime(
    parseInt(reqCode, 10),
    (message) => {
      if (callBack) {
        callBack(message);
      }
    },
    (err) =>
      console.log(
        'error cancelling scheduled time, with reqCode',
        reqCode,
        'Error:',
        err
      )
  );
}

export function openApp() {
  ScheduleTime.openApp();
}

export function stopMedia() {
  ScheduleTime.stopMedia();
}

export function isMediaPlaying(successCallback, errCallback) {
  ScheduleTime.isMediaPlaying(successCallback, errCallback);
}

export function cancelPendings(mainTimeId) {
  ScheduleTime.cancelPendings(mainTimeId);
}
