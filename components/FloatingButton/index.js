import React from 'react';
import { TouchableOpacity } from 'react-native';
/* styles */
import { floatBut } from './style';
import { darkBasic, interIconSize } from '../../styles/theme';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FloatingButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={floatBut.container}
    testID={props.testID}
  >
    <Icon
      style={floatBut.icStyle}
      name="add"
      size={interIconSize}
      color={darkBasic.textColor}
    />
  </TouchableOpacity>
);
