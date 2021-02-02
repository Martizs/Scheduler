import React from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
/* styles */
import {
  smallTextCont,
  ultraSmTextCont,
} from '../../../../styles/generalStyles';
import { highLight, calSelHighLight } from '../../../../styles/theme';
import { calDay } from './style';
/* utils */
import isEqual from 'lodash/isEqual';

const taskBackground = require('../../../../icons/whitTaskBackground.png');

export class CalDay extends React.Component {
  shouldComponentUpdate(prevProps) {
    if (
      this.props.selected !== prevProps.selected ||
      this.props.smallItems !== prevProps.smallItems ||
      this.props.tasks !== prevProps.tasks ||
      !isEqual(this.props.item, prevProps.item)
    ) {
      return true;
    }

    return false;
  }

  render() {
    let contStyle = calDay.container;
    let imgWrapper = calDay.imgWrapper;

    if (this.props.item.opaque) {
      contStyle = {
        ...contStyle,
        opacity: 0.4,
      };
    }

    if (this.props.smallItems) {
      imgWrapper = {
        ...imgWrapper,
        paddingTop: RFValue(2),
        paddingBottom: RFValue(2),
      };
    }

    if (this.props.item.today) {
      contStyle = {
        ...contStyle,
        borderColor: highLight,
        borderWidth: 2,
      };
    }

    if (this.props.selected) {
      contStyle = {
        ...contStyle,
        borderColor: calSelHighLight,
        opacity: 1,
        borderWidth: 2,
      };
    }

    let textStyle = smallTextCont.style;

    if (this.props.item.weekDay) {
      textStyle = { ...ultraSmTextCont.style };
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

    const imgSource = this.props.tasks ? taskBackground : undefined;

    return (
      <View style={contStyle} key={this.props.item.key}>
        <TouchableOpacity
          style={calDay.butContainer}
          disabled={this.props.item.weekDay}
          onPress={() => this.props.onPress()}
        >
          <ImageBackground
            style={imgWrapper}
            imageStyle={calDay.imgStyle}
            source={imgSource}
          >
            <Text style={textStyle}>{this.props.item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
