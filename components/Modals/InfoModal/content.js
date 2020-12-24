import React from 'react';
import {Text} from 'react-native';
/* styles */
import {infoContent} from './style';

export const InfoModalContent = props => {
  return <Text style={infoContent.text}>{props.text}</Text>;
};
