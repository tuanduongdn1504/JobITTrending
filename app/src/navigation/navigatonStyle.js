import { Platform } from 'react-native';
import { Colors } from '../themes/index';
import { iconsMap } from '../utils/appIcons';
import { styles as TextStyle } from '../components/Text';

export const navigatorHiddenTab = {
  tabBarHidden: true
};

export const navigatorStyle = {
  topBar: {
    visible: true,
    drawBehind: false,
    animate: Platform.OS === 'android',
    hideOnScroll: false,
    // elevation: 0,
    // noBorder: true,
    buttonColor: Colors.titleNav,
    title: {
      fontSize: 17,
      color: Colors.titleNav
    },
    background: {
      color: Colors.default
    },
    largeTitle: {
      visible: false,
      ...TextStyle.largeTitle
    },
    backButton: {
      icon: iconsMap.back,
      visible: true,
      color: Colors.titleNav
    }
  },
  layout: {
    backgroundColor: Colors.background,
    orientation: ['portrait', 'landscape']
  }
};

export const bottomTabs = {
  backgroundColor: Colors.tabBackground,
  visible: true,
  animate: false,
  // currentTabIndex: 0,
  // currentTabId: 'currentTabId',
  // testID: 'bottomTabsTestID',
  drawBehind: false,
  translucent: true,
  hideShadow: false
};
