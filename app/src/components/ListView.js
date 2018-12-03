import React, { Component } from 'react';
import { debounce, unionBy } from 'lodash';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import ProgressScreen from './ProgressScreen';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.itemRendered = [];

    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    };
  }
  componentDidMount() {}

  onViewableItemsChanged = e => {
    const { data } = this.props;
    this.itemRendered = unionBy(this.itemRendered, e.viewableItems, 'key');
    if (this.itemRendered.length > data.length - 2) {
      this.props.loadMore();
    }
  };

  onRefresh = () => {
    this.itemRendered = [];
    this.props.onRefresh();
  };

  renderFooter = () => {
    const { refreshing, data } = this.props;
    return <View>{refreshing && data.length>0 && <ProgressScreen isFullScreen={false} />}</View>;
  };

  render() {
    const { onRefresh, refreshing } = this.props;
    return (
      <FlatList
        {...this.props}
        onRefresh={
          typeof refreshing !== 'undefined' ? this.onRefresh : undefined
        }
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}
ListView.propTypes = {};

const styles = StyleSheet.create({});

export default ListView;
