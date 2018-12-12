import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';
import { Images, Fonts } from '../../themes';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'queue',
      title: 'Đăng kí nhanh',
      icon: iconsMap['ic-quick-time'],
      screen: 'queue',
      options: {
        ...navigatorStyle,
        buttonColor: 'black',
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            icon: { uri: Images.priceTag },
            text: 'ĐĂNG KÍ NHANH',
            color: '#FF671B',
            fontSize: 20
            // fontFamily: Fonts.type.bold
          }
        },
        backButton: {
          icon: iconsMap.back,
          visible: true
        },
        largeTitle: {
          visible: true,
          fontSize: 30,
          color: 'red',
          fontFamily: 'Helvetica'
        }
      }
    },
    {
      label: 'booking',
      title: 'Đặt lịch hẹn',
      icon: iconsMap['ic-set-time'],
      screen: 'booking',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            text: 'ĐẶT LỊCH HẸN',
            color: '#FF671B',
            fontSize: 20
          }
        },
        backButton: {
          icon: iconsMap.back,
          visible: true
        }
      }
    },
    {
      label: 'search',
      title: 'My Booking',
      icon: iconsMap['ic-calendar'],
      screen: 'searchBooking',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          // noBorder: true,
          title: {
            text: 'GENERALS',
            color: '#FF671B',
            fontSize: 20
          }
        },
        backButton: {
          icon: iconsMap['ic-done'],
          visible: true
        }
      }
    },
    {
      label: 'history',
      title: 'Lịch sử',
      icon: iconsMap['ic-history'],
      screen: 'history',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            text: 'TRA CỨU',
            color: '#FF671B',
            fontSize: 20
          }
        },
        backButton: {
          icon: iconsMap['ic-done'],
          visible: true
        }
      }
    },
    {
      label: 'history',
      title: 'Thông báo',
      icon: iconsMap['ic-notification'],
      screen: 'notification',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            text: 'THÔNG BÁO',
            color: '#FF671B',
            fontSize: 20
          }
        },
        badge: '2',
        backButton: {
          icon: iconsMap['ic-done'],
          visible: true
        }
      }
    }
  ];

  const childrens = Tabs.map(data => ({
    stack: {
      children: [
        {
          component: {
            name: data.screen,
            options: {
              ...data.options
            }
          }
        }
      ],
      options: {
        bottomTabs: {
          drawBehind: false,
          translucent: true,
          hideShadow: false
        },
        bottomTab: configTab(data)
      }
    }
  }));

  Navigation.setRoot({
    root: {
      options: navigatorStyle,
      bottomTabs: {
        children: childrens,
        options: {
          // bottomTabs,
        }
      }
    }
  });
};

const configTab = data => ({
  title: data.title,
  icon: data.icon,
  text: data.title,
  // badge: '2',
  // badgeColor: 'red',
  textColor: Colors.secondaryText,
  iconColor: Colors.secondaryText,
  selectedIconColor: Colors.primary,
  selectedTextColor: Colors.primary,
  fontSize: 10,
  drawBehind: false
});
