import React from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';
/* styles */
import { dTasks, ddListWidth } from './style';
import {
  checkBoxHeight,
  simpleBorderWidth,
  simpleTextFS,
  smallIconSize,
  taskItemPad,
} from '../../styles/theme';
/* redux */
import { connect } from 'react-redux';
import {
  addBackAction,
  addExtraInfo,
  clearExtraInfo,
  remBackAction,
  setInitItemId,
  switchScreen,
  toggleModal,
  updatePropSort,
} from '../../redux/general/actions';
import {
  setSelSpecDay,
  setSelMonth,
  setSelYear,
  setInitSelDay,
  setInitCalDays,
} from '../../redux/dates/actions';
/* consts */
import {
  TASK,
  invItems,
  titleBarHeight,
  rndTxtInputOffset,
  searchInpHeight,
  MONTH,
} from '../../consts/generalConsts';
import {
  menuItems,
  sortItems,
  genSortItems,
  linkItem,
  sortItemTitles,
} from './const';
/* components */
import TaskItem from '../TaskItem';
import DropDownList from '../DropDownList';
import { IconButton } from '../IconButton';
import LinkingModal from '../Modals/LinkingModal';
import DaySelection from '../DaySelection';
/* utils */
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import { delAllModal } from '../../utils/modalUtils';
import {
  sortTasks,
  getSortParams,
  linkedSorting,
  toastMessage,
} from '../../utils/generalUtils';
/* database */
import { createRep } from '../../database';
import { getTimeTasks } from '../../database/retrievers';
import { doneTask, updateSort, updateLinks } from '../../database/crud';
import { dispatchDbCall } from '../../database/helpers';

class DayTaskList extends React.Component {
  constructor(props) {
    super(props);

    this.mounted = true;

    this.genTaskItemHeight();

    this.state = {
      dropDown: false,
      sortDD: false,
      inputX: 0,
      inputY: '-100%',
      selItem: {},
      taskData: [],
      genTask: false,
      timedTask: false,
      portrait:
        Dimensions.get('window').height > Dimensions.get('window').width,
      windHeight: Dimensions.get('window').height,
      dropDownM: false,
      dropDownY: false,
      dropDownD: false,
      resetMon: false,
      resetYea: false,
      resetDay: false,
      mountDataLoaded: false,
      initScroll: 0,
    };

    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.setDropDown = this.setDropDown.bind(this);
    this.setPlacement = this.setPlacement.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.optionPress = this.optionPress.bind(this);
    this.setWindowHeight = this.setWindowHeight.bind(this);
    this.addTask = this.addTask.bind(this);
    this.setDayTasks = this.setDayTasks.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.taskLoad = this.taskLoad.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);
    this.setSortDD = this.setSortDD.bind(this);
    this.setSortDDPlace = this.setSortDDPlace.bind(this);
    this.onSortPress = this.onSortPress.bind(this);
    this.setDDropDown = this.setDDropDown.bind(this);
    this.setMDropDown = this.setMDropDown.bind(this);
    this.setYDropDown = this.setYDropDown.bind(this);
    this.toggleDayRes = this.toggleDayRes.bind(this);
    this.toggleMonRes = this.toggleMonRes.bind(this);
    this.toggleYeaRes = this.toggleYeaRes.bind(this);
    this.onDItemPress = this.onDItemPress.bind(this);
    this.onMItemPress = this.onMItemPress.bind(this);
    this.onYItemPress = this.onYItemPress.bind(this);
    this.setInputXY = this.setInputXY.bind(this);
    this.editTask = this.editTask.bind(this);
    this.genTaskItemHeight = this.genTaskItemHeight.bind(this);
    this.cancelMove = this.cancelMove.bind(this);
  }

  componentDidMount() {
    this.taskLoad();
  }

  componentDidUpdate(prevProps) {
    // window height adjustment
    if (
      !isEqual(
        this.props.screenOrient.eventChange.window,
        prevProps.screenOrient.eventChange.window
      )
    ) {
      const screen = this.props.screenOrient.eventChange.window;
      this.setState({
        portrait: screen.height > screen.width,
      });
      this.setWindowHeight();
      // so we want to remove the dropdown if the orientation changes
      // cause its incredibly hard to align the dropdown and the
      // scrolled view on orientation change, the user can just reopen the options
      // after orientation change
      this.setDropDown(false);
      this.setSortDD(false);
      this.toggleDayRes(true);
      this.toggleMonRes(true);
      this.toggleYeaRes(true);
    }

    const { year, month, day } = this.props.selDay;

    if (
      this.props.screenKey !== prevProps.screenKey ||
      !isEqual(this.props.selDay, prevProps.selDay)
    ) {
      dispatchDbCall(() =>
        getTimeTasks(true, { year, month: month + 1, day }, this.setDayTasks)
      );
    }

    if (this.props.defSort !== prevProps.defSort) {
      this.setDayTasks();
    }

    if (!this.props.moveItem && this.props.moveItem !== prevProps.moveItem) {
      dispatchDbCall(() =>
        getTimeTasks(true, { year, month: month + 1, day }, this.setDayTasks)
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(remBackAction('sortMenu'));
    this.props.dispatch(remBackAction('menu'));
    this.mounted = false;
  }

  taskLoad() {
    const { selDay } = this.props;

    let year = selDay.year;
    let month = selDay.month;
    let day = selDay.day;

    if (this.props.loadInit) {
      const date = new Date();
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
    }

    if (this.props.noRepCheck) {
      dispatchDbCall(() =>
        getTimeTasks(true, { year, month: month + 1, day }, (dayTasks) =>
          this.setDayTasks(dayTasks, true)
        )
      );
    } else {
      dispatchDbCall(() =>
        createRep(year, month, () =>
          dispatchDbCall(() =>
            getTimeTasks(true, { year, month: month + 1, day }, (dayTasks) =>
              this.setDayTasks(dayTasks, true)
            )
          )
        )
      );
    }
  }

  setDayTasks(dayTasks = this.state.taskData, mountDataLoaded) {
    if (
      this.props.initItemId ||
      this.props.moveItem ||
      this.state.initScroll !== 0
    ) {
      this.setState({ taskData: [] });
    }

    const newDayTasks = [...dayTasks];
    const sortParams = getSortParams(newDayTasks, this.props.defSort);
    const stateObject = {
      genTask: sortParams.genTask,
      timedTask: sortParams.timedTask,
      initScroll: 0,
    };

    if (!this.state.mountDataLoaded && mountDataLoaded) {
      stateObject.mountDataLoaded = mountDataLoaded;
    }

    if (this.props.moveItem) {
      const existInd = findIndex(newDayTasks, ['key', this.props.moveItem.key]);
      if (existInd === -1) {
        newDayTasks.push(this.props.moveItem);
      }
    }

    if (this.props.defSort === 'linked') {
      stateObject.taskData = linkedSorting(newDayTasks);
    } else {
      stateObject.taskData = sortTasks(
        sortParams.top,
        sortParams.asc,
        newDayTasks,
        sortParams.genTask && !sortParams.timedTask
      );
    }

    let initItemInd = -1;
    if (this.props.initItemId) {
      this.genTaskItemHeight();
      initItemInd = findIndex(stateObject.taskData, [
        'key',
        this.props.initItemId + '',
      ]);
      stateObject.initScroll = initItemInd;
    }

    if (this.props.moveItem) {
      this.genTaskItemHeight();
      stateObject.initScroll = findIndex(stateObject.taskData, [
        'key',
        this.props.moveItem.key,
      ]);
    }

    if (this.mounted) {
      if (this.props.initItemId && initItemInd !== -1) {
        this.setState(stateObject, () =>
          this.props.dispatch(setInitItemId(null))
        );
      } else {
        this.setState(stateObject);
      }
    }
  }

  scrollToIndex(index) {
    this.listRef.scrollToIndex({ index });
  }

  setDropDown(dropDown) {
    const stateChange = {
      dropDown,
    };

    if (!dropDown) {
      this.props.dispatch(remBackAction('menu'));
      stateChange.inputX = 0;
      stateChange.inputY = '-100%';
    } else {
      this.props.dispatch(
        addBackAction('menu', () =>
          this.setState({
            dropDown: false,
            inputX: 0,
            inputY: '-100%',
          })
        )
      );
    }

    this.setState(stateChange);
  }

  setPlacement(x, y) {
    this.contRef &&
      this.contRef.measure((fx, fy, width, height) => {
        // okay so for everything to be placed properly
        // whilst using our margins for positioning of the
        // dropdown list, we need to get the remaining screen height
        // which is substracted from the whole screen height
        // by the height of the container in which we have the dropdown
        // components
        // same logic is with the remining screenWidth ofcourse it
        // only applies if the DayTaskList component is not full
        // screen width
        const remainingScreenHeight = this.state.windHeight - height;
        let inputX = x - ddListWidth;
        if (this.props.notFullWidth) {
          const remainingScreenWidth = Dimensions.get('window').width - width;
          inputX -= remainingScreenWidth;
        }
        this.setState({
          // and here we substract the remainingScreenHeight from the why
          // so that our margin top would NOT include positioning
          // on the Y by the WHOLE screen size, but it would only
          // include the positioning by the dropdown container
          // and we also add in the smallIconSize here as we want
          // the dropdown to appear under the options button and
          // smallIconSize is the height of the options button
          // and we use double smallIconSize as there's some misscalculation
          // with the height of the container or/and height of the window
          // so we kind of adjust it like that
          inputY: y - remainingScreenHeight + smallIconSize,
          // so we substract ddListWidth here, as we want the dropdown
          // to appear on the left of the options as the options
          // are on the far right
          inputX,
        });
      });
  }

  editTask(
    key,
    task_id,
    hours,
    minutes,
    desc,
    title,
    done,
    afterLinks,
    repParsed
  ) {
    this.props.dispatch(
      switchScreen(TASK, false, false, {
        id: key,
        task_id,
        hours,
        minutes,
        desc,
        title,
        update: true,
        done,
        afterLinks,
        repeatability: repParsed,
      })
    );
  }

  onItemPress(item) {
    const {
      hours,
      minutes,
      description: desc,
      title,
      done,
      repeatability,
      key,
      task_id,
      afterLinks,
    } = this.state.selItem;

    const repParsed = repeatability && JSON.parse(repeatability);

    switch (item.key) {
      case 'edit': {
        this.editTask(
          key,
          task_id,
          hours,
          minutes,
          desc,
          title,
          done,
          afterLinks,
          repParsed
        );
        break;
      }
      case 'del': {
        delAllModal(key, task_id, repParsed, this.props.dispatch, () => {
          let taskData = this.state.taskData;
          const delInt = findIndex(taskData, ['key', key]);
          if (delInt !== -1) {
            taskData.splice(delInt, 1);
            let newTaskData = taskData;
            if (this.props.defSort === 'linked') {
              newTaskData = linkedSorting(newTaskData);
            }
            this.setState({ taskData: newTaskData });
          } else {
            toastMessage(
              'Some error occured while deleting the task, please report it',
              true
            );

            console.log(
              'deleted time task id not found in the taskData state wut? id: ',
              key
            );
          }
        });
        break;
      }
      case 'link': {
        const linkData = filter(
          this.state.taskData,
          (filtItem) =>
            filtItem.task_id !== task_id &&
            (!filtItem.afterLinks ||
              filtItem.afterLinks.indexOf(task_id) === -1)
        );
        this.props.dispatch(
          toggleModal(
            'Linking',
            <LinkingModal
              item={this.state.selItem}
              tasks={linkData}
              onCancel={() => this.props.dispatch(toggleModal())}
              onLink={(updtItem) => {
                if (
                  !isEqual(updtItem.afterLinks, this.state.selItem.afterLinks)
                ) {
                  dispatchDbCall(() =>
                    updateLinks(updtItem.task_id, updtItem.afterLinks, () => {
                      this.props.dispatch(toggleModal());
                      const newTaskData = this.state.taskData;
                      const updtIndex = findIndex(newTaskData, [
                        'task_id',
                        updtItem.task_id,
                      ]);

                      if (updtIndex !== -1) {
                        newTaskData[updtIndex].afterLinks = updtItem.afterLinks;
                        this.setState({
                          selItem: updtItem,
                          taskData: linkedSorting(newTaskData),
                        });
                      } else {
                        // lol wth
                        console.log(
                          'Error updated item with new afterLinks not found in task dataset, updtItem',
                          updtItem
                        );
                      }
                    })
                  );
                }
              }}
            />
          )
        );
        break;
      }
      case 'move': {
        this.props.dispatch(addBackAction('cancel_move', this.cancelMove));
        if (!this.props.taskPrev) {
          this.props.dispatch(
            switchScreen(MONTH, false, false, {
              move: true,
              moveItem: {
                id: parseInt(this.state.selItem.key, 10),
                ...this.state.selItem,
              },
            })
          );
        } else {
          this.props.dispatch(
            addExtraInfo(MONTH, {
              move: true,
              moveItem: {
                id: parseInt(this.state.selItem.key, 10),
                ...this.state.selItem,
              },
              mViaMonth: true,
            })
          );
        }
        if (
          repParsed &&
          repParsed.type &&
          (repParsed.number || repParsed.values)
        ) {
          toastMessage(
            'Task will be turned into a single task once moved',
            true
          );
        }
        break;
      }
      default:
        console.log('WHAT IS DIS');
    }

    this.setDropDown(false);
  }

  optionPress(selItem, inputX, inputY) {
    const menuItemz = [...menuItems];

    if (
      !selItem.hours &&
      !selItem.minutes &&
      this.props.defSort === 'linked' &&
      this.state.taskData.length > 1
    ) {
      menuItemz.push(linkItem);
    }

    this.setDropDown(menuItemz);
    this.setPlacement(inputX, inputY);
    this.setState({
      selItem,
    });
  }

  setWindowHeight() {
    this.setState({
      windHeight: Dimensions.get('window').height,
    });
  }

  addTask() {
    this.props.dispatch(switchScreen(TASK));
  }

  onCheck(id, value, index) {
    dispatchDbCall(() =>
      doneTask(
        id,
        !value,
        () => {
          let taskData = this.state.taskData;
          taskData[index].done = !taskData[index].done;
          this.setState({
            taskData,
          });
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  setSortDDPlace() {
    this.contRef &&
      this.contRef.measure((fx, fy, width, height) => {
        this.sortRef &&
          this.sortRef.measure((sfx, sfy, swidth, sheight, spx, spy) => {
            // okay so for everything to be placed properly
            // whilst using our margins for positioning of the
            // dropdown list, we need to get the remaining screen height
            // which is substracted from the whole screen height
            // by the height of the container in which we have the dropdown
            // components
            // same logic is with the remining screenWidth ofcourse it
            // only applies if the DayTaskList component is not full
            // screen width
            const remainingScreenHeight = this.state.windHeight - height;
            let inputX = spx;
            // and here we substract the remainingScreenHeight from the why
            // so that our margin top would NOT include positioning
            // on the Y by the WHOLE screen size, but it would only
            // include the positioning by the dropdown container
            // and we also add in the smallIconSize here as we want
            // the dropdown to appear under the sort button and
            // smallIconSize is the height of the sort button
            // and we use double smallIconSize as there's some misscalculation
            // with the height of the container or/and height of the window
            // so we kind of adjust it like that AND we want the dropdown appear
            // under the sort button
            let inputY = spy - remainingScreenHeight + 2 * smallIconSize;
            if (this.props.taskPrev && !this.props.notFullWidth) {
              inputX -= 8;
            }

            if (this.props.notFullWidth) {
              const remainingScreenWidth =
                Dimensions.get('window').width - width;
              inputX -= remainingScreenWidth;
              if (this.props.taskPrev) {
                inputY += smallIconSize;
              }
            }
            this.setState({
              inputY,
              inputX,
            });
          });
      });
  }

  onSortPress() {
    let sortItemz = [];
    if (this.state.genTask && this.state.timedTask) {
      sortItemz = [...sortItems];
    } else if (this.state.genTask) {
      sortItemz = [...genSortItems];
    }

    this.setSortDD(sortItemz);
    this.setSortDDPlace();
  }

  onSortSelect(item) {
    this.setSortDD(false);
    this.props.dispatch(updatePropSort(item.key));
    dispatchDbCall(() => updateSort(item.key));
  }

  setSortDD(sortDD) {
    const stateChange = {
      sortDD,
    };

    if (!sortDD) {
      this.props.dispatch(remBackAction('sortMenu'));
      stateChange.inputX = 0;
      stateChange.inputY = '-100%';
    } else {
      this.props.dispatch(
        addBackAction('sortMenu', () =>
          this.setState({
            sortDD: false,
            inputX: 0,
            inputY: '-100%',
          })
        )
      );
    }

    this.setState(stateChange);
  }

  setDDropDown(dropDownD) {
    const stateObj = {
      dropDownD,
    };
    if (!dropDownD) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  setMDropDown(dropDownM) {
    const stateObj = {
      dropDownM,
    };
    if (!dropDownM) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  setYDropDown(dropDownY) {
    const stateObj = {
      dropDownY,
    };
    if (!dropDownY) {
      stateObj.inputX = 0;
      stateObj.inputY = '-100%';
    }
    this.setState(stateObj);
  }

  toggleDayRes(resetDay) {
    this.setState({
      resetDay,
    });
  }

  toggleMonRes(resetMon) {
    this.setState({
      resetMon,
    });
  }

  toggleYeaRes(resetYea) {
    this.setState({
      resetYea,
    });
  }

  onDItemPress(item) {
    // number here as day
    this.props.dispatch(setSelSpecDay(item.day));
    this.toggleDayRes(true);
  }

  onMItemPress(item) {
    // number here as month
    this.props.dispatch(setSelMonth(item.value));
    this.toggleMonRes(true);
  }

  onYItemPress(item) {
    // number here as year
    this.props.dispatch(setSelYear(item.value));
    this.toggleYeaRes(true);
  }

  setInputXY(inputX, y) {
    // Okay so the way we calculate this is, since the dropdown appears as part
    // of the month screen and NOT part of the whole screen,
    // and the way we place it is by marginTop marginLeft from the MONTH screen
    // and the x & y coordinates we get are based on the whole screen,
    // for all of that we first need to substract titleBarHeight
    // so that the Y placement would be in line with the actual items
    // coordinates, and then we add in searchInpHeight cause we want
    // the dropdown to be BELOW the search input and we need that extra
    // offset cause we don't actually get the whole height of the textInput
    // just with our own styles, there's some internal height stuff happening
    // in the TextInput component itself.
    this.setState({
      inputX,
      inputY: y - titleBarHeight + searchInpHeight + rndTxtInputOffset,
    });
  }

  genTaskItemHeight() {
    this.taskItHeight = simpleBorderWidth + taskItemPad * 2;
    if (this.props.moveItem || simpleTextFS > checkBoxHeight) {
      // so if its the move item, there's no check box height
      // so we'll use the base height of text
      // ALSO we add in static + 8 cause that seems to be the approximate hight
      // we need to keep the item scrolled to properly visible
      // when using fontsize as the base height
      // NOTE: difference
      this.taskItHeight += simpleTextFS + 8;
    } else {
      this.taskItHeight += checkBoxHeight;
    }
  }

  cancelMove() {
    if (this.props.moveItem) {
      this.props.dispatch(clearExtraInfo(MONTH));
    } else {
      this.props.dispatch(switchScreen(false, true));
    }
  }

  render() {
    const sortButStyle =
      !this.props.taskPrev && !this.state.portrait
        ? {
            ...dTasks.sortButStyle,
            minWidth: '50%',
          }
        : dTasks.sortButStyle;

    const sortDDCont =
      !this.props.taskPrev && !this.state.portrait
        ? {
            ...dTasks.sortDDCont,
            width: '50%',
          }
        : dTasks.sortDDCont;

    const { moveItem } = this.props;

    return (
      <View
        ref={(ref) => {
          this.contRef = ref;
        }}
        collapsable={false}
        style={dTasks.container}
        onLayout={(event) => {
          // NOTE: as far as i've checked this does not get called with animation.event
          // changing its height value
          // console.log('layout change', event.nativeEvent.layout.height);

          if (!this.props.listHeight && !!this.props.setListHeight) {
            this.props.setListHeight(event.nativeEvent.layout.height);
          }
        }}
      >
        {!this.props.taskPrev && (
          <DaySelection
            setDDropDown={this.setDDropDown}
            setMDropDown={this.setMDropDown}
            setYDropDown={this.setYDropDown}
            resetDay={this.state.resetDay}
            resetMon={this.state.resetMon}
            resetYea={this.state.resetYea}
            toggleDayRes={this.toggleDayRes}
            toggleMonRes={this.toggleMonRes}
            toggleYeaRes={this.toggleYeaRes}
            setInputXY={this.setInputXY}
          />
        )}
        {this.state.taskData.length ? (
          <View style={dTasks.container}>
            {!this.props.taskPrev &&
              this.state.genTask &&
              this.state.taskData.length > 1 && (
                <IconButton
                  setRef={(ref) => {
                    this.sortRef = ref;
                  }}
                  text={sortItemTitles[this.props.defSort]}
                  contStyle={sortButStyle}
                  iconName="sort"
                  onPress={this.onSortPress}
                />
              )}
            <FlatList
              ref={(ref) => {
                this.listRef = ref;
              }}
              getItemLayout={(data, index) => ({
                length: this.taskItHeight,
                offset: this.taskItHeight * index,
                index,
              })}
              initialScrollIndex={this.state.initScroll}
              style={dTasks.listStyle}
              data={[...this.state.taskData, ...invItems]}
              renderItem={({ item, index }) => (
                <TaskItem
                  item={item}
                  done={item.done}
                  initItemId={this.props.initItemId}
                  highlight={moveItem && item.key === moveItem.key}
                  noCheckBox={!!moveItem}
                  noOptions={!!moveItem}
                  onCheck={() => this.onCheck(item.key, item.done, index)}
                  windHeight={this.state.windHeight}
                  optionPress={this.optionPress}
                  onDetOut={() => this.scrollToIndex(index)}
                  editTask={() =>
                    this.editTask(
                      item.key,
                      item.task_id,
                      item.hours,
                      item.minutes,
                      item.description,
                      item.title,
                      item.done,
                      item.afterLinks,
                      item.repeatability && JSON.parse(item.repeatability)
                    )
                  }
                />
              )}
            />
          </View>
        ) : (
          <Text style={dTasks.emptyTextStyle}>No tasks</Text>
        )}
        {this.state.dropDown && (
          <DropDownList
            dropDown={this.state.dropDown}
            onItemPress={this.onItemPress}
            tapOut={() => this.setDropDown(false)}
            custInContainer={dTasks.custDropDown}
            windHeight={this.state.windHeight}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.sortDD && (
          <DropDownList
            custInContainer={sortDDCont}
            custItemStyle={dTasks.sortDDItem}
            dropDown={this.state.sortDD}
            onItemPress={this.onSortSelect}
            tapOut={() => this.setSortDD(false)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.dropDownD && (
          <DropDownList
            dropDown={this.state.dropDownD}
            onItemPress={this.onDItemPress}
            tapOut={() => this.toggleDayRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.dropDownM && (
          <DropDownList
            dropDown={this.state.dropDownM}
            onItemPress={this.onMItemPress}
            tapOut={() => this.toggleMonRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
        {this.state.dropDownY && (
          <DropDownList
            dropDown={this.state.dropDownY}
            onItemPress={this.onYItemPress}
            tapOut={() => this.toggleYeaRes(true)}
            placement={{
              marginTop: this.state.inputY,
              marginLeft: this.state.inputX,
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  screenOrient: state.screenOrient,
  screenKey: state.currScreen.screenKey,
  defSort: state.settings.defSort,
  actMen: state.currScreen.actMen,
  initItemId: state.initItemId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DayTaskList);
