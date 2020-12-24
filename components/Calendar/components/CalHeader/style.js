import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const calHead = StyleSheet.create({
  container: {
    paddingBottom: RFValue(8),
    paddingTop: RFValue(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yMcontainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  textInput: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});
