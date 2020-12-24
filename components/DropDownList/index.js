import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
/* styles */
import { textContainer } from '../../styles/generalStyles';
import {
  simpleTextFS,
  listItemPadding,
  iconSize,
  titlePadding,
  titleBorderWidth,
} from '../../styles/theme';
import { dpList } from './style';
/* components */
import { ListItem } from '../ListItem';
/* consts */
import { dropDownIds } from './testIds';

class DropDownList extends React.Component {
  constructor(props) {
    super();

    this.state = {
      marginTop:
        props.placement.marginTop !== undefined
          ? props.placement.marginTop
          : '-100%',
    };
  }

  componentDidUpdate(prevProps) {
    // smart placement adjustment
    if (
      this.props.placement.marginTop !== prevProps.placement.marginTop &&
      this.props.dropDown &&
      this.props.dropDown.length
    ) {
      // so we need to check difference against the screen height
      // and NOT the window height, thats why here we substract the
      // height of the title bar from the window size.
      // This is because we marginTop from the top of the screen
      // and not the whole window
      const screenHeight =
        this.props.windHeight -
        (iconSize + 2 * titlePadding + titleBorderWidth);

      // and here we calculate the list height by the amount of items
      // in it and multiplying the height of single item according to
      // the styling variables
      const listHeight =
        (simpleTextFS + listItemPadding * 2) * this.props.dropDown.length;

      const heightNeeded = listHeight + this.props.placement.marginTop;

      if (screenHeight && heightNeeded > screenHeight) {
        //  so if height needed is more then the screen height
        // we substract the difference from the marginTop
        const diff = heightNeeded - screenHeight;
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          marginTop: this.props.placement.marginTop - diff,
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          marginTop: this.props.placement.marginTop,
        });
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={dpList.container}
        onPress={() => this.props.tapOut()}
        testID={dropDownIds.dropDown}
      >
        <View
          style={{
            ...dpList.inContainer,
            ...this.props.custInContainer,
            marginLeft: this.props.placement.marginLeft,
            marginTop: this.state.marginTop,
          }}
        >
          <FlatList
            data={this.props.dropDown}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={
              <Text style={textContainer.style}>No Matching Items</Text>
            }
            renderItem={({ item, index }) => (
              <ListItem
                testId={`ddGen-${index}`}
                item={item}
                index={index}
                custItemStyle={{
                  ...dpList.custItemStyle,
                  ...this.props.custItemStyle,
                }}
                click={() => this.props.onItemPress(item, index)}
              />
            )}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default DropDownList;
