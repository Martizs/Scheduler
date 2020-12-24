import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* style */
import {darkBasic, opaqueDark} from '../../styles/theme';

export const floatBut = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: opaqueDark,
    width: RFValue(65),
    height: RFValue(65),
    bottom: RFValue(20),
    right: RFValue(20),
    borderWidth: 1.5,
    borderColor: darkBasic.textColor,
    borderRadius: 50,
  },
  icStyle: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
