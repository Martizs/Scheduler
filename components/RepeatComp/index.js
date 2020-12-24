import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
/* styles */
import { darkBasic, smallIconSize } from '../../styles/theme';
import { repComp } from './style';
/* consts */
import { repCompIds } from './testIds';

export class RepeatComp extends React.Component {
  render() {
    return (
      <View>
        <View style={repComp.container}>
          <View style={repComp.container}>
            <TouchableOpacity
              onPress={() => this.props.onCheck()}
              testID={repCompIds.repCheck}
            >
              <CheckBox
                value={this.props.repTask}
                disabled
                tintColors={{
                  true: darkBasic.textColor,
                  false: darkBasic.textColor,
                }}
              />
            </TouchableOpacity>
            <Text style={repComp.label}>{this.props.repLabel}</Text>
          </View>
        </View>
        <View>
          {this.props.repTask && this.props.editAll && (
            <View style={repComp.repContainer}>
              <Text style={repComp.repText}>Every</Text>
              <TextInput
                testID={repCompIds.repInp}
                style={repComp.numbTextInput}
                placeholder="Number"
                keyboardType="numeric"
                placeholderTextColor={darkBasic.placeHolderColor}
                onChangeText={(text) => this.props.onNumbChange(text)}
                defaultValue={this.props.repNumber}
                maxLength={3}
                multiline
              />
              <View>
                <TouchableOpacity
                  ref={(ref) => {
                    this.props.setTypeRef(ref);
                  }}
                  style={repComp.repTypeDD}
                  onPress={() => this.props.setDD()}
                >
                  <Text style={repComp.repTypeDDText}>
                    {this.props.repTypeName}
                  </Text>
                  <Icon
                    name="keyboard-arrow-down"
                    size={smallIconSize}
                    color={darkBasic.textColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
