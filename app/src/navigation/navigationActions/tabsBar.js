import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';
import { Images, Fonts } from '../../themes';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'generals',
      title: 'Generals',
      icon: iconsMap['ic-quick-done'],
      screen: 'generals',
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
      label: 'trending',
      title: 'Trending',
      icon: iconsMap['stumbleupon-circle'],
      screen: 'trending',
      options: {
        ...navigatorStyle,
        buttonColor: 'black',
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            icon: { uri: Images.priceTag },
            text: 'TRENDING',
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
      label: 'comparison',
      title: 'Comparison',
      icon: iconsMap['pause-circle'],
      screen: 'comparison',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            text: 'COMPARISON',
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
      label: 'jobStatistic',
      title: 'Job Statistic',
      icon: iconsMap['steam'],
      screen: 'jobStatistic',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            text: 'JOB STATISTIC',
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
      label: 'booking',
      title: 'Booking',
      icon: iconsMap['ic-send'],
      screen: 'booking',
      options: {
        ...navigatorStyle,
        buttonColor: 'black',
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          drawBehind: true,
          title: {
            icon: { uri: Images.priceTag },
            text: 'BOOKING',
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
    }
    // {
    //   label: 'history',
    //   title: 'Thông báo',
    //   icon: iconsMap['ic-notification'],
    //   screen: 'notification',
    //   options: {
    //     ...navigatorStyle,
    //     topBar: {
    //       ...navigatorStyle.topBar,
    //       visible: true,
    //       drawBehind: true,
    //       title: {
    //         text: 'THÔNG BÁO',
    //         color: '#FF671B',
    //         fontSize: 20
    //       }
    //     },
    //     badge: '2',
    //     backButton: {
    //       icon: iconsMap['ic-done'],
    //       visible: true
    //     }
    //   }
    // }
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
