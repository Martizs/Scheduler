import React from 'react';
import { View } from 'react-native';
/* styles */
import { calStyle } from './style';
/* components */
import CalHeader from './components/CalHeader';
import CalGrid from './components/CalGrid';

export const Calendar = (props) => {
  const [calHeight, setCalHeight] = React.useState(300);
  const [headHeight, setHeadHeight] = React.useState(30);

  // TODO: uncomment and adjust this if needed
  // when implementing the month/calendar component
  // to always exist hidden from sight
  // -------------------------------------------------
  // React.useEffect(() => {
  //   if (
  //     findIndex(days, {
  //       day: selDay.day,
  //       month: selDay.month,
  //       year: selDay.year,
  //     }) === -1
  //   ) {
  // TODO: set this to work with the selDay prop and NOT
  // the prop passed in as it currently is
  //     props.setCurrMonth(selDay.month);
  //     props.setCurrYear(selDay.year);
  //     genDays();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selDay]);

  return (
    <View
      style={calStyle.container}
      onLayout={({ nativeEvent }) => setCalHeight(nativeEvent.layout.height)}
    >
      <CalHeader
        setHeadHeight={setHeadHeight}
        setMDropDown={props.setMDropDown}
        setYDropDown={props.setYDropDown}
        resetMon={props.resetMon}
        resetYea={props.resetYea}
        toggleMonRes={props.toggleMonRes}
        toggleYeaRes={props.toggleYeaRes}
        setInputXY={props.setInputXY}
      />
      <CalGrid
        move={props.move}
        portrait={props.portrait}
        calHeight={calHeight}
        headHeight={headHeight}
      />
    </View>
  );
};
