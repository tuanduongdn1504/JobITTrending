import React, { Component } from 'react';
import {
  View, TextInput, Animated, Platform, Text, LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';
import { type } from '../themes/Fonts';
import tools from '../utils/tools';

export default class InputRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidate: true,
      value: props.value || props.defaultValue || '',
      placeholderTextColor: props.placeholderTextColor || Colors.placeholderText,
      bounceValue: new Animated.Value(0),
      placeholderTranslateY: new Animated.Value(props.value === '' || !props.value ? 5 : -20),
      placeholderTranslateX: new Animated.Value(props.value === '' || !props.value ? 0 : 0),
      scaleText: new Animated.Value(14),
    };
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      this.input._lastNativeText = this.props.defaultValue;
      this.transformOnFocus();
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  onFocus() {
    this.setState({ placeholderTextColor: this.props.textColor || Colors.primary, isFocus: true });
    this.transformOnFocus();
    this.props.onFocus && this.props.onFocus();
  }

  onBlur = () => {
    const { validateType } = this.props;
    this.props.onBlur && this.props.onBlur();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const isValidate = validate(validateType, this.input._lastNativeText);
    this.setState({ isValidate });
    if (!this.input._lastNativeText || this.input._lastNativeText == '') {
      this.setState({
        isValidate,
        placeholderTextColor: this.props.placeholderTextColor || Colors.divider,
        isFocus: false,
      });
      this.transformOnFocus(false);
    }
  };

  setValue(text) {
    this.setState({ value: text });
    this.transformOnFocus();
  }

  getText() {
    return this.state.isValidate ? this.input._lastNativeText : null;
  }

  transformOnFocus = (mode = true) => {
    const { bounceValue } = this.state;
    Animated.spring(bounceValue, {
      toValue: mode ? 1 : 0,
    }).start();
  };

  renderIcon() {
    return (
      <View style={this.props.multiline ? styles.containerLeftMultil : styles.containerLeft}>
        <Icon
          name={this.props.icon}
          size={25}
          style={[styles.icon, { color: this.props.placeholderTextColor || Colors.divider }]}
        />
      </View>
    );
  }

  renderTextInput() {
    return (
      <View style={[styles.containerRight, { paddingTop: this.props.animatedTitle ? 20 : 0 }]}>
        {this.props.textInputBackgroundStyle && (
          <View style={[styles.textInputBackground, this.props.textInputBackgroundStyle]} />
        )}
        {this.props.animatedTitle && this.renderAnimatedTitle()}
        {this.renderInput()}
      </View>
    );
  }

  renderAnimatedTitle() {
    const { bounceValue, isFocus } = this.state;
    const { icon } = this.props;
    const color = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.placeholderText, Colors.primaryText],
    });
    const placeholderTranslateY = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [5, -20],
    });
    const placeholderTranslateX = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, icon ? -38 : 0],
    });
    const scaleText = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    });

    return (
      <View>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color,
              transform: [
                { translateY: placeholderTranslateY },
                { translateX: placeholderTranslateX },
              ],
              fontSize: scaleText,
              fontWeight: isFocus ? '600' : '400',
            },
          ]}
        >
          {this.props.placeholder}
          {this.props.required && <Text style={[{ color: 'red' }]}> *</Text>}
        </Animated.Text>
      </View>
    );
  }

  renderInput() {
    const {validateType} = this.props;
    return (
      <View>
        <TextInput
          onChangeText={text => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            const isValidate = validate(validateType, text);
            !this.state.isValidate && isValidate && this.setState({isValidate});
            if (checkTypeNumber(this.props.keyboardType)) {
              if (text == '' || !text) return;
              if (checkPhoneType(this.props.keyboardType)) {
                !checkPhone(text) && this.setState({isValidate, value: this.state.value });
                return;
              }
              !checkNumber(text) && this.setState({isValidate, value: this.state.value });
            }
          }}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={this.props.returnKeyType || 'done'}
          keyboardType={this.props.keyboardType}
          blurOnSubmit={!this.props.multiline}
          underlineColorAndroid="transparent"
          multiline={this.props.multiline}
          editable={this.props.editable}
          secureTextEntry={this.props.secureTextEntry}
          ref={ref => {
            this.input = ref;
          }}
          placeholder={this.props.animatedTitle ? '' : this.props.placeholder}
          placeholderTextColor={this.state.placeholderTextColor}
          selectTextOnFocus
          style={[
            styles.textInput,
            {
              color: this.props.textColor || Colors.primaryTextBlur,
              textAlign: this.props.textAlign === 'center' ? 'center' : null,
            },
            this.props.multiline ? { height: 100, marginVertical: 10 } : {},
            this.props.textInputStyle,
          ]}
          value={this.state.value}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          defaultValue={this.props.defaultValue}
          onChange={event => {
            this.setState({ value: event.nativeEvent.text });
            this.props.onChangeText && this.props.onChangeText(event.nativeEvent.text);
          }}
        />
      </View>
    );
  }

  renderUnderLine() {
    return (
      <View>
        <View
          style={[
            styles.separatorRow,
            { top: 1.5, backgroundColor: this.state.placeholderTextColor },
          ]}
        />
        {false && (
          <Animated.View
            style={[
              styles.separatorRow,
              {
                height: 2,
                transform: [{ scaleX: this.state.bounceValue }],
                backgroundColor: Colors.primary,
              },
            ]}
          />
        )}
      </View>
    );
  }

  render() {
    const { validateMessage, underLine, children, icon, style, backgroundColor } = this.props;
    const { isValidate } = this.state;
    return (
      <View ref="containerInput" style={[styles.item, style]}>
        <View style={[styles.containerInputRow, { backgroundColor: backgroundColor }]}>
          {icon && this.renderIcon()}
          {this.renderTextInput()}
          {children}
        </View>
        {underLine && this.renderUnderLine()}
        {!isValidate && (
          <Text type="note" color={Colors.red} style={styles.txtError}>
            {validateMessage}
          </Text>
        )}
      </View>
    );
  }
}

const styles = {
  containerInputRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  item: {
    marginTop: 15,
  },
  containerLeft: {
    width: 38,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  containerLeftMultil: {
    width: 38,
    paddingTop: 3,
    alignItems: 'center',
  },
  containerRight: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    color: Colors.divider,
  },
  textInput: {
    height: 35,
    paddingBottom: 5,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    fontFamily: type.text,
    fontSize: 14,
  },
  separatorRow: {
    height: 1.5,
    backgroundColor: Colors.divider,
  },
  placeholder: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    fontFamily: type.text,
    fontSize: 12,
  },
  textInputBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    bottom: Platform.OS === 'android' ? 0 : 5,
  },
  txtError: {
    color: Colors.red,
    marginTop: 8,
    textAlign: 'left',
  },
};
function checkPhone(num) {
  const re = /^[0-9#+*.,]+$/;
  return re.test(num);
}
function checkPhoneType(type) {
  return type == 'phone-pad';
}

function checkNumber(num) {
  const re = /^[-+]?[0-9]*\.?[0-9]?[0-9]?$/;
  const re1 = /^[-+]?[0-9]*\,?[0-9]?[0-9]?$/;
  return re.test(num) || re1.test(num);
}

function checkTypeNumber(type) {
  return type == 'numeric' || type == 'phone-pad' || type == 'number-pad' || type == 'decimal-pad';
}

const validate = (type, text) => {
  switch (type) {
    case 'email':
      return tools.validateEmail(text);
    case 'password':
      return text && text.length > 5;
    case 'phone':
      return checkPhone(text);
    case 'number':
      return checkNumber(text);
    default:
      return true;
  }
};
