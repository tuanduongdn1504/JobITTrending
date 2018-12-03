import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { Colors, Images } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import LoginActions from '../../redux/LoginRedux/actions';
import InputBordered from '../../components/InputBordered';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    Navigation.events().bindComponent(this);
  }

  submitData = () => {
    const { password, fullName, email, phoneNumber } = this;
    const { signUp } = this.props;
    if (
      fullName.getText() &&
      email.getText() &&
      password.getText() &&
      phoneNumber.getText()
    ) {
      const data = {
        fullName: fullName.getText(),
        email: email.getText(),
        phoneNumber: phoneNumber.getText(),
        password: password.getText()
      };

      signUp(data);
    }
  };

  onPressTerms = () => {};

  onPressPrivacy = () => {};

  focusNextField(nextField) {
    this[nextField].focus();
  }

  signIn = () => {
    const { componentId } = this.props;
    push(componentId, 'signIn', {
      title: I18n.t('signIn'),
      leftButtons: [back()]
    });
  };

  renderAppLogo = () => {
    return (
      <Image
        source={Images.logo}
        resizeMode="contain"
        style={{ width: 131, height: 113, alignSelf: 'center', marginTop: 10 }}
      />
    );
  };

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <InputBordered
          ref={ref => {
            this.fullName = ref;
          }}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('email')}
          style={{ flex: 1 }}
          placeholder={I18n.t('userInfo.name').toUpperCase()}
        />
        <InputBordered
          ref={ref => {
            this.email = ref;
          }}
          returnKeyType="next"
          keyboardType="email-address"
          validateType="email"
          validateMessage={I18n.t('error.email')}
          onSubmitEditing={() => this.focusNextField('phoneNumber')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.email')}
        />
        <InputBordered
          ref={ref => {
            this.phoneNumber = ref;
          }}
          returnKeyType="next"
          keyboardType="phone-pad"
          validateType="number"
          validateMessage={I18n.t('error.phoneNumber')}
          onSubmitEditing={() => this.focusNextField('password')}
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
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderButtonView = () => {
    const { isEdit } = this.props;
    return (
      <View style={styles.vButton}>
        <Button
          startColor={Colors.primary}
          endColor={Colors.primary}
          style={styles.button}
          onPress={this.submitData}
          buttonTitle={I18n.t('signUp').toLocaleUpperCase()}
        />
      </View>
    );
  };

  renderHeader = () => {
    const { avatar } = this.state;
    return (
      <Avatar
        image={avatar || null}
        setImage={data => this.onChangeValue('avatar', true)(data.uri)}
        circle
      />
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {isEdit && this.renderHeader()}
            {this.renderAppLogo()}
            {this.renderInput()}
            {this.renderButtonView()}
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

Signup.propTypes = {
  isEdit: PropTypes.bool,
  editUser: PropTypes.func,
  signUp: PropTypes.func
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16
  },
  vInput: {
    marginTop: 10,
    paddingHorizontal: 16
  },
  vButton: {
    paddingHorizontal: 16
  },
  button: {
    width: width - 40,
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    width: width - 40
  },
  txtSignup: {
    textAlign: 'center',
    paddingVertical: 14
  }
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
    token: state.login.token
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
