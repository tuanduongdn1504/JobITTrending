import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../themes';

const Divider = props => (
  <View style={[styles.container, props.style && props.style]} />
);
Divider.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};
const styles = StyleSheet.create({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider
  }
});

export default Divider;
