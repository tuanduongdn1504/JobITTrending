import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dana-queue';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet } from 'react-native';
import Touchable from './Touchable';
import Text from './Text';
import Colors from '../themes/Colors';

const Button = ({
  center,
  primary,
  secondary,
  transparent,
  style,
  disabled,
  icon,
  ionicons,
  iconColor,
  iconSize,
  iconStyle,
  fontAwesome,
  entypo,
  textStyle,
  buttonTitle,
  loading,
  onPress,
  start,
  end,
  startColor,
  endColor,
  isShadow,
  wrapperStyle
}) => {
  const innerView = (
    <LinearGradient
      style={[
        styles.buttonWithText,
        center && styles.center,
        primary && { backgroundColor: Colors.primary },
        secondary && { backgroundColor: Colors.secondary },
        transparent && { backgroundColor: 'transparent' },
        isShadow && styles.shadow,
        style,
        disabled && styles.disabledBtt
      ]}
      colors={[startColor, endColor]}
      start={start}
      end={end}
      locations={[0, 1]}
    >
      {icon ? (
        <Icon
          name={icon}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      {ionicons ? (
        <Ionicons
          name={ionicons}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      {fontAwesome ? (
        <FontAwesome
          name={fontAwesome}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      {entypo ? (
        <Entypo
          name={entypo}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      <Text
        type="button"
        style={[
          styles.buttonText,
          textStyle,
          disabled && { color: `${Colors.default}60` }
        ]}
      >
        {buttonTitle}
      </Text>
    </LinearGradient>
  );
  if (loading || disabled) return innerView;
  return (
    <Touchable
      style={[isShadow && styles.shadow, wrapperStyle]}
      onPress={onPress}
    >
      {innerView}
    </Touchable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  icon: PropTypes.string,
  ionicons: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  fontAwesome: PropTypes.string,
  textStyle: PropTypes.any,
  end: PropTypes.object,
  start: PropTypes.object,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  isShadow: PropTypes.bool,
  wrapperStyle: PropTypes.any
};

Button.defaultProps = {
  center: true,
  end: { x: 1, y: 1 },
  start: { x: 0, y: 0 },
  startColor: Colors.lightPrimary,
  endColor: Colors.lightPrimary
};

export default Button;

const styles = StyleSheet.create({
  buttonWithText: {
    marginTop: 0,
    height: 48,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  center: {
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  },
  disabledBtt: {
    backgroundColor: Colors.blur
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4
  }
});
