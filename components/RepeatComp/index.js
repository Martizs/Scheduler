import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
/* components */
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MyCheckBox } from '../MyCheckBox';
import { RadioButton } from '../RadioButton';
import { CircleCheck } from '../CircleCheck';
/* styles */
import { darkBasic, smallIconSize } from '../../styles/theme';
import { repComp } from './style';
/* consts */
import { repCompIds } from './testIds';
import { wDays } from '../../consts/dateConts';

export class RepeatComp extends React.Component {
  render() {
    return (
      <View>
        <View style={repComp.container}>
          <MyCheckBox
            onCheck={() => this.props.onCheck()}
            testID={`${repCompIds.repCheck}${this.props.rem ? 'rem' : ''}`}
            value={this.props.repTask}
            label={this.props.repLabel}
          />
        </View>
        <View>
          {this.props.repTask && this.props.editAll && (
            <View>
              {this.props.weekly && (
                <View style={repComp.repOptsCont}>
                  <RadioButton
                    testID={repCompIds.repPer}
                    onPress={() => this.props.setRepWeekly(false)}
                    label="Periodically"
                    value={!this.props.weeklyRep}
                  />
                  <RadioButton
                    testID={repCompIds.repWeek}
                    onPress={() => this.props.setRepWeekly(true)}
                    label="Weekly"
                    value={this.props.weeklyRep}
                  />
                </View>
              )}
              {this.props.weeklyRep ? (
                <View style={repComp.repContainer}>
                  {wDays.map((day) => (
                    <CircleCheck
                      key={day.key}
                      defValue={this.props.weeklyVals.indexOf(day.title) !== -1}
                      onCheck={() => this.props.onWDayCheck(day.title)}
                      title={day.key}
                    />
                  ))}
                </View>
              ) : (
                <View style={repComp.repContainer}>
                  <Text style={repComp.repText}>Every</Text>
                  <TextInput
                    testID={`${repCompIds.repInp}${
                      this.props.rem ? 'rem' : ''
                    }`}
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
                      testID={repCompIds.repDD}
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
          )}
        </View>
      </View>
    );
  }
}
