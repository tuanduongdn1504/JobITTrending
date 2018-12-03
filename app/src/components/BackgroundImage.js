import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../themes';

const BackgroundImage = () => {
  return <Image resizeMode="cover" style={styles.container} source={Images.background} />;
};
BackgroundImage.propTypes = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },
});

export default BackgroundImage;
