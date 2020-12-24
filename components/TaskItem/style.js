import { StyleSheet } from 'react-native';
/* styles */
import { darkBasic } from '../../styles/theme';
import { smallTextCont, textContainer } from '../../styles/generalStyles';

export const taskItem = StyleSheet.create({
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: darkBasic.darkGreyBorder,
    paddingBottom: 5,
    paddingTop: 5,
  },
  checkBox: {
    paddingLeft: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1,
  },
  textBut: {
    marginBottom: 'auto',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flex: 11,
  },
  titleText: {
    ...textContainer.style,
    textAlign: 'left',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  timeText: {
    ...textContainer.style,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: 20,
  },
  optBut: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingRight: 10,
    flex: 1,
  },
  expandItem: {
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: darkBasic.darkGreyBorder,
    backgroundColor: darkBasic.subItemBack,
  },
  descWrapper: {
    alignSelf: 'center',
  },
  detTitle: {
    ...textContainer.style,
  },
  descText: {
    ...smallTextCont.style,
    opacity: 0.7,
  },
});
