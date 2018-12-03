import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/dana-queue';
import { Colors } from '../themes/index';
import Button from './Button';

export default class SwipperView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.flatlist = React.createRef();
    this.animatedPaging = new Animated.Value(0);
  }

  componentDidMount() {
    const { autoScroll } = this.props;
    autoScroll && this.intevalScroll();
  }

  componentWillUnmount() {
    clearInterval(this.inteval);
  }

  intevalScroll = () => {
    let currentIndex = 0;
    this.inteval = setInterval(() => {
      currentIndex = currentIndex + 1 > 2 ? 0 : currentIndex + 1;
      this.flatlist &&
        this.flatlist.scrollToIndex({
          viewPosition: 0.5,
          index: currentIndex
        });
    }, 3000);
  };

  renderPage = ({ item }) => {
    return item;
  };

  scrollToItem = e => {
    const { selectedIndex } = this.state;
    e.viewableItems.length === 1 &&
      selectedIndex < 4 &&
      Animated.timing(this.animatedPaging, {
        toValue: e.viewableItems[0].index,
        duration: 100
      }).start();
  };

  onJump = index => {
    const { children, next } = this.props;
    if (!(index < children.length)) {
      next && next();
      return;
    }
    if (index < 0 || index > children.length) return;
    this.flatlist.scrollToIndex({ viewPosition: 0.5, index });
  };

  adjustPageSize = () => {
    // this.setState({
    //   width: e.nativeEvent.layout.width,
    // });
  };

  renderPageNumber = () => {
    const { children, next, btnSkip } = this.props;
    const pagingColor = [];
    const pagingRange = [];
    const pagingRadius = [];
    const components = children.map((data, index) => {
      pagingColor.push(
        this.animatedPaging.interpolate({
          inputRange: [-999, index - 1, index, index + 1, 999],
          outputRange: [
            Colors.lightGray,
            Colors.lightGray,
            Colors.primary,
            Colors.lightGray,
            Colors.lightGray
          ]
        })
      );
      pagingRange.push(
        this.animatedPaging.interpolate({
          inputRange: [-999, index - 1, index, index + 1, 999],
          outputRange: [6, 6, 8, 6, 6]
        })
      );
      pagingRadius.push(
        this.animatedPaging.interpolate({
          inputRange: [-999, index - 1, index, index + 1, 999],
          outputRange: [3, 3, 4, 3, 3]
        })
      );
      return (
        <Animated.View
          key={Number(index).toString()}
          style={[
            styles.paggingPoint,
            {
              backgroundColor: pagingColor[index],
              width: pagingRange[index],
              height: pagingRange[index],
              borderRadius: pagingRadius[index]
            }
          ]}
        />
      );
    });
    return (
      <View style={styles.vPagging}>
        {this.renderFooterTitle()}
        <View style={styles.vPointer}>{components}</View>
        {btnSkip && (
          <Button
            backgroundColor={Colors.primary}
            style={styles.btnSkip}
            textStyle={{ color: 'white' }}
            onPress={() => {
              next && next();
            }}
            text="Skip"
          />
        )}
      </View>
    );
  };

  renderFooterTitle = () => {
    const { selectedIndex } = this.state;
    const { children } = this.props;
    if (children[selectedIndex].props.footerTitle) {
      return (
        <View style={styles.vTitleFooter}>
          <Text style={styles.titleFooter}>
            {children[selectedIndex].props.footerTitle.title}
          </Text>
          <Text style={styles.descriptionFooter}>
            {children[selectedIndex].props.footerTitle.description}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  render() {
    const { showArrow, children, style } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={[styles.vFlatList, style]}>
        <FlatList
          ref={ref => {
            this.flatlist = ref;
          }}
          onViewableItemsChanged={this.scrollToItem}
          style={styles.vFlatList}
          horizontal
          pagingEnabled
          directionalLockEnabled
          onLayout={this.adjustPageSize}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          data={children}
          renderItem={this.renderPage}
          keyExtractor={data => {
            return data.key;
          }}
        />
        {showArrow && (
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.onJump(selectedIndex - 1);
            }}
          >
            <View style={styles.btnBack}>
              <Icon name="left" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        {showArrow && (
          <TouchableOpacity
            style={styles.btnNext}
            onPress={() => {
              this.onJump(selectedIndex + 1);
            }}
          >
            <View style={styles.btnNext}>
              <Icon name="right" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        {this.renderPageNumber()}
      </View>
    );
  }
}

SwipperView.propTypes = {
  children: PropTypes.any,
  showArrow: PropTypes.bool,
  style: PropTypes.any,
  btnSkip: PropTypes.bool,
  autoScroll: PropTypes.bool,
  next: PropTypes.func
};

const styles = {
  vFlatList: {
    flex: 1
  },
  vPagging: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  vPointer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paggingPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor: Colors.lightGray
  },
  paggingPointAct: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary
  },
  vTitleFooter: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  titleFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 15,
    color: Colors.secondaryText
  },
  descriptionFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: Colors.secondaryText
  },
  btnSkip: {
    backgroundColor: Colors.darkprimary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 38
  },
  btnNext: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 30
  }
};
