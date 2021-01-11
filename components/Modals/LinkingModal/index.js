import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
/* utils */
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
/* styles */
import { textContainer } from '../../../styles/generalStyles';
import { darkBasic } from '../../../styles/theme';
import { linkMod } from './style';
/* components */
import TaskItem from '../../TaskItem';
import { GenButton } from '../../GenButton';
/* redux */
import { connect } from 'react-redux';

class LinkingModal extends React.Component {
  constructor(props) {
    super();

    this.state = {
      linkItem: cloneDeep(props.item),
      portrait:
        Dimensions.get('window').height > Dimensions.get('window').width,
    };

    this.onItemLink = this.onItemLink.bind(this);
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
    }
  }

  onItemLink(task_id) {
    let newLinkIt = this.state.linkItem;
    if (!newLinkIt.afterLinks) {
      newLinkIt.afterLinks = [task_id];
    } else {
      const taskInd = newLinkIt.afterLinks.indexOf(task_id);
      if (taskInd === -1) {
        newLinkIt.afterLinks.push(task_id);
      } else {
        newLinkIt.afterLinks.splice(taskInd, 1);
      }
    }

    this.setState({
      linkItem: newLinkIt,
    });
  }

  render() {
    const { linkItem } = this.state;

    const linkModCont = this.state.portrait
      ? { maxHeight: '95%' }
      : { maxHeight: '90%' };

    return (
      <View style={linkModCont}>
        <Text style={textContainer.style}>
          Select tasks that should always be before{' '}
          <Text style={linkMod.titleText}>{linkItem.title}</Text> task
        </Text>
        <FlatList
          style={linkMod.listContainer}
          data={this.props.tasks}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              done={
                linkItem.afterLinks &&
                linkItem.afterLinks.indexOf(item.task_id) !== -1
              }
              onCheck={() => this.onItemLink(item.task_id)}
              noDetail
              noOptions
              notTask
            />
          )}
        />
        <View style={linkMod.butContainer}>
          <GenButton
            color={darkBasic.buttTypes.accept}
            onPress={() => this.props.onLink(linkItem)}
            text="Link"
          />
          <GenButton
            color={darkBasic.buttTypes.info}
            onPress={this.props.onCancel}
            text="Back"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  screenOrient: state.screenOrient,
});

export default connect(mapStateToProps)(LinkingModal);
