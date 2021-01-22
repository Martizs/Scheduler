import React from 'react';
import { View } from 'react-native';
import { FileLogger } from 'react-native-file-logger';
/* styles */
import { mainContainer } from './styles/generalStyles';
/* main apps */
import App from './App';
import Alarm from './screens/Alarm';
/* components */
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
/* redux */
import { connect } from 'react-redux';
/* consts */
import { environment } from './env';

if (environment === 'production') {
  FileLogger.configure();
}

// just a simple component wrapper
// for loading to work for both Alarm screen
// and App
class AppAlarm extends React.Component {
  render() {
    return (
      <View style={mainContainer.style}>
        <OrientationLoadingOverlay
          visible={this.props.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
        {typeof this.props.rngCode === 'number' &&
        this.props.appRngCode !== this.props.rngCode ? (
          <Alarm {...this.props} />
        ) : (
          <App />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loadingScreen.loading,
  appRngCode: state.appRngCode,
});

export default connect(mapStateToProps)(AppAlarm);
