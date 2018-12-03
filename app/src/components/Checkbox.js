import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';
import Text from './Text';
import Touchable from './Touchable';

const Checkbox = ({
  title, onPress, isChecked, children,
}) => {
  return (
    <View style={styles.row}>
      <Touchable style={styles.txtDateContainer} onPress={onPress}>
        <View style={[styles.checkbox, isChecked && styles.checked]}>
          {isChecked ? (
            <Icon name="ios-checkmark" size={35} color={Colors.default} style={{ marginTop: -3 }} />
          ) : null}
        </View>
      </Touchable>
      <Text type="normal" color={Colors.primaryTextBlur} style={{ flex: 1 }}>
        {title}
      </Text>
      {children}
    </View>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  isChecked: PropTypes.bool,
  children: PropTypes.any,
};

Checkbox.defaultProps = {};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkbox: {
    borderRadius: 5,
    height: 30,
    width: 30,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;
