import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable';

const APP_CONFIG = {
  BASE_URL: Config.BASE_URL,
  ClOUDINARY_API_KEY: Config.ClOUDINARY_API_KEY,
  ClOUDINARY_API_SECRET: Config.ClOUDINARY_API_SECRET,
  ClOUDINARY_CLOUD_NAME: Config.ClOUDINARY_CLOUD_NAME,
  CLOUNDINARY_AVATAR_URL: Config.CLOUNDINARY_AVATAR_URL,
  BING_MAPS_KEY: Config.BING_MAPS_KEY,
  ONE_SIGNAL_APP_ID: Config.ONE_SIGNAL_APP_ID
};

const transformerConfig = {
  whitelistPerReducer: {
    login: ['data', 'token', 'isFirstTime']
  },
  blacklistPerReducer: {
    app: ['loading']
  }
};

export const REDUX_PERSIST = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['app'],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
};

export default APP_CONFIG;
