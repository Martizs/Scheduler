import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
/* styles */
import {
  darkBasic,
  sSmallIconSize,
  ultraSmallIconSize,
} from '../../styles/theme';
import { remPrev, smRemPrev } from './style';
/* utils */
import { getRemName } from './util';
/* consts */
import { remPrevIds } from './testIds';

export const RemPrev = (props) => {
  const remStyle = props.justPreview ? smRemPrev : remPrev;

  const scrollCont = props.justPreview
    ? { flexGrow: 1, justifyContent: 'center' }
    : {};

  return (
    <View style={remStyle.container}>
      {!props.justPreview && (
        <TouchableOpacity
          style={remStyle.butCont}
          onPress={() => props.addReminder()}
          testID={remPrevIds.addRem}
        >
          <Icon name="add" size={sSmallIconSize} color={darkBasic.textColor} />
          {!props.reminders.length && (
            <Text style={remStyle.remText}>Add reminder</Text>
          )}
        </TouchableOpacity>
      )}

      <ScrollView
        horizontal
        testID={remPrevIds.remPrevScroll}
        contentContainerStyle={scrollCont}
      >
        {props.reminders?.map((rem, index) => (
          <TouchableOpacity
            testID={remPrevIds.mainRemBut(index)}
            key={`${rem.id}`}
            style={remStyle.butCont}
            activeOpacity={props.justPreview ? 1 : 0}
            onPress={() =>
              !props.justPreview ? props.editReminder(rem) : props.editTask()
            }
          >
            <Icon
              name={rem.notif ? 'notifications-none' : 'alarm'}
              size={props.justPreview ? ultraSmallIconSize : sSmallIconSize}
              color={darkBasic.textColor}
            />
            <Text
              style={remStyle.remText}
              testID={remPrevIds.mainRemText(index)}
            >
              {getRemName(rem)}
            </Text>
            {!props.justPreview && (
              <TouchableOpacity
                onPress={() => props.delReminder(rem.id)}
                testID={remPrevIds.delRemBut(index)}
              >
                <Icon
                  name="cancel"
                  size={sSmallIconSize}
                  color={darkBasic.textColor}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
