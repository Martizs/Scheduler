import React from 'react';
import { View } from 'react-native';
/* styles */
import { screenContainer } from '../../styles/generalStyles';
/* components */
import DayTaskList from '../../components/DayTaskList';
/* redux */
import { connect } from 'react-redux';
import { clearExtraInfo } from '../../redux/general/actions';
/* utils */
import findLast from 'lodash/findLast';
import findIndex from 'lodash/findIndex';
import { genDays } from '../../utils/dateUtils';
/* consts */
import { DAY } from '../../consts/generalConsts';

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
    return () => {
      props.dispatch(clearExtraInfo(DAY));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selDay]);

  return (
    <View style={screenContainer.style}>
      <DayTaskList selDay={props.selDay} loadInit={props.extraInfo.loadInit} />
    </View>
  );
};

const mapStateToProps = (state) => {
  const navItem = findLast(state.currScreen.navRoute, ['key', DAY]);
  return {
    selDay: state.selDay,
    calDays: state.calDays.data,
    extraInfo: navItem ? navItem.extraInfo : {},
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DayTasks);
