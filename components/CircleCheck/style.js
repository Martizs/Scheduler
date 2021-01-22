import { StyleSheet } from 'react-native';
/* styles */
import { smallTextCont } from '../../styles/generalStyles';
import { smallTextContDim, transparentBorders } from '../../styles/theme';

const containerDims = smallTextContDim + 4;

export const wDayCheck = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: transparentBorders,
    borderRadius: 30,
    width: containerDims,
    height: containerDims,
    marginLeft: 4,
  },
  text: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
