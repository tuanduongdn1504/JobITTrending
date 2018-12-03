import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text, FlatList, TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './style';

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  initValue: PropTypes.string,
  style: PropTypes.object,
  selectStyle: PropTypes.object,
  optionStyle: PropTypes.object,
  optionTextStyle: Text.propTypes.style,
  sectionStyle: PropTypes.object,
  sectionTextStyle: Text.propTypes.style,
  cancelStyle: PropTypes.object,
  cancelTextStyle: Text.propTypes.style,
  overlayStyle: PropTypes.object,
  cancelText: PropTypes.string
};

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Chọn giá trị',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'Huỷ bỏ'
};

export default class ModalPicker extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.renderChildren = this.renderChildren.bind(this);

    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selected: 'please select'
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initValue != this.props.initValue) {
      this.setState({ selected: nextProps.initValue });
    }
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.name });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false
    });
  }

  open() {
    this.setState({
      modalVisible: true
    });
  }

  renderDivider = () => {
    return <View style={styles.divider} />;
  };

  renderOption = option => {
    return (
      <TouchableOpacity
        key={option.id}
        onPress={() => this.onChange(option.item)}
      >
        <View style={[styles.optionStyle]}>
          <Text style={[styles.optionTextStyle]}>{option.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderOptionList() {
    return (
      <View style={[styles.overlayStyle, this.props.overlayStyle]}>
        <View style={styles.optionContainer}>
          <FlatList
            data={this.props.data}
            renderItem={this.renderOption}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.renderDivider}
          />
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
              >
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <View style={[styles.selectStyle, this.props.selectStyle]}>
        <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>
          {this.state.selected}
        </Text>
        <IonIcons name="ios-arrow-dropdown" color="#9ba4a6" size={25} />
      </View>
    );
  }

  render() {
    const dp = (
      <Modal
        transparent={true}
        ref="modal"
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}
        <TouchableOpacity onPress={this.open} disabled={this.props.isDisable}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;
