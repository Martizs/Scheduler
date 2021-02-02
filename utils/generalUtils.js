import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import { ToastAndroid } from 'react-native';

export function sortTasks(top, asc, data, onlyGen) {
  let genTasks = data;

  if (!onlyGen) {
    genTasks = filter(
      data,
      (task) =>
        !task.hours ||
        !task.hours.length ||
        !task.minutes ||
        !task.minutes.length
    );
  }

  genTasks = sortBy(genTasks, ['title']);

  if (!asc) {
    genTasks = genTasks.reverse();
  }

  if (onlyGen) {
    return genTasks;
  }

  let timedTasks = filter(
    data,
    (task) =>
      task.hours && task.hours.length && task.minutes && task.minutes.length
  );

  timedTasks = sortBy(timedTasks, ['hours', 'minutes']);

  let joined = [];

  if (top) {
    joined = [...timedTasks, ...genTasks];
  } else {
    joined = [...genTasks, ...timedTasks];
  }

  return joined;
}

// util function to generate sorting params for the above
// 'sortTasks' function
export function getSortParams(dayTasks, defSort) {
  let genTask = false;
  let timedTask = false;
  for (let i = 0; i < dayTasks.length; i++) {
    const task = dayTasks[i];
    if (
      !genTask &&
      (!task.hours ||
        !task.hours.length ||
        !task.minutes ||
        !task.minutes.length)
    ) {
      genTask = true;
    }
    if (
      !timedTask &&
      task.hours &&
      task.hours.length &&
      task.minutes &&
      task.minutes.length
    ) {
      timedTask = true;
    }

    if (genTask && timedTask) {
      break;
    }
  }

  let top = false;
  let asc = false;

  if (defSort.indexOf('top') !== -1) {
    top = true;
  }

  if (defSort.indexOf('asc') !== -1) {
    asc = true;
  }

  return {
    genTask,
    timedTask,
    top,
    asc,
  };
}

// helper function that checks if all links are fullfilled
// and if an item would not have its link request fullfilled
// it returns that items index
function linksFullfilled(taskData) {
  const loopedTIds = [];

  for (let i = 0; i < taskData.length; i++) {
    const taskItem = taskData[i];

    if (
      !taskItem.actAfterLinks.every((linkId) => loopedTIds.includes(linkId))
    ) {
      return i;
    }

    loopedTIds.push(taskItem.task_id);
  }

  return -1;
}

// so this is our amazing function that covers the linked
// sorting idea
export function linkedSorting(taskData) {
  // so ofcourse we initially sort by the hours and minutes
  let sortedData = sortBy(taskData, ['hours', 'minutes']);

  const actLinkData = [];

  sortedData.forEach((task) => {
    // so since the after links, might contain task ids
    // from other day task data and we want for all of the
    // after links requests to be fullfilled only concerning
    // the current day tasks data, we will add in an extra var
    // to our sorted day task data which will include
    // task ids only of this data set
    const actAfterLinks = [];

    task.afterLinks &&
      task.afterLinks.forEach((link_task_id) => {
        if (findIndex(taskData, ['task_id', link_task_id]) !== -1) {
          actAfterLinks.push(link_task_id);
        }
      });

    actLinkData.push({
      ...task,
      actAfterLinks,
    });
  });

  let unfullFilledInd = linksFullfilled(actLinkData);

  while (unfullFilledInd !== -1) {
    const unfullFilledIt = actLinkData[unfullFilledInd];

    const linkRequest = [...unfullFilledIt.actAfterLinks];

    // so first we remove the unfullfilled item from the main dataset
    actLinkData.splice(unfullFilledInd, 1);

    let indToInsert = -1;

    // then we check to find the index after which
    // it should be placed
    for (let i = 0; i < actLinkData.length; i++) {
      const task = actLinkData[i];
      const indToRem = linkRequest.indexOf(task.task_id);

      if (indToRem !== -1) {
        linkRequest.splice(indToRem, 1);
        if (!linkRequest.length) {
          // and if our link request array is empty
          // that means that we found our last requested index
          // in the dataset
          // and we save the ID of the element after which
          // our linked task needs to be inserted
          // and we can ofcourse break out of the loop
          indToInsert = i;
        }
      }
    }

    // and then we reinsert our unfullfilled item
    // into the array
    if (indToInsert !== -1) {
      // we add a +1 to this as this splice works by adding before
      // a specified index, so to make it after as our after links indicate
      // we +1 it
      actLinkData.splice(indToInsert + 1, 0, unfullFilledIt);
    } else {
      // okay lol, this should never happen
      console.log(
        'ERROR indToInsert was not found for link request fullfilment, taskData',
        taskData
      );
    }

    unfullFilledInd = linksFullfilled(actLinkData);
  }

  return actLinkData;
}

export function toastMessage(msg, long) {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    long ? ToastAndroid.LONG : ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    50
  );
}
