import {StyleSheet} from 'react-native';
/* styles */
import {appStyles} from '../../styles/generalStyles';

export const genBut = StyleSheet.create({
  but: {
    ...appStyles.modBut,
    minWidth: '30%',
    borderWidth: 1,
  },
});
