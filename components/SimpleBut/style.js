import {StyleSheet} from 'react-native';
/* styles */
import {darkThTextColor} from '../../styles/theme';

export const simpleBut = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: darkThTextColor,
    borderRadius: 7.5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
});
