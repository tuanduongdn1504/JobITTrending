import { Navigation } from 'react-native-navigation';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
let progressId = null;
export const showProgress = (isShow = true) => {
  if (isShow && !progressId) {
    progressId = 'progressScreen';
    setTimeout(() => {
      Navigation.showModal({
        component: {
          id: 'progressScreen',
          name: 'progressScreen',
          passProps: {},
          options: {
            overlay: {
              interceptTouchOutside: true,
            },
            layout: {
              backgroundColor: 'transparent',
            },
            screenBackgroundColor: 'transparent',
            modalPresentationStyle: 'overFullScreen',
            animations: {
              dismissModal: {
                y: {
                  from: height,
                  to: height,
                },
              },
            },
          },
        },
      });
    });
  } else if (!isShow) {
    progressId && Navigation.dismissModal(progressId);
    progressId = null;
  }
};
