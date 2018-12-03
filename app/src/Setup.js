import { Navigation } from 'react-native-navigation';
import configI18n from './i18n/index';
import { registerScreens } from './navigation/screens';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import Actions from './redux/AppRedux/actions';

const App = () => {
  configI18n();
  const loadStore = async () => {
    return new Promise(resolve => {
      configureStore((store, persistor) => {
        registerScreens(store, persistor);
        resolve(store, persistor);
      });
    });
  };
  const loadIntial = () => {
    return Promise.all([loadStore(), iconsLoaded])
      .then(response => {
        const store = response[0];
        const { token } = store.getState().login;
        global.token = token;
        store.dispatch(Actions.startup());
      })
      .catch(err => {
        console.log(err);
      });
  };

  Navigation.events().registerAppLaunchedListener(async () => {
    await loadIntial();
  });
};

export default App;
