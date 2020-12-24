/* base */
import React from 'react';
import {View, UIManager, LayoutAnimation} from 'react-native';
/* styles */
import {screenContainer} from '../../styles/generalStyles';
/* redux */
import {connect} from 'react-redux';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class AnimContainer extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.currScreen.screenKey !== prevProps.currScreen.screenKey) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  render() {
    return (
      <View // Special animatable View
        style={screenContainer.style}>
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currScreen: state.currScreen,
});

export default connect(mapStateToProps)(AnimContainer);
