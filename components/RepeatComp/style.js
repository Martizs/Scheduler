import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {smallTextCont} from '../../styles/generalStyles';
import {darkBasic, simpleBorderWidth} from '../../styles/theme';

export const repComp = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  repContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  repText: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: RFValue(20),
  },
  numbTextInput: {
    ...smallTextCont.style,
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 2,
    borderBottomColor: darkBasic.inputUnderline,
  },
  repTypeDD: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: simpleBorderWidth,
    borderColor: darkBasic.placeHolderColor,
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: RFValue(20),
    paddingLeft: 10,
    paddingRight: 5,
  },
  repTypeDDText: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
