import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Colors from '../themes/Colors';

const ContentItemView = props => {
  return (
    <View style={[styles.ContentItemView, props.style]}>{props.children}</View>
  );
};

ContentItemView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

const styles = StyleSheet.create({
  ContentItemView: {
    // marginVertical: 10,
    // marginHorizontal: 10,
    // backgroundColor: Colors.blur,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  }
});

export default ContentItemView;
