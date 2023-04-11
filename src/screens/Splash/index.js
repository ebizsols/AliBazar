import React, { useEffect, useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    I18nManager,
    Platform,
    NativeModules,
    Image
} from 'react-native';
import { Languages, Scale, Constants } from 'common';
import { ForceUpdateModal } from 'components';
import { Typography, Colors } from 'styles';
/* import LogoIcon from 'assets/icons/logo.png'; */
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { DeviceStorage } from 'services';
import axiosClient from 'api/axios';
import { clientAuth, clientHome } from 'api/client';
import { useDispatch } from 'react-redux';
import { setCartCount } from 'store/actions/cart.action';
import { setDomain } from 'store/actions/baseState.action';
import { setToken } from 'store/actions/auth.action';
import { fcmService } from 'NotificationServices/FCMService';
import DeviceInfo from 'react-native-device-info';
var InstallAp = NativeModules.InstallAp;

const { width, height } = Dimensions.get('window');

const forceUpdateTempData = {
    androidVersionCode: 2,
    androidVersionName: "1.0.1",
    iosBuildNumber: 2,
    iosVersionName: "1.0.1",
    forceUpdateAndroid: true,
    forceUpdateIos: true,
    activeAndroidDirectDownload: true,
    activeAndroidGooglePlayDownload: true,
    activeIosAppStoreDownload: true,
    googlePlayeLink: 'https://play.google.com/store/apps/details?id=az.arazsoft.tayqa',
    appStoreLink: "https://apps.apple.com/app/id1546378240",
    directDownloadLink: 'https://api.tayqa.az/Uploads/Static/Common/ajyal.apk',
    title: "New Version Is Available",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
}

const SplashScreen = (props) => {

    const dispatch = useDispatch();
    const dispatchToken = useDispatch();
    const dispatchDomain = useDispatch();

    const [forceUpdateData, setForceUpdateData] = useState(null);

    const [showForceUpdateModal, setShowForceUpdateModal] = useState(false);

    const setCartCountRedux = useCallback((cartCount) => {
        dispatch(setCartCount(cartCount))
    }, [dispatch]);

    const setDomainRedux = useCallback((domain) => {
        dispatchDomain(setDomain(domain))
    }, [dispatchDomain]);

    const setTokenRedux = useCallback((token) => {
        dispatchToken(setToken(token))
    }, [dispatchToken]);

    const getMobileSplashData = (deviceInfoData) => {
        return clientHome.getMobileSplashData(deviceInfoData)
            // .then((response) => {
            //     const res = response.data;

            //     console.log(res.result);

            .catch((err) => {
                console.log('[Splash]', err);
            });

        // {"cartCount": 0, "defualtCurrency": "BHD", "defualtLanguage": "En"}
    };

    const updateUserNotificationKey = (notificationKey, type = 2) => {
        return clientAuth.updateUserNotificationKey(notificationKey, type = 2)
            .then((response) => {

            }).catch((err) => {
                console.log('[Splash]', err);
            });

        // {"cartCount": 0, "defualtCurrency": "BHD", "defualtLanguage": "En"}
    };

    const checkNotification = async (storeObjData, notificationKeyInDb) => {
        // console.log('notificationKeyInDb: ', notificationKeyInDb);
        let isLoggedIn = false;
        // console.log('storeObjData', storeObjData);
        if (storeObjData?.token && storeObjData.token?.length > 5)
            isLoggedIn = true;
        else
            isLoggedIn = false;

        // console.log('Is Logged In: ', isLoggedIn);

        const notificationDataObj = await DeviceStorage.getJsonData(Constants.StorageKeys.NotificationKeyDataKey);
        // console.log('notificationDataObj', notificationDataObj);

        fcmService.createNotificationKeyListener(onRefreshToken, onGetToken);

        function onGetToken(token) {
            // fcmService.subscribeToTopic("test"); // Subscribe to logged in or not logged in
            console.log('[Splash] onGetToken: ', token);

            const notifDataModel = Constants.StorageKeys.NotificationKeyDataObject;
            notifDataModel.notificationKey = token;
            DeviceStorage.storeJsonData(Constants.StorageKeys.NotificationKeyDataKey, notifDataModel);

            if (isLoggedIn) {
                if (notificationKeyInDb === token) {
                    // notificationKeyInDb is same as token
                    // console.log('notificationKeyInDb is same as token');

                    fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in
                    fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in
                } else {
                    // notificationKeyInDb not exist or is diffrent from new token
                    // console.log('notificationKeyInDb not exist or is diffrent from new token');

                    // Subscribe to topics
                    fcmService.subscribeToTopic(Constants.NotificationTopics.CLIENT_MOBILE); // All mobiles
                    fcmService.subscribeToTopic(Platform.OS === 'android' ? Constants.NotificationTopics.CLIENT_MOBILE_ANDROID : Constants.NotificationTopics.CLIENT_MOBILE_IOS); // Subscribe to android or ios
                    fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in

                    fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in

                    // Send notification key to back-end to handle it
                    updateUserNotificationKey(token);
                }
            } else {
                // User not logged in so jus subscribe to topics
                // console.log('User not logged in so jus subscribe to topics');
                // Subscribe to topics
                fcmService.subscribeToTopic(Constants.NotificationTopics.CLIENT_MOBILE); // All mobiles
                fcmService.subscribeToTopic(Platform.OS === 'android' ? Constants.NotificationTopics.CLIENT_MOBILE_ANDROID : Constants.NotificationTopics.CLIENT_MOBILE_IOS); // Subscribe to android or ios
                fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in

                fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in
            }
        }

        function onRefreshToken(token) {

            // console.log('[Splash] onRefreshToken: ', token);
            // Update notification Key to mobile storage
            // console.log('Update notification Key to mobile storage');
            const notifDataModel = Constants.StorageKeys.NotificationKeyDataObject;
            notifDataModel.notificationKey = token;
            DeviceStorage.storeJsonData(Constants.StorageKeys.NotificationKeyDataKey, notifDataModel);

            // Subscribe to topics
            fcmService.subscribeToTopic(Constants.NotificationTopics.CLIENT_MOBILE); // All mobiles
            fcmService.subscribeToTopic(Platform.OS === 'android' ? Constants.NotificationTopics.CLIENT_MOBILE_ANDROID : Constants.NotificationTopics.CLIENT_MOBILE_IOS); // Subscribe to android or ios
            fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in

            fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in

            // Send notification key to back-end to handle it
            if (isLoggedIn)
                updateUserNotificationKey(token);
        }
    };

    const getDeviceInfoData = async () => {
        const deviceInfoData = {
            buildNumber: DeviceInfo.getBuildNumber(),
            version: DeviceInfo.getVersion(),
            apiLevel: await DeviceInfo.getApiLevel(),
            deviceName: await DeviceInfo.getDeviceName(),
            brand: DeviceInfo.getBrand(),
            macAddress: await DeviceInfo.getMacAddress(),
            deviceModel: DeviceInfo.getModel(),
            phoneNumber: await DeviceInfo.getPhoneNumber(),
            product: await DeviceInfo.getProduct(),
            systemVersion: DeviceInfo.getSystemVersion(),
            uniqueId: DeviceInfo.getUniqueId(),
            isTablet: DeviceInfo.isTablet(),
            baseOs: await DeviceInfo.getBaseOs(),
            deviceId: DeviceInfo.getDeviceId(),
            ipAddress: await DeviceInfo.getIpAddress(),
            platformOS: Platform.OS === 'android' ? 'android' : 'ios'
        };
        return deviceInfoData;
    }

    useEffect(() => {

        async function asyncScopFunc() {
            // For set language first so in splash, texts can show in proper language
            const storeObjData = await DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId);
            if (storeObjData) {
                Languages.setLanguage(storeObjData.language.toLowerCase());
            } else {
                Languages.setLanguage(Constants.SplashConstants.defaultLanguage.toLowerCase());
            }
            // End For set language first so in splash, texts can show in proper language
            setTimeout(async () => {

                const deviceInfoData = await getDeviceInfoData();

                const storeData = await DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId);
                if (storeData) {
                    // storage is not empty so user not first time to open app
                    // console.log('[Splash] storeData', storeData);
                    axiosClient.setLangAndCurrency(storeData.language, storeData.currency);
                    axiosClient.setToken(storeData.token);
                    setTokenRedux(storeData.token);
                    axiosClient.setCartId(storeData.cartId);
                    Languages.setLanguage(storeData.language.toLowerCase())
                    if (storeData.language == Constants.PossibleLangAndCur.langs.arabic.name) { // Todo: check app change
                        I18nManager.forceRTL(true);
                    } else {
                        I18nManager.forceRTL(false);
                    }

                    const data = await getMobileSplashData(deviceInfoData);
                    console.log('||||||||||||||||||||||', data);
                    setDomainRedux(data.data?.result?.domain);

                    // setForceUpdateData(data.forceUpdateObj);
                    if (data.data?.result?.isForceUpdate === true) {
                        // setShowForceUpdateModal(true);
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'ForceUpdate', params: { data: data.data?.result?.forceUpdateObj } },
                                ],
                            })
                        );
                        return;
                    }

                    await checkNotification(storeData, data.data?.result?.notificationKey);

                    setCartCountRedux(data.data.result.cartCount)
                } else {
                    // user first time open app maybe
                    // storage is empty so add default new object
                    // console.log('[Splash] storage is empty so add default new object');
                    const data = await getMobileSplashData(deviceInfoData);
                    console.log('||||||||||||||||||||||', data);
                    setDomainRedux(data.data?.result?.domain);

                    // setForceUpdateData(data.forceUpdateObj);
                    if (data.data?.result?.isForceUpdate === true) {
                        // setShowForceUpdateModal(true);
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'ForceUpdate', params: { data: data.data?.result?.forceUpdateObj } },
                                ],
                            })
                        );
                        return;
                    }

                    await checkNotification(storeData, data.data?.result?.notificationKey);

                    const storeObj = Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartIdObject;
                    storeObj.language = data.data.result.defualtLanguage;
                    Languages.setLanguage(storeObj.language.toLowerCase())
                    storeObj.currency = data.data.result.defualtCurrency;
                    axiosClient.setLangAndCurrency(storeObj.language, storeObj.currency);
                    if (storeObj.language == Constants.PossibleLangAndCur.langs.arabic.name) { // Todo: check app change
                        I18nManager.forceRTL(true);
                    } else {
                        I18nManager.forceRTL(false);
                    }
                    await DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeObj);
                }
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                        ],
                    })
                );
            }, Constants.SplashConstants.splashTimeout);
        }

        asyncScopFunc();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={require('./../../assets/images/splashImage.jpg')} style={styles.image}>
                    <View style={styles.logoAndTextContainer}>
                        <Image source={require('../../assets/icons/logoAlibazar.png')} style={{ width: width - 90, height: 60 }} />
                        {/* <LogoIcon width={width / 2} height={Scale.verticalScale(98)} /> */}
                        <Text style={styles.logoText}>{Languages.Splash.SplashText}</Text>
                    </View>
                    <View style={styles.loaderContainer}>
                        <LottieView
                            style={{
                                width: Scale.moderateScale(250),
                                height: Scale.moderateScale(250),
                                // backgroundColor: 'red',
                                // aspectRatio: 1
                            }}
                            source={require('./../../assets/animations/loader.json')} autoPlay loop />
                    </View>
                </ImageBackground>
            </View>

            {/* <ForceUpdateModal
                visible={showForceUpdateModal}
                data={forceUpdateData}
            /> */}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center",
        alignItems: "center"
    },
    logoAndTextContainer: {
        marginTop: height / 6,
        alignItems: "center"
    },
    logoText: {
        color: Colors.MERCURY2,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        marginTop: Scale.verticalScale(5)
    },
    loaderContainer: {
        position: "absolute",
        bottom: Scale.moderateScale(-50)
    }
});

export default SplashScreen;