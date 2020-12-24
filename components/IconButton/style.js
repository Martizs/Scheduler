import {StyleSheet} from 'react-native';
/* styles */
import {smallTextCont} from '../../styles/generalStyles';

export const butStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
  },
  icon: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  text: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 5,
  },
});
