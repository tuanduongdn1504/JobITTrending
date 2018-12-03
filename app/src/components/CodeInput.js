import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 View, Text, TextInput, StyleSheet, Platform,
} from 'react-native';
import { Colors } from '../themes/index';
import { size, type } from '../themes/Fonts';

class CodeInput extends Component {
  static propTypes = {
    numberOfDigit: PropTypes.number,
    prefix: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    secureTextEntry: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.inputRefs = [];
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.inputRefs[0].focus();
  }

  getInputData = () => {
    let strCode = '';
    this.inputRefs.forEach(data => {
      strCode += data._lastNativeText ? data._lastNativeText : '';
    });
    return strCode;
  };

  focusInput = index => {
    this.inputRefs[index].focus();
  };

  renderInput = index => {
    const { numberOfDigit, secureTextEntry } = this.props;
    return (
      <TextInput
        key={index}
        style={[
          styles.cel,
          styles.text,
          {
            borderBottomColor: this.state.currentIndex === index ? Colors.primary : Colors.divider,
          },
        ]}
        ref={ref => {
          this.inputRefs[index] = ref;
        }}
        maxLength={1}
        keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
        underlineColorAndroid="transparent"
        secureTextEntry={secureTextEntry}
        onFocus={() => this.setState({ currentIndex: index })}
        onKeyPress={e => {
          if (
            (!this.inputRefs[index]._lastNativeText
              || this.inputRefs[index]._lastNativeText.length < 1)
            && e.nativeEvent.key === 'Backspace'
          ) {
            index !== 0 && this.focusInput(index - 1);
            return;
          }
          if (e.nativeEvent.key !== 'Backspace' && index + 1 !== numberOfDigit) {
            this.focusInput(index + 1);
          }
        }}
      />
    );
  };

  render() {
    const { numberOfDigit, prefix } = this.props;
    const inputCodeComponents = [];
    for (let i = 0; i < numberOfDigit; i++) {
      inputCodeComponents.push(this.renderInput(i));
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{prefix}</Text>
        {inputCodeComponents}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cel: {
    marginLeft: 5,
    borderBottomColor: Colors.divider,
    borderBottomWidth: 2,
    width: 60,
    height: 50,
  },
  text: {
    fontSize: size.xlarge,
    color: Colors.black,
    fontFamily: type.bold,
    textAlign: 'center',
  },
});

export default CodeInput;
