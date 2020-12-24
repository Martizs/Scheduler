import {StyleSheet} from 'react-native';
/* styles */
import {
  darkBasic,
  iconSize,
  titleFontSize,
  titlePadding,
  titleBorderWidth,
} from '../../styles/theme';

export const TitleStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: darkBasic.strongDivColor,
    borderBottomWidth: titleBorderWidth,
    borderRadius: 10,
  },
  iconContainer: {
    paddingTop: titlePadding,
    paddingBottom: titlePadding,
  },
  invItem: {
    width: iconSize,
  },
  text: {
    paddingRight: 5,
    paddingTop: titlePadding,
    paddingBottom: titlePadding,
    fontSize: titleFontSize,
    color: darkBasic.textColor,
  },
});
