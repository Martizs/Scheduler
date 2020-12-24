/* base */
import { StyleSheet } from 'react-native';
/* styles */
import {
  darkBasic,
  interIconSize,
  listItemPadding,
  simpleBorderWidth,
} from '../../styles/theme';
import { textContainer } from '../../styles/generalStyles';

export const ListItemStyle = StyleSheet.create({
  container: {
    borderBottomWidth: simpleBorderWidth,
    borderBottomColor: darkBasic.listItemBorderColor,
  },
  buttonContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invItem: {
    width: interIconSize,
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  text: {
    ...textContainer.style,
    paddingBottom: listItemPadding,
    paddingTop: listItemPadding,
  },
});
