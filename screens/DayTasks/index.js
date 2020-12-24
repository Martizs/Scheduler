import React from 'react';
import { View } from 'react-native';
/* styles */
import { screenContainer } from '../../styles/generalStyles';
/* components */
import DayTaskList from '../../components/DayTaskList';
/* redux */
import { connect } from 'react-redux';
/* utils */
import findIndex from 'lodash/findIndex';
import { genDays } from '../../utils/dateUtils';

const DayTasks = (props) => {
  const isInitialMount = React.useRef(true);

  const { selDay, calDays } = props;

  React.useEffect(() => {
    // so we do this if else so that we would
    // do checks ONLY on component update, cause
    // hooks do mount by default as well
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (
        findIndex(calDays, {
          day: selDay.day,
          month: selDay.month,
          year: selDay.year,
        }) === -1
      ) {
        genDays(selDay, true, props.dispatch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selDay]);

  return (
    <View style={screenContainer.style}>
      <DayTaskList selDay={props.selDay} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  selDay: state.selDay,
  calDays: state.calDays.data,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DayTasks);
