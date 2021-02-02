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
/* utils */
import isEqual from 'lodash/isEqual';
import { daysEqual } from '../../utils';

class CalGrid extends React.Component {
  constructor(props) {
    super();

    this.state = {
      gridHeight: 290,
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: [],
      row7: [],
    };

    this.pressSelDay = this.pressSelDay.bind(this);
    this.genDays = this.genDays.bind(this);
  }

  componentDidMount() {
    this.genDays();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.calHeight !== prevProps.calHeight ||
      this.props.headHeight !== prevProps.headHeight
    ) {
      this.setState({
        gridHeight: this.props.calHeight - this.props.headHeight - 5,
      });
    }

    if (!isEqual(this.props.calDaysChange, prevProps.calDaysChange)) {
      this.genDays();
    }
  }

  genDays() {
    const { calDays } = this.props;
    if (calDays) {
      const row1 = calDays.slice(0, 7);
      const row2 = calDays.slice(7, 14);
      const row3 = calDays.slice(14, 21);
      const row4 = calDays.slice(21, 28);
      const row5 = calDays.slice(28, 35);
      const row6 = calDays.slice(35, 42);
      const row7 = calDays.slice(42, 49);

      this.setState({ row1, row2, row3, row4, row5, row6, row7 });
    }
  }

  pressSelDay(dayItem) {
    if (!this.props.move && daysEqual(dayItem, this.props.selDay)) {
      this.props.dispatch(switchScreen(DAY));
    } else {
      // selDay items here are also numbers
      // as the data passed in is generated in
      // genCalDays and we have only numbers there
      // for year month day
      this.props.dispatch(setSelDay(dayItem));
    }
  }

  render() {
    const { row1, row2, row3, row4, row5, row6, row7, gridHeight } = this.state;

    const firstRowSt = {
      ...calGrid.rowContainer,
      height: '10%',
    };

    const tablContainer = {
      height: gridHeight,
    };

    return (
      <View style={calGrid.container}>
        {this.props.calDays && (
          <View style={tablContainer} key="row-1">
            <View style={firstRowSt}>
              {row1.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-2">
              {row2.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-3">
              {row3.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-4">
              {row4.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-5">
              {row5.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-6">
              {row6.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
            <View style={calGrid.rowContainer} key="row-7">
              {row7.map((item) => (
                <CalDay
                  tasks={
                    item.title === '23' ||
                    item.title === '24' ||
                    item.title === '5'
                  }
                  selected={daysEqual(item, this.props.selDay)}
                  item={item}
                  key={item.key}
                  smallItems={!this.props.portrait}
                  onPress={() => this.pressSelDay(item)}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  selDay: state.selDay,
  calDays: state.calDays.data,
  calDaysChange: state.calDays.change,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalGrid);
