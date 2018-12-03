import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';

const Radio = ({ selected, text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.row}>
        <Icon style={styles.icon} name={selected ? 'md-radio-button-on' : 'md-radio-button-off'} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

class RadiosGroup extends Component {
  state = {
    selected: this.props.initSelected,
  };

  onChange = e => {
    this.setState({ selected: e });
    this.props.onChange && this.props.onChange(e);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.data.map((data, index) => (
          <Radio
            key={index}
            onPress={() => this.onChange(index)}
            selected={index === this.state.selected}
            {...data}
          />
        ))}
      </View>
    );
  }
}

const styles = {
  container: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontWeight: '200',
    fontSize: 17,
    color: Colors.primaryText,
  },
  text: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },
};

export default RadiosGroup;
