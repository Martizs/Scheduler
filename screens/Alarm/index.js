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
  showInApp,
  stopMedia,
  isMediaPlaying,
  cancelPendings,
  cancelNotif,
} from '../../schedule';
/* consts */
import { backgroundImage } from '../../consts/generalConsts';
import { alarmIds } from './testIds';
/* database */
import { getTimeTasks } from '../../database/retrievers';
import { dispatchDbCall } from '../../database/helpers';
import { doneTask, dontRepRem } from '../../database/crud';
/* redux */
import { connect } from 'react-redux';
import {
  setAppRngCode,
  setInitDate,
  setInitItemId,
} from '../../redux/general/actions';

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
    this.markAsDone = this.markAsDone.bind(this);
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
      const { year, month, day } = this.state.timeTask;
      this.props.dispatch(setInitItemId(this.props.mainTimeId));
      // -1 cause in the db its saved as the normal number 1-12
      // but retarded date functions accept month count 0-11
      this.props.dispatch(
        setInitDate({
          year: parseInt(year, 10),
          month: parseInt(month, 10) - 1,
          day: parseInt(day, 10),
        })
      );
      showInApp();
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
            cancelNotif(this.props.mainTimeId);
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
      cancelNotif(this.props.mainTimeId);
      this.alarmAction(opApp);
    }
  }

  markAsDone() {
    dispatchDbCall(() =>
      doneTask(
        this.props.mainTimeId,
        true,
        () => {
          cancelNotif(this.props.mainTimeId);
          this.alarmAction();
        },
        (err) => console.log('Alarm mark as done error: ', err)
      )
    );
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
              testID={alarmIds.dontRem}
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
                testID={alarmIds.dismiss}
                style={{
                  ...alarm.button,
                  borderColor: darkBasic.buttTypes.info,
                }}
                onPress={() => this.onDontRemSave()}
              >
                <Text style={textContainer.style}>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={alarmIds.toApp}
                style={{
                  ...alarm.button,
                  borderColor: darkBasic.buttTypes.nav,
                }}
                onPress={() => this.onDontRemSave(true)}
              >
                <Text testID={alarmIds.toAppTxt} style={textContainer.style}>
                  Show in app
                </Text>
              </TouchableOpacity>
              {this.state.ringing && (
                <TouchableOpacity
                  testID={alarmIds.stop}
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
              <TouchableOpacity
                testID={alarmIds.markDone}
                style={{
                  ...alarm.button,
                  borderColor: darkBasic.buttTypes.error,
                }}
                onPress={() => this.markAsDone()}
              >
                <Text style={textContainer.style}>Mark as done</Text>
              </TouchableOpacity>
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
