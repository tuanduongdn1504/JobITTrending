import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../themes';

const AppLogo = ({ style }) => {
  return <Image resizeMode="contain" style={[styles.container, style]} source={Images.appLogo} />;
};
AppLogo.propTypes = {
  style: PropTypes.any,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 3,
    height: ((width / 3) * 528) / 424,
  },
});

export default AppLogo;
