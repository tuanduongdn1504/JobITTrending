import I18n from 'react-native-i18n';
import { iconsMap } from '../utils/appIcons';
import { Colors } from '../themes';

export const menu = () => ({
  id: 'sideMenu',
  icon: iconsMap.user,
  disableIconTint: false,
  color: Colors.primary,
});

export const search = () => ({
  id: 'search',
  icon: iconsMap.search,
  disabled: false,
  disableIconTint: false,
});

export const close = () => ({
  id: 'close',
  icon: iconsMap.close,
  disabled: false,
  disableIconTint: true,
  color: Colors.primary,
});

export const closeAll = () => ({
  id: 'closeAll',
  icon: iconsMap.close,
  disabled: false,
  disableIconTint: true,
  color: Colors.primary,
});

// export const qrcode = () => ({
//   id: 'qrcode',
//   icon: iconsMap.qrcode,
//   disabled: false,
//   disableIconTint: true,
//   color: Colors.primary,
// });

export const send = (disabled = true) => ({
  title: I18n.t('send'),
  id: 'send',
  disabled,
  buttonColor: Colors.primary,
  disableIconTint: true,
});

export const save = (disabled = true) => ({
  title: I18n.t('save'),
  id: 'save',
  disabled,
  buttonColor: Colors.primary,
  disableIconTint: true,
});

export const back = () => ({
  id: 'back',
  icon: iconsMap.back,
  disabled: false,
  disableIconTint: false,
  color: Colors.primary,
});

export const add = () => ({
  id: 'add',
  icon: iconsMap['md-add'],
  disableIconTint: false,
  color: Colors.primary,
});

export const chat = () => ({
  id: 'chat',
  icon: iconsMap.chat,
  disableIconTint: false,
  color: Colors.primary,
});

export const skip = () => ({
  id: 'skip',
  text: I18n.t('userInfo.tutor.skip'),
  disableIconTint: false,
  color: Colors.primary,
});

export const review = () => ({
  id: 'review',
  icon: iconsMap.review,
  disabled: false,
  disableIconTint: false,
  color: Colors.primary,
});
