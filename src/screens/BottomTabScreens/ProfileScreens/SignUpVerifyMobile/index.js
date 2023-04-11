/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer
} from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard
} from 'react-native';
import {
  clientAuth,
  clientProfile,
  clientForm
} from 'api/client';
import styles from './style'
import {
  ModuleSelection,
  HomeHeader,
  CommonHeader
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  DropdownPickerInput,
  RadioButton,
  CountDown
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import PenIcon from "assets/icons/pen.svg";
import { DeviceStorage } from "services";

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useDispatch } from 'react-redux';
import { setShippingAddressChange } from 'store/actions/fireChange.action';
import { fcmService } from 'NotificationServices/FCMService';
import { setToken } from 'store/actions/auth.action';

// todo: Change here must apply to ShippingAddressVerifyPhoneScreen too
const SignUpVerifyMobileScreen = (props) => {

  const dispatch = useDispatch();

  const setShippingAddressRedux = useCallback((value) => {
    dispatch(setShippingAddressChange(value))
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(null);
  const [stateRequestId, setStateRequestId] = useState(null);
  const [code, setCode] = useState(null);
  const [screenData, setScreenData] = useState({
    requestId: null
  });
  const [notificationKey, setNotificationKey] = useState(null);

  const dispatchToken = useDispatch();
  const setTokenRedux = useCallback((token) => {
    dispatchToken(setToken(token))
  }, [dispatchToken]);

  const { requestId, mobile, email, password, confirmPassword, name, family, iso, phoneCode, countryId } = props.route.params;

  const countDownRef = useRef();

  useEffect(() => {
    if (requestId)
      setStateRequestId(requestId);
  }, [requestId]);

  useEffect(() => {
    if (props.route.params?.fireMobileChanged) {
      console.log('[AddressVerifyPhone] fire mobile change');
      countDownRef.current.resetTimer();
    }
  }, [props.route.params?.fireMobileChanged]);

  // const verifyMobileNumberAddress = () => {
  //   setIsLoading(true);
  //   clientProfile.verifyMobileNumberAddress(addressId, code, screenData.requestId || requestId)
  //     .then((response) => {
  //       const res = response.data;

  //       setIsLoading(false);
  //       if (props.route.params?.afterScreen) {
  //         if (props.route.params?.afterScreen == 'ShippingAddress') {
  //           setShippingAddressRedux((Math.random() + 1) * 100);
  //         }
  //         props.navigation.navigate(props.route.params?.afterScreen, props.route.params?.afterScreenParams);
  //         return;
  //       }
  //       props.navigation.navigate('Addresses', { fireChange: Math.random() + 2 })
  //     }).catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //       snackBarRef.current.show(err.response?.data?.message, 2);
  //     });
  // };

  // const resendCode = () => {
  //   setIsLoading(true);
  //   clientProfile.changeMobileNumberAddress(addressId, mobile)
  //     .then((response) => {
  //       const res = response.data;
  //       setScreenData((prev) => ({
  //         ...prev,
  //         requestId: res.result.requestId
  //       }))

  //       setIsLoading(false);
  //     }).catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //       snackBarRef.current.show(err.response?.data?.message, 2);
  //     });
  // };

  const sendVerifyMobileNumberCustomer = () => {
    setIsLoading(true);
    clientAuth.sendVerifyMobileNumberCustomer(
      Constants.CaptchaToken,
      email,
      '+' + phoneCode + mobile
    )
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        // setRequestId(res.result.requestId);
        console.log('New requestId: ', res.result.requestId);
        setStateRequestId(res.result?.requestId);
        setIsLoading(false);
        if (res.result?.status != 0) {
          if (res.result?.errorText)
            snackBarRef.current.show(res.result?.errorText, 2);
          return;
        };
        // props.navigation.navigate('SignUpVerifyMobile', {
        //   requestId: res.result.requestId,
        //   mobile: formState.inputValues.mobile,
        //   email: formState.inputValues.email,
        //   password: formState.inputValues.password,
        //   confirmPassword: formState.inputValues.confirmPassword,
        //   name: formState.inputValues.name,
        //   family: formState.inputValues.family,
        //   iso: selectedCountry?.iso,
        //   phoneCode: selectedCountry?.phoneCode,
        //   countryId: selectedCountry?.countryId
        // });
      }).catch((err) => {
        setIsLoading(false)
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    fcmService.createNotificationKeyListener(onRefreshToken, onGetToken);

    function onGetToken(token) {
      setNotificationKey(token);
    }

    function onRefreshToken(token) {
      setNotificationKey(token);
    }
  }, [])

  const submitHandler = () => {
    // verifyMobileNumberAddress();
    customerRegister();
  };

  // const changePhoneNumberPressHandler = () => {
  //   props.navigation.navigate('ChangeAddressMobile', {
  //     addressId: addressId,
  //     iso: iso,
  //     phoneCode: phoneCode,
  //     afterScreen: props.route.params?.afterScreen,
  //     afterScreenParams: props.route.params?.afterScreenParams
  //   });
  // }

  const resendPressHandler = () => {
    // resendCode();
    sendVerifyMobileNumberCustomer();
  }

  const customerRegister = () => {
    if (!!!code)
      return;
    setIsLoading(true);
    clientAuth.customerRegister({
      userName: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      family: family,
      captchaToken: Constants.CaptchaToken,
      phoneCode: phoneCode,
      mobileNumber: mobile,
      requestId: stateRequestId,
      verfiyCode: code,
      countryId: countryId,
      notificationKey: notificationKey,
      type: 2
    })
      .then((response) => {
        const res = response.data;
        setIsLoading(false)

        DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId)
          .then((storeData) => {
            storeData.token = res.result.token;
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeData);
            axiosClient.setToken(res.result.token);
            setTokenRedux(res.result.token);

            const isLoggedIn = true;
            fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in
            fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in

            if (res.message) {
              snackBarRef.current.show(res.message, 1);
            }
            setTimeout(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Home' },
                  ],
                })
              );
            }, 1000);

          })

        console.log(res);
      }).catch((err) => {
        Keyboard.dismiss();
        setIsLoading(false)
        console.log(err.response.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  // const onSkipPressHandler = () => {
  //   if (props.route.params?.afterScreen) {
  //     if (props.route.params?.afterScreen == 'ShippingAddress') {
  //       setShippingAddressRedux((Math.random() + 1) * 100);
  //     }
  //     props.navigation.navigate(props.route.params?.afterScreen, props.route.params?.afterScreenParams);
  //     return;
  //   }
  //   props.navigation.navigate('Addresses', { fireChange: Math.random() + 1 })
  // }

  const snackBarRef = useRef(null);

  return (
    <>
      <View>
        {isLoading == true ? <RequestLoader /> : null}

        <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Profile.VerifyMobile} showBackIcon={true} />

        <SafeAreaView>
          <ScrollView contentContainerStyle={{ minHeight: '100%' }} >
            <ShadowWrapper
              shadowContainerStyle={styles.shadowContainerStyle}
              contentContainer={styles.shadowContainerStyle}
            >
              <View style={styles.contentContainer}>
                <View style={styles.topSection}>
                  <Text style={styles.topFirstText}>{Languages.Address.PleaseVerifyMobileNumberToContinue}</Text>
                  <Text style={styles.topSecText}>{Languages.Profile.ToProceedToRegisterOTPVerifyMobileNumber}</Text>
                </View>
                <View style={styles.phoneNumberContainer}>
                  <Text style={styles.phoneNumberText}>{Tools.formatPhoneNumber(mobile, iso)}</Text>
                </View>
                {/* <TouchableOpacity onPress={changePhoneNumberPressHandler} style={styles.changePhoneContainer}>
                  <Text style={styles.changePhoneText}>{Languages.Address.ChangePhoneNumber}</Text>
                </TouchableOpacity> */}
                <View style={styles.verifyCodeContainer}>
                  <OTPInputView
                    autoFocusOnLoad={false}
                    style={styles.otpContainer}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                      setCode(code)
                      console.log(`Code is ${code}, you are good to go!`)
                    }}
                    pinCount={4} />
                </View>
                <View style={styles.resendContainer}>
                  <Text style={styles.resendFirstText}>{`\u00A0`}{Languages.Address.DidNotReceiveOTP}{`\u00A0`}</Text>
                  {/* <Text style={styles.resendSecText}>{Languages.Common.ResendNow}</Text> */}
                  <CountDown ref={countDownRef} minutes={5} onResendPressed={resendPressHandler} />
                </View>
                {/* <TouchableOpacity onPress={onSkipPressHandler} style={styles.skipContainer}>
                  <Text style={styles.skipText}>{Languages.Common.Skip}</Text>
                </TouchableOpacity> */}
              </View>
            </ShadowWrapper>
          </ScrollView>
        </SafeAreaView>

      </View>

      <FloatButtonWrapper containerStyle={{
        position: "absolute",
        width: '100%',
        bottom: 0
      }}>
        <MainButton onPress={submitHandler}>
          {Languages.Address.SubmitVerifyPhone}
        </MainButton>
      </FloatButtonWrapper>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default SignUpVerifyMobileScreen;
