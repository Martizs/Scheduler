/* base */
import React from 'react';
import {
  View,
  BackHandler,
  Dimensions,
  AppState,
  ImageBackground,
  Text,
} from 'react-native';
/* styles */
import {
  mainContainer,
  appStyles,
  screenContainer,
  titleContainer,
} from './styles/generalStyles';
import { darkBasic } from './styles/theme';
/* screens */
import Month from './screens/Month';
import DayTasks from './screens/DayTasks';
import TaskScreen from './screens/Task';
import Reminder from './screens/Reminder';
import { NativeTestScreen } from './screens/NativeTestScreen/index';
/* components */
import Modal from 'react-native-modal';
import { ActionMenu } from './screens/ActionMenu';
import AnimContainer from './components/AnimContainer';
import SlideAnim from './components/SlideAnim';
import { TitleBar } from './components/TitleBar';
import { GenButton } from './components/GenButton';
import DropDownList from './components/DropDownList';
import { FloatingButton } from './components/FloatingButton';
/* consts */
import {
  MONTH,
  DAY,
  backgroundImage,
  TASK,
  REMINDER,
  TEST_TITLE,
} from './consts/generalConsts';
import { appIds } from './appIds';
/* utils */
import findLast from 'lodash/findLast';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';
import { formNamedDate, genDays } from './utils/dateUtils';
import { testModal } from './utils/modalUtils';
/* redux */
import { connect } from 'react-redux';
/* redux actions */
import {
  switchScreen,
  viewChanged,
  addBackAction,
  remBackAction,
  toggleModal,
  updateSettings,
  toggleLoading,
  setScreen,
  clearExtraInfo,
  setInitDate,
} from './redux/general/actions';
import {
  setSelSpecDay,
  setSelMonth,
  setSelYear,
  genYearDDData,
} from './redux/dates/actions';
/* database */
import { createDb } from './database';
import { dispatchDbCall } from './database/helpers';
import { getSettings } from './database/retrievers';
import { environment } from './env';

class App extends React.Component {
  constructor(props) {
    super();

    const date = new Date();

    this.mounted = true;

    this.state = {
      showMenu: false,
      currCompArr: [{ component: <View key="0" />, title: '' }],
      screenTitle: '',
      initMonth: date.getMonth(),
      initYear: date.getFullYear(),
    };

    // TODO: remove this when done testing schedule functionality
    this.testHour = 0;
    this.testMinute = 0;
    this.testReqCode = 0;
    this.testRemId = 0;
    // remove this when done testing schedule functionality

    this.openScreen = this.openScreen.bind(this);
    this.currComponent = this.currComponent.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this.setInitSelDay = this.setInitSelDay.bind(this);
    this.setScreenTitle = this.setScreenTitle.bind(this);
    this.setInitMY = this.setInitMY.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.props.dispatch(toggleLoading(true));

    // listeners
    Dimensions.addEventListener('change', this.changeDimensions);
    AppState.addEventListener('change', this._handleAppStateChange);

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );

    // testing modal

    // creating db when app starts
    dispatchDbCall(() =>
      createDb(() =>
        dispatchDbCall(() =>
          getSettings((settings) =>
            this.props.dispatch(
              updateSettings(settings.defSort, settings.homePage)
            )
          )
        )
      )
    );

    if (this.props.settings.homePage) {
      this.setInitSelDay(true);
      // setTimeout(() => this.setInitSelDay(true), 3000);
      this.props.dispatch(toggleLoading(false));
      this.props.dispatch(setScreen(this.props.settings.homePage));
      this.currComponent();
      this.setScreenTitle(this.props.settings.homePage);
    }

    // testModal(this.props.dispatch);
    this.props.dispatch(genYearDDData());
  }

  componentDidUpdate(prevProps) {
    if (this.props.currScreen.screenKey !== prevProps.currScreen.screenKey) {
      this.currComponent();
      this.setScreenTitle();
    }

    const { selDay } = this.props;
    if (!isEqual(selDay, prevProps.selDay)) {
      this.setScreenTitle();
    }

    if (
      this.props.settings.homePage !== prevProps.settings.homePage &&
      !prevProps.settings.homePage
    ) {
      this.setInitSelDay(true);
      // setTimeout(() => this.setInitSelDay(true), 3000);
      this.props.dispatch(toggleLoading(false));
      this.props.dispatch(setScreen(this.props.settings.homePage));
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changeDimensions);
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.backHandler.remove();
    this.mounted = false;
  }

  setScreenTitle(custScreenKey) {
    const { routeItem, selDay, currScreen } = this.props;

    const scrKey = custScreenKey || currScreen.screenKey;

    if (scrKey === DAY) {
      formNamedDate(selDay.year, selDay.month, selDay.day, true)
        .then((dateName) => {
          this.setState({ screenTitle: dateName });
        })
        .catch((err) => {
          this.setState({ screenTitle: '' });
          console.log('screen title error', err);
        });
    } else {
      this.setState({ screenTitle: routeItem.title });
    }
  }

  async setInitSelDay(gDays) {
    if (gDays && this.mounted) {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();

      if (this.props.initDate) {
        day = this.props.initDate.day;
        month = this.props.initDate.month;
        year = this.props.initDate.year;
      }

      genDays({ day, month, year }, false, this.props.dispatch);
      this.setInitMY(month, year);
      if (this.props.initDate) {
        this.props.dispatch(setInitDate(null));
      }
    }
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.props.dispatch(genYearDDData());
    }
  }

  setInitMY(month, year) {
    this.setState({
      initMonth: month,
      initYear: year,
    });
  }

  changeDimensions = (e) => {
    this.props.dispatch(viewChanged(e));
  };

  openScreen = (title) => {
    this.setState({
      showMenu: false,
    });

    const loadInit = title === DAY || title === MONTH;
    this.setInitSelDay(loadInit);
    this.props.dispatch(remBackAction('closeMenu'));
    this.props.dispatch(switchScreen(title, false, false, { loadInit }));
    if (title === MONTH) {
      this.props.dispatch(clearExtraInfo(MONTH));
    }
  };

  handleBackPress = () => {
    if (this.props.currBackActs.length > 0) {
      this.props.currBackActs[0].action();
      // so sometimes the action will remove the last back action
      // so we just check if its still there
      if (this.props.currBackActs[0]) {
        this.props.dispatch(remBackAction(this.props.currBackActs[0].key));
      }
    } else if (this.props.currScreen.navRoute.length > 1) {
      this.props.dispatch(switchScreen(null, true));
    } else {
      BackHandler.exitApp();
    }
    return true;
  };

  currComponent() {
    switch (this.props.currScreen.screenKey) {
      case TEST_TITLE:
        this.setState({
          currCompArr: [
            { component: <NativeTestScreen key="0" />, title: TEST_TITLE },
          ],
        });
        break;
      case MONTH:
        this.setState({
          currCompArr: [
            {
              component: (
                <Month
                  key="0"
                  initMonth={this.state.initMonth}
                  initYear={this.state.initYear}
                  setInitMY={this.setInitMY}
                />
              ),
              title: MONTH,
            },
          ],
        });
        break;
      case DAY:
        this.setState({
          currCompArr: [
            {
              component: (
                <DayTasks
                  key="0"
                  extraInfo={this.props.routeItem.extraInfo || {}}
                  title={this.props.routeItem.title}
                />
              ),
              title: DAY,
            },
          ],
        });
        break;
      case TASK: {
        const currCompArr = this.state.currCompArr;
        if (findIndex(currCompArr, ['title', TASK]) === -1) {
          const index = currCompArr.length + 1;
          currCompArr.push({
            component: (
              <ImageBackground
                key={`${index}`}
                source={backgroundImage}
                style={{
                  ...appStyles.screenModCont,
                  zIndex: index,
                }}
              >
                <TaskScreen />
              </ImageBackground>
            ),
            title: TASK,
          });
        }
        const remInd = findIndex(currCompArr, ['title', REMINDER]);

        // so if we get into the task screen and the
        // reminder component is there, that means that we
        // switched from the reminder screen modal, back to
        // task screen modal and we need to remove it from the
        // rendered component array
        if (remInd !== -1) {
          currCompArr.splice(remInd, 1);
        }

        this.setState({ currCompArr });
        break;
      }
      case REMINDER: {
        const currCompArr = this.state.currCompArr;
        const index = currCompArr.length + 1;
        currCompArr.push({
          component: (
            <ImageBackground
              key={`${index}`}
              source={backgroundImage}
              style={{
                ...appStyles.screenModCont,
                zIndex: index,
              }}
            >
              <Reminder extraInfo={this.props.routeItem.extraInfo || {}} />
            </ImageBackground>
          ),
          title: REMINDER,
        });
        this.setState({ currCompArr });
        break;
      }
      default:
        this.setState({
          currCompArr: [{ component: <View key="0" />, title: '' }],
        });
    }
  }

  closeMenu() {
    this.setState({
      showMenu: false,
    });
  }

  openMenu() {
    if (this.state.showMenu) {
      this.props.dispatch(remBackAction('closeMenu'));
      this.closeMenu();
    } else {
      this.props.dispatch(addBackAction('closeMenu', this.closeMenu));
      this.setState({
        showMenu: true,
      });
    }
  }

  render() {
    const { showMenu, screenTitle } = this.state;

    const {
      modContent,
      modTitle,
      modActions,
      dispatch,
      ddData,
      currScreen,
    } = this.props;

    return (
      <ImageBackground source={backgroundImage} style={mainContainer.style}>
        <Modal
          isVisible={!!modContent}
          onBackButtonPress={() => dispatch(toggleModal())}
          onBackdropPress={() => dispatch(toggleModal())}
          useNativeDriver
        >
          <View style={appStyles.modContainer}>
            <Text style={titleContainer.style}>{modTitle}</Text>
            <View keyboardShouldPersistTaps="handled">{modContent}</View>
            <View style={appStyles.modButContainer}>
              {modActions &&
                modActions.map((item, index) => (
                  <GenButton
                    testID={appIds.modBut(index)}
                    key={`button-${index}`}
                    color={
                      item.type
                        ? darkBasic.buttTypes[item.type]
                        : darkBasic.buttTypes.neutral
                    }
                    onPress={item.func}
                    text={item.title}
                  />
                ))}
            </View>
          </View>
        </Modal>
        {!!ddData &&
          !!ddData.dropDown &&
          ddData.inputX !== undefined &&
          ddData.inputY !== undefined && (
            <DropDownList
              dropDown={ddData.dropDown}
              onItemPress={ddData.onItemPress}
              tapOut={ddData.tapOut}
              custInContainer={ddData.custInContainer}
              placement={{
                marginTop: ddData.inputY,
                marginLeft: ddData.inputX,
              }}
            />
          )}
        <TitleBar
          openMenu={() => this.openMenu()}
          title={screenTitle}
          showMenu={showMenu}
        />
        <SlideAnim showMenu={showMenu}>
          <ActionMenu navigate={this.openScreen} />
        </SlideAnim>
        <AnimContainer>
          <View style={screenContainer.style}>
            {this.state.currCompArr.map((screenComp) => screenComp.component)}
          </View>
        </AnimContainer>
        {!this.props.routeItem.extraInfo.move &&
          [MONTH, DAY].includes(currScreen.screenKey) && (
            <FloatingButton
              testID={appIds.floatAdd}
              onPress={() => this.props.dispatch(switchScreen(TASK))}
            />
          )}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  currScreen: state.currScreen,
  routeItem: state.currScreen.navRoute[state.currScreen.routeInd],
  currBackActs: state.currBackActs.backActions,
  modContent: state.modal.modContent,
  modActions: state.modal.modActions,
  modTitle: state.modal.modTitle,
  ddData: state.appDD.ddData,
  selDay: state.selDay,
  appRngCode: state.appRngCode,
  settings: state.settings,
  initDate: state.initDate,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
