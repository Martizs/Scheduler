import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import Interactable from 'react-native-interactable';
/* styles */
import { textContainer } from '../../styles/generalStyles';
import { smallIconSize, darkBasic } from '../../styles/theme';
import { taskPrev } from './style';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
import DayTaskList from '../DayTaskList';
/* redux */
import { connect } from 'react-redux';
import { switchScreen } from '../../redux/general/actions';
/* consts */
import { DAY } from '../../consts/generalConsts';
/* utils */
import { formNamedDate } from '../../utils/dateUtils';

const TaskPreview = (props) => {
  const deltaY = React.useRef(new Animated.Value(0)).current;
  const deltaX = React.useRef(new Animated.Value(0)).current;

  const [listHeight, setListHeight] = React.useState(false);
  const [dateName, setDateName] = React.useState('');

  React.useEffect(() => {
    formNamedDate(props.selDay.year, props.selDay.month, props.selDay.day)
      .then((datNam) => setDateName(datNam))
      .catch((err) => {
        setDateName('');
        console.log('Task preview formNamed Date error: ', err);
      });
  }, [props.selDay]);

  const headTStyle =
    !props.moveItem && props.portrait
      ? textContainer.style
      : {
          ...textContainer.style,
          marginLeft: 'auto',
          marginRight: 'auto',
        };

  const container = !props.portrait
    ? {
        ...taskPrev.container,
        height: '90%',
      }
    : taskPrev.container;

  // console.log('listHeight + props.calHeight', listHeight + props.calHeight);

  // console.log('props.calHeight', props.calHeight);

  return (
    <View style={container}>
      <Interactable.View
        verticalOnly={true}
        snapPoints={[{ y: 0 }, { y: -254 }]}
        boundaries={{ top: -254 }}
        animatedValueY={deltaY}
        animatedValueX={deltaX}
      >
        <TouchableOpacity
          style={taskPrev.header}
          disabled={!!props.moveItem}
          onPress={() => props.dispatch(switchScreen(DAY))}
        >
          {!props.moveItem && props.portrait && (
            <View style={taskPrev.invItem} />
          )}
          <Text style={headTStyle}>{dateName}</Text>
          {!props.moveItem && props.portrait && (
            <Icon
              name="keyboard-arrow-up"
              size={smallIconSize}
              color={darkBasic.textColor}
            />
          )}
        </TouchableOpacity>
      </Interactable.View>

      <DayTaskList
        loadInit={props.loadInit}
        moveItem={props.moveItem}
        noRepCheck
        notFullWidth={!props.portrait}
        taskPrev
        selDay={props.selDay}
      />

      {/* {listHeight && (
        <Animated.View
          style={{
            height: deltaY.interpolate({
              inputRange: [-254, -254, 0, 0],
              outputRange: [476, 476, 222, 222],
            }),
          }}
        >
          <DayTaskList
            listHeight={listHeight}
            loadInit={props.loadInit}
            moveItem={props.moveItem}
            noRepCheck
            notFullWidth={!props.portrait}
            taskPrev
            selDay={props.selDay}
          />
        </Animated.View>
      )}

      {!listHeight && (
        <DayTaskList
          setListHeight={setListHeight}
          loadInit={props.loadInit}
          moveItem={props.moveItem}
          noRepCheck
          notFullWidth={!props.portrait}
          taskPrev
          selDay={props.selDay}
        />
      )} */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  selDay: state.selDay,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPreview);
