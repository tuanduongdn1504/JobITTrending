import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dana-queue';

import { Metrics, Colors } from '../../themes';

const ANIMATED_DURATION = 500;
const AUTO_DISMISS_TIMEOUT = 3000;

class DropdownAlert extends Component {
  static propTypes = {
    warnColor: PropTypes.string,
    errorColor: PropTypes.string,
    successColor: PropTypes.string,
    messageNumOfLines: PropTypes.number,
    onClose: PropTypes.func,
    closeInterval: PropTypes.number,
    tapToDismiss: PropTypes.bool
  };

  static defaultProps = {
    tapToDismiss: true,
    onClose: null,
    messageNumOfLines: 3,
    warnColor: Colors.sunYellow,
    errorColor: '#cc3232',
    successColor: '#2B73B6',
    closeInterval: AUTO_DISMISS_TIMEOUT
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      type: '',
      message: '',
      title: '',
      buttonAction: {},
      dismissTime: props.closeInterval,
      isOpen: false,
      tabToDismiss: true
    };
  }

  componentWillUnmount() {
    if (this.closeTimeoutId !== null) {
      clearTimeout(this.closeTimeoutId);
    }
  }

  onClose(action) {
    this.dismiss(this.props.onClose, action || 'programmatic');
  }

  getPropertiesByAlertType = alertType => {
    switch (alertType) {
      case 'SUCCESS': {
        return {
          color: '#0ac896',
          iconName: 'ic-set-up-done'
        };
      }
      case 'ERROR': {
        return {
          color: 'red',
          iconName: 'ic-quick-fail'
        };
      }
      case 'WARN': {
        return {
          color: 'yellow',
          iconName: 'ic-quick-fail'
        };
      }
      default: {
        return {};
      }
    }
  };

  alertWithType = (type, params) => {
    console.log(params);

    const {
      title,
      message,
      buttonAction,
      autoDismissInMiliseconds,
      tapToDismiss
    } = params;
    if (this.validateType(type) === false) {
      return;
    }

    if (this.state.isOpen === true) {
      this.dismiss();
    }

    setTimeout(() => {
      if (this.state.isOpen === false) {
        const timeOutInMiliseconds =
          autoDismissInMiliseconds || this.props.closeInterval;
        this.setState({
          type,
          message,
          title,
          buttonAction,
          isOpen: true,
          tabToDismiss: tapToDismiss || false,
          dismissTime: timeOutInMiliseconds
        });
      }

      this.animate(1);
      if (this.state.dismissTime > 1) {
        this.closeTimeoutId = setTimeout(() => {
          this.onClose('automatic');
        }, this.state.dismissTime);
      }
    }, ANIMATED_DURATION);
  };

  dismiss = (onDismiss, actionStatus, actionButton = {}) => {
    if (this.state.isOpen) {
      if (this.closeTimeoutId != null) {
        clearTimeout(this.closeTimeoutId);
      }
      this.animate(0);
      setTimeout(() => {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          });

          // action: How the alert was dismissed: automatic, programmatic, tap, pan or cancel
          if (onDismiss) {
            const data = {
              type: this.state.type,
              title: this.state.title,
              message: this.state.message,
              actionStatus,
              actionButton
            };
            onDismiss(data);
          }
        }
      }, this.state.duration);
    }
  };

  animate = toValue => {
    Animated.spring(this.state.opacity, {
      toValue,
      duration: ANIMATED_DURATION,
      friction: 9,
      useNativeDriver: Platform.OS === 'ios'
    }).start();
  };

  validateType = type => {
    if (type.length === 0 || type === null) {
      console.warn(
        'Missing DropdownAlert type. Available types: SUCCESS, WARN, ERROR'
      );
      return false;
    }

    if (type !== 'WARN' && type !== 'ERROR' && type !== 'SUCCESS') {
      console.warn(
        'Invalid DropdownAlert type. Available types: SUCCESS, WARN, ERROR'
      );
      return false;
    }

    return true;
  };

  renderIcon() {
    const { iconName, color } = this.getPropertiesByAlertType(this.state.type);
    return (
      <View style={styles.iconContainer}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          <Icon size={30} color="#fff" name={iconName} />
        </View>
      </View>
    );
  }

  renderTitle() {
    const { color } = this.getPropertiesByAlertType(this.state.type);
    return <Text style={[styles.txtTitle, { color }]}>{this.state.title}</Text>;
  }

  renderDescription(text, numberOfLines) {
    if (text && text.length > 0) {
      return (
        <Text style={styles.txtDescription} numberOfLines={numberOfLines}>
          {text}
        </Text>
      );
    }
    return null;
  }

  renderButtons() {
    const { buttonAction } = this.state;
    if (buttonAction && buttonAction.text) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.dismiss(this.props.onClose, 'BUTTON_PRESS', buttonAction);
            }}
            style={styles.actionButton}
          >
            <Text style={styles.txtButton}>{buttonAction.text}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    const { isOpen, opacity, tabToDismiss } = this.state;
    if (isOpen === true) {
      return (
        <Animated.View
          style={[
            styles.absoluteContainer,
            {
              opacity
            }
          ]}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              tabToDismiss && this.dismiss(this.props.onClose, 'TAP');
            }}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popupBackground}>
                {this.renderTitle()}
                {this.renderDescription(
                  this.state.message,
                  this.props.messageNumOfLines
                )}
                {this.renderButtons()}
              </View>
              {this.renderIcon()}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      );
    }
    return null;
  }
}

export default DropdownAlert;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    paddingBottom: Metrics.navBarHeight + 30,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupContainer: {
    paddingTop: 30,
    marginHorizontal: 52,
    backgroundColor: Colors.clear
  },
  popupBackground: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingTop: 52,
    paddingHorizontal: 16
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center'
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: Colors.snow,
    backgroundColor: '#03a9f4',
    alignItems: 'center',
    justifyContent: 'center',
    // iOS
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 1,
    shadowOpacity: 0.4
  },
  txtTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: '#03a9f4',
    textAlign: 'center'
  },
  txtDescription: {
    fontSize: 14,
    padding: 8,
    marginBottom: 24,
    textAlign: 'center',
    color: '#5f5f5f'
  },
  actionButton: {
    height: 35,
    marginBottom: 16,
    paddingHorizontal: 39,
    borderRadius: 80,
    backgroundColor: '#03a9f4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtButton: {
    fontSize: 14,
    color: Colors.snow,
    textAlign: 'center'
  }
});
