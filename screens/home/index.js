/* base */
import React from 'react';
import { View, Text } from 'react-native';
/* styles */
import { screenContainer, textContainer } from '../../styles/generalStyles';
/* consts */
import { homeIds } from './testIds';

export const Home = (props) => {
  return (
    <View style={screenContainer.style} testID={homeIds.homeCont}>
      <Text style={textContainer.style} testID={homeIds.homeTxt}>
        Welcome to the homescreen
      </Text>
    </View>
  );
};
