import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '../assets/loading.json';

class ProgressScreen extends Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
  }

  componentDidMount() {
    this.loading.play();
  }

  componentWillUnmount() {
    this.loading.reset();
  }

  render() {
    return (
      <View
        style={[
          styles.vProgress,
          this.props.isFullScreen && styles.vFullScreen
        ]}
      >
        <LottieView
          ref={ref => {
            this.loading = ref;
          }}
          source={loading}
          loop
          style={styles.vAnimation}
        />
      </View>
    );
  }
}

ProgressScreen.propTypes = {
  isFullScreen: PropTypes.bool
};

ProgressScreen.defaultProps = {
  isFullScreen: true
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  vProgress: {
    width,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  vFullScreen: {
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  vAnimation: {
    width: 200,
    height: 200
  }
});

export default ProgressScreen;
