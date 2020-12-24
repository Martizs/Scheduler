import React from 'react';
import { View, TouchableOpacity } from 'react-native';
/* styles */
import { darkBasic, interIconSize } from '../../../../styles/theme';
import { calHead } from './style';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput from '../../../SearchInput';
/* utils */
import { genDays, getMonthName } from '../../../../utils/dateUtils';
/* consts */
import { monthData, yearData } from '../../../../consts/dateConts';
/* redux */
import { connect } from 'react-redux';
import { setSelMonth, setSelYear } from '../../../../redux/dates/actions';

const CalHeader = (props) => {
  const changeMonth = (incr) => {
    const { selDay } = props;

    const date = new Date(selDay.year, selDay.month);
    date.setMonth(selDay.month + incr);
    const month = date.getMonth();
    const year = date.getFullYear();
    genDays({ month, year }, false, props.dispatch);

    props.dispatch(setSelMonth(month));
    props.dispatch(setSelYear(year));
  };

  return (
    <View
      style={calHead.container}
      onLayout={({ nativeEvent }) =>
        props.setHeadHeight(nativeEvent.layout.height)
      }
    >
      <TouchableOpacity onPress={() => changeMonth(-1)}>
        <Icon
          name="keyboard-arrow-left"
          size={interIconSize}
          color={darkBasic.textColor}
          style={calHead.icon}
        />
      </TouchableOpacity>

      <View style={calHead.yMcontainer}>
        <SearchInput
          setDropDown={props.setMDropDown}
          itemSel={getMonthName(props.mainMonth)}
          data={monthData}
          resetItem={props.resetMon}
          toggleResItem={props.toggleMonRes}
          setInputXY={props.setInputXY}
        />
        <SearchInput
          setDropDown={props.setYDropDown}
          itemSel={props.mainYear + ''}
          data={yearData}
          resetItem={props.resetYea}
          toggleResItem={props.toggleYeaRes}
          numeric
          setInputXY={props.setInputXY}
        />
      </View>
      <TouchableOpacity onPress={() => changeMonth(1)}>
        <Icon
          name="keyboard-arrow-right"
          size={interIconSize}
          color={darkBasic.textColor}
          style={calHead.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  selDay: state.selDay,
  calDays: state.calDays.data,
  mainMonth: state.calDays.mainMonth,
  mainYear: state.calDays.mainYear,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalHeader);