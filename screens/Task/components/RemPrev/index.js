import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
/* styles */
import { darkBasic, sSmallIconSize } from '../../../../styles/theme';
import { remPrev } from './style';
/* utils */
import { getRemName } from './util';
/* consts */
import { remPrevIds } from './testIds';

export const RemPrev = (props) => (
  <View style={remPrev.container}>
    <TouchableOpacity
      style={remPrev.butCont}
      onPress={() => props.addReminder()}
      testID={remPrevIds.addRem}
    >
      <Icon name="add" size={sSmallIconSize} color={darkBasic.textColor} />
      {!props.reminders.length && (
        <Text style={remPrev.remText}>Add reminder</Text>
      )}
    </TouchableOpacity>
    <ScrollView horizontal>
      {props.reminders.map((rem, index) => (
        <TouchableOpacity
          testID={remPrevIds.mainRemBut(index)}
          key={`${rem.id}`}
          style={remPrev.butCont}
          onPress={() => props.editReminder(rem)}
        >
          <Icon
            name={rem.notif ? 'notifications-none' : 'alarm'}
            size={sSmallIconSize}
            color={darkBasic.textColor}
          />
          <Text style={remPrev.remText} testID={remPrevIds.mainRemText(index)}>
            {getRemName(rem)}
          </Text>
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
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);
