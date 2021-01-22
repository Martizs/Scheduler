import React from 'react';
import { View, AppState } from 'react-native';
/* styles */
import { month, horMonth } from './style';
import { darkBasic } from '../../styles/theme';
/* components */
import { Calendar } from '../../components/Calendar';
import { IconButton } from '../../components/IconButton';
import TaskPreview from '../../components/TaskPreview';
import DropDownList from '../../components/DropDownList';
import { GenButton } from '../../components/GenButton';
/* redux */
import { connect } from 'react-redux';
import {
  clearExtraInfo,
  remBackAction,
  switchScreen,
} from '../../redux/general/actions';
/* utils */
import findLast from 'lodash/findLast';
import isEqual from 'lodash/isEqual';
/* consts */
import {
  titleBarHeight,
  searchInpHeight,
  rndTxtInputOffset,
  MONTH,
} from '../../consts/generalConsts';
import { setSelMonth, setSelYear } from '../../redux/dates/actions';
import { genDays } from '../../utils/dateUtils';
/* database */
import { updateItemDate } from '../../database/crud';

class Month extends React.Component {
  constructor(props) {
    super();

    this.state = {
      dropDownM: false,
      dropDownY: false,
      resetMon: false,
      resetYea: false,
      portrait: true,
      inputX: 0,
      inputY: '-100%',
    };

    this.setCurrMY = this.setCurrMY.bind(this);
    this.setMDropDown = this.setMDropDown.bind(this);
    this.setYDropDown = this.setYDropDown.bind(this);
    this.toggleMonRes = this.toggleMonRes.bind(this);
    this.toggleYeaRes = this.toggleYeaRes.bind(this);
    this.onMItemPress = this.onMItemPress.bind(this);
    this.onYItemPress = this.onYItemPress.bind(this);
    this.orienChanged = this.orienChanged.bind(this);
    this.setInputXY = this.setInputXY.bind(this);
    this.confirmMove = this.confirmMove.bind(this);
    this.cancelMove = this.cancelMove.bind(this);
  }

  componentDidMount() {
    this.orienChanged();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        this.props.screenOrient.eventChange,
        prevProps.screenOrient.eventChange
      )
    ) {
      this.orienChanged();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearExtraInfo(MONTH));
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && this.props.today) {
      const date = new Date();
      const { day, month: monthz, year } = this.props.today;
      if (
        date.getDate() !== day ||
        date.getMonth() !== monthz ||
        year !== date.getFullYear()
      ) {
        this.setCurrMY();
      }
    }
  };

  orienChanged() {
    const screen =
      this.props.screenOrient.eventChange &&
      this.props.screenOrient.eventChange.window;

    // aaand we reset dropdowns on orientation change
    this.toggleMonRes(true);
    this.toggleYeaRes(true);

    if (screen) {
      const { width, height } = screen;
      if (width > height) {
        this.setState({
          portrait: false,
        });
      } else {
        this.setState({
          portrait: true,
        });
      }
    }
  }

  setCurrMY() {
    const date = new Date();
    const monthz = date.getMonth();
    const year = date.getFullYear();

    genDays({ month: monthz, year }, false, this.props.dispatch);

    setSelMonth(monthz);
    setSelYear(year);
  }

  setMDropDown(monthDr) {
    const stateObj = {
      dropDownM: monthDr,
    };

    // so basically when the dropdown dissappears
    // we want to set the dropdown default positions
    // to be out of screen, so that it would seemingly
    // appear on the screen rather than moving to one position
    // from its previous position aka switching between
    // month and year dropdowns
    if (!monthDr) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }

    this.setState(stateObj);
  }

  setYDropDown(yearDr) {
    const stateObj = {
      dropDownY: yearDr,
    };

    // so basically when the dropdown dissappears
    // we want to set the dropdown default positions
    // to be out of screen, so that it would seemingly
    // appear on the screen rather than moving to one position
    // from its previous position aka switching between
    // month and year dropdowns
    if (!yearDr) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }

    this.setState(stateObj);
  }

  toggleMonRes(value) {
    this.setState({
      resetMon: value,
    });
  }

  toggleYeaRes(value) {
    this.setState({
      resetYea: value,
    });
  }

  onMItemPress(item) {
    this.props.dispatch(setSelMonth(item.value));
    genDays(
      { month: item.value, year: this.props.selDay.year },
      false,
      this.props.dispatch
    );
    this.toggleMonRes(true);
  }

  onYItemPress(item) {
    genDays(
      { month: this.props.selDay.month, year: item.value },
      false,
      this.props.dispatch
    );
    this.props.dispatch(setSelYear(item.value));
    this.toggleYeaRes(true);
  }

  setInputXY(inputX, y) {
    // Okay so the way we calculate this is, since the dropdown appears as part
    // of the month screen and NOT part of the whole screen,
    // and the way we place it is by marginTop marginLeft from the MONTH screen
    // and the x & y coordinates we get are based on the whole screen,
    // for all of that we first need to substract titleBarHeight
    // so that the Y placement would be in line with the actual items
    // coordinates, and then we add in searchInpHeight cause we want
    // the dropdown to be BELOW the search input and we need that extra
    // offset cause we don't actually get the whole height of the textInput
    // just with our own styles, there's some internal height stuff happening
    // in the TextInput component itself.
    this.setState({
      inputX,
      inputY: y - titleBarHeight + searchInpHeight + rndTxtInputOffset,
    });
  }

  confirmMove() {
    const { year, month: monthz, day } = this.props.selDay;
    updateItemDate(
      this.props.extraInfo.moveItem,
      year,
      monthz,
      day,
      this.cancelMove
    );
  }

  cancelMove() {
    this.props.dispatch(remBackAction('cancel_move'));
    if (this.props.extraInfo.mViaMonth) {
      this.props.dispatch(clearExtraInfo(MONTH));
    } else {
      this.props.dispatch(switchScreen(false, true));
    }
  }

  render() {
    const monthStyle = this.state.portrait ? month : horMonth;

    const currMonYear =
      this.props.mainMonth === this.props.initMonth &&
      this.props.mainYear === this.props.initYear;

    const { move, moveItem, loadInit } = this.props.extraInfo;

    let prevContainer =
      this.state.portrait && !currMonYear
        ? {
            ...monthStyle.prevContainer,
            flex: move ? 18 : 23,
          }
        : {
            ...monthStyle.prevContainer,
            flex: move ? 20 : 25,
          };

    const calInContainer =
      move && !this.state.portrait
        ? {
            height: '85%',
            marginTop: 'auto',
          }
        : {};

    return (
      <View style={monthStyle.container}>
        {this.state.portrait && !currMonYear && (
          <View style={monthStyle.butContainer}>
            <View>
              <IconButton
                contStyle={monthStyle.but}
                onPress={() => this.setCurrMY()}
                iconLeft
                iconName="refresh"
                text="Back to current month"
              />
            </View>
          </View>
        )}
        <View style={monthStyle.calContainer}>
          {!this.state.portrait && move && (
            <View style={monthStyle.movCont}>
              <GenButton
                color={darkBasic.buttTypes.nav}
                onPress={() => this.confirmMove()}
                text="Move"
              />
              <GenButton
                color={darkBasic.buttTypes.info}
                onPress={() => this.cancelMove()}
                text="Cancel"
              />
            </View>
          )}
          <View style={calInContainer}>
            <Calendar
              move={move}
              resetMon={this.state.resetMon}
              resetYea={this.state.resetYea}
              toggleMonRes={this.toggleMonRes}
              toggleYeaRes={this.toggleYeaRes}
              setMDropDown={this.setMDropDown}
              setYDropDown={this.setYDropDown}
              portrait={this.state.portrait}
              setInputXY={this.setInputXY}
            />
          </View>
        </View>
        {this.state.portrait && move && (
          <View style={monthStyle.movCont}>
            <GenButton
              custStyle={month.movBut}
              color={darkBasic.buttTypes.nav}
              onPress={() => this.confirmMove()}
              text="Move"
            />
            <GenButton
              custStyle={month.movBut}
              color={darkBasic.buttTypes.info}
              onPress={() => this.cancelMove()}
              text="Cancel"
            />
          </View>
        )}
        <View style={prevContainer}>
          {!this.state.portrait && !currMonYear && (
            <View style={monthStyle.butContainer}>
              <View>
                <IconButton
                  onPress={() => this.setCurrMY()}
                  iconLeft
                  iconName="refresh"
                  text="Back to current month"
                />
              </View>
            </View>
          )}
          <View style={monthStyle.prevTaskCont}>
            <TaskPreview
              loadInit={loadInit}
              moveItem={moveItem}
              portrait={this.state.portrait}
              selDay={this.props.selDay}
            />
          </View>
        </View>
        {this.state.dropDownM && (
          <DropDownList
            dropDown={this.state.dropDownM}
            onItemPress={this.onMItemPress}
            tapOut={() => this.toggleMonRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const navItem = findLast(state.currScreen.navRoute, ['key', MONTH]);
  return {
    screenOrient: state.screenOrient,
    selDay: state.selDay,
    mainMonth: state.calDays.mainMonth,
    mainYear: state.calDays.mainYear,
    today: state.calDays.today,
    extraInfo: navItem ? navItem.extraInfo : {},
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Month);
