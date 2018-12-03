import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';

export function startStackScreen(
  screen = 'intro',
  title = '',
  isHaveNav = false
) {
  Navigation.setRoot({
    root: {
      stack: {
        options: navigatorStyle,
        children: [
          {
            component: {
              name: screen,
              options: {
                topBar: {
                  ...navigatorStyle.topBar,
                  visible: isHaveNav,
                  // drawBehind: !isHaveNav,
                  title: {
                    text: title,
                    fontSize: 17,
                    color: Colors.titleNav
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
}

// export function startStackScreen() {
//   const ROOT_SCREEN = 'forgotPassword';
//   // const ROOT_TITLE = 'home';
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: ROOT_SCREEN,
//             },
//           },
//         ],
//       },
//     },
//   });
// }
