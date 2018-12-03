import React from 'react';
import PropTypes from 'prop-types';
import {
 TouchableWithoutFeedback, Animated, View, Dimensions, StyleSheet,
} from 'react-native';
import { Colors } from '../../themes/index';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  vClose: {
    height: 61,
    marginBottom: -10,
    backgroundColor: 'white',
  },
  iconClose: {
    height: 6,
    width: 31,
    borderRadius: 100,
    backgroundColor: Colors.default,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CloseButton = ({ scrollAnimated, onClose }) => {
  const backgroundColor = scrollAnimated
    ? scrollAnimated.interpolate({
        inputRange: [-9999, 0, height, 9999],
        outputRange: [
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.9)',
          'rgba(0, 0, 0, 0.9)',
        ],
      })
    : 'rgba(0, 0, 0, 0)';
  return (
    <TouchableWithoutFeedback onPress={onClose} style={[styles.vClose, styles.center]}>
      <Animated.View style={[styles.vClose, styles.center, { backgroundColor }]}>
        <View style={styles.iconClose} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func,
  scrollAnimated: PropTypes.object,
};

export default CloseButton;
