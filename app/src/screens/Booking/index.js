/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import Button from '../../components/Button';
import I18n from 'react-native-i18n';
import { showModal } from '../../navigation/navigationActions/showModal';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import { Colors } from '../../themes';
import { type } from '../../themes/Fonts';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import InputBordered from '../../components/InputBordered';
import OpenTime from '../../components/OpeningTime';
import { back } from '../../navigation/navigationButtons';
import { iconsMap } from '../../utils/appIcons';

class Booking extends Component {
  static options() {
    return {
      topBar: {
        leftButtons: [
          {
            icon: iconsMap['ic-quick-time'],
            id: 'history',
            color: Colors.primary,
            disableIconTint: false
          }
        ]
      }
    };
  }
  static propTypes = {};

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      numberOfTrades: '1',
      isEdit: false
    };
  }
  navigationButtonPressed({ buttonId }) {
    this.props.signOut();
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = e => {};

  showNoti = () => {
    // showInAppNoti('test', 'hello', 'error');
    this.props.signOut();
  };
  showModal = () => {
    showModal();
  };

  loadMore = e => {
    const { enabledLoadMore, getAllOffices } = this.props;
    if (enabledLoadMore) {
      getAllOffices();
    }
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  submitData = () => {
    const { componentId } = this.props;
    push(componentId, 'bookingDetail', {
      // title: 'Đăng kí nhanh',
      passProps: {
        numberOfTrades: this.state.numberOfTrades
      },
      leftButtons: [back()]
    });
  };
  getData = childData => {
    this.setState({ numberOfTrades: childData });
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
          value={this.props.userName}
          editable={this.state.isEdit}
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
          placeholder={I18n.t('userInfo.email').toUpperCase()}
          value={this.props.userEmail}
          editable={this.state.isEdit}
        />
        <InputBordered
          ref={ref => {
            this.phoneNumber = ref;
          }}
          returnKeyType="next"
          keyboardType="phone-pad"
          validateType="number"
          validateMessage={I18n.t('error.phoneNumber')}
          onSubmitEditing={() => this.focusNextField('phoneNumber')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.phone').toUpperCase()}
          value={this.props.userPhoneNumber}
          editable={this.state.isEdit}
        />
        {/* <Text style={[styles.placeholder]}>
          {I18n.t('screens.numberOfSlot').toUpperCase()}
          {`\n(Hiện tại chỉ có thể xử lí cho cá nhân)`}
        </Text>
        <OpenTime
          passData={this.state.numberOfTrades}
          passFunction={this.getData}
        /> */}
      </View>
    );
  };

  renderButtonView = () => {
    return (
      <View style={styles.vButton}>
        <LinearGradient
          style={{
            height: 50,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 35
          }}
          colors={[Colors.lightPrimary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.6]}
        >
          <Button
            startColor="transparent"
            endColor="transparent"
            style={styles.button}
            onPress={this.submitData}
            buttonTitle={I18n.t('button.next').toLocaleUpperCase()}
          />
          <Text
            type="body3"
            style={styles.txtSignup}
            color={Colors.primaryText}
          />
        </LinearGradient>
      </View>
    );
  };
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title} type="headline">
          INPUT INFORMATION
        </Text>
        <View style={styles.vDescription}>
          <View style={styles.description}>
            <Text type="headline2">Bước 1</Text>
          </View>
        </View>
      </View>
    );
  }
  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderInput()}
        {this.renderButtonView()}
        <View style={{ backgroundColor: Colors.default, height: 125 }} />
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.renderHeader()}
        <CheckUpdate />
        <Divider style={styles.divider} />
        <KeyboardAwareScrollViewUI
          style={{ backgroundColor: Colors.secondaryGray }}
        >
          {this.renderBody()}
        </KeyboardAwareScrollViewUI>
      </Container>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 80
  },
  header: {
    width: '100%',
    paddingTop: 19,
    paddingBottom: 8,
    backgroundColor: Colors.titleNav,
    flexDirection: 'row'
  },
  title: {
    position: 'absolute',
    top: 36,
    left: 16,
    alignItems: 'center'
  },
  vDescription: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 5,
    marginRight: 13
  },
  description: {
    height: 48,
    width: 69,
    borderLeftColor: Colors.divider,
    borderLeftWidth: 2,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 15
  },
  body: {
    flex: 1,
    backgroundColor: Colors.default,
    paddingTop: 10
  },
  placeholder: {
    backgroundColor: 'transparent',
    fontFamily: type.text,
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 15,
    paddingBottom: 7
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
  btn: {
    margin: 20
  }
});

function mapStateToProps(state) {
  return {
    userName: state.login.data && state.login.data.fullName,
    userEmail: state.login.data && state.login.data.email,
    userPhoneNumber: state.login.data && state.login.data.phoneNumber,
    // loading: state.offices.loading,
    loginData: state.login.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(LoginActions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Booking);
