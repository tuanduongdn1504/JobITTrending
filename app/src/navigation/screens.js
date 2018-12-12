import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Common screen
import InAppNotification from '../screens/Popup/Notification';
import ProgressScreen from '../components/ProgressScreen';
// Intro
import Intro from '../screens/User/Intro';
import SignIn from '../screens/User/SignIn';
import Signup from '../screens/User/Signup';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';
import VerifyPassword from '../screens/User/VerifyPassword';
// tabbar
import Queue from '../screens/Queue';
import Generals from '../screens/Generals';
import SelectDepartment from '../screens/Queue/SelectDepartment';
import Booking from '../screens/Booking';
import BookingDetail from '../screens/Booking/BookingDetail';
import History from '../screens/History';
import HistoryDetail from '../screens/History/HistoryDetail';
import Notification from '../screens/Notification';

export function registerScreens(store, persistor) {
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };
  Navigation.registerComponent(
    'progressScreen',
    () => ProgressScreen,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'intro',
    () => Intro,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'signUp',
    () => Signup,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'queue',
    () => Queue,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'selectDepartment',
    () => SelectDepartment,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'booking',
    () => Booking,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'bookingDetail',
    () => BookingDetail,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'history',
    () => History,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'historyDetail',
    () => HistoryDetail,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'forgotPassword',
    () => ForgotPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'verifyPassword',
    () => VerifyPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'resetPassword',
    () => ResetPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'signIn',
    () => SignIn,
    PersistProvider,
    store
  );

  Navigation.registerComponent(
    'inAppNotification',
    () => InAppNotification,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'generals',
    () => Generals,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'notification',
    () => Notification,
    PersistProvider,
    store
  );
}
