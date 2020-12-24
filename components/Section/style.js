import {StyleSheet} from 'react-native';
/* styles */
import {subTitleContainer} from '../../styles/generalStyles';
import {darkBasic} from '../../styles/theme';

export const section = StyleSheet.create({
  container: {},
  childCont: {
    borderBottomWidth: 1,
    borderBottomColor: darkBasic.darkGreyBorder,
    borderTopWidth: 1,
    borderTopColor: darkBasic.darkGreyBorder,
    padding: 10,
  },
  text: {
    ...subTitleContainer.style,
  },
});
