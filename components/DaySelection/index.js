import React from 'react';
import { View, TouchableOpacity } from 'react-native';
/* styles */
import { daySel } from './style';
import { darkBasic, interIconSize } from '../../styles/theme';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput from '../SearchInput';
/* consts */
import { yearData, monthData } from '../../consts/dateConts';
import { daySelIds } from './testIds';
/* utils */
import { getMonthName, genCalDays } from '../../utils/dateUtils';
/* redux */
import { connect } from 'react-redux';
import {
  setSelSpecDay,
  setSelMonth,
  setSelYear,
} from '../../redux/dates/actions';

const DaySelection = (props) => {
  const [daysData, setDaysData] = React.useState([]);

  const { year, month, day } = props.selDay;

  React.useEffect(() => {
    setDaysData(genCalDays(month, year, true));
  }, [year, month]);

  const changeDay = (incr) => {
    const date = new Date(year, month, day);
    date.setDate(day + incr);
    props.dispatch(setSelSpecDay(date.getDate()));
    props.dispatch(setSelMonth(date.getMonth()));
    props.dispatch(setSelYear(date.getFullYear()));
  };

  return (
    <View
      style={{
        ...daySel.container,
        ...props.custCont,
      }}
    >
      <TouchableOpacity
        testID={daySelIds.backArr}
        style={daySel.icon}
        onPress={() => changeDay(-1)}
      >
        <Icon
          name="keyboard-arrow-left"
          size={interIconSize}
          color={darkBasic.textColor}
        />
      </TouchableOpacity>
      <View style={daySel.searchCont}>
        <SearchInput
          testID={daySelIds.yearInp}
          setDropDown={props.setYDropDown}
          itemSel={year + ''}
          data={yearData}
          resetItem={props.resetYea}
          toggleResItem={props.toggleYeaRes}
          numeric
          setInputXY={props.setInputXY}
        />
        <SearchInput
          testID={daySelIds.monthInp}
          setDropDown={props.setMDropDown}
          itemSel={getMonthName(month)}
          data={monthData}
          resetItem={props.resetMon}
          toggleResItem={props.toggleMonRes}
          setInputXY={props.setInputXY}
        />
        <SearchInput
          testID={daySelIds.dayInp}
          setDropDown={props.setDDropDown}
          itemSel={day + ''}
          data={daysData}
          resetItem={props.resetDay}
          toggleResItem={props.toggleDayRes}
          numeric
          setInputXY={props.setInputXY}
        />
      </View>
      <TouchableOpacity
        testID={daySelIds.forwArr}
        style={daySel.icon}
        onPress={() => changeDay(1)}
      >
        <Icon
          name="keyboard-arrow-right"
          size={interIconSize}
          color={darkBasic.textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  selDay: state.selDay,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DaySelection);
