import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { showModal } from '../../navigation/navigationActions';
import SearchInput from '../../components/SearchInput';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { hasNotch } from '../../utils/tools';

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animatedSearch = new Animated.Value(0);
  }

  blurSearch = () => {
    this.setState({ isShowSearch: false }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 0,
        duration: 400
      }).start();
    });
    Navigation.dismissOverlay('searchResults');
  };

  focusSearch = () => {
    const { parentComponentId } = this.props;
    this.setState({ isShowSearch: true }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 1,
        duration: 400
      }).start();
    });
    Navigation.showOverlay({
      component: {
        id: 'searchResults',
        name: 'searchResults',
        passProps: {
          parentComponentId,
          blurSearch: this.blurSearch
        },
        options: {
          overlay: {
            interceptTouchOutside: false
          }
        }
      }
    });
  };

  onChangeSearch = text => {
    const { searchTutor } = this.props;
    searchTutor(text);
  };

  showFilter = () => {
    showModal('filter', {}, false, false);
  };

  render = () => {
    const scale = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const left = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0]
    });
    const searchBackground = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
    });
    const { isShowSearch } = this.state;
    return (
      <Animated.View
        style={[
          styles.iconSearch,
          {
            backgroundColor: searchBackground
          }
        ]}
      >
        <Animated.View style={[styles.iconFilter, { transform: [{ scale }] }]}>
          <Button
            isShadow
            ionicons="ios-options"
            endColor={Colors.default}
            startColor={Colors.default}
            onPress={this.showFilter}
            iconColor={Colors.primaryText}
            iconStyle={{ marginRight: 0 }}
            style={styles.btnFilter}
          />
        </Animated.View>
        <Animated.View style={[styles.searchContent, { left }]}>
          <SearchInput
            isShadow={!isShowSearch}
            isFocus={isShowSearch}
            onClose={this.blurSearch}
            onChange={this.onChangeSearch}
            style={styles.search}
            unFocusBackground={Colors.default}
          />
          {!isShowSearch && (
            <TouchableWithoutFeedback
              style={styles.mask}
              onPress={this.focusSearch}
            >
              <View style={styles.mask} />
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </Animated.View>
    );
  };
}

FilterBar.propTypes = {
  searchTutor: PropTypes.func,
  parentComponentId: PropTypes.string
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnFilter: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  iconFilter: {
    width: 50,
    height: 50,
    marginLeft: 16
  },
  iconSearch: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    paddingTop: hasNotch ? 45 : 30
  },
  searchContent: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: hasNotch ? 45 : 30
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

export default FilterBar;
