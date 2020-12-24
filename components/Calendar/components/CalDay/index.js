import React from 'react';
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {textContainer, smallTextCont} from '../../../../styles/generalStyles';
import {calTodayHighLight, calSelHighLight} from '../../../../styles/theme';
import {calDay} from './style';

const taskBackground = require('../../../../icons/whitTaskBackground.png');

export const CalDay = props => {
  let contStyle = calDay.container;
  let imgWrapper = calDay.imgWrapper;

  if (props.opaque) {
    contStyle = {
      ...contStyle,
      opacity: 0.4,
    };
  }

  if (props.smallItems) {
    imgWrapper = {
      ...imgWrapper,
      paddingTop: RFValue(2),
      paddingBottom: RFValue(2),
    };
  }

  if (props.today) {
    contStyle = {
      ...contStyle,
      borderColor: calTodayHighLight,
      borderWidth: 2,
    };
  }

  if (props.selected) {
    contStyle = {
      ...contStyle,
      borderColor: calSelHighLight,
      opacity: 1,
      borderWidth: 2,
    };
  }

  let textStyle = textContainer.style;

  if (props.weekDay) {
    textStyle = smallTextCont.style;
    contStyle = {
      ...contStyle,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    };
    imgWrapper = {
      ...imgWrapper,
      paddingBottom: 2,
      paddingTop: 2,
    };
  }

  const imgSource = props.tasks ? taskBackground : undefined;

  return (
    <View style={contStyle} key={props.index}>
      <TouchableOpacity
        style={calDay.butContainer}
        disabled={props.weekDay}
        onPress={() => props.onPress()}>
        <ImageBackground
          style={imgWrapper}
          imageStyle={calDay.imgStyle}
          source={imgSource}>
          <Text style={textStyle}>{props.item}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
