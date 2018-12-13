import React, { Component } from 'react';
import { View } from 'react-native';
import CodePush from 'react-native-code-push';

export default class CheckUpdate extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    !__DEV__
      && CodePush.sync(
        {
          checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
          installMode: CodePush.InstallMode.IMMEDIATE,
          updateDialog: false,
          appendReleaseDescription: true,
        },
        (status) => {
          switch (status) {
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              break;
            default:
              break;
          }
        },
        ({ receivedBytes, totalBytes }) => {
          const downloadProgress = Math.round((receivedBytes / totalBytes) * 100);
          // this.setState({
          //   downloadProgress,
          // });
          console.log('downloadProgress', downloadProgress);
        },
      );
  }

  render() {
    return <View />;
  }
}
