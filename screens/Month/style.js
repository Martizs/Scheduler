import {StyleSheet} from 'react-native';
/* styles */
import {screenContainer} from '../../styles/generalStyles';

export const month = StyleSheet.create({
  container: {
    ...screenContainer.style,
    paddingTop: 5,
  },
  butContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
  },
  but: {
    marginTop: 'auto',
  },
  calContainer: {
    paddingRight: '5%',
    paddingLeft: '5%',
    flex: 30,
  },
  prevContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 20,
  },
  prevTaskCont: {},
});

export const horMonth = StyleSheet.create({
  container: {
    ...month.container,
    flexDirection: 'row',
    display: 'flex',
  },
  butContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
  },
  but: {
    marginTop: 'auto',
  },
  calContainer: {
    flex: 30,
  },
  prevContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  prevTaskCont: {
    flex: 18,
  },
});
