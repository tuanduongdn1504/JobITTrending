import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/dana-queue';
import { HeaderTitle } from './Text';
import Colors from '../themes/Colors';

const HeaderGroup = props => {
  return (
    <View>
      <View style={styles.textLine}>
        {props.leftIcon && (
          <Icon
            name={props.leftIcon}
            size={25}
            color={Colors.primary}
            style={styles.leftIcon}
          />
        )}
        <HeaderTitle>{props.leftText}</HeaderTitle>
        <HeaderTitle style={styles.txtDescription}>
          {props.rightText}
        </HeaderTitle>
      </View>
      <View style={styles.blackLine} />
    </View>
  );
};

HeaderGroup.propTypes = {
  rightText: PropTypes.string,
  leftText: PropTypes.string,
  leftIcon: PropTypes.string
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  textLine: {
    flexDirection: 'row',
    padding: 15
  },
  blackLine: {
    backgroundColor: Colors.darkBackground,
    width: width - 32,
    height: 1,
    alignSelf: 'center'
  },
  leftIcon: {
    marginRight: 10
  },
  txtDescription: {
    textAlign: 'right',
    color: Colors.grey,
    flex: 1
  }
});

export default HeaderGroup;
