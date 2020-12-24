import { StyleSheet } from 'react-native';
/* styles */
import {
  subTitleContainer,
  textContainer,
} from '../../../../styles/generalStyles';
import { darkBasic } from '../../../../styles/theme';
import { appStyles } from './../../../../styles/generalStyles';

export const mainT = StyleSheet.create({
  container: {
    marginLeft: '10%',
    marginRight: '10%',
    paddingBottom: 8,
    paddingTop: 8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    ...subTitleContainer.style,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  desc: {
    ...textContainer.style,
    color: darkBasic.placeHolderColor,
  },
  button: {
    ...appStyles.modBut,
    borderWidth: 1,
    borderColor: darkBasic.buttTypes.error,
    paddingLeft: 9,
  },
  innButCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBox: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  butText: {
    ...textContainer.style,
    paddingLeft: 4,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
});
