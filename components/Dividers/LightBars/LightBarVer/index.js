/* base */
import React from 'react';
import {View} from 'react-native';
/* styles */
import {VerBarStyle} from './style';
import {darkBasic} from '../../../../styles/theme';
/* components */
import LinearGradient from 'react-native-linear-gradient';

export const LightBarVer = props => {
  return (
    <View
      style={{
        ...VerBarStyle.container,
        ...props.containerStyle,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          ...VerBarStyle.luminance,
          ...props.barStyle,
        }}
        colors={darkBasic.gradColors}
      />
    </View>
  );
};
