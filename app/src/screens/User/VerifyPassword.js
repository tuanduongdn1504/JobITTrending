import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import CodeInput from '../../components/CodeInput';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Actions from '../../redux/ForgotPasswordRedux/actions';
import Container from '../../components/Container';

class VerifyPassword extends Component {
  static propTypes = {
    verifyPassword: PropTypes.func
  };

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.verifyPassword')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.code = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  confirm = () => {
    const { verifyPassword } = this.props;
    const code = this.code.getInputData();
    if (code) {
      const data = {
        verify_token: code
      };
      verifyPassword(data);
    }
  };

  renderButtonGroup = () => {
    return (
      <Button
        primary
        style={styles.button}
        onPress={this.confirm}
        buttonTitle={I18n.t('confirm').toLocaleUpperCase()}
      />
    );
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.verifyPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.verifyPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <CodeInput
        numberOfDigit={4}
        ref={ref => {
          this.code = ref;
        }}
      />
    </View>
  );

  render() {
    return (
      <Container isLargeTitle style={styles.container}>
        <KeyboardAwareScrollView>
          {this.renderDescription()}
          {this.renderInput()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginTop: 40
  },
  groupInput: {},
  button: {
    width: width - 40,
    marginTop: 40
  }
});

function mapStateToProps(state) {
  return state.password;
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPassword);
