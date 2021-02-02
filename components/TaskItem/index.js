import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
/* styles */
import { darkBasic, smallIconSize } from '../../styles/theme';
import { taskItem } from './style';
/* components */
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RemPrev } from '../RemPrev';
/* consts */
import { tItemIds } from './testIds';
/* redux */
import { connect } from 'react-redux';

class TaskItem extends React.Component {
  constructor(props) {
    super();

    this.state = {
      details: !!props.initItemId && props.initItemId + '' === props.item.key,
    };

    this.checkBounds = this.checkBounds.bind(this);
    this.setDetails = this.setDetails.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  async checkBounds(scroll) {
    if (scroll) {
      this.props.onDetOut();
    } else {
      this.itemRef &&
        this.itemRef.measure((fx, fy, width, height, px, py) => {
          if (py + height > this.props.windHeight) {
            this.props.onDetOut();
          }
        });
    }
  }

  setDetails(details, scroll) {
    if (this.props.noDetail) {
      if (this.props.onItemPress) {
        this.props.onItemPress();
      }
    } else {
      this.setState(
        {
          details,
        },
        () => setTimeout(async () => this.checkBounds(scroll), 10)
      );
    }
  }

  openMenu(item) {
    this.optionsRef &&
      this.optionsRef.measure((fx, fy, width, height, px, py) => {
        this.props.optionPress(item, px, py);
      });
  }

  render() {
    const { details } = this.state;

    const {
      item,
      done,
      notTask,
      noCheckBox,
      noTime,
      highlight,
      noOptions,
    } = this.props;

    const textStyle =
      done && !notTask
        ? {
            textDecorationLine: 'line-through',
            color: highlight
              ? darkBasic.highLightHolderCol
              : darkBasic.placeHolderColor,
          }
        : {
            color: highlight ? darkBasic.highLight : darkBasic.textColor,
          };

    const time =
      !noTime &&
      item.hours &&
      item.minutes &&
      item.hours.length &&
      item.minutes.length
        ? `${item.hours}:${item.minutes}`
        : false;

    const optButStyle = noOptions
      ? {
          ...taskItem.optBut,
          opacity: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }
      : taskItem.optBut;

    const visStyle = this.props.item.invisible
      ? { opacity: 0, pointerEvents: 'none' }
      : {};

    return (
      <View
        style={visStyle}
        ref={(ref) => {
          this.itemRef = ref;
        }}
        collapsable={false}
      >
        <View style={taskItem.headContainer}>
          {!noCheckBox && (
            <View style={taskItem.checkBox}>
              <CheckBox
                testID={`${tItemIds.checkBox}-${item.title}`}
                value={!!done}
                onValueChange={() => this.props.onCheck()}
                tintColors={{
                  true: darkBasic.placeHolderColor,
                  false: darkBasic.textColor,
                }}
              />
            </View>
          )}

          <TouchableOpacity
            testID={`${tItemIds.mainBut}-${item.title}`}
            disabled={this.props.item.invisible}
            style={taskItem.textBut}
            activeOpacity={
              (this.props.noDetail && !!this.props.onItemPress) ||
              !this.props.noDetail
                ? 0
                : 1
            }
            delayLongPress={500}
            // onLongPress={() => this.openMenu(item)}
            onPress={() =>
              details ? this.setDetails(false) : this.setDetails(true)
            }
          >
            {time && (
              <Text
                style={{
                  ...taskItem.timeText,
                  ...textStyle,
                }}
              >
                {time}
              </Text>
            )}
            <Text
              testID={`${tItemIds.titText}-${item.title}`}
              style={{
                ...taskItem.titleText,
                ...textStyle,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={`${tItemIds.optBut}-${item.title}`}
            style={optButStyle}
            disabled={noOptions || this.props.item.invisible}
            ref={(ref) => {
              this.optionsRef = ref;
            }}
            onPress={() => this.openMenu(item)}
          >
            <Icon
              name="more-vert"
              size={smallIconSize}
              color={
                done && !notTask
                  ? darkBasic.placeHolderColor
                  : darkBasic.textColor
              }
            />
          </TouchableOpacity>
        </View>
        {details && (
          <TouchableOpacity
            onPress={this.props.editTask}
            disabled={noOptions}
            style={taskItem.expandItem}
          >
            {!!item.reminders?.length && (
              <RemPrev
                taskDone={done}
                justPreview
                reminders={item.reminders}
                editTask={this.props.editTask}
              />
            )}
            <View style={taskItem.descWrapper}>
              <Text style={taskItem.detTitle}>{item.title}</Text>
              <Text
                style={taskItem.descText}
                testID={`${tItemIds.descText}-${item.title}`}
              >
                {item.description || 'No description'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapDispatchToProps)(TaskItem);
