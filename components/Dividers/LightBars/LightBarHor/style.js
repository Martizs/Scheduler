import {StyleSheet} from 'react-native';
/* styles */
import {titleDivHeight} from '../../../../styles/theme';

export const HorBarStyle = StyleSheet.create({
  container: {
    height: titleDivHeight,
    width: '100%',
    flexDirection: 'row',
  },
  luminance: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '98%',
    borderRadius: 10,
  },
});
