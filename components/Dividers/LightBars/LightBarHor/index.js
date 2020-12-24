/* base */
import React from 'react';
import {View} from 'react-native';
/* styles */
import {HorBarStyle} from './style';
import {darkBasic} from '../../../../styles/theme';
/* components */
import LinearGradient from 'react-native-linear-gradient';

export const LightBarHor = props => {
  return (
    <View
      style={{
        ...HorBarStyle.container,
        ...props.containerStyle,
      }}>
      <LinearGradient
        style={{
          ...HorBarStyle.luminance,
          ...props.barStyle,
        }}
        colors={darkBasic.gradColors}
      />
    </View>
  );
};
