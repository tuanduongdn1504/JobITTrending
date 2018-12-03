import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../themes';

const Chip = ({
  text, style, onPress = () => {}, color = Colors.default,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.vChipcard,
        style,
        { backgroundColor: color, marginRight: 2, marginBottom: 5 },
        !color
          || (color === Colors.default && {
            borderColor: Colors.divider,
            borderWidth: 1,
          }),
      ]}
    >
      <Text
        style={[
          styles.txtChipcard,
          !color || (color === Colors.default && { color: Colors.primaryText }),
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = {
  vChipcard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 7.8,
    marginRight: 5,
  },
  txtChipcard: {
    color: Colors.default,
  },
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Chip;
