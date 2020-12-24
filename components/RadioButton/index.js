import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
/* styles */
import { radBut } from './style';

export const RadioButton = (props) => {
  const radOuter = props.size
    ? {
        ...radBut.radOuter,
        height: RFValue(props.size),
        width: RFValue(props.size),
      }
    : radBut.radOuter;

  const minInn = props.size - 12 > 0 ? props.size - 12 : 1;

  const radInner = props.size
    ? {
        ...radBut.radInner,
        height: RFValue(minInn),
        width: RFValue(minInn),
      }
    : radBut.radInner;

  return (
    <TouchableOpacity
      style={radBut.container}
      onPress={props.onPress}
      testID={props.testID}
    >
      <View style={radOuter}>{!!props.value && <View style={radInner} />}</View>
      <Text style={radBut.radLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
};
