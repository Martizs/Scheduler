// mainly a workaround module to test some things,
// like notifications, which detox does not have support for
import React, { useRef } from 'react';
import {
  View,
  Text,
  NativeEventEmitter,
  NativeModules,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import NativeTest from '../../NativeTest';
/* style */
import { screenContainer } from '../../styles/generalStyles';
import { natTest } from './style';
/* consts */
import { nativeIds } from './testIds';
import { GenButton } from './../../components/GenButton/index';
/* testy */
import Interactable from 'react-native-interactable';

// SOOO this module should only be opened when it can check a validation
// of something.
// In the current example/current state as it is, it will check if a notification
// is open and if it is open, then it will print out 'true' else 'false'
// IMPORTANT - it needs to be opened BEFORE the notification shoots out.
export class NativeTestScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      natResp: 'false',
      mainTimIds: null,
      canScroll: false,
    };

    this._deltaY = new Animated.Value(0);
    this._deltaX = new Animated.Value(0);

    this.checkIfNotifOpened = this.checkIfNotifOpened.bind(this);
    this.dismissNotif = this.dismissNotif.bind(this);
    this.dontRemNotif = this.dontRemNotif.bind(this);
  }

  componentDidMount() {
    const eventEmitter = new NativeEventEmitter(NativeModules.NativeTest);
    this.eventListener = eventEmitter.addListener(
      'notifOpened',
      (mainTimeIds) => this.setState({ natResp: 'true', mainTimeIds })
    );
  }

  componentWillUnmount() {
    this.eventListener.remove();
  }

  async checkIfNotifOpened() {
    NativeTest.isNotifOpen(this.state.mainTimIds[0], () => {
      this.setState({ natResp: 'gone' });
    });
  }

  async dismissNotif() {
    // so here after we receive the notification we dismiss it
    NativeTest.dismissNotif(this.state.mainTimIds[0], () => {
      // and here we check if it actuall has been dismissed
      // with a little timeout of 3 seconds
      setTimeout(this.checkIfNotifOpened, 3000);
    });
  }

  async dontRemNotif() {
    // so here after we receive the notification we dismiss it
    NativeTest.dontRemNotif(this.state.mainTimIds[0], () => {
      // and here we check if it actuall has been dismissed
      // with a little timeout of 3 seconds
      setTimeout(this.checkIfNotifOpened, 3000);
    });
  }

  onSnap(event) {
    const { id } = event.nativeEvent;
    if (id === 'bottom') {
      this.setState({ canScroll: true });
    }
  }

  onScroll(event) {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= 0) {
      this.setState({ canScroll: false });
    }
  }

  render() {
    const { natResp } = this.state;

    return (
      <View style={screenContainer.style}>
        <Text style={natTest.mainText} testID={nativeIds.mainText}>
          {natResp}
        </Text>
        <View
          style={{
            backgroundColor: '#542790',
            height: 250,
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [-58, -58, 0, 0],
                  }),
                },
                {
                  scale: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [0.35, 0.35, 1, 1],
                  }),
                },
              ],
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#b5d9f8',
                borderRadius: 75,
                marginTop: 50,
              }}
            />
          </Animated.View>
        </View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{ y: 0 }, { y: -150, id: 'bottom' }]}
          boundaries={{ top: -150 }}
          onSnap={this.onSnap.bind(this)}
          animatedValueY={this._deltaY}
          animatedValueX={this._deltaX}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => console.log('i was also pressed!')}
            style={{
              left: 0,
              right: 0,
              height: 50,
              backgroundColor: '#e0e0e0',
            }}
          >
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
          </TouchableOpacity>
        </Interactable.View>

        <GenButton
          testID={nativeIds.natDisNotif}
          // we time out this so we could see the notification
          // in the test, cause its removed waaay fast
          onPress={() => setTimeout(this.dismissNotif, 2000)}
          text="Dismiss notif"
        />
        <GenButton
          testID={nativeIds.dontRemNot}
          // we time out this so we could see the notification
          // in the test, cause its removed waaay fast
          onPress={() => setTimeout(this.dontRemNotif, 2000)}
          text="Dont rem notif"
        />
      </View>
    );
  }
}
