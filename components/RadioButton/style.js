import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
/* styles */
import {smallTextCont} from '../../styles/generalStyles';

export const radBut = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  radOuter: {
    display: 'flex',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    height: RFValue(24),
    width: RFValue(24),
  },
  radInner: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderRadius: 50,
    height: RFValue(12),
    width: RFValue(12),
  },
  radLabel: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
    marginRight: 10,
  },
});
