/* base */
import React from 'react';
import { View, Text } from 'react-native';
/* styles */
import { TitleStyle } from './style';
import { darkBasic } from '../../styles/theme';
/* components */
import { MenuIcon } from '../MenuIcon';
/* consts */
import { titBarIds } from './testIds';

export const TitleBar = (props) => {
  return (
    <View
      style={{
        ...TitleStyle.container,
        backgroundColor: props.showMenu
          ? darkBasic.backgroundColor
          : 'rgba(0, 0, 0, 0)',
      }}
    >
      <View style={TitleStyle.iconContainer} testID={titBarIds.menuIcon}>
        <MenuIcon openMenu={props.openMenu} showMenu={props.showMenu} />
      </View>
      <Text style={TitleStyle.text} testID={titBarIds.titText}>
        {props.title}
      </Text>
      <View style={TitleStyle.invItem} />
    </View>
  );
};
