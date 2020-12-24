import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
/* styles */
import { mainContainer, textContainer } from '../../styles/generalStyles';
import { darkBasic } from '../../styles/theme';
import { alarm } from './style';
/* components */
import { MainTask } from './components/MainTask';
/* schedule */
import {
  openApp,
  stopMedia,
  isMediaPlaying,
  cancelPendings,
} from '../../schedule';
/* consts */
import { backgroundImage } from '../../consts/generalConsts';
/* database */
import { getTimeTasks } from '../../database/retrievers';
import { dispatchDbCall } from '../../database/helpers';
import { dontRepRem } from '../../database/crud';
/* redux */
import { connect } from 'react-redux';
import { setAppRngCode } from '../../redux/general/actions';

class Alarm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      timeTask: null,
      ringing: false,
    };

    this.onDontRemSave = this.onDontRemSave.bind(this);
    this.stopRinging = this.stopRinging.bind(this);
    this.onAlarmBackground = this.onAlarmBackground.bind(this);
    this.alarmAction = this.alarmAction.bind(this);
  }

  componentDidMount() {
    if (this.props.error) {
      ToastAndroid.showWithGravityAndOffset(
        this.props.error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    }
    // here we cancel all other notification pending intents that might have been
    // set up, as we don't want duplicates to exist, we only use one shots
    // and since this oneshot got activated, others must dissapear
    cancelPendings(this.props.mainTimeId);

    console.log('alarm mount this.props', this.props);
    const eventEmitter = new NativeEventEmitter(NativeModules.ScheduleTime);
    this.eventListener = eventEmitter.addListener('ringStop', () => {
      this.setState({ ringing: false });
    });

    const pauseEmitter = new NativeEventEmitter(NativeModules.ScheduleTime);
    this.pauseListener = pauseEmitter.addListener('pause', () =>
      this.onAlarmBackground()
    );

    // so apperantly when you press the back button the pause does not trigger
    // so we have to handle things manually here
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onAlarmBackground
    );

    dispatchDbCall(() =>
      getTimeTasks(false, { timeId: this.props.mainTimeId }, (timeTasks) =>
        this.setState({ timeTask: timeTasks[0] })
      )
    );

    if (!this.props.notifRing) {
      isMediaPlaying(
        (ringing) => {
          this.setState({ ringing });
        },
        (err) => {
          ToastAndroid.showWithGravityAndOffset(
            'An error occured with media player, please report it',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50
          );
          console.log(err);
        }
      );
    }
  }

  componentWillUnmount() {
    this.eventListener.remove();
    this.pauseListener.remove();
    this.backHandler.remove();
  }

  // so here the app goes into background OR
  // some other thing comes over the app AND
  // this is where the ringing should stop
  onAlarmBackground() {
    this.props.dispatch(setAppRngCode(this.props.rngCode));
    if (this.state.ringing) {
      stopMedia();
    }
  }

  alarmAction(opApp) {
    if (this.state.ringing) {
      stopMedia();
    }

    if (opApp) {
      openApp();
    } else {
      this.props.dispatch(setAppRngCode(this.props.rngCode));
      BackHandler.exitApp();
    }
  }

  onDontRemSave(opApp, dontRem) {
    if (dontRem) {
      dispatchDbCall(() =>
        dontRepRem(
          this.props.mainTimeId,
          () => {
            this.alarmAction(opApp);
          },
          (err) => {
            ToastAndroid.showWithGravityAndOffset(
              'An error occured, please report it and try removing the reminders for the task manually',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              50
            );
            console.log(err);
          }
        )
      );
    } else {
      this.alarmAction(opApp);
    }
  }

  stopRinging() {
    stopMedia();
    this.setState({ ringing: false });
  }

  render() {
    const { timeTask } = this.state;

    return (
      <ImageBackground source={backgroundImage} style={mainContainer.style}>
        <View style={alarm.container}>
          <View style={alarm.taskCont}>
            <ScrollView>
              {timeTask && (
                <MainTask
                  dateName={timeTask.dateName}
                  hours={timeTask.hours}
                  minutes={timeTask.minutes}
                  title={timeTask.title}
                  desc={timeTask.description}
                />
              )}
            </ScrollView>
          </View>

          {timeTask && this.props.remWillRep && (
            <TouchableOpacity
              style={{
                ...alarm.button,
                borderColor: darkBasic.buttTypes.error,
              }}
              onPress={() => this.onDontRemSave(false, true)}
            >
              <Text style={textContainer.style}>Don't remind again</Text>
            </TouchableOpacity>
          )}

          <View style={alarm.butSurCont}>
            <View style={alarm.butContainer}>
              <TouchableOpacity
                style={{
                  ...alarm.button,
                  borderColor: darkBasic.buttTypes.info,
                }}
                onPress={() => this.onDontRemSave()}
              >
                <Text style={textContainer.style}>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...alarm.button,
                  borderColor: darkBasic.buttTypes.nav,
                }}
                onPress={() => this.onDontRemSave(true)}
              >
                <Text style={textContainer.style}>Go to app</Text>
              </TouchableOpacity>
              {this.state.ringing && (
                <TouchableOpacity
                  style={{
                    ...alarm.button,
                    borderColor: darkBasic.buttTypes.error,
                  }}
                  onPress={() => this.stopRinging()}
                >
                  <View style={alarm.innButCont}>
                    <View style={alarm.stopIcon} />
                    <Text style={textContainer.style}>Stop ringing</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapDispatchToProps)(Alarm);