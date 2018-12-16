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
import { Colors, Metrics } from '../../themes';
import { type } from '../../themes/Fonts';
import Text from '../../components/Text';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Divider from '../../components/Divider';
import ModalPicker from '../../components/ModalPicker/ModalPicker';
import AlertMessage from '../../components/AlertMessage/AlertMessageWithRedux';

class ComparisonDetail extends Component {
  static options() {
    return {
      topBar: {}
    };
  }
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      jobOne: 'ENOUVO IT SOLUTIONS',
      jobTwo: 'IOT',
      salaryOne: '1500',
      locationOne: 'Danang',
      salaryTwo: '1000',
      locationTwo: 'HaNoi'
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
    const { procedure } = this.state;
    if (procedure !== null) {
      const data = { officeId: 1, procedureId: procedure.id };
      this.props.bookingNow(data);
    } else
      showInAppNoti(
        'ERROR',
        'Hãy chọn đầy đủ nội dung trước khi lấy số!',
        'error'
      );
  };

  renderInput = () => {
    const { offices, officeTypes, procedures } = this.props;
    return (
      <View style={styles.bookingInfoContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.textTitleBooking} numberOfLines={2}>
            {this.state.jobOne.toLocaleUpperCase()}
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {this.state.salaryOne}$
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {this.state.locationOne}
          </Text>
        </View>
        <View style={styles.bookingDivider} />
        <View style={styles.subContainer}>
          <Text style={styles.textTitleBooking} numberOfLines={2}>
            {this.state.jobTwo.toLocaleUpperCase()}
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {this.state.salaryTwo}$
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {this.state.locationTwo}
          </Text>
        </View>
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
          OVERVIEW OF COMPARISON
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
        {/* {this.renderButtonView()} */}
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
  },
  bookingInfoContainer: {
    width: Metrics.screenWidth * 0.92,
    height: 200,
    flexDirection: 'row',
    marginTop: 30,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  textTitleBooking: {
    paddingHorizontal: 5,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold'
  },
  subTextTitle: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
    color: Colors.primary
  },
  bookingDivider: { width: 1, backgroundColor: '#000', marginVertical: 10 }
});

function mapStateToProps(state) {
  return {
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
)(ComparisonDetail);
