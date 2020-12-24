/* base */
import React from 'react';
import {View, Animated, Dimensions} from 'react-native';
/* styles */
import {slideAnim} from './style';
/* redux */
import {connect} from 'react-redux';
/* utils */
import isEqual from 'lodash/isEqual';

const {width: initWidth} = Dimensions.get('window');

class SlideAnim extends React.Component {
  constructor(props) {
    super();
    this.state = {
      right: new Animated.Value(0),
      width: initWidth,
    };

    this.changeDimensions = this.changeDimensions.bind(this);
  }

  componentDidMount() {
    this.slideOut();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showMenu !== prevProps.showMenu) {
      if (this.props.showMenu) {
        this.slideIn();
      } else {
        this.slideOut();
      }
    }

    if (
      this.props.screenOrient.eventChange &&
      !isEqual(
        this.props.screenOrient.eventChange.window,
        prevProps.screenOrient.eventChange.window,
      )
    ) {
      this.changeDimensions(this.props.screenOrient.eventChange);
    }
  }

  changeDimensions(e) {
    const {width} = e.window;
    this.setState({width});
  }

  slideIn = () => {
    Animated.spring(this.state.right, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  slideOut = () => {
    Animated.spring(this.state.right, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const right = this.state.right.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.state.width, 0],
    });

    return (
      <View>
        <Animated.View
          style={{
            ...slideAnim.style,
            transform: [{translateX: right}],
          }}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenOrient: state.screenOrient,
});

export default connect(mapStateToProps)(SlideAnim);
