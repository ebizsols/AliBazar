/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useCallback, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard
} from 'react-native';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader } from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";

import CloseIcon from 'assets/icons/close-gray.svg';
import { clientAuth } from 'api/client';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from 'store/actions/auth.action';
import { fcmService } from 'NotificationServices/FCMService';
import { setCartCount } from 'store/actions/cart.action';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: '953067270092-qi47k4gpcptb25dovagcv326a0oo15h5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const SignInScreen = (props) => {

  const snackBarRef = useRef(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userName: null,
      password: null
    },
    inputValidities: {
      userName: false,
      password: false
    },
    formIsValid: false
  });

  const [isLoading, setIsLoading] = useState(null);
  const [notificationKey, setNotificationKey] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatchToken = useDispatch();
  const setTokenRedux = useCallback((token) => {
    dispatchToken(setToken(token))
  }, [dispatchToken]);

  const dispatch = useDispatch();
  const setCartCountRedux = useCallback((cartCount) => {
    dispatch(setCartCount(cartCount))
  }, [dispatch]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    fcmService.createNotificationKeyListener(onRefreshToken, onGetToken);

    function onGetToken(token) {
      setNotificationKey(token);
    }

    function onRefreshToken(token) {
      setNotificationKey(token);
    }
  }, [])

  const customerLogin = () => {
    setIsLoading(true);
    clientAuth.customerLogin(
      formState.inputValues.userName,
      formState.inputValues.password,
      Constants.CaptchaToken,
      notificationKey
    )
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        onSuccessLogin(res)

      }).catch((err) => {
        Keyboard.dismiss();
        setIsLoading(false);
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    customerLogin();
  }, [formState]);

  const onForgotPasswordPressHandler = () => {
    props.navigation.navigate('ForgotPassword')
  }

  const onSignUpPressHandler = () => {
    props.navigation.navigate('SignUp')
  }

  const onSuccessLogin = (res) => {
    DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId)
      .then((storeData) => {
        if (storeData)
          storeData.token = res.result.token;
        DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeData);
        axiosClient.setToken(res.result.token);
        setTokenRedux(res.result.token);

        const isLoggedIn = true;
        fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in
        fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in

        setCartCountRedux(res.result.count);

        if (props.route?.params?.backScreen) {
          if (props.route?.params?.backScreen === "Cart") {
            props.navigation.navigate('Cart', { screen: 'Cart', params: { fireChange: Math.random() } })
          } else {
            props.navigation.navigate(props.route?.params?.backScreen, props.route?.params?.backParams);
          }
        } else {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home' },
              ],
            })
          );
        }
      })
  }

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      clientAuth.customerLoginWithSocial({
        accessToken: userInfo.idToken,
        socialType: 1,
      }).then(response => {
        const res = response.data;
        console.log('goglesuccess', res)
        onSuccessLogin(res)
      })
        .catch(err => {
          console.log('socialloginerr', err);
        })
      console.log('userInfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('error', error);
      }
    }
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <KeyboardAvoidingView
        behavior={'padding'}
        // style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                <CloseIcon
                  width={Scale.moderateScale(30)}
                  height={Scale.moderateScale(30)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topTextsContainer}>
              <Text style={styles.welcomeText}>{Languages.Profile.WelcomeBack}</Text>
              <Text style={styles.signYourAccountText}>{Languages.Profile.SignInToYourAccount}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.Email}
                  placeholder={Languages.Placeholder.EnterEmailSAddress}
                  id="userName"
                  required={true}
                  initialValue={''}
                  editable={true}
                  maxLength={400}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                  keyboardType={'email-address'}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.Profile.Password}
                  placeholder={Languages.Placeholder.EnterPassword}
                  isPassword={true}
                  showTogglePasswordIcon={true}
                  id="password"
                  required={true}
                  maxLength={400}
                  initialValue={''}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                />
              </View>

              <View style={styles.textAndForgetContainer}>
                <MainButton onPress={submitHandler}>{Languages.Profile.Login}</MainButton>
                <TouchableOpacity onPress={onForgotPasswordPressHandler}>
                  <Text style={styles.foregetPasswordText}>{Languages.Profile.ForgetPassword}</Text>
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ alignItems: 'center', marginTop: Scale.moderateScale(20), marginBottom: Scale.moderateScale(20) }}>

              <GoogleSigninButton
                style={{ width: 192, height: 48, marginBottom: 5 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={googleSignIn}
              />


              <LoginButton
                onLoginFinished={
                  (error, result) => {
                    console.log('result', result)
                    if (error) {
                      alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("login is cancelled.");
                    } else {
                      console.log('result', result)
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log('data', data)
                          let accessToken = data.accessToken
                          clientAuth.customerLoginWithSocial({
                            accessToken: accessToken,
                            socialType: 2,
                          }).then(response => {
                            const res = response.data;
                            console.log('fblogin', res)
                            onSuccessLogin(res)
                          })
                            .catch(err => {
                              console.log('socialloginerr', err);
                            })
                          alert(accessToken.toString())
                        }
                      )

                    }
                  }
                }
                onLogoutFinished={() => alert("logout.")} />
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.bottomTexts}>
                <Text style={styles.firstText}>{Languages.Profile.NewHere} </Text>
                <Text style={styles.secText}>{Languages.Profile.SignUpDiscover}</Text>
              </View>

              <TouchableOpacity onPress={onSignUpPressHandler} style={styles.signUpTextContainer}>
                <Text style={styles.signupText}>{Languages.Profile.SignUp}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default SignInScreen;
