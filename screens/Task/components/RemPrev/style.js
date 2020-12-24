import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {darkBasic} from '../../../../styles/theme';
import {smallTextCont} from '../../../../styles/generalStyles';

export const remPrev = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  remText: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingRight: 4,
    paddingLeft: 4,
    ...smallTextCont.style,
  },
  butCont: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 4,
    paddingTop: 4,
    marginRight: 10,
    borderRadius: RFValue(25),
    borderWidth: 1,
    borderColor: darkBasic.darkGreyBorder,
  },
});
