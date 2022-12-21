import React from 'react';
import Route from './src/navigation/Route';
import { Provider } from 'react-redux';
import store from './src/redux/stores';
import { LogBox, AppState } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import RNRestart from 'react-native-restart';
import { requestUserPermission, getToken } from './src/utils/pushNotifycation';
import messaging from '@react-native-firebase/messaging';
import { sendNotificationLocal } from './src/utils/pushNotificationLocal';

LogBox.ignoreLogs(['Non-serializable']);
const TIME = 60;

const App = () => {
  const appState = React.useRef(AppState.currentState);
  const timeRef = React.useRef(TIME);
  let id;

  React.useEffect(() => {

    const checkPermission = async () => {
      requestUserPermission();
      await getToken();
    };

    checkPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async (remoteMessage) => {
      sendNotificationLocal(remoteMessage);
    });

    return () => {
      foreground();
    };
  }, []);


  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/active/) &&
        nextAppState === 'background'
      ) {
        id = BackgroundTimer.setInterval(() => {
          timeRef.current = timeRef.current - 1;
          if (timeRef.current < 0) {
            BackgroundTimer.clearInterval(id);
          }
        }, 1000);
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (timeRef.current < 0) {
          RNRestart.Restart();
        }
        else {
          BackgroundTimer.clearInterval(id);
        }
        timeRef.current = TIME;
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      BackgroundTimer.clearInterval(id);
    };
  }, []);

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
