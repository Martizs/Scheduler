import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
/* styles */
import { textContainer } from '../../styles/generalStyles';
import { genBut } from './style';

export const GenButton = (props) => (
  <TouchableOpacity
    testID={props.testID}
    style={{
      ...genBut.but,
      borderColor: props.color,
      ...props.custStyle,
    }}
    onPress={props.onPress}
  >
    <Text style={textContainer.style}>{props.text}</Text>
  </TouchableOpacity>
);
