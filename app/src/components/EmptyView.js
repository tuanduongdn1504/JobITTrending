import React from 'react';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Colors } from '../themes';

const EmptyView = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text center color={Colors.secondaryText}>
        {I18n.t(text)}
      </Text>
    </View>
  );
};
EmptyView.propTypes = {
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default EmptyView;
