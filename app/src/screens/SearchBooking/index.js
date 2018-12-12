import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import LoginActions from '../../redux/LoginRedux/actions';
import {
  formatDateTime,
  formatMoney,
  formatDurationTime
} from '../../utils/textUtils';
import { Colors, Metrics } from '../../themes';
import { type, fontWeight } from '../../themes/Fonts';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import { iconsMap } from '../../utils/appIcons';
import PushNotification from '../../PushNotification';
import OfficeActions from '../../redux/OfficeRedux/actions';
import BookingActions from '../../redux/BookingRedux/actions';

class SearchBooking extends Component {
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
      average: 0,
      highest: 0
    };
    this.numerical = React.createRef();
  }
  navigationButtonPressed({ buttonId }) {
    this.props.signOut();
  }

  componentDidMount() {
    // this.props.getOffices();
    // this.props.getCurrentNumerical();
    // const officeId = 1;
    // this.props.getNewCurrentBookingFirebase(officeId);
  }

  renderAverageSalary = () => {
    // const { currentNumerical } = this.props;
    const { average } = this.state;
    return (
      <View style={styles.vInput}>
        <View style={styles.vAverage}>
          <Text style={[styles.textAverage]}>AVERAGE SALARY</Text>
        </View>
        <LinearGradient
          style={{
            height: 48,
            width: width - 40,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
          }}
          colors={[Colors.lightPrimary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.6]}
        >
          <Text type="button" style={{ textAlign: 'center', color: '#fff' }}>
            {/* {currentNumerical && currentNumerical.office.toUpperCase()} */}
            {`$ ${average}/per month`}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  renderHighestSalary = () => {
    // const { currentNumerical, bookingDataNow } = this.props;
    const { highest } = this.state;
    return (
      <View style={styles.bookingInfoContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.textTitleBooking} numberOfLines={2}>
            {'NGÔN NGỮ \n MỚI NHẤT'}
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {/* {bookingDataNow && bookingDataNow.numerical} */}
            Fluter 1.0
          </Text>
        </View>
        <View style={styles.bookingDivider} />
        <View style={styles.subContainer}>
          <Text style={styles.textTitleBooking} numberOfLines={2}>
            {'HIGHEST \n SALARY'}
          </Text>
          <Text type="largeTitle" style={styles.subTextTitle}>
            {/* {formatDurationTime(
              moment.duration(
                moment(currentNumerical && currentNumerical.time).diff(
                  bookingDataNow && bookingDataNow.time
                )
              )
            )} */}
            {highest}$
          </Text>
        </View>
      </View>
    );
  };

  renderTrendingJob = () => {
    // const { numericalRunning } = this.props;
    return (
      <View style={styles.vButton}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.vNumerical]}>Most hired job?</Text>
          <Text
            type="largeTitleBold"
            style={styles.numerical}
            color={Colors.primaryText}
          >
            {/* {`${numericalRunning}`} */}
            PHP
          </Text>
          <Text
            type="largeTitleBold"
            style={styles.numerical}
            color={Colors.primaryText}
          >
            {/* {`${numericalRunning}`} */}
            React-Naive
          </Text>
          <Text
            type="largeTitleBold"
            style={styles.numerical}
            color={Colors.primaryText}
          >
            {/* {`${numericalRunning}`} */}
            AngularJS
          </Text>
          <Text
            type="largeTitleBold"
            style={styles.numerical}
            color={Colors.primaryText}
          >
            {/* {`${numericalRunning}`} */}
            NodeJs
          </Text>
          <Text
            type="largeTitleBold"
            style={styles.numerical}
            color={Colors.primaryText}
          >
            {/* {`${numericalRunning}`} */}
            VueJs
          </Text>
        </View>
      </View>
    );
  };
  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderAverageSalary()}
        {this.renderHighestSalary()}
        {this.renderTrendingJob()}
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <PushNotification />
        {this.renderBody()}
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'grey',
    justifyContent: 'center'
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
    height: 48
  },
  body: {
    flex: 1,
    backgroundColor: Colors.secondaryGray,
    paddingTop: 10
  },
  vAverage: {
    alignItems: 'center'
  },
  textAverage: {
    backgroundColor: 'transparent',
    fontFamily: type.semiBold,
    fontWeight: fontWeight.semibold,
    fontSize: 20,
    color: Colors.primaryText,
    marginTop: 15,
    paddingBottom: 7
  },
  vInput: {
    marginTop: 20,
    paddingHorizontal: 16
  },
  vButton: {
    paddingHorizontal: 16,
    marginTop: 20
  },
  button: {
    width: width - 40,
    marginTop: 20
  },
  btn: {
    margin: 20
  },
  divider: {
    width: width - 140,
    backgroundColor: Colors.blur,
    height: 2,
    marginTop: 30
  },
  vNumerical: {
    margin: 10
  },
  numerical: {
    color: Colors.primary
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
    // loginData: state.login.data,
    // offices: state.offices.officesData,
    // numericalRunning: state.booking.numericalRunning,
    // guessingTime: state.booking.guessingTime,
    // currentNumerical: state.booking.currentNumerical,
    // bookingDataNow: state.booking.bookingDataNow
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(LoginActions.signOut())
    // getOffices: () => dispatch(OfficeActions.getOffices()),
    // bookingSearch: data => dispatch(BookingActions.bookingSearch(data)),
    // getNewCurrentBookingFirebase: officeId =>
    //   dispatch(BookingActions.getNewCurrentBooking(officeId)),
    // runningBookingNumerical: officeId =>
    //   dispatch(BookingActions.runningBookingNumerical(officeId)),
    // getCurrentNumerical: () => dispatch(BookingActions.getCurrentNumerical())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBooking);
