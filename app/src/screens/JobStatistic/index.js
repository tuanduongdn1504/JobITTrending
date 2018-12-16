/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, processColor } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import Button from '../../components/Button';
import I18n from 'react-native-i18n';
import { showModal } from '../../navigation/navigationActions/showModal';
import {
  getDataArr,
  enabledLoadMore,
  getOfficeArr,
  getProcedureArr
} from '../../redux/crudCreator/selectors';
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
import ModalPicker from '../../components/ModalPicker/ModalPicker';
import AlertMessage from '../../components/AlertMessage/AlertMessageWithRedux';
import update from 'immutability-helper';
import LineChart from '../../components/ChartWrapper/LineChart';

class JobStatistic extends Component {
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
      // numberOfTrades: '1',
      // isEdit: false,
      language: null,
      office: null,
      procedure: null,
      numberOfTrades: this.props.numberOfTrades,
      data: {},

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white')
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1
      }
      // visibleRange: {x: {min: 1, max: 2}}
    };
    this.reason = React.createRef();
  }
  navigationButtonPressed({ buttonId }) {
    this.props.signOut();
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: [
                  { x: 4, y: 135 },
                  { x: 5, y: 0.88 },
                  { x: 6, y: 0.77 },
                  { x: 7, y: 105 }
                ],
                label: 'A'
              },
              {
                values: [
                  { x: 4, y: 105 },
                  { x: 5, y: 90 },
                  { x: 6, y: 130 },
                  { x: 7, y: 100 }
                ],
                label: 'B'
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 110 },
                  { x: 6, y: 105 },
                  { x: 7, y: 115 }
                ],
                label: 'C'
              }
            ]
          }
        }
      })
    );
    this.onRefresh();
  }

  onRefresh = e => {
    // this.props.getOfficeTypes();
  };

  onPressLearnMore() {
    this.refs.chart.setDataAndLockIndex({
      dataSets: [
        {
          values: [
            { x: 1, y: 0.88 },
            { x: 2, y: 0.77 },
            { x: 3, y: 105 },
            { x: 4, y: 135 },
            { x: 5, y: 0.88 },
            { x: 6, y: 0.77 },
            { x: 7, y: 105 },
            { x: 8, y: 135 }
          ],
          label: 'A'
        },
        {
          values: [
            { x: 1, y: 90 },
            { x: 2, y: 130 },
            { x: 3, y: 100 },
            { x: 4, y: 105 },
            { x: 5, y: 90 },
            { x: 6, y: 130 },
            { x: 7, y: 100 },
            { x: 8, y: 105 }
          ],
          label: 'B'
        },
        {
          values: [
            { x: 1, y: 110 },
            { x: 2, y: 105 },
            { x: 3, y: 115 },
            { x: 4, y: 110 },
            { x: 5, y: 110 },
            { x: 6, y: 105 },
            { x: 7, y: 115 },
            { x: 8, y: 110 }
          ],
          label: 'C'
        }
      ]
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

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
  // focusNextField(nextField) {
  //   this[nextField].focus();
  // }
  // submitData = () => {
  //   const { componentId } = this.props;
  //   push(componentId, 'bookingDetail', {
  //     // title: 'Đăng kí nhanh',
  //     passProps: {
  //       numberOfTrades: this.state.numberOfTrades
  //     },
  //     leftButtons: [back()]
  //   });
  // };
  // getData = childData => {
  //   this.setState({ numberOfTrades: childData });
  // };

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <Text style={[styles.placeholder]}>Selected Job</Text>
        <ModalPicker
          data={this.props.language}
          animationType="fade"
          initValue="Bạn có thể chọn Job"
          onChange={option => {
            this.setState({ language: option });
            // this.props.fetchOfficesByOfficeTypeId({ OfficeTypeId: option.id });
          }}
          selectTextStyle={this.state.language && { color: Colors.primaryText }}
        />
        {/* <LineChart
          style={styles.chart}
          data={this.state.data}
          chartDescription={{ text: '' }}
          legend={this.state.legend}
          marker={this.state.marker}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          drawGridBackground={false}
          borderColor={processColor('teal')}
          borderWidth={1}
          drawBorders={true}
          autoScaleMinMaxEnabled={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={true}
          pinchZoom={true}
          doubleTapToZoomEnabled={true}
          highlightPerTapEnabled={true}
          highlightPerDragEnabled={false}
          // visibleRange={this.state.visibleRange}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          ref="chart"
          keepPositionOnRotation={false}
          onSelect={this.handleSelect.bind(this)}
          onChange={event => console.log(event.nativeEvent)}
        /> */}
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
            // onPress={this.onPressLearnMore.bind(this)}
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
          STATISTIC ABOUT JOB
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
        {/* <AlertMessage name="submit" />; */}
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
)(JobStatistic);
