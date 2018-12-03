import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes';
import CloseButton from './CloseButtonForLightBox';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerContentHeight: 0,
    };
    this.scrollAnimated = new Animated.Value(WINDOW_HEIGHT);
  }

  componentDidMount() {
    setTimeout(() => {
      const { isFull } = this.props;
      this.scrollView.scrollTo({
        x: 0,
        y: isFull ? WINDOW_HEIGHT : WINDOW_HEIGHT * 0.6,
        animated: true,
      });
    }, 50);
  }

  scrollToTop = () => {
    this.scrollView.scrollTo({ x: 0, y: WINDOW_HEIGHT, animated: true });
  };

  onClose = () => {
    const { onClose, componentId } = this.props;
    Navigation.dismissModal(componentId);
    onClose && onClose();
  };

  onContentLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    if (height < WINDOW_HEIGHT - 64) {
      this.setState({ footerContentHeight: WINDOW_HEIGHT - height - 70 });
    }
  };

  renderFooter() {
    const { renderFooter, isFull } = this.props;
    const bottom = this.scrollAnimated.interpolate({
      inputRange: [0, 200, isFull ? WINDOW_HEIGHT - 300 : WINDOW_HEIGHT / 2, 9999],
      outputRange: [-120, -120, 0, 0],
    });
    return (
      <Animated.View style={[styles.footer, styles.row, { marginHorizontal: 20, bottom }]}>
        {renderFooter && renderFooter()}
      </Animated.View>
    );
  }

  render() {
    const { children, renderHeader } = this.props;
    const { footerContentHeight } = this.state;
    const backgroundColor = this.scrollAnimated.interpolate({
      inputRange: [-9999, 0, WINDOW_HEIGHT, 9999],
      outputRange: [
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0.9)',
        'rgba(0, 0, 0, 0.9)',
      ],
    });
    return (
      <Animated.View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView
            decelerationRate={0.99}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollAnimated } } },
            ])}
            automaticallyAdjustContentInsets={false}
            bounces={false}
            ref={ref => {
              this.scrollView = ref;
            }}
            onTouchEnd={() => {
              if (this.scrollAnimated._value < WINDOW_HEIGHT - 50) {
                this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
                setTimeout(() => {
                  this.onClose();
                }, 200);
              }
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            stickyHeaderIndices={[1]}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.onClose();
              }}
            >
              <Animated.View style={{ height: WINDOW_HEIGHT, backgroundColor }} />
            </TouchableWithoutFeedback>
            <View>
              <CloseButton scrollAnimated={this.scrollAnimated} onClose={this.onClose} />
              <View style={styles.topSperator} />
              <View style={{ backgroundColor: 'white' }}>{renderHeader && renderHeader()}</View>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1 }} onLayout={this.onContentLayout}>
              <View style={styles.backgroundContent} />
              {children}
            </View>
            <View style={{ height: footerContentHeight, zIndex: -99 }} />
          </ScrollView>
        </View>
        {this.renderFooter()}
      </Animated.View>
    );
  }
}

Popup.propTypes = {
  componentId: PropTypes.string,
  onClose: PropTypes.func,
  renderFooter: PropTypes.func,
  children: PropTypes.node,
  isFull: PropTypes.bool,
  renderHeader: PropTypes.func,
};

Popup.defaultProps = {};

const { width, height } = Dimensions.get('window');
const WINDOW_HEIGHT = height;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'transparent',
  },
  topSperator: {
    width,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.default,
  },
  backgroundContent: {
    backgroundColor: Colors.default,
    position: 'absolute',
    height,
    width,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footer: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 30,
  },
});
