import { Navigation } from 'react-native-navigation';

let inAppComponentId = null;

export const showInAppNoti = (title, content, type) => {
  inAppComponentId && dismissInAppNoti();
  Navigation.showOverlay({
    component: {
      name: 'inAppNotification',
      passProps: {
        title,
        content,
        type,
        onDisplay: (id) => {
          inAppComponentId = id;
        },
      },
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
      },
    },
  });
};

export const dismissInAppNoti = () => {
  inAppComponentId && Navigation.dismissOverlay(inAppComponentId);
  inAppComponentId = null;
};
