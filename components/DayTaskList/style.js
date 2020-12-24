import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
/* styles */
import { darkBasic, simpleBorderWidth } from '../../styles/theme';
import { textContainer } from '../../styles/generalStyles';

export const ddListWidth = RFValue(150);

export const dTasks = StyleSheet.create({
  container: {
    flex: 1,
  },
  custDropDown: {
    width: ddListWidth,
    maxHeight: '100%',
  },
  sortDDCont: {
    width: '70%',
    maxHeight: '100%',
  },
  sortDDItem: {
    width: '100%',
  },
  emptyTextStyle: {
    ...textContainer.style,
    flex: 1,
    color: darkBasic.placeHolderColor,
  },
  listStyle: {
    borderTopWidth: 1,
    borderColor: darkBasic.darkGreyBorder,
  },
  sortButStyle: {
    marginTop: RFValue(10),
    marginBottom: RFValue(10),
    paddingLeft: RFValue(5),
    paddingRight: RFValue(5),
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '70%',
    borderWidth: simpleBorderWidth,
    borderColor: darkBasic.textColor,
    borderRadius: 5,
  },
  refStyle: {
    marginTop: RFValue(8),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
