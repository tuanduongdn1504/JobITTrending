/* eslint no-alert: 0 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import { showModal } from '../../navigation/navigationActions/showModal';
import LoginActions from '../../redux/LoginRedux/actions';
import BookingActions from '../../redux/BookingRedux/actions';
import BookingItem from '../../components/Items/BookingItem';
import { push } from '../../navigation/navigationActions';
import { Colors } from '../../themes';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import { iconsMap } from '../../utils/appIcons';
import PushNotification from '../../PushNotification';

class History extends Component {
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
    this.state = {};
  }
  navigationButtonPressed({ buttonId }) {
    this.props.signOut();
  }
  componentWillMount() {
    this.props.getMyBooking(false);
  }
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = e => {};

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

  onPressItem = item => {
    const { componentId } = this.props;
    push(componentId, 'historyDetail', {
      title: 'Chi tiết',
      passProps: {
        item: item
      }
    });
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title} type="headline">
          Lịch sử của bạn
        </Text>
        <View style={styles.vDescription}>
          <View style={styles.description} />
        </View>
      </View>
    );
  }
  renderBody() {
    return <View style={styles.body} />;
  }
  renderItem = ({ item, index }) => {
    return <BookingItem onPress={() => this.onPressItem(item)} item={item} />;
  };

  render() {
    const { bookingList, loading, loginData } = this.props;
    return (
      <Container style={styles.container}>
        {this.renderHeader()}
        <CheckUpdate />
        <PushNotification />
        <Divider style={styles.divider} />
        <ScrollView>
          {this.renderBody()}
          <FlatList
            style={styles.flatlist}
            keyExtractor={item => `${item.id}`}
            data={_.values(bookingList)}
            onRefresh={this.onRefresh}
            refreshing={loading}
            renderItem={this.renderItem}
            loadMore={this.loadMore}
          />
        </ScrollView>
      </Container>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
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
  btn: {
    margin: 20
  }
});

function mapStateToProps(state) {
  return {
    loading: state.offices.loading,
    bookingList: state.booking.bookingData,
    loginData: state.login.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getMyBooking: isNextPage =>
      dispatch(BookingActions.getMyBooking(isNextPage)),
    signOut: () => dispatch(LoginActions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
