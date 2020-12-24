import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
/* styles */
import { darkBasic } from '../../styles/theme';
import { inputStyle } from './style';
/* redux */
import { connect } from 'react-redux';
import { remBackAction, addBackAction } from '../../redux/general/actions';
/* utils */
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';

class SearchInput extends React.Component {
  constructor(props) {
    super();

    this.state = {
      searchText: '',
      inpActive: false,
    };

    this.posX = 0;
    this.posY = '-100%';

    this.setSearchText = this.setSearchText.bind(this);
    this.setInpActive = this.setInpActive.bind(this);
    this.onItemResetCalled = this.onItemResetCalled.bind(this);
    this.resetItemSearch = this.resetItemSearch.bind(this);
    this.onInputPress = this.onInputPress.bind(this);
    this.textSearch = this.textSearch.bind(this);
    this.setInputXY = this.setInputXY.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this.setXYWithKeyb = this.setXYWithKeyb.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetItem && this.props.resetItem !== prevProps.resetItem) {
      this.onItemResetCalled();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    this.props.dispatch(remBackAction('closeSearchDrop'));
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  async setXYWithKeyb(keybHeight) {
    this.props.setInputXY(this.posX, this.posY, keybHeight);
  }

  _keyboardDidShow(e) {
    if (this.props.setWithKeyB) {
      setTimeout(() => this.setXYWithKeyb(e.endCoordinates.height), 5);
    }
  }

  _keyboardDidHide() {
    if (this.props.setWithKeyB) {
      setTimeout(() => this.setXYWithKeyb(0), 5);
    }
  }

  async setInputXY() {
    this._mounted &&
      this.container &&
      this.container.measure((fx, fy, width, height, px, py) => {
        if (!this.props.setWithKeyB) {
          this.props.setInputXY(px, py);
        }
        this.posX = px;
        this.posY = py;
      });
  }

  setSearchText(searchText) {
    this.setState({ searchText });
  }
  setInpActive(inpActive) {
    this.setState({ inpActive });
  }

  onItemResetCalled() {
    this.resetItemSearch();
    this.props.dispatch(remBackAction('closeSearchDrop'));
    this.props.toggleResItem(false);
  }

  resetItemSearch() {
    this.props.setDropDown(false);
    this.setSearchText('');
    Keyboard.dismiss();
    this.textInput.current && this.textInput.current.blur();
  }

  onInputPress() {
    this.props.dispatch(
      addBackAction('closeSearchDrop', () => this.resetItemSearch())
    );
    this.setInpActive(true);
    this.setInputXY();
    this.props.setDropDown(this.props.data);
  }

  textSearch(text) {
    this.setSearchText(text);
    // singleAutoSel
    const filtData = filter(this.props.data, (item) => {
      return item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
    // so this is the autoselection if required for a single item
    // cause for the time selection its a bit more convenient to
    // have this autoselection rather than to have an extra click to
    // press on the time you want
    if (this.props.singleAutoSel && filtData.length === 1) {
      this.props.onItemPress(filtData[0]);
    } else {
      this.props.setDropDown(filtData);
    }
  }

  render() {
    return (
      <View
        style={inputStyle.container}
        ref={(view) => {
          this.container = view;
        }}
        collapsable={false}
      >
        <TextInput
          testID={this.props.testID}
          ref={(tInput) => {
            this.textInput = tInput;
          }}
          onFocus={() => this.onInputPress()}
          style={inputStyle.textCont}
          disableFullscreenUI={true}
          placeholder={this.props.itemSel}
          placeholderTextColor={
            this.state.inpActive || this.props.plHGrey
              ? darkBasic.placeHolderColor
              : darkBasic.textColor
          }
          onBlur={() => this.setInpActive(false)}
          onChangeText={(text) => this.textSearch(text)}
          keyboardType={this.props.numeric ? 'numeric' : 'default'}
          value={this.state.searchText}
          blurOnSubmit={true}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapDispatchToProps)(SearchInput);
