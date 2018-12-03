/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import moment from 'moment';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import { Colors } from '../../themes';
import { type } from '../../themes/Fonts';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import InputBordered from '../../components/InputBordered';

class HistoryDetail extends Component {
  static options() {
    return {
      topBar: {}
    };
  }
  static propTypes = {};

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    const { item } = this.props;

    this.state = {
      editable: false,
      date: moment(item.time).format('DD/MM/YYYY'),
      hour: moment(item.time).format('h'),
      minutes: moment(item.time).format('mm'),
      dayTime: moment(item.time).format('A'),
      organization: item.office,
      address: item.officeType,
      reason: item.procedure
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = e => {};

  renderInput = () => {
    const {
      date,
      hour,
      minutes,
      dayTime,
      organization,
      address,
      reason
    } = this.state;
    return (
      <View style={styles.vInput}>
        <InputBordered
          title={I18n.t('screens.time')}
          multiline
          editable={this.state.editable}
          value={`Cơ quan: ${date}\nThời gian: ${hour} giờ ${minutes} ${
            dayTime === 'AM' ? 'sáng' : 'chiều'
          }`}
          textInputStyle={{ height: 50 }}
        />
        <InputBordered
          title={I18n.t('screens.organization')}
          multiline
          editable={this.state.editable}
          value={`Cơ quan: ${organization}\nĐịa điểm: ${address}`}
          textInputStyle={{ height: 80 }}
        />
        <InputBordered
          title={I18n.t('screens.appointmentContent')}
          multiline
          editable={this.state.editable}
          value={reason}
          textInputStyle={{ height: 110 }}
        />
      </View>
    );
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title} type="headline">
          {I18n.t('screens.appointmentContent')}
        </Text>
        <View style={styles.vDescription}>
          <View style={styles.description}>
            <Text type="headline2">04/02</Text>
          </View>
        </View>
      </View>
    );
  }
  renderBody() {
    return <View style={styles.body}>{this.renderInput()}</View>;
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
    // paddingTop: 50
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
    backgroundColor: Colors.secondaryGray,
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
    // loading: state.offices.loading,
    loginData: state.login.data
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetail);
