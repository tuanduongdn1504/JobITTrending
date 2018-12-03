import { Navigation } from 'react-native-navigation';

export const toggleSideMenu = (isVisible = true) => {
  Navigation.mergeOptions('sideMenu', {
    sideMenu: {
      left: {
        visible: isVisible,
        enabled: true
      }
    }
  });
};

export const pop = componentId => {
  Navigation.pop(componentId);
};

export const dismissModal = componentId => {
  Navigation.dismissModal(componentId);
};

export const dismissAllModals = () => {
  Navigation.dismissAllModals();
};

Navigation.events().registerNavigationButtonPressedListener(
  ({ buttonId, componentId }) => {
    switch (buttonId) {
      case 'sideMenu':
        toggleSideMenu();
        break;
      case 'back':
        pop(componentId);
        break;
      case 'close':
        dismissModal(componentId);
        break;
      case 'closeAll':
        dismissAllModals();
        break;
      default:
    }
  }
);
