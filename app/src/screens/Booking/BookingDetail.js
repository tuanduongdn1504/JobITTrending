/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import Button from '../../components/Button';
import I18n from 'react-native-i18n';
import { showInAppNoti } from '../../navigation/navigationActions/showInAppNotification';
import { showModal } from '../../navigation/navigationActions/showModal';
import {
  getDataArr,
  enabledLoadMore,
  getOfficeArr,
  getProcedureArr
} from '../../redux/crudCreator/selectors';
import OfficesActions from '../../redux/OfficeRedux/actions';
import OfficeTypesActions from '../../redux/OfficeTypeRedux/actions';
import ProceduresActions from '../../redux/ProcedureRedux/actions';
import LoginActions from '../../redux/LoginRedux/actions';
import BookingActions from '../../redux/BookingRedux/actions';
import { Colors } from '../../themes';
import { type } from '../../themes/Fonts';
import Text from '../../components/Text';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Divider from '../../components/Divider';
import ModalPicker from '../../components/ModalPicker/ModalPicker';
import AlertMessage from '../../components/AlertMessage/AlertMessageWithRedux';

class BookingDetail extends Component {
  static options() {
    return {
      topBar: {}
    };
  }
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      area: null,
      office: null,
      procedure: null,
      numberOfTrades: this.props.numberOfTrades,
      language: null,
      company: null
    };
    this.reason = React.createRef();
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = e => {
    this.props.getOfficeTypes();
  };

  showNoti = () => {
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

  submitData = () => {
    const { procedure, company } = this.state;
    if (company !== null) {
      const data = { officeId: 1, procedureId: 2 };
      this.props.bookingNow(data);
    } else
      showInAppNoti(
        'ERROR',
        'Hãy chọn đầy đủ nội dung trước khi lấy số!',
        'error'
      );
  };

  renderInput = () => {
    const { language, company } = this.props;
    return (
      <View style={styles.vInput}>
        <Text style={[styles.placeholder]}>Job Title</Text>
        <ModalPicker
          data={language} // dummy
          animationType="fade"
          initValue="Bạn có thể chọn Job Title"
          onChange={option => {
            this.setState({ language: option, company: null });
            // this.props.fetchOfficesByOfficeTypeId({ company: option.id });
          }}
          selectTextStyle={this.state.language && { color: Colors.primaryText }}
        />
        <Text style={[styles.placeholder]}>Company Name</Text>
        <ModalPicker
          data={company} // dummy
          animationType="fade"
          initValue={
            !this.state.language
              ? 'Hãy chọn Job Title ở trên!'
              : 'Bạn có thể chọn Company'
          }
          onChange={option => {
            this.setState({ company: option });
          }}
          isDisable={!this.state.language}
          selectStyle={
            !this.state.language && {
              backgroundColor: Colors.backgroundNavGradient
            }
          }
          selectTextStyle={this.state.company && { color: Colors.primaryText }}
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
        <Button
          startColor={Colors.primary}
          endColor={Colors.primary}
          style={styles.button}
          onPress={this.submitData}
          buttonTitle={I18n.t('button.submit').toLocaleUpperCase()}
        />
        <Text
          type="body3"
          style={styles.txtSignup}
          color={Colors.primaryText}
        />
      </View>
    );
  };
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title} type="headline">
          INPUT APPLY CONTENT
        </Text>
        <View style={styles.vDescription}>
          <View style={styles.description}>
            <Text type="headline2">Bước 2</Text>
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
        <View style={{ backgroundColor: Colors.default, height: 180 }} />
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
        {/* <AlertMessage name="submit" />; */}
      </Container>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50
  },
  header: {
    width: '100%',
    paddingTop: 3,
    paddingBottom: 8,
    backgroundColor: Colors.titleNav,
    flexDirection: 'row'
  },
  title: {
    position: 'absolute',
    top: 20,
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
    language: [
      { name: 'React-Native', salary: 2000, location: 'HCM' },
      { name: 'PHP', salary: 2000, location: 'HCM' },
      { name: 'AngularJs', salary: 2000, location: 'HCM' },
      { name: 'Swift', salary: 2000, location: 'HCM' },
      { name: 'Android', salary: 2000, location: 'HCM' },
      { name: 'Python', salary: 2000, location: 'HCM' },
      { name: '.Net', salary: 2000, location: 'HCM' },
      { name: 'Machine Learning', salary: 2000, location: 'HCM' },
      { name: 'Swift', salary: 2000, location: 'HCM' },
      { name: 'Tester', salary: 2000, location: 'HCM' }
    ],
    company: [
      { name: 'ENOUVO IT SOLUTIONS', salary: 1000, location: 'danang' },
      { name: 'BAP', salary: 1000, location: 'danang' },
      { name: 'Green Global', salary: 1000, location: 'danang' },
      { name: 'CES', salary: 1000, location: 'danang' },
      { name: 'IOT', salary: 1000, location: 'danang' },
      { name: 'MGM', salary: 1000, location: 'danang' },
      { name: 'Axon active', salary: 1000, location: 'danang' },
      { name: 'DAC', salary: 1000, location: 'danang' }
    ],
    officeTypes: state.officeTypes,
    offices: state.offices,
    procedures: state.procedures,
    // loading: state.offices.loading,
    loginData: state.login.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOfficeTypes: () => dispatch(OfficeTypesActions.getOfficeTypes()),
    fetchOfficesByOfficeTypeId: data =>
      dispatch(OfficesActions.fetchOfficesByOfficeTypeId(data)),
    fetchProceduresByOfficeId: data =>
      dispatch(ProceduresActions.fetchProceduresByOfficeId(data)),
    bookingNow: data => dispatch(BookingActions.bookingNow(data)),
    signOut: () => dispatch(LoginActions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingDetail);
