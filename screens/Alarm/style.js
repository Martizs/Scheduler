import { StyleSheet } from 'react-native';
/* styles */
import { appStyles, subTitleContainer } from '../../styles/generalStyles';
import { darkBasic, ultraSmTextFS } from '../../styles/theme';

export const alarm = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
  },
  butSurCont: {
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '18%',
  },
  butContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 'auto',
    justifyContent: 'space-evenly',
  },
  button: {
    ...appStyles.modBut,
    borderWidth: 1,
  },
  alsoTxt: {
    ...subTitleContainer.style,
    textAlign: 'left',
    paddingLeft: '10%',
  },
  extraCont: {
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  taskCont: {
    maxHeight: '82%',
  },
  stopIcon: {
    width: ultraSmTextFS,
    height: ultraSmTextFS,
    borderRadius: 2,
    backgroundColor: darkBasic.textColor,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 8,
  },
  innButCont: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
