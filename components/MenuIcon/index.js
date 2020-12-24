import React from 'react';
import {TouchableOpacity} from 'react-native';
/* styles */
import {darkBasic, iconSize} from '../../styles/theme';
import {MenuStyle} from './style';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MenuIcon = props => {
  return (
    <TouchableOpacity style={MenuStyle.container} onPress={props.openMenu}>
      <Icon
        name={props.showMenu ? 'arrow-back' : 'menu'}
        size={iconSize}
        color={darkBasic.textColor}
      />
    </TouchableOpacity>
  );
};
