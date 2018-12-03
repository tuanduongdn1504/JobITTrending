import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { menu, add } from '../navigationButtons';
import { navigatorStyle } from '../navigatonStyle';

export const startWithSideMenu = () => {
  const SIDE_MENU_COMPONENT = 'sideMenu';

  const stack = {
    options: {
      topBar: {
        visible: true,
      },
    },
    children: [
      {
        component: {
          id: 'home',
          name: 'home',
          options: _.merge(navigatorStyle, {
            topBar: {
              leftButtons: [menu()],
              rightButtons: [add()],
              title: {
                text: 'Bệnh Viện ABC',
                color: Colors.default,
              },
            },
            // backButton: {
            //   icon: iconsMap.back,
            //   visible: true,
            // },
          }),
        },
      },
    ],
  };

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'sideMenu',
            name: SIDE_MENU_COMPONENT,
          },
        },
        center: {
          stack,
        },
      },
    },
  });
};

export default { startWithSideMenu };
