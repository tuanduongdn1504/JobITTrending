import { PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/dana-queue';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../themes';

const navIconSize =
  __DEV__ === false ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ic-history': [20, '#000'],
  'ic-notification': [20, '#000'],
  'ic-quick-time': [20, '#000'],
  'ic-set-time': [20, '#000'],
  'ic-fails': [20, '#000'],
  'ic-done': [20, '#000'],
  'ic-clear': [20, '#000'],
  'ic-calendar': [20, '#000'],
  'ic-quick-done': [20, '#000'],
  'ic-quick-fail': [20, '#000'],
  'ic-send': [20, '#000'],
  'ic-set-up-done': [20, '#000'],
  adjust: [20, '#000', 'fontAwesome'],
  bandcamp: [20, '#000', 'fontAwesome'],
  bitcoin: [20, '#000', 'fontAwesome'],
  compass: [20, '#000', 'fontAwesome'],
  copyright: [20, '#000', 'fontAwesome'],
  codiepie: [20, '#000', 'fontAwesome'],
  cuttlefish: [20, '#000', 'fontAwesome'],
  'pause-circle': [25, '#000', 'fontAwesome'],
  steam: [20, '#000', 'fontAwesome'],
  'stumbleupon-circle': [25, '#000', 'fontAwesome'],
  language: [25, '#000', 'fontAwesome']
};

const iconsMap = {};
const iconsLoaded = new Promise(resolve => {
  new Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][2] === 'fontAwesome'
        ? FontAwesome.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          )
        : Icon.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          )
    )
  )
    .then(sources => {
      Object.keys(icons).forEach((iconName, idx) => {
        iconsMap[iconName] = sources[idx];
      });

      // Call resolve (and we are done)
      resolve(true);
    })
    .catch(err => {
      console.log(err);
    });
});

export { iconsMap, iconsLoaded };
