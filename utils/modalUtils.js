import React from 'react';
import { View, TextInput } from 'react-native';
import ScheduleTime from '../ScheduleTime';
/* redux */
import { toggleModal } from '../redux/general/actions';
/* components */
import { InfoModalContent } from '../components/Modals/InfoModal/content';
/* database */
import { delTask } from '../database/crud';
import { dispatchDbCall } from '../database/helpers';
import { createFreshRemCanc, createRep, test, scheduleRing } from '../database';
import { getTimeTasks } from '../database/retrievers';
/* styles */
import { darkBasic } from '../styles/theme';

// helper function to not repeat a bunch of code
// this function just forms a generic info quesiton
// modal if the user would like to delete all tasks
// or just one
// if the task is not repeatable it just deletes
// the task and calls the callback provided
export function delAllModal(timeId, taskId, repeatable, dispatch, callback) {
  if (repeatable) {
    dispatch(
      toggleModal(
        'Delete all?',
        <InfoModalContent text="This task is a repeated task, would you like to delete this one task or all of the repeated tasks as well?" />,
        [
          {
            title: 'Delete all',
            type: 'error',
            func: () =>
              dispatchDbCall(() =>
                delTask(timeId, taskId, true, true, () => {
                  callback();
                  dispatch(toggleModal());
                })
              ),
          },
          {
            title: 'Delete just this',
            type: 'error',
            func: () =>
              dispatchDbCall(() =>
                delTask(timeId, taskId, false, true, () => {
                  callback();
                  dispatch(toggleModal());
                })
              ),
          },
          {
            title: 'Cancel',
            type: 'info',
            func: () => dispatch(toggleModal()),
          },
        ]
      )
    );
  } else {
    dispatchDbCall(() =>
      delTask(timeId, taskId, true, false, () => {
        callback();
      })
    );
  }
}

export function testModal(dispatch) {
  dispatch(
    toggleModal(
      'Test',
      <View>
        <TextInput
          placeholder="Hours"
          keyboardType="numeric"
          style={{ color: '#fff' }}
          placeholderTextColor={darkBasic.placeHolderColor}
          onChangeText={(text) => {
            this.testHour = text;
          }}
        />
      </View>,
      [
        {
          title: 'create fresh db',
          func: () => createFreshRemCanc(),
        },
        {
          title: 'create rep test',
          func: () =>
            createRep(2022, 8, this.props.dispatch, () =>
              console.log('repeatable tasks updated')
            ),
        },
        {
          title: 'Get day tasks',
          func: () =>
            getTimeTasks(true, { year: '2020', month: '08', day: '03' }),
        },
        {
          title: 'test',
          func: () => test(),
        },
        {
          title: 'test timeout',
          func: () =>
            setTimeout(() => {
              console.log('timeout happened');
            }, 10000),
        },
        {
          title: 'Schedule ring',
          func: () => scheduleRing(),
        },
      ]
    )
  );
}
