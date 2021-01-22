import { StyleSheet } from 'react-native';
/* styles */
import { smallTextCont } from '../../styles/generalStyles';

export const mCheckBox = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
