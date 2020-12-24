import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
/* styles */
import { ListItemStyle } from './style';
import { darkBasic, interIconSize } from '../../styles/theme';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ListItem = (props) => {
  return (
    <View style={ListItemStyle.container}>
      <TouchableOpacity
        testID={props.testId}
        style={ListItemStyle.buttonContainer}
        onPress={props.click}
      >
        {props.item.icon && (
          <Icon
            name={props.item.icon}
            size={interIconSize}
            color={darkBasic.textColor}
            style={ListItemStyle.icon}
          />
        )}
        {props.startItem && <View>{props.startItem}</View>}
        <Text
          style={{
            ...ListItemStyle.text,
            ...props.custItemStyle,
          }}
        >
          {props.item.title}
        </Text>
        {!props.noEndItem && <View style={ListItemStyle.invItem} />}
      </TouchableOpacity>
    </View>
  );
};
