import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Keyboard,
} from 'react-native';
/* styles */
import { rem, maxListHeight } from './style';
import { darkBasic, smallIconSize } from '../../styles/theme';
/* components */
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput from '../../components/SearchInput';
import DropDownList from '../../components/DropDownList';
import { GenButton } from '../../components/GenButton';
import { RadioButton } from '../../components/RadioButton';
import { RepeatComp } from '../../components/RepeatComp';
/* consts */
import {
  hours,
  minutes,
  befTypes,
  befTypeObjects,
  repRemTypes,
  repRemTypeObjects,
  repTypeWeek,
  befTimedTypes,
  repTypeMins,
} from '../../consts/dateConts';
import {
  TASK,
  searchInpHeight,
  rndTxtInputOffset,
  simpleDDButHeight,
  titleBarHeight,
} from '../../consts/generalConsts';
import { remTimes } from './const';
import { remIds } from './testIds';
/* redux */
import { connect } from 'react-redux';
import {
  remBackAction,
  addBackAction,
  switchScreen,
  addExtraInfo,
  toggleAppDD,
  setAppDD,
  setXYDD,
} from '../../redux/general/actions';
/* utils */
import isEqual from 'lodash/isEqual';
import { repTypeHours } from './../../consts/dateConts';
import { environment } from '../../env';

class Reminder extends React.Component {
  constructor(props) {
    super();

    const { remData } = props.extraInfo;

    this.initHour = 'hours';
    this.initMin = 'minutes';
    this.befNumb = remData && remData.before ? remData.before.number : null;

    this.repNumb = remData && remData.repeat ? remData.repeat.number : null;
    this.repType =
      remData && remData.repeat ? remData.repeat.type : repRemTypes[0].key;

    this.initTime =
      props.extraInfo.selHour === this.initHour &&
      props.extraInfo.selMin === this.initMin;

    this.defBefType = this.initTime ? befTypes[0].key : befTimedTypes[0].key;
    this.befType =
      remData && remData.before ? remData.before.type : this.defBefType;

    let initSelHour = this.initTime ? '18' : props.extraInfo.selHour;
    let initSelMin = this.initTime ? '00' : props.extraInfo.selMin;

    let inSameTime = this.initTime ? 1 : 0;

    if (remData) {
      initSelHour = remData.selHour;
      initSelMin = remData.selMin;
      inSameTime = remData.sameTime;
    }

    this.state = {
      windHeight: Dimensions.get('window').height,
      portrait: true,
      inputX: 0,
      inputY: '-100%',
      hourDropdown: false,
      minuteDropdown: false,
      befDropDown: false,
      repTypeDD: false,
      selHour: initSelHour,
      selMin: initSelMin,
      resetH: false,
      resetMin: false,
      repRem: remData && !!remData.repeat,
      // so 0 - onTime, 1 - same day, 2 - custom
      sameTime: inSameTime,
      notif: remData ? remData.notif : true,
      testCheck: false,
    };

    this.setHDropDown = this.setHDropDown.bind(this);
    this.setMinDropDown = this.setMinDropDown.bind(this);
    this.setHour = this.setHour.bind(this);
    this.setMin = this.setMin.bind(this);
    this.toggleHourRes = this.toggleHourRes.bind(this);
    this.toggleMinRes = this.toggleMinRes.bind(this);
    this.setInputXY = this.setInputXY.bind(this);
    this.setBefTypeDDPos = this.setBefTypeDDPos.bind(this);
    this.setRepTypeDDPos = this.setRepTypeDDPos.bind(this);
    this.onHItemPress = this.onHItemPress.bind(this);
    this.onMinItemPress = this.onMinItemPress.bind(this);
    this.onBefTypePress = this.onBefTypePress.bind(this);
    this.onRepTypePress = this.onRepTypePress.bind(this);
    this.repeatableR = this.repeatableR.bind(this);
    this.addUpdateReminder = this.addUpdateReminder.bind(this);
    this.delReminder = this.delReminder.bind(this);
  }

  componentDidMount() {
    this.setWindowParams();
  }

  componentDidUpdate(prevProps) {
    // window height adjustment
    if (
      !isEqual(
        this.props.screenOrient.eventChange.window,
        prevProps.screenOrient.eventChange.window
      )
    ) {
      Keyboard.dismiss();
      this.setWindowParams();
      if (this.state.repTypeDD) {
        this.setRepTypeDD(false);
      }
      if (this.state.befDropDown) {
        this.setBefDropDown(false);
      }
      this.toggleHourRes(true);
      this.toggleMinRes(true);
    }
  }

  setWindowParams() {
    let portrait = true;

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    if (width > height) {
      portrait = false;
    }

    this.setState({
      portrait,
      windHeight: height,
    });
  }

  setHour(selHour) {
    this.setState({
      selHour,
    });
  }

  setMin(selMin) {
    this.setState({
      selMin,
    });
  }

  setSameTime(sameTime) {
    this.setState({ sameTime });
  }

  toggleHourRes(resetH) {
    this.setState({
      resetH,
    });
  }

  toggleMinRes(resetMin) {
    this.setState({
      resetMin,
    });
  }

  setInputXY(inputX, y, keybHeight) {
    if (
      inputX !== 0 &&
      y !== '-100%' &&
      (this.state.hourDropdown || this.state.minuteDropdown)
    ) {
      // random extra offset
      let inputY = y + searchInpHeight + rndTxtInputOffset;
      if (!this.state.portrait) {
        // we substract here from the window height, as when comparing we want to compare
        // both counting from bottom to top, whilst the dropdown position is usually
        // from top to bottom
        const bottomPos =
          Dimensions.get('window').height - (inputY + maxListHeight);

        if (keybHeight > bottomPos) {
          inputY = y - maxListHeight;
          inputY = inputY > 0 ? inputY : 0;
        }
      }
      this.props.dispatch(setXYDD(inputX, inputY));
    }
  }

  onHItemPress(item) {
    this.setHour(item.value);
    if (this.initMin === this.state.selMin) {
      // so if a user selects an hour for the task
      // minutes get auto-selected if it was not selected
      // as hour cant go without minutes
      this.setMin('00');
    }
    this.toggleHourRes(true);
  }

  onMinItemPress(item) {
    this.setMin(item.value);
    if (this.initMin === this.state.selMin) {
      // so if a user selects minutes for the task
      // hours get auto-selected if it was not selected
      // as minutes cant go without hours
      this.setHour('00');
    }
    this.toggleMinRes(true);
  }

  onBefTypePress(item) {
    this.befType = item.key;
    this.befNumb = null;
    this.setBefDropDown(false);
  }

  setHDropDown(hourDropdown) {
    if (!this.props.ddData && hourDropdown) {
      // open app wide DD with initial values
      this.props.dispatch(
        toggleAppDD(
          hourDropdown,
          this.onHItemPress,
          () => this.toggleHourRes(true),
          rem.custSearchDD
        )
      );
      this.setState({
        hourDropdown: true,
      });
    } else if (!hourDropdown) {
      this.props.dispatch(toggleAppDD());
      this.setState({
        hourDropdown: false,
      });
    } else {
      this.props.dispatch(setAppDD(hourDropdown));
    }
  }

  setMinDropDown(minuteDropdown) {
    if (!this.props.ddData && minuteDropdown) {
      // open app wide DD with initial values
      this.props.dispatch(
        toggleAppDD(
          minuteDropdown,
          this.onMinItemPress,
          () => this.toggleMinRes(true),
          rem.custSearchDD
        )
      );
      this.setState({
        minuteDropdown: true,
      });
    } else if (!minuteDropdown) {
      this.props.dispatch(toggleAppDD());
      this.setState({
        minuteDropdown: false,
      });
    } else {
      this.props.dispatch(setAppDD(minuteDropdown));
    }
  }

  setBefTypeDDPos() {
    this.befRef &&
      this.befRef.measure((fx, fy, width, height, px, py) => {
        this.setState({
          inputX: px,
          inputY: py - titleBarHeight + simpleDDButHeight,
        });
      });
  }

  setBefDropDown(befDropDown) {
    const stateObj = {
      befDropDown,
    };

    if (!befDropDown) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
      this.props.dispatch(remBackAction('closeRepDropDown'));
      this.setState(stateObj);
    } else {
      this.props.dispatch(
        addBackAction('closeRepDropDown', () =>
          this.setState({ befDropDown: false, inputX: 0, inputY: '-100%' })
        )
      );
      this.setState(stateObj, () => this.setBefTypeDDPos());
    }

    this.setState(stateObj);
  }

  setRepTypeDDPos() {
    this.repRef &&
      this.repRef.measure((fx, fy, width, height, px, py) => {
        this.setState({
          inputX: px,
          inputY: py - titleBarHeight + simpleDDButHeight,
        });
      });
  }

  setRepTypeDD(repTypeDD) {
    const stateObj = {
      repTypeDD,
    };

    if (!repTypeDD) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';

      this.props.dispatch(remBackAction('closeRepDropDown'));
      this.setState(stateObj);
    } else {
      this.props.dispatch(
        addBackAction('closeRepDropDown', () =>
          this.setState({ repTypeDD: false, inputX: 0, inputY: '-100%' })
        )
      );
      this.setState(stateObj, () => this.setRepTypeDDPos());
    }
  }

  onRepTypePress(item) {
    this.repType = item.key;
    this.setRepTypeDD(false);
  }

  repeatableR(repRem) {
    this.setState({
      repRem,
    });
  }

  addUpdateReminder() {
    const { selHour, selMin, repRem, sameTime, notif, testCheck } = this.state;

    const onlyPosRep = /^\d+$/.test(this.repNumb);
    const onlyPosBef = /^\d+$/.test(this.befNumb);

    if (
      repRem &&
      (!this.repNumb || !onlyPosRep || this.repNumb.charAt(0) === '0')
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'You need to provide a valid REPEAT number for the reminder',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else if (
      sameTime === 2 &&
      (!this.befNumb || !onlyPosBef || this.befNumb.charAt(0) === '0')
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'You need to provide a valid BEFORE number for the reminder',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      let repeat = null;
      if (repRem) {
        repeat = {
          type: this.repType,
          number: this.repNumb,
        };
      }
      const { remData } = this.props.extraInfo;
      // so here we pass in the data with the
      // key 'rem' cause there's similarly called
      // data in the task screen already
      // we also generate a random number, everytime
      // to indicate that some new data be comin in
      // unless the reminder is being edited, then
      // we just will pass in its ID
      // we also use the change to store the
      // taskRemId which we will use to update and
      // edit the reminders related to task itself
      const change = Math.random().toString(36).substr(2, 22);
      // NOTE: reminders coming from db will always have an
      // int ID, new reminders will always be string
      const id = remData ? remData.id : change;
      const taskRemId = remData ? remData.taskRemId : change;
      this.props.dispatch(
        addExtraInfo(TASK, {
          rem: {
            id,
            change,
            taskRemId,
            before: {
              number: this.befNumb,
              type: this.befType,
            },
            repeat,
            selHour,
            selMin,
            repRem,
            sameTime,
            notif,
            delete: false,
            testCheck,
          },
        })
      );
      this.props.dispatch(switchScreen(null, true));
    }
  }

  delReminder() {
    this.props.dispatch(
      addExtraInfo(TASK, {
        rem: {
          id: this.props.extraInfo.remData.id,
          change: Math.random().toString(36).substr(2, 22),
          delete: true,
        },
      })
    );
    this.props.dispatch(switchScreen(null, true));
  }

  render() {
    const { selHour, selMin, sameTime, notif, portrait } = this.state;

    const remTypeRadRow = {
      ...rem.radRow,
      marginTop: 10,
    };

    return (
      <View style={rem.container}>
        <View style={rem.innContainer}>
          <ScrollView>
            <View style={rem.section}>
              <View style={rem.radRow}>
                {!this.initTime && (
                  <RadioButton
                    testID={remIds.onTimeCheck}
                    onPress={() => this.setSameTime(0)}
                    label={remTimes[0]}
                    value={sameTime === 0}
                  />
                )}
                <RadioButton
                  testID={remIds.sameDayCheck}
                  onPress={() => this.setSameTime(1)}
                  label={remTimes[1]}
                  value={sameTime === 1}
                />
                <RadioButton
                  testID={remIds.befCheck}
                  onPress={() => this.setSameTime(2)}
                  label={remTimes[2]}
                  value={sameTime === 2}
                />
              </View>
              {sameTime === 2 && (
                <View style={rem.befContainer}>
                  <TextInput
                    testID={remIds.befInput}
                    style={rem.numbTextInput}
                    placeholder="Number"
                    keyboardType="numeric"
                    placeholderTextColor={darkBasic.placeHolderColor}
                    onChangeText={(text) => (this.befNumb = text)}
                    defaultValue={this.befNumb}
                    maxLength={this.befType !== repTypeWeek ? 2 : 1}
                    multiline
                  />
                  <View>
                    <TouchableOpacity
                      ref={(ref) => {
                        this.befRef = ref;
                      }}
                      style={rem.befTypeDD}
                      onPress={() =>
                        this.setBefDropDown(
                          this.initTime ? befTypes : befTimedTypes
                        )
                      }
                      testID={remIds.befDDBut}
                    >
                      <Text style={rem.befTypeDDText}>
                        {befTypeObjects[this.befType]}
                      </Text>
                      <Icon
                        name="keyboard-arrow-down"
                        size={smallIconSize}
                        color={darkBasic.textColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={rem.befText}>Before</Text>
                </View>
              )}
              {(sameTime === 1 ||
                (sameTime === 2 &&
                  this.befType !== repTypeMins &&
                  this.befType !== repTypeHours)) && (
                <View style={rem.timeCont}>
                  <Text style={rem.timeText}>At </Text>
                  <View style={rem.butInpCont}>
                    <SearchInput
                      testID={remIds.hourInp}
                      setDropDown={this.setHDropDown}
                      itemSel={selHour + ''}
                      data={hours}
                      resetItem={this.state.resetH}
                      toggleResItem={this.toggleHourRes}
                      numeric
                      setInputXY={this.setInputXY}
                      setWithKeyB={!portrait && this.state.hourDropdown}
                      onItemPress={this.onHItemPress}
                      singleAutoSel
                    />
                    <Text style={rem.sepContainer}>:</Text>
                    <SearchInput
                      testID={remIds.minInp}
                      setDropDown={this.setMinDropDown}
                      itemSel={selMin + ''}
                      data={minutes}
                      resetItem={this.state.resetMin}
                      toggleResItem={this.toggleMinRes}
                      numeric
                      setWithKeyB={!portrait && this.state.minuteDropdown}
                      setInputXY={this.setInputXY}
                      onItemPress={this.onMinItemPress}
                      singleAutoSel
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={rem.section}>
              <View style={remTypeRadRow}>
                <RadioButton
                  testID={remIds.notCheck}
                  onPress={() => this.setState({ notif: true })}
                  label="Notification"
                  value={notif}
                />
                <RadioButton
                  testID={remIds.alCheck}
                  onPress={() => this.setState({ notif: false })}
                  label="Alarm"
                  value={!notif}
                />
              </View>
            </View>
            {environment === 'development' && (
              <View style={rem.section}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState((prevState) => {
                      return {
                        testCheck: !prevState.testCheck,
                      };
                    })
                  }
                  testID={remIds.testCheck}
                >
                  <CheckBox
                    value={this.state.testCheck}
                    disabled
                    tintColors={{
                      true: darkBasic.textColor,
                      false: darkBasic.textColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={rem.repRemCont}>
              <RepeatComp
                rem
                onCheck={() =>
                  this.state.repRem
                    ? this.repeatableR(false)
                    : this.repeatableR(true)
                }
                onNumbChange={(text) => (this.repNumb = text)}
                setTypeRef={(ref) => {
                  this.repRef = ref;
                }}
                setDD={() => this.setRepTypeDD(repRemTypes)}
                repTask={this.state.repRem}
                editAll
                repNumber={this.repNumb}
                repTypeName={repRemTypeObjects[this.repType]}
                repLabel="Repeat reminder"
              />
            </View>
          </ScrollView>
          <View style={rem.butInpCont}>
            <GenButton
              testID={remIds.addUptBut}
              color={darkBasic.buttTypes.accept}
              onPress={this.addUpdateReminder}
              text={this.props.extraInfo.remData ? 'Update' : 'Add'}
            />
            <GenButton
              color={darkBasic.buttTypes.info}
              onPress={() => this.props.dispatch(switchScreen(null, true))}
              text="Back"
            />
            {!!this.props.extraInfo.remData && (
              <GenButton
                color={darkBasic.buttTypes.error}
                onPress={this.delReminder}
                text="Delete"
              />
            )}
          </View>
        </View>
        {this.state.befDropDown && (
          <DropDownList
            dropDown={this.state.befDropDown}
            onItemPress={this.onBefTypePress}
            tapOut={() => this.setBefDropDown(false)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.repTypeDD && (
          <DropDownList
            dropDown={this.state.repTypeDD}
            onItemPress={this.onRepTypePress}
            tapOut={() => this.setRepTypeDD(false)}
            windHeight={this.state.windHeight}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  screenOrient: state.screenOrient,
  ddData: state.appDD.ddData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
