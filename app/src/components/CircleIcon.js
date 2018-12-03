import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyle } from '../themes';
import Icon from 'react-native-vector-icons/dana-queue';

export default class CircleIcon extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    fillColor: PropTypes.string,
    borderWidth: PropTypes.number,
    fillWidth: PropTypes.number,
    size: PropTypes.number,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    rotation: PropTypes.number,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    percent: PropTypes.number
  };
  static defaultProps = {
    backgroundColor: Colors.transparent,
    borderWidth: 0.5,
    size: 48,
    iconSize: 24,
    iconColor: Colors.txtDark,
    rotation: 0
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };

  renderArcIcon() {
    const {
      iconName,
      iconSize,
      iconColor,
      fillColor,
      fillWidth,
      style
    } = this.props;
    const {
      percent,
      size,
      borderColor,
      borderWidth,
      backgroundColor,
      rotation,
      onPress
    } = this.props;
    const containerStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center'
    };
    const borderStyle = !borderColor
      ? { borderColor: fillColor, opacity: 0.3, borderWidth: fillWidth }
      : null;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={onPress ? 0.52 : 1}
        style={style}
      >
        <View style={containerStyle}>
          <View
            style={[
              containerStyle,
              styles.arcIcon,
              { borderColor },
              borderStyle
            ]}
          />
          <AnimatedCircularProgress
            size={size}
            width={fillWidth}
            prefill={percent}
            fill={percent}
            rotation={rotation}
            tintColor={fillColor}
            backgroundColor={backgroundColor}
          >
            {fill => (
              <View style={styles.arcIcon}>
                <Icon name={iconName} size={iconSize} color={iconColor} />
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </TouchableOpacity>
    );
  }

  renderCircleIcon() {
    const {
      iconName,
      iconSize,
      iconColor,
      size,
      borderColor,
      borderWidth,
      backgroundColor,
      style,
      onPress
    } = this.props;
    const containerStyle = {
      width: size,
      height: size,
      borderColor,
      borderWidth,
      backgroundColor,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center'
    };
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={onPress ? 0.52 : 1}
        style={[style, containerStyle]}
      >
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  }

  render() {
    const { percent } = this.props;
    if (percent) {
      return this.renderArcIcon();
    }
    return this.renderCircleIcon();
  }
}

const styles = StyleSheet.create({
  arcIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
