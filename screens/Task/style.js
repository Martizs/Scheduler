import { StyleSheet } from 'react-native';
/* styles */
import { darkBasic } from '../../styles/theme';
import {
  textContainer,
  smallTextCont,
  screenContainer,
} from '../../styles/generalStyles';

export const task = StyleSheet.create({
  container: {
    ...screenContainer.style,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  innContainer: {
    paddingBottom: 10,
    maxHeight: '100%',
  },
  textInput: {
    ...textContainer.style,
    borderBottomWidth: 1,
    borderBottomColor: darkBasic.inputUnderline,
    paddingTop: 0,
    paddingBottom: 2,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 10,
  },
  sepContainer: {
    ...textContainer.style,
    marginTop: 4,
    marginLeft: 10,
  },
  daySelCont: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  timeCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  butCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  repSelText: {
    ...smallTextCont.style,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  repSelContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
