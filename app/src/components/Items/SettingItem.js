import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/index';
import Text from '../Text';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    color: Colors.primaryText,
    flex: 2,
  },
  subTitle: {
    color: Colors.primaryTextBlur,
    flex: 3,
    marginRight: 6,
    textAlign: 'right',
  },
  icon: {
    color: Colors.primary,
    fontSize: 16,
  },
};

const SettingItem = ({
 onPress, noBottomBorder, title, subTitle, unShowArrow, color,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          noBottomBorder && {
            borderBottomWidth: 0,
            borderBottomColor: Colors.primaryText,
          },
        ]}
      >
        <Text type="body2" style={[styles.txtTitle, { color }]}>
          {title}
        </Text>
        {subTitle && (
          <Text numberOfLines={1} type="body2" style={styles.subTitle}>
            {subTitle}
          </Text>
        )}
        {!unShowArrow && <Icon name="ios-arrow-forward" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

SettingItem.propTypes = {
  onPress: PropTypes.func,
  noBottomBorder: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  unShowArrow: PropTypes.bool,
  color: PropTypes.string,
};

export default SettingItem;
