import React, { Component } from 'react';
import { Text, Animated, TouchableHighlight } from 'react-native';
import { Colors } from '../themes/index';

export default class ShadowBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressButton() {
    const { onPress, data } = this.props;
    onPress && onPress(data);
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.container]}
        underlayColor="transparent"
        onPress={this.props.onPress}
      >
        <Animated.View collapsible={false} style={styles.chipContent}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Text style={[styles.text, { marginLeft: 10 }]} onPress={this.props.cancel}>
            X
          </Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  container: {
    height: 30,
    padding: 5,
    marginVertical: 5,
    marginLeft: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 15,
    paddingRight: 8,
  },
  chipContent: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  icon: {
    color: '#CCCCCC',
  },
};
