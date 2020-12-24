import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const daySel = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: RFValue(12),
    paddingBottom: RFValue(12),
  },
  searchCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
