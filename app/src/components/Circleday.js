import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { Colors } from '../themes';

const { width } = Dimensions.get('window');
let iconMargin = 5;

if (width >= 360) {
  iconMargin = 3;
}

export default class Circleday extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    selected: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };

  render() {
    const { text, selected } = this.props;
    let color;
    let backgroundColor = Colors.secondaryGray;
    if (selected) {
      backgroundColor = Colors.primary;
      color = Colors.default;
    }
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.circleView, { backgroundColor }]}
      >
        <Text style={{ color }}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  circleView: {
    margin: iconMargin,
    height: 40,
    width: 40,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: Colors.borderFakeLight,
    // backgroundColor: Colors.default,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
