import { StyleSheet } from 'react-native';
/* theme style */
// NOTE: think the user will be able to select the theme in one of the iterations
// and the theme thats used will determine these background colors n stuff
// for now we're using the default darkBasic theme
import {
  darkBasic,
  simpleTextFS,
  smallTextFS,
  titlePadding,
  titleFontSize,
  ultraSmTextFS,
  subTitFontSize,
} from './theme';

export const mainContainer = StyleSheet.create({
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: darkBasic.backgroundColor,
  },
});

export const screenContainer = StyleSheet.create({
  style: {
    flex: 1,
  },
});

export const textContainer = StyleSheet.create({
  style: {
    fontSize: simpleTextFS,
    textAlign: 'center',
    color: darkBasic.textColor,
  },
});

export const smallTextCont = StyleSheet.create({
  style: {
    ...textContainer.style,
    fontSize: smallTextFS,
  },
});

export const ultraSmTextCont = StyleSheet.create({
  style: {
    ...textContainer.style,
    fontSize: ultraSmTextFS,
  },
});

export const invThTextCont = StyleSheet.create({
  style: {
    ...textContainer.style,
    color: darkBasic.invTextColor,
  },
});

export const invThSmallText = StyleSheet.create({
  style: {
    ...smallTextCont.style,
    color: darkBasic.invTextColor,
  },
});

export const titleContainer = StyleSheet.create({
  style: {
    paddingTop: titlePadding,
    paddingBottom: titlePadding,
    fontSize: titleFontSize,
    textAlign: 'center',
    color: darkBasic.textColor,
  },
});

export const subTitleContainer = StyleSheet.create({
  style: {
    ...titleContainer.style,
    fontSize: subTitFontSize,
  },
});

export const invThTitlCont = StyleSheet.create({
  style: {
    ...titleContainer.style,
    color: darkBasic.invTextColor,
  },
});

export const appStyles = StyleSheet.create({
  modContainer: {
    maxHeight: '100%',
    backgroundColor: darkBasic.backgroundColor,
    borderColor: '#add8e6',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  screenModCont: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  modButContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  modBut: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '40%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 5,
  },
});
