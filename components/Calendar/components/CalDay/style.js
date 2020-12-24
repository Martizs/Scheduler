import {StyleSheet} from 'react-native';
/* styles */
import {transparentBorders} from '../../../../styles/theme';

export const calDay = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: transparentBorders,
    borderRadius: 15,
    margin: 2,
  },
  butContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  imgStyle: {
    width: '70%',
    marginLeft: '12%',
    zIndex: -1,
    opacity: 0.35,
  },
});
