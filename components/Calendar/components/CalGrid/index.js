import React from 'react';
import { View } from 'react-native';
/* components */
import { CalDay } from '../CalDay';
/* styles */
import { calGrid } from './style';
/* redux */
import { connect } from 'react-redux';
import { switchScreen } from '../../../../redux/general/actions';
import { setSelDay } from '../../../../redux/dates/actions';
/* consts */
import { DAY } from '../../../../consts/generalConsts';

const CalGrid = (props) => {
  const [gridHeight, setGridHeight] = React.useState(290);

  React.useEffect(() => {
    setGridHeight(props.calHeight - props.headHeight - 5);
  }, [props.calHeight, props.headHeight]);

  const tablContainer = {
    height: gridHeight,
  };

  const genTable = () => {
    const row1 = props.calDays.slice(0, 7);
    const row2 = props.calDays.slice(7, 14);
    const row3 = props.calDays.slice(14, 21);
    const row4 = props.calDays.slice(21, 28);
    const row5 = props.calDays.slice(28, 35);
    const row6 = props.calDays.slice(35, 42);
    const row7 = props.calDays.slice(42, 49);

    const firstRowSt = {
      ...calGrid.rowContainer,
      height: '10%',
    };

    const daysEqual = (dayItem) => {
      const { day, month, year } = props.selDay;
      return (
        dayItem.day === day && dayItem.month === month && dayItem.year === year
      );
    };

    const pressSelDay = (dayItem) => {
      if (!props.move && daysEqual(dayItem)) {
        props.dispatch(switchScreen(DAY));
      } else {
        // selDay items here are also numbers
        // as the data passed in is generated in
        // genCalDays and we have only numbers there
        // for year month day
        props.dispatch(setSelDay(dayItem));
      }
    };

    return (
      <View style={tablContainer} key="row-1">
        <View style={firstRowSt}>
          {row1.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-2">
          {row2.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-3">
          {row3.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-4">
          {row4.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-5">
          {row5.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-6">
          {row6.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
        <View style={calGrid.rowContainer} key="row-7">
          {row7.map((item) => (
            <CalDay
              tasks={
                item.title === '23' || item.title === '24' || item.title === '5'
              }
              opaque={item.opaque}
              today={item.today}
              selected={daysEqual(item)}
              item={item.title}
              index={item.key}
              key={item.key}
              weekDay={item.weekDay}
              smallItems={!props.portrait}
              onPress={() => pressSelDay(item)}
            />
          ))}
        </View>
      </View>
    );
  };

  return <View style={calGrid.container}>{props.calDays && genTable()}</View>;
};

const mapStateToProps = (state) => ({
  selDay: state.selDay,
  calDays: state.calDays.data,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalGrid);
