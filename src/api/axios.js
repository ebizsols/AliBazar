import axios from "axios";
import { AppConfig, Constants } from "common";
import { fcmService } from "NotificationServices/FCMService";
import { DeviceStorage } from "services";
import { clientAuth } from "./client";
import RootNavigation from "navigations/RootNavigation";
import { Platform } from "react-native";
import DeviceInfo from 'react-native-device-info';
import RNRestart from 'react-native-restart';

const axiosClient = new (class axiosClient {
  static lang = Constants.PossibleLangAndCur.langs.english.name;
  static curr = Constants.PossibleLangAndCur.currencies.dollar.name;
  static token = null;
  static cartId = null;
  static platform = Platform.OS;
  static buildNumber = DeviceInfo.getBuildNumber();
  static version = DeviceInfo.getVersion();
  static brand = DeviceInfo.getBrand();
  static deviceModel = DeviceInfo.getModel();

  setLangAndCurrency(lang, curr) {
    axiosClient.lang = lang;
    axiosClient.curr = curr;
  }
  setCurrency(curr) {
    axiosClient.curr = curr;
  }
  setLang(lang) {
    axiosClient.lang = lang;
  }

  getLang() {
    return axiosClient.lang;
  }
  getToken() {
    return axiosClient.token;
  }
  getCurrency() {
    return axiosClient.curr;
  }

  setToken(token) {
    axiosClient.token = token;
  }

  setCartId(id) {
    axiosClient.cartId = id;
  }

  getAxios() {
    const headers = axiosClient.token
      ? {
        Language: axiosClient.lang,
        Currency: axiosClient.curr,
        Authorization: `Bearer ${axiosClient.token}`,
        BuildNumber: axiosClient.buildNumber,
        Version: axiosClient.version,
        Brand: axiosClient.brand,
        DeviceModel: axiosClient.deviceModel,
        Platform: axiosClient.platform,
      }
      : {
        Language: axiosClient.lang,
        Currency: axiosClient.curr,
        BuildNumber: axiosClient.buildNumber,
        Version: axiosClient.version,
        Brand: axiosClient.brand,
        DeviceModel: axiosClient.deviceModel,
        Platform: axiosClient.platform,
      };

    if (axiosClient.cartId) {
      headers.CookieId = axiosClient.cartId;
    }

    const instance = axios.create({
      baseURL: AppConfig.ApiConfig.baseUrl + 'api/',
      headers
    });

    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      // console.log('************************ Do something before request is sent ************************');
      return config;
    }, function (error) {
      // Do something with request error
      // console.log('************************ Do something with request error ************************');
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
      // Do something with response data
      // console.log('************************ Do something with response data ************************');
      return response;
    }, async function (error) {
      // Do something with response error
      // console.log('************************ Do something with response error ************************');
      if (error.response.status === 401) {
        debugger;
        console.log('You are not authorize');
        const storeData = await DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId);

        clientAuth.updateUserNotificationKey(null, 2)
          .then((response) => {
            console.log('[axios.js] ', response);
          }).catch((err) => {
            console.log('[axios.js]', err);
          });

        const isLoggedIn = false;

        fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in

        fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in

        storeData.token = null;
        DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeData);
        // axiosClient.setToken(null);
        // setTokenRedux(null);
        // setSignedIn(false);

        const notifDataModel = Constants.StorageKeys.NotificationKeyDataObject;
        notifDataModel.notificationKey = null;
        DeviceStorage.storeJsonData(Constants.StorageKeys.NotificationKeyDataKey, notifDataModel);
        // RNRestart.Restart(); // important: Uncomment this


        RootNavigation.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ],
          })
        );
      }
      return Promise.reject(error);
    });

    return instance;
  }
})();

export default axiosClient;
