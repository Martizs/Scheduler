import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
/* styles */
import { darkBasic, smallIconSize } from '../../styles/theme';
import { taskItem } from './style';
/* components */
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
/* consts */
import { tItemIds } from './testIds';

class TaskItem extends React.Component {
  constructor(props) {
    super();

    this.state = {
      details: false,
    };

    this.checkBounds = this.checkBounds.bind(this);
    this.setDetails = this.setDetails.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  async checkBounds() {
    this.itemRef &&
      this.itemRef.measure((fx, fy, width, height, px, py) => {
        if (py + height > this.props.windHeight) {
          this.props.onDetOut();
        }
      });
  }

  setDetails(details) {
    if (this.props.noDetail) {
      if (this.props.onItemPress) {
        this.props.onItemPress();
      }
    } else {
      this.setState(
        {
          details,
        },
        () => setTimeout(this.checkBounds, 10)
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

    const { item, done, notTask, noCheckBox, noTime } = this.props;

    const textStyle =
      done && !notTask
        ? {
            textDecorationLine: 'line-through',
            color: darkBasic.placeHolderColor,
          }
        : {};

    const time =
      !noTime &&
      item.hours &&
      item.minutes &&
      item.hours.length &&
      item.minutes.length
        ? `${item.hours}:${item.minutes}`
        : false;

    const optButStyle = this.props.noOptions
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
            style={taskItem.textBut}
            activeOpacity={
              (this.props.noDetail && !!this.props.onItemPress) ||
              !this.props.noDetail
                ? 0
                : 1
            }
            delayLongPress={500}
            onLongPress={() => this.openMenu(item)}
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
            disabled={this.props.noOptions}
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
          <View style={taskItem.expandItem}>
            <View style={taskItem.descWrapper}>
              <Text style={taskItem.detTitle}>{item.title}</Text>
              <Text style={taskItem.descText}>
                {item.description || 'No description'}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default TaskItem;
