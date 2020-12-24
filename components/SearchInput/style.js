/* base */
import {StyleSheet} from 'react-native';
/* styles */
import {
  darkBasic,
  simpleTextFS,
  txtInputPad,
  simpleBorderWidth,
} from '../../styles/theme';

export const inputStyle = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  textCont: {
    paddingRight: 12,
    paddingBottom: txtInputPad,
    paddingTop: txtInputPad,
    fontSize: simpleTextFS,
    color: darkBasic.textColor,
    borderBottomWidth: simpleBorderWidth,
    borderBottomColor: darkBasic.inputUnderline,
  },
});
