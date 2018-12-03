import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';
import Text from './Text';
import Touchable from './Touchable';

const ButtonRightIcon = ({ title, onPress, textColor }) => {
  return (
    <Touchable style={styles.txtDateContainer} onPress={onPress}>
      <View style={styles.row}>
        <Text type="normal" color={textColor} style={{ flex: 1 }}>
          {title}
        </Text>
        <Icon name="ios-arrow-down" size={20} color={Colors.divider} />
      </View>
    </Touchable>
  );
};

ButtonRightIcon.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
};

ButtonRightIcon.defaultProps = {
  textColor: Colors.divider,
};

const styles = StyleSheet.create({
  row: {
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonRightIcon;
