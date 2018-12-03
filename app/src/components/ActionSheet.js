import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../themes';

const MAX_HEIGHT = Dimensions.get('window').height * 0.8;

class ActionSheet extends React.Component {
  constructor(props) {
    super(props);
    this.scrollEnabled = true;
    this.translateY = MAX_HEIGHT;
    this.state = {
      visible: false,
    };
    this.sheetAnim = new Animated.Value(this.translateY);
  }

  onLayout = event => {
    const { height } = event.nativeEvent.layout;
    this.translateY = height;
  };

  show = () => {
    this.setState({ visible: true }, () => {
      this.showSheet();
    });
  };

  showSheet = () => {
    Animated.timing(this.sheetAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  hide = () => {
    this.hideSheet(() => {
      this.setState({ visible: false }, () => {});
    });
  };

  hideSheet(callback) {
    Animated.timing(this.sheetAnim, {
      toValue: this.translateY,
      duration: 250,
    }).start(callback);
  }

  renderTitle() {
    const { title } = this.props;
    if (!title) return null;
    return (
      <View style={styles.titleBox}>
        {React.isValidElement(title) ? title : <Text style={styles.titleText}>{title}</Text>}
      </View>
    );
  }

  render() {
    const { visible } = this.state;
    const { children } = this.props;
    return (
      <Modal visible={visible} animationType="none" transparent onRequestClose={this.hide}>
        <View style={styles.wrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.overlay}
            onPress={this.hide}
          >
            <View style={styles.overlay} />
          </TouchableHighlight>
          <Animated.View
            style={[styles.body, { transform: [{ translateY: this.sheetAnim }] }]}
            onLayout={this.onLayout}
          >
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.borderBtnClose}
              onPress={this.hide}
            >
              <View style={styles.btnClose} />
            </TouchableHighlight>
            <View style={styles.content}>
              {this.renderTitle()}
              {children}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

ActionSheet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

ActionSheet.defaultProps = {};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  borderBtnClose: {
    backgroundColor: 'transparent',
    height: 30,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnClose: {
    width: 50,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.default,
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor: Colors.blur + 40,
    flex: 1,
  },
  body: {
    maxHeight: MAX_HEIGHT,
  },
  content: {
    backgroundColor: Colors.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleBox: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.default,
  },
  titleText: {
    color: Colors.dark,
    fontSize: 14,
  },
});
export default ActionSheet;
