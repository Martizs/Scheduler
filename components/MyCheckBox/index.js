import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
/* components */
import CheckBox from '@react-native-community/checkbox';
/* styles */
import { darkBasic } from '../../styles/theme';
import { mCheckBox } from './style';

export const MyCheckBox = (props) => {
  const container = props.top
    ? {
        ...mCheckBox.container,
        flexDirection: 'column-reverse',
      }
    : mCheckBox.container;

  return (
    <View style={container} key={props.key || '0'}>
      <TouchableOpacity onPress={props.onCheck} testID={props.testID}>
        <CheckBox
          value={props.value}
          disabled
          tintColors={{
            true: darkBasic.textColor,
            false: darkBasic.textColor,
          }}
        />
      </TouchableOpacity>
      <Text style={mCheckBox.label}>{props.label}</Text>
    </View>
  );
};
