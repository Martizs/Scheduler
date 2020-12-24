/* base */
import React from 'react';
import { FlatList, View } from 'react-native';
/* styles */
import { menuStyle } from './style';
/* components */
import { ListItem } from '../../components/ListItem';
/* consts */
import { menuItems } from './consts';

export const ActionMenu = (props) => {
  return (
    <View style={menuStyle.container}>
      <FlatList
        style={menuStyle.list}
        data={menuItems}
        renderItem={({ item, index }) => (
          <ListItem
            testId={item.testId}
            item={item}
            index={index}
            click={() => props.navigate(item.key)}
          />
        )}
      />
    </View>
  );
};
