import React from 'react';
import {View, Text} from 'react-native';
/* styles */
import {section} from './style';

export const Section = props => (
  <View style={section.container}>
    <Text style={section.text}>{props.title}</Text>
    <View style={section.childCont}>{props.children}</View>
  </View>
);
