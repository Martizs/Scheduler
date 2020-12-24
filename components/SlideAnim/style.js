import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
/* styles */
import {
  darkBasic,
  titlePadding,
  iconSize,
  titleDivHeight,
} from '../../styles/theme';

const {height} = Dimensions.get('window');

export const slideAnim = StyleSheet.create({
  style: {
    position: 'absolute',
    width: '100%',
    height,
    backgroundColor: darkBasic.backgroundColor,
    zIndex: 5,
  },
});
