import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/dana-queue';
import PropTypes from 'prop-types';
import Text from '../Text';
import Touchable from '../Touchable';
import { Colors } from '../../themes';
const HomeItem = ({ item, onPress }) => {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Text>{item.name}</Text>
      </View>
    </Touchable>
  );
};
HomeItem.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: '#fff'
  }
});

export default HomeItem;
