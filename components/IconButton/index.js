import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
/* styles */
import {darkBasic, smallIconSize} from '../../styles/theme';
import {butStyle} from './style';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';

export class IconButton extends React.Component {
  render() {
    let textStyle = butStyle.text;

    // TODO: take this out of the render
    // also the one in styles
    if (this.props.iconLeft) {
      textStyle = {
        ...butStyle.text,
        marginLeft: 5,
        marginRight: 0,
      };
    }

    return (
      <TouchableOpacity
        ref={ref => {
          this.props.setRef && this.props.setRef(ref);
        }}
        style={{
          ...butStyle.container,
          ...this.props.contStyle,
          flexDirection: this.props.iconLeft ? 'row-reverse' : 'row',
          opacity: this.props.invisible ? 0 : 1,
        }}
        disabled={this.props.invisible}
        onPress={this.props.onPress}>
        {!!this.props.text && <Text style={textStyle}>{this.props.text}</Text>}
        <Icon
          style={butStyle.icon}
          name={this.props.iconName}
          size={smallIconSize}
          color={darkBasic.textColor}
        />
      </TouchableOpacity>
    );
  }
}
