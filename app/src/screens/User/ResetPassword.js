import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Actions from '../../redux/ForgotPasswordRedux/actions';
import Container from '../../components/Container';

class ForgotPassword extends Component {
  static propTypes = {
    resetPassword: PropTypes.func,
    resetEmail: PropTypes.string,
    verifyToken: PropTypes.string
  };

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.resetPassword')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.newPassword = React.createRef();
    this.confirmPassword = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  confirm = () => {
    const { resetEmail, verifyToken, resetPassword } = this.props;
    const newPassword = this.newPassword.getText();
    const confirmPassword = this.confirmPassword.getText();
    if (newPassword && confirmPassword) {
      const data = {
        password: newPassword,
        confirmPassword,
        email: resetEmail,
        verify_token: verifyToken
      };
      resetPassword(data);
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

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.newPassword = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="password"
        secureTextEntry
        onSubmitEditing={() => this.focusNextField('confirmPassword')}
        returnKeyType="next"
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.password.newPassword')}
        validateMessage={I18n.t('error.password')}
      />
      <InputRow
        ref={ref => {
          this.confirmPassword = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="password"
        secureTextEntry
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.password.confirmPassword')}
        style={styles.input}
        validateMessage={I18n.t('error.password')}
      />
    </View>
  );

  render() {
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView>
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
    marginHorizontal: 16,
    marginTop: 40
  },
  groupInput: {
    // marginTop: 40,
  },
  input: {
    marginTop: 15
  },
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
)(ForgotPassword);
