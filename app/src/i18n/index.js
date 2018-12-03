import I18n from 'react-native-i18n';
import vi from './vi.json';
// import en from './en.json';
import en from './vi.json';

const TRANSLATIONS = {
  vi,
  en
};

const configI18n = () => {
  // I18n.defaultLocale = 'vi';
  I18n.fallbacks = true;
  I18n.translations = TRANSLATIONS;
  // I18n.trans = key => {
  //   return I18n.t(key);
  // };
};
// export const setupI18n = store => {
//   I18n.trans = key => {
//     const language = store.getState().config.language;
//     return I18n.t(key, { locale: language });
//   };
// };

export default configI18n;
