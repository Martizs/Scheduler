import {StyleSheet} from 'react-native';
/* styles */
import {buttTypes} from '../../../styles/theme';

export const linkMod = StyleSheet.create({
  container: {
    maxHeight: '95%',
  },
  listContainer: {
    padding: 10,
  },
  butContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  titleText: {
    color: buttTypes.info,
  },
});
