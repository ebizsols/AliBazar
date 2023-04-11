/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Linking,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from 'navigations/AppNavigation';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import cartReducer from 'store/reducers/cart.reducer';
import authReducer from 'store/reducers/auth.reducer';
import fireChangeReducer from 'store/reducers/fireChange.reducer';
import baseStateReducer from 'store/reducers/baseState.reducer';
import messaging from '@react-native-firebase/messaging';
import { localNotificationService } from 'NotificationServices/LocalNotificationService';
import { DeviceStorage } from 'services';
import * as RootNavigation from './src/navigations/RootNavigation';
import { fcmService } from 'NotificationServices/FCMService';

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  fireChangeReducer: fireChangeReducer,
  baseStateReducer: baseStateReducer
})

const store = createStore(rootReducer);

localNotificationService.configure(onOpenNotificationLocale);

function onOpenNotificationLocale(notify, data = null) {
  console.log("[App.js] open application in forground: ", notify, data)
  if (data) {
    if (data && data.data && data.data?.HasNavigate == '1') {
      const params = data.data.Params ? JSON.parse(data.data.Params) : {};
      RootNavigation.navigate(data.data.ScreenName, params);
    }

    if (data && data.data?.HasLink == '1') {
      if (data && data.data && data.data?.HasLink == '1') {
        Linking.canOpenURL(data.data?.Link).then(supported => {
          if (supported) {
            Linking.openURL(data.data?.Link);
          } else {
            try {
              Linking.openURL(data.data?.Link);
            } catch (error) {
              console.log('Error in openning: ', error);
            }
            console.log("Don't know how to open URI: " + data.data?.Link);
          }
        });
      }
    }
  }
}

const App = () => {
  function onOpenNotification(notify, data = null) {

  }

  useEffect(() => {

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);

    function onRegister(token) {
      DeviceStorage.storeJsonData("@notificationKey", token);
    }

    function onNotification(notify) {
      console.log("[App.js] onNotification", notify);
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      if (Platform.OS == 'android') {
        localNotificationService.showNotification(
          0,
          notify.notification?.title,
          notify.notification?.body,
          notify,
          options
        )
      } else {
        localNotificationService.showNotification(
          0,
          notify.notification?.title,
          notify.notification?.body,
          notify,
          options
        )
      }
    }

    return () => {
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
    <Provider store={store}>
      {Platform.OS == 'android' ?
        // <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <AppNavigation></AppNavigation>
        // </SafeAreaView>
        :
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <AppNavigation></AppNavigation>
        </SafeAreaView>
      }
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
