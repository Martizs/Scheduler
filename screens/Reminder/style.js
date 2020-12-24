import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {
  textContainer,
  screenContainer,
  smallTextCont,
} from '../../styles/generalStyles';
import {
  darkBasic,
  simpleTextFS,
  listItemPadDD,
  simpleBorderWidth,
} from '../../styles/theme';

// now we add in RFValue(7) here because for some reason the calculation
// for the list item height is not enough to actually get the full height of the list
// im not certain why, but my best guess is that the fontsize is not the same as simple height
// so the height for the actual height of the text is bigger than the simpleTextFS fontsize
// we provide the text component with
export const maxListHeight =
  (listItemPadDD * 2 + simpleBorderWidth + simpleTextFS + RFValue(7)) * 3 +
  simpleBorderWidth * 2;

export const rem = StyleSheet.create({
  container: {
    ...screenContainer.style,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  innContainer: {
    padding: 10,
    maxHeight: '100%',
  },
  timeCont: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  butInpCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  timeText: {
    ...textContainer.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  sepContainer: {
    ...textContainer.style,
    marginTop: 4,
    marginLeft: 10,
  },
  section: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkBasic.darkGreyBorder,
  },
  radRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  radCell: {
    flex: 1,
  },
  befContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    paddingTop: 12,
  },
  befText: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: RFValue(20),
  },
  numbTextInput: {
    ...smallTextCont.style,
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 2,
    borderBottomColor: darkBasic.inputUnderline,
  },
  befTypeDD: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: darkBasic.placeHolderColor,
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: RFValue(20),
    paddingLeft: 10,
    paddingRight: 5,
  },
  befTypeDDText: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  repRemCont: {
    padding: 10,
  },
  custSearchDD: {
    maxHeight: maxListHeight,
  },
  radIcContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
