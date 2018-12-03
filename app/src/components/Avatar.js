import React from 'react';
import {
 View, TouchableWithoutFeedback, Image, Platform, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images, Colors } from '../themes/index';

export default class Avatar extends React.Component {
  state = {
    avatarSource: this.props.image ? { uri: this.props.image } : null,
    videoSource: null,
  };

  componentWillReceiveProps(newProps) {
    if (this.props.image != newProps.image) {
      this.setState({ avatarSource: newProps.image ? { uri: newProps.image } : null });
    }
  }

  selectPhotoTapped = () => {
    if (this.props.disableSelect) return;
    const options = {
      quality: 1.0,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        if (Platform.OS === 'ios') {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        } else {
          source = { uri: response.uri, isStatic: true };
        }
        this.props.setImage && this.props.setImage(source);

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const { style, circle } = this.props;
    const { avatarSource } = this.state;
    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback
          style={[styles.avatar, { borderRadius: circle ? 75 : 0 }]}
          underlayColor="white"
          onPress={this.selectPhotoTapped}
        >
          <View style={[styles.avatarContainer]}>
            <Image
              onError={() => {
                this.setState({ avatarSource: null });
              }}
              style={[styles.avatar, { borderRadius: circle ? 50 : 0 }]}
              defaultSource={Images.defaultUser}
              source={avatarSource || Images.primary}
            />
            {
              <View style={styles.vIcon}>
                <Icon name="ios-camera" size={15} style={styles.icon} />
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Avatar.propTypes = {
  style: PropTypes.any,
  circle: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
  },
  avatarContainer: {
    borderColor: Colors.default,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.default,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  icon: {
    color: Colors.primary,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
});
