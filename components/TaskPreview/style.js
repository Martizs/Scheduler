import {StyleSheet} from 'react-native';
/* styles */
import {interIconSize, darkThTextColor} from '../../styles/theme';

export const taskPrev = StyleSheet.create({
  container: {
    paddingTop: 2,
    height: '100%',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: darkThTextColor,
    borderRadius: 3,
    paddingBottom: 2,
  },
  invItem: {
    width: interIconSize,
  },
});
