import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Modal } from 'react-native';
import ProgressScreen from './ProgressScreen';
import { Colors } from '../themes';

const Container = ({ children, style, loading, center }) => {
  return (
    <View style={[styles.container, center && styles.center, style]}>
      {children}
      {loading && (
        <Modal visible animationType="none" transparent>
          <ProgressScreen />
        </Modal>
      )}
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  style: PropTypes.any,
  center: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(
  state => {
    return {
      loading: state.app.loading
    };
  },
  {}
)(Container);
