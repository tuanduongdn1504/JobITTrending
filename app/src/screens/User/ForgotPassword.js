import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { Colors } from '../../themes';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Actions from '../../redux/ForgotPasswordRedux/actions';
import Container from '../../components/Container';

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  send = () => {
    const { forgotPassword } = this.props;
    if (this.email.getText()) {
      const data = {
        email: this.email.getText()
      };
      forgotPassword(data);
    }
  };

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.forgotPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.forgotPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.email = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="email"
        // onChangeText={this.onChange('email')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.email')}
      />
    </View>
  );

  render() {
    return (
      <Container style={styles.container}>
        {this.renderDescription()}
        {this.renderInput()}
        <Button
          primary
          style={styles.vBtn}
          onPress={this.send}
          buttonTitle={I18n.t('send').toLocaleUpperCase()}
        />
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default,
    paddingHorizontal: 16
  },
  description: {
    paddingTop: 40
  },
  groupInput: {
    marginTop: 20
  },
  vBtn: {
    width: width - 40,
    marginTop: 40
  }
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
