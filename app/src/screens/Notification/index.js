import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dana-queue';
import AppStateAction from '../../redux/AppStateRedux/actions';
import { Colors } from '../../themes';

export class Notification extends Component {
  componentDidMount = () => {
    this.props.getNotification();
  };

  renderDivider = () => {
    return <View style={styles.divider} />;
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ padding: 15 }}>
        <View style={styles.flexHorizontal}>
          <View style={styles.iconNoti}>
            <Icon name="ic-notification" color={Colors.primary} size={15} />
          </View>
          <Text style={styles.headerTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <Text style={styles.content} numberOfLines={3}>
          {item.content}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.notificationData}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.renderDivider}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: { height: 1, backgroundColor: '#ccc' },
  headerTitle: { fontWeight: 'bold', paddingBottom: 10, flex: 1 },
  content: { paddingBottom: 10, paddingLeft: 50, paddingRight: 10 },
  flexHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconNoti: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 10
  }
});

function mapStateToProps(state) {
  return {
    notificationData: state.appstate.notificationData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getNotification: () => dispatch(AppStateAction.getNotification())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
