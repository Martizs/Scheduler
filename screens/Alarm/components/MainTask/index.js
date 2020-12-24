import React from 'react';
import { Text, View } from 'react-native';
/* styles */
import { mainT } from './style';

export const MainTask = (props) => (
  <View style={mainT.container}>
    <View style={mainT.timeContainer}>
      <Text style={mainT.title}>{props.dateName}</Text>
      {!!props.hours?.length && !!props.minutes?.length && (
        <Text style={mainT.title}>
          {props.hours}:{props.minutes}
        </Text>
      )}
    </View>
    <Text style={mainT.title}>{props.title}</Text>
    {!!props.desc?.length && <Text style={mainT.desc}>{props.desc}</Text>}
  </View>
);
