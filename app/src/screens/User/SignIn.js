import React, { Component } from 'react';
import { Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/dana-queue';
import { View, StyleSheet, Dimensions } from 'react-native';
import InputBordered from '../../components/InputBordered';
import Container from '../../components/Container';
import { Colors } from '../../themes';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import { Images } from '../../themes';
import AlertMessage from '../../components/AlertMessage/AlertMessageWithRedux';

class SignIn extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('signIn')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { textInputValue: '' };
    this.phoneNumber = React.createRef();
    this.password = React.createRef();
  }

  login = () => {
    const { signIn } = this.props;
    if (this.phoneNumber.getText() && this.password.getText()) {
      const data = {
        phoneNumber: this.phoneNumber.getText(),
        password: this.password.getText()
      };
      signIn(data);
    }
  };

  forgotPass = () => {
    const { componentId } = this.props;
    push(componentId, 'forgotPassword', {
      title: I18n.t('userInfo.password.forgotPassword'),
      leftButtons: [back()]
    });
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  // setDate = newDate => {
  //   this.setState({ chosenDate: newDate });
  // };

  renderInputView = () => {
    return (
      <View style={styles.vInput}>
        <InputBordered
          ref={ref => {
            this.phoneNumber = ref;
          }}
          returnKeyType="next"
          validateType="number"
          onSubmitEditing={() => this.focusNextField('password')}
          validateMessage={I18n.t('error.phoneNumber')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.phone')}
        />
        <InputBordered
          ref={ref => {
            this.password = ref;
          }}
          secureTextEntry
          validateType="password"
          validateMessage={I18n.t('error.password')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderAppLogo = () => {
    return (
      <Image
        source={Images.appLogo}
        resizeMode="contain"
        style={{ width: 131, height: 113, alignSelf: 'center', marginTop: 20 }}
      />
    );
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Text
          type="body3"
          onPress={this.forgotPass}
          style={styles.txtForgotPass}
          color={Colors.primary}
        >
          {`${I18n.t('userInfo.password.forgotPassword')} `}
        </Text>
        <Button
          startColor={Colors.primary}
          endColor={Colors.primary}
          style={styles.btn}
          onPress={this.login}
          buttonTitle={I18n.t('signIn').toLocaleUpperCase()}
        />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollViewUI>
          {this.renderAppLogo()}
          {this.renderInputView()}
          {this.renderButtonGroup()}
          <AlertMessage name="signIn" />
        </KeyboardAwareScrollViewUI>
      </Container>
    );
  }
}
SignIn.propTypes = {
  signIn: PropTypes.func,
  componentId: PropTypes.string
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  vInput: {
    marginHorizontal: 16
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  btn: {
    width: width - 32
  },
  txtForgotPass: {
    marginBottom: 26,
    alignSelf: 'flex-start',
    paddingLeft: 16
  }
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(LoginActions.signIn(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
