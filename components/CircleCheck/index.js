import React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
/* styles */
import { calSelHighLight } from '../../styles/theme';
import { wDayCheck } from './style';

export const CircleCheck = (props) => {
  const [value, setValue] = useState(props.defValue);

  const container = value
    ? {
        ...wDayCheck.container,
        borderColor: calSelHighLight,
      }
    : wDayCheck.container;

  const onCheck = () => {
    const newVal = !value;
    setValue(newVal);
    props.onCheck(newVal);
  };

  return (
    <TouchableOpacity style={container} onPress={onCheck}>
      <Text style={wDayCheck.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
