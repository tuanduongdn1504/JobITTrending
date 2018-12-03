import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
import { styles as TextStyle } from '../../components/Text';

export const showModal = (screen, config, navHidden = false, showStack = true) => {
  const component = {
    // id: screen,
    name: screen,
    passProps: config.passProps,
    options: {
      overlay: {
        interceptTouchOutside: true,
      },
      topBar: {
        visible: !navHidden,
        drawBehind: navHidden,
        leftButtons: config.leftButtons,
        rightButtons: config.rightButtons,
        background: {
          color: Colors.default,
        },
        title: {
          text: config.title,
          color: Colors.default,
        },
        largeTitle: {
          visible: config.largeTitle !== false,
          ...TextStyle.largeTitle,
        },
        noBorder: true,
      },
      layout: {
        backgroundColor: showStack ? Colors.default : 'transparent',
      },
      screenBackgroundColor: showStack ? Colors.default : 'transparent',
      modalPresentationStyle: showStack ? undefined : 'overFullScreen',
    },
  };
  Navigation.showModal(
    showStack
      ? {
        stack: {
          children: [{ component }],
        },
      }
      : { component },
  );
};
