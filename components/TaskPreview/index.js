import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
  const [dateName, setDateName] = React.useState('');

  React.useEffect(() => {
    formNamedDate(props.selDay.year, props.selDay.month, props.selDay.day)
      .then((datNam) => setDateName(datNam))
      .catch((err) => {
        setDateName('');
        console.log('Task preview formNamed Date error: ', err);
      });
  }, [props.selDay]);

  const headTStyle = props.portrait
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

  return (
    <View style={container}>
      <TouchableOpacity
        style={taskPrev.header}
        onPress={() => props.dispatch(switchScreen(DAY))}
      >
        {props.portrait && <View style={taskPrev.invItem} />}
        <Text style={headTStyle}>{dateName}</Text>
        {props.portrait && (
          <Icon
            name="keyboard-arrow-up"
            size={smallIconSize}
            color={darkBasic.textColor}
          />
        )}
      </TouchableOpacity>
      <DayTaskList
        noRepCheck
        notFullWidth={!props.portrait}
        taskPrev
        selDay={props.selDay}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapDispatchToProps)(TaskPreview);
