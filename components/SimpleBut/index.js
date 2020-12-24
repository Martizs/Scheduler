import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
/* styles */
import {smallTextCont} from '../../styles/generalStyles';
import {simpleBut} from './style';

export const SimpleBut = props => (
  <TouchableOpacity style={simpleBut.container} onPress={props.onPress}>
    <Text style={smallTextCont.style}>{props.title}</Text>
  </TouchableOpacity>
);
