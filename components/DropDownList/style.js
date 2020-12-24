import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {
  darkBasic,
  simpleTextFS,
  listItemPadDD,
  simpleBorderWidth,
} from '../../styles/theme';

export const dpList = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 4,
  },
  inContainer: {
    maxHeight: (simpleTextFS + 18) * 4,
    minHeight: simpleTextFS,
    borderWidth: simpleBorderWidth,
    borderRadius: 3,
    borderColor: darkBasic.listItemBorderColor,
    backgroundColor: darkBasic.backgroundColor,
    width: RFValue(130),
  },
  custItemStyle: {
    paddingBottom: listItemPadDD,
    paddingTop: listItemPadDD,
  },
});
