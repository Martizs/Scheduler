import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  TextInput,
  Text,
  ToastAndroid,
  ScrollView,
  Dimensions,
} from 'react-native';
/* styles */
import { darkBasic } from '../../styles/theme';
import { task } from './style';
/* components */
import { GenButton } from '../../components/GenButton';
import CheckBox from '@react-native-community/checkbox';
import { RepeatComp } from '../../components/RepeatComp';
import DropDownList from '../../components/DropDownList';
import SearchInput from '../../components/SearchInput';
import { RemPrev } from './components/RemPrev';
import { InfoModalContent } from '../../components/Modals/InfoModal/content';
/* consts */
import {
  hours,
  minutes,
  repTypes,
  repTypeObjects,
  befTimedTypes,
} from '../../consts/dateConts';
import {
  titleLength,
  desLength,
  REMINDER,
  TASK,
  titleBarHeight,
  simpleDDButHeight,
  rndTxtInputOffset,
  searchInpHeight,
} from '../../consts/generalConsts';
import { taskIds } from './testIds';
/* redux */
import { connect } from 'react-redux';
import {
  switchScreen,
  remBackAction,
  addBackAction,
  toggleModal,
} from '../../redux/general/actions';
/* database */
import { updateItem, addItem } from '../../database/crud';
import { getRems } from '../../database/retrievers';
import { dispatchDbCall } from '../../database/helpers';
/* utils */
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { delAllModal } from '../../utils/modalUtils';
import DaySelection from '../../components/DaySelection';
import {
  setSelMonth,
  setSelSpecDay,
  setSelYear,
} from '../../redux/dates/actions';
import { genDays } from '../../utils/dateUtils';

class TaskScreen extends React.Component {
  constructor(props) {
    super();

    this.initHour = 'hours';
    this.initMin = 'minutes';
    this.autoRem =
      props.extraInfo.hours &&
      props.extraInfo.hours !== this.initHour &&
      props.extraInfo.minutes &&
      props.extraInfo.minutes !== this.initMin;

    const { repeatability, desc, title } = props.extraInfo;

    this.dbRems = [];

    this.state = {
      inputX: 0,
      inputY: '-100%',
      dropDownY: false,
      dropDownMon: false,
      dropDownD: false,
      hourDropdown: false,
      minuteDropdown: false,
      resetYea: false,
      resetMon: false,
      resetDay: false,
      resetH: false,
      resetM: false,

      reminders: [],
      selHour: props.extraInfo.hours || this.initHour,
      selMin: props.extraInfo.minutes || this.initMin,
      repTypeDD: false,
      repTask: false,
      windHeight: Dimensions.get('window').height,
      editAll: true,
    };

    this.desc = desc;
    this.title = title;
    this.repNumber = repeatability ? repeatability.number : null;
    this.repType =
      repeatability && repeatability.type
        ? repeatability.type
        : repTypes[0].key;

    this.setYDropDown = this.setYDropDown.bind(this);
    this.setMonDropDown = this.setMonDropDown.bind(this);
    this.setDDropDown = this.setDDropDown.bind(this);
    this.setHDropDown = this.setHDropDown.bind(this);
    this.setMDropDown = this.setMDropDown.bind(this);

    this.toggleYeaRes = this.toggleYeaRes.bind(this);
    this.toggleDayRes = this.toggleDayRes.bind(this);
    this.toggleMonRes = this.toggleMonRes.bind(this);
    this.toggleHourRes = this.toggleHourRes.bind(this);
    this.toggleMinRes = this.toggleMinRes.bind(this);

    this.onYItemPress = this.onYItemPress.bind(this);
    this.onMonItemPress = this.onMonItemPress.bind(this);
    this.onDItemPress = this.onDItemPress.bind(this);
    this.onHItemPress = this.onHItemPress.bind(this);
    this.onMItemPress = this.onMItemPress.bind(this);

    this.setHour = this.setHour.bind(this);
    this.setMin = this.setMin.bind(this);
    this.setInputXY = this.setInputXY.bind(this);
    this.addUpdateTask = this.addUpdateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.repeatableT = this.repeatableT.bind(this);
    this.setRepTypeDD = this.setRepTypeDD.bind(this);
    this.onRepTypePress = this.onRepTypePress.bind(this);
    this.setRepTypeDDPos = this.setRepTypeDDPos.bind(this);
    this.setWindowHeight = this.setWindowHeight.bind(this);
    this.addEditReminder = this.addEditReminder.bind(this);
    this.delReminder = this.delReminder.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    if (this.props.extraInfo.id) {
      dispatchDbCall(() =>
        getRems(
          this.props.extraInfo.id,
          {},
          (reminders) => {
            this.setState({ reminders });
            this.dbRems = cloneDeep(reminders);
          },
          (err) => console.log(err)
        )
      );
    }
    this.props.dispatch(addBackAction('beforeBack', this.onBackPress));
  }

  componentDidUpdate(prevProps) {
    // window height adjustment
    if (
      !isEqual(
        this.props.screenOrient.eventChange.window,
        prevProps.screenOrient.eventChange.window
      )
    ) {
      this.setWindowHeight();
      if (this.state.repTypeDD) {
        this.setRepTypeDD(false);
      }

      this.toggleHourRes(true);
      this.toggleMinRes(true);
    }

    const { rem } = this.props.extraInfo;
    const { rem: prevRem } = prevProps.extraInfo;

    if (rem && ((prevRem && rem.change !== prevRem.change) || !prevRem)) {
      const reminders = this.state.reminders;
      const remInd = findIndex(reminders, ['id', rem.id]);
      if (reminders.length >= 5) {
        ToastAndroid.showWithGravityAndOffset(
          'You cannot set more than 5 reminders for a given task',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          50
        );
      } else if (remInd !== -1) {
        if (rem.delete) {
          reminders.splice(remInd, 1);
        } else {
          reminders[remInd] = rem;
        }
      } else {
        reminders.unshift(rem);
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ reminders });
    }

    if (!isEqual(this.props.selDay, prevProps.selDay)) {
      if (
        findIndex(this.props.calDays, {
          day: this.props.selDay.day,
          month: this.props.selDay.month,
          year: this.props.selDay.year,
        }) === -1
      ) {
        genDays(this.props.selDay, true, this.props.dispatch);
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(remBackAction('beforeBack'));
  }

  setWindowHeight() {
    this.setState({
      windHeight: Dimensions.get('window').height,
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

  toggleYeaRes(resetYea) {
    this.setState({
      resetYea,
    });
  }

  toggleMonRes(resetMon) {
    this.setState({
      resetMon,
    });
  }

  toggleDayRes(resetDay) {
    this.setState({
      resetDay,
    });
  }

  toggleHourRes(resetH) {
    this.setState({
      resetH,
    });
  }

  toggleMinRes(resetM) {
    this.setState({
      resetM,
    });
  }

  setInputXY(inputX, y) {
    this.setState({
      inputX,
      inputY: y - titleBarHeight + searchInpHeight + rndTxtInputOffset,
    });
  }

  addOnTimeRem(selHour, selMin) {
    if (!this.autoRem) {
      const onTimeInd = findIndex(this.state.reminders, ['sameTime', 0]);
      const taskRemId = Math.random().toString(36).substr(2, 22);
      if (onTimeInd === -1) {
        const reminders = this.state.reminders;
        reminders.unshift({
          change: 'whatevzzzzzzzzzzzz',
          before: {
            number: null,
            type: befTimedTypes[0].key,
          },
          taskRemId,
          delete: false,
          id: 'whatevzzzzzzzzzzzz',
          notif: true,
          repeat: null,
          repRem: undefined,
          sameTime: 0,
          selHour,
          selMin,
        });
      }
      this.autoRem = true;
    }
  }

  onYItemPress(item) {
    // number here as year
    this.props.dispatch(setSelYear(item.value));
    this.toggleYeaRes(true);
  }

  onMonItemPress(item) {
    // number here as month
    this.props.dispatch(setSelMonth(item.value));
    this.toggleMonRes(true);
  }

  onDItemPress(item) {
    // number here as day
    this.props.dispatch(setSelSpecDay(item.day));
    this.toggleDayRes(true);
  }

  onHItemPress(item) {
    this.setHour(item.title);
    this.addOnTimeRem(item.title, '00');
    if (this.initMin === this.state.selMin) {
      // so if a user selects an hour for the task
      // minutes get auto-selected if it was not selected
      // as hour cant go without minutes
      this.setMin('00');
    }
    this.toggleHourRes(true);
  }

  onMItemPress(item) {
    this.setMin(item.title);
    this.addOnTimeRem('00', item.title);
    if (this.initMin === this.state.selMin) {
      // so if a user selects minutes for the task
      // hours get auto-selected if it was not selected
      // as minutes cant go without hours
      this.setHour('00');
    }
    this.toggleMinRes(true);
  }

  setYDropDown(dropDownY) {
    const stateObj = {
      dropDownY,
    };
    if (!dropDownY) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  setMonDropDown(dropDownMon) {
    const stateObj = {
      dropDownMon,
    };
    if (!dropDownMon) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  setDDropDown(dropDownD) {
    const stateObj = {
      dropDownD,
    };
    if (!dropDownD) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  setHDropDown(hourDropdown) {
    const stateObj = {
      hourDropdown,
    };

    // so basically when the dropdown dissappears
    // we want to set the dropdown default positions
    // to be out of screen, so that it would seemingly
    // appear on the screen rather than moving to one position
    // from its previous position aka switching between
    // month and year dropdowns
    if (!hourDropdown) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }

    this.setState(stateObj);
  }

  setMDropDown(minuteDropdown) {
    const stateObj = {
      minuteDropdown,
    };

    // so basically when the dropdown dissappears
    // we want to set the dropdown default positions
    // to be out of screen, so that it would seemingly
    // appear on the screen rather than moving to one position
    // from its previous position aka switching between
    // month and year dropdowns
    if (!minuteDropdown) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }

    this.setState(stateObj);
  }

  setRepTypeDD(repTypeDD) {
    const stateObj = {
      repTypeDD,
    };

    // so basically when the dropdown dissappears
    // we want to set the dropdown default positions
    // to be out of screen, so that it would seemingly
    // appear on the screen rather than moving to one position
    // from its previous position aka switching between
    // month and year dropdowns
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

  setRepTypeDDPos() {
    this.repRef &&
      this.repRef.measure((fx, fy, width, height, px, py) => {
        // so we add simpleDDButHeight here cause we want the dropdown to
        // appear under the dropdown button
        this.setState({
          inputX: px,
          inputY: py - titleBarHeight + simpleDDButHeight,
        });
      });
  }

  onBackPress() {
    if (
      this.props.extraInfo.update &&
      !isEqual(this.dbRems, this.state.reminders)
    ) {
      this.props.dispatch(
        toggleModal(
          'Update reminders?',
          <InfoModalContent text="You've updated some reminders, would you like to save the changes before backing out?" />,
          [
            {
              title: 'Yes',
              type: 'accept',
              func: () => {
                this.addUpdateTask();
                this.props.dispatch(toggleModal());
              },
            },
            {
              title: 'No',
              type: 'error',
              func: () => {
                this.props.dispatch(toggleModal());
                this.props.dispatch(switchScreen(null, true));
              },
            },
          ]
        )
      );
    } else {
      this.props.dispatch(switchScreen(null, true));
    }
  }

  addUpdateTask() {
    const { year, month, day } = this.props.selDay;
    const {
      update,
      id: time_id,
      task_id,
      done,
      hours: propHours,
      minutes: propMinutes,
      afterLinks,
    } = this.props.extraInfo;

    const { selHour, selMin, editAll, reminders } = this.state;

    if (!this.title || this.title.length === 0) {
      ToastAndroid.showWithGravityAndOffset(
        'Task needs a title',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      let hourz = selHour;
      let minutez = selMin;
      if (selHour === 'hours' && selMin === 'minutes') {
        hourz = '';
        minutez = '';
      }

      let newRep = null;
      if (this.state.repTask) {
        newRep = {
          type: this.repType,
          number: this.repNumber,
        };
      }

      const onlyPosNumbers = /^\d+$/.test(this.repNumber);

      if (
        this.state.repTask &&
        (!this.repNumber || !onlyPosNumbers || this.repNumber.charAt(0) === '0')
      ) {
        ToastAndroid.showWithGravityAndOffset(
          'You need to provide a valid repeat number for the repeatable task',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          50
        );
      } else {
        if (update) {
          dispatchDbCall(() =>
            updateItem(
              time_id,
              task_id,
              editAll,
              this.title,
              this.desc,
              year,
              parseInt(month, 10) + 1,
              day,
              hourz,
              propHours,
              minutez,
              propMinutes,
              this.dbRems,
              reminders,
              done,
              afterLinks,
              !!newRep,
              () => this.props.dispatch(switchScreen(null, true))
            )
          );
        } else {
          dispatchDbCall(() =>
            addItem(
              this.title,
              this.desc,
              year,
              parseInt(month, 10) + 1,
              day,
              hourz,
              minutez,
              newRep,
              reminders,
              () => this.props.dispatch(switchScreen(null, true))
            )
          );
        }
      }
    }
  }

  deleteTask() {
    const { id: time_id, task_id, repeatability } = this.props.extraInfo;
    delAllModal(time_id, task_id, repeatability, this.props.dispatch, () =>
      this.props.dispatch(switchScreen(null, true))
    );
  }

  addEditReminder(remData) {
    const { selHour, selMin } = this.state;
    this.props.dispatch(
      switchScreen(REMINDER, false, false, {
        selHour,
        selMin,
        remData,
      })
    );
  }

  delReminder(id) {
    const reminders = this.state.reminders;
    const remInd = findIndex(reminders, ['id', id]);
    if (remInd !== -1) {
      reminders.splice(remInd, 1);
      this.setState({ reminders });
    } else {
      console.log('Reminder to be deleted was not found: ', id);
    }
  }

  repeatableT(repTask) {
    this.setState({
      repTask,
    });
  }

  render() {
    const { repeatability, update } = this.props.extraInfo;

    const repeatableTask = !!repeatability && !!repeatability.type;

    const descInput = {
      ...task.textInput,
      marginBottom: 0,
    };

    const timeCont = update
      ? {
          ...task.timeCont,
          paddingTop: RFValue(12),
        }
      : task.timeCont;

    return (
      <View style={task.container}>
        <View style={task.innContainer}>
          <ScrollView>
            {!update && (
              <DaySelection
                setDDropDown={this.setDDropDown}
                setMDropDown={this.setMonDropDown}
                setYDropDown={this.setYDropDown}
                resetDay={this.state.resetDay}
                resetMon={this.state.resetMon}
                resetYea={this.state.resetYea}
                toggleDayRes={this.toggleDayRes}
                toggleMonRes={this.toggleMonRes}
                toggleYeaRes={this.toggleYeaRes}
                setInputXY={this.setInputXY}
                custCont={task.daySelCont}
              />
            )}
            <View style={timeCont}>
              <SearchInput
                testID={taskIds.hourInp}
                setDropDown={this.setHDropDown}
                itemSel={this.state.selHour + ''}
                data={hours}
                resetItem={this.state.resetH}
                toggleResItem={this.toggleHourRes}
                numeric
                setInputXY={this.setInputXY}
                plHGrey={this.initHour === this.state.selHour}
                onItemPress={this.onHItemPress}
                singleAutoSel
              />
              <Text style={task.sepContainer}>:</Text>
              <SearchInput
                testID={taskIds.minInp}
                setDropDown={this.setMDropDown}
                itemSel={this.state.selMin + ''}
                data={minutes}
                resetItem={this.state.resetM}
                toggleResItem={this.toggleMinRes}
                numeric
                setInputXY={this.setInputXY}
                plHGrey={this.initMin === this.state.selMin}
                onItemPress={this.onMItemPress}
                singleAutoSel
              />
            </View>
            <TextInput
              testID={taskIds.titInp}
              style={task.textInput}
              placeholder="Title"
              placeholderTextColor={darkBasic.placeHolderColor}
              onChangeText={(text) => (this.title = text)}
              defaultValue={this.title}
              maxLength={titleLength}
              multiline
            />
            <TextInput
              testID={taskIds.descInp}
              style={descInput}
              placeholder="Description"
              placeholderTextColor={darkBasic.placeHolderColor}
              onChangeText={(text) => (this.desc = text)}
              defaultValue={this.desc}
              maxLength={desLength}
              multiline
            />
          </ScrollView>
          <RemPrev
            reminders={this.state.reminders}
            addReminder={this.addEditReminder}
            editReminder={this.addEditReminder}
            delReminder={this.delReminder}
          />
          {!update && (
            <RepeatComp
              onCheck={() =>
                this.state.repTask
                  ? this.repeatableT(false)
                  : this.repeatableT(true)
              }
              onNumbChange={(text) => (this.repNumber = text)}
              setTypeRef={(ref) => {
                this.repRef = ref;
              }}
              setDD={() => this.setRepTypeDD(repTypes)}
              repTask={this.state.repTask}
              editAll={this.state.editAll}
              repNumber={this.repNumber}
              repTypeName={repTypeObjects[this.repType]}
              repLabel="Repeat task"
            />
          )}
          {repeatableTask && update && (
            <View style={task.repSelContainer}>
              <CheckBox
                testID={taskIds.repToSing}
                value={this.state.editAll}
                onValueChange={() =>
                  this.state.editAll
                    ? this.setState({ editAll: false })
                    : this.setState({ editAll: true })
                }
                tintColors={{
                  true: darkBasic.textColor,
                  false: darkBasic.textColor,
                }}
              />
              <Text style={task.repSelText}>Edit all repeated tasks</Text>
            </View>
          )}
          <View style={task.butCont}>
            <GenButton
              testID={taskIds.addBut}
              color={darkBasic.buttTypes.accept}
              onPress={() => this.addUpdateTask()}
              text={update ? 'Update' : 'Add'}
            />
            <GenButton
              testID={taskIds.backBut}
              color={darkBasic.buttTypes.info}
              onPress={() => this.onBackPress()}
              text="Back"
            />
            {update && (
              <GenButton
                testID={taskIds.delBut}
                color={darkBasic.buttTypes.error}
                onPress={() => this.deleteTask()}
                text="Delete"
              />
            )}
          </View>
        </View>
        {this.state.dropDownY && (
          <DropDownList
            dropDown={this.state.dropDownY}
            onItemPress={this.onYItemPress}
            tapOut={() => this.toggleYeaRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.dropDownMon && (
          <DropDownList
            dropDown={this.state.dropDownMon}
            onItemPress={this.onMonItemPress}
            tapOut={() => this.toggleMonRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.dropDownD && (
          <DropDownList
            dropDown={this.state.dropDownD}
            onItemPress={this.onDItemPress}
            tapOut={() => this.toggleDayRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.hourDropdown && (
          <DropDownList
            dropDown={this.state.hourDropdown}
            onItemPress={this.onHItemPress}
            tapOut={() => this.toggleHourRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.minuteDropdown && (
          <DropDownList
            dropDown={this.state.minuteDropdown}
            onItemPress={this.onMItemPress}
            tapOut={() => this.toggleMinRes(true)}
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

const mapStateToProps = (state) => {
  const navItem = find(state.currScreen.navRoute, ['key', TASK]);
  return {
    screenOrient: state.screenOrient,
    extraInfo: navItem ? navItem.extraInfo : {},
    selDay: state.selDay,
    calDays: state.calDays.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
