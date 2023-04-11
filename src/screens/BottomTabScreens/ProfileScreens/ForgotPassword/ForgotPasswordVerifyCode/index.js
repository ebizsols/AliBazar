/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useCallback, useReducer, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader, CountDown } from 'components/UI';
import { Languages, Scale } from 'common';

import CloseIcon from 'assets/icons/close-gray.svg';
import { clientAuth } from 'api/client';
import EmailIcon from 'assets/icons/email-colory.svg';
import { CommonActions } from '@react-navigation/routers';

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

const ForgotPasswordVerifyCodeScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      code: null
    },
    inputValidities: {
      code: false
    },
    formIsValid: false
  });

  const { email } = props.route.params;

  const countDownRef = useRef();

  const [isLoading, setIsLoading] = useState(null);
  const snackBarRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    verifyCodeEmail();
  }, [formState]);

  const verifyCodeEmail = () => {
    setIsLoading(true);
    clientAuth.verifyCodeEmail(email, formState.inputValues.code)
      .then((response) => {
        setIsLoading(false)
        // props.navigation.navigate('ForgotChangePassword', { email: email })
        props.navigation.dispatch(state => {

          const routes = state.routes.filter(r => r.name !== 'ForgotPasswordVerifyCode');
          routes.push({ name: 'ForgotChangePassword', params: { email: email } });

          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });

        });
      }).catch((err) => {
        Keyboard.dismiss();
        setIsLoading(false);
        console.log('err', err);
        console.log(err?.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const sendEmailForgetPassword = () => {
    setIsLoading(true);
    clientAuth.sendEmailForgetPassword(email)
      .then((response) => {
        setIsLoading(false)

      }).catch((err) => {
        setIsLoading(false);
        Keyboard.dismiss();
        console.log('err', err);
        console.log(err?.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const resendPressHandler = () => {
    sendEmailForgetPassword()
  }


  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <KeyboardAvoidingView
        behavior={'padding'}
        // style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled' style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.closeContainer}>
              {/* // Better: go back to login */}
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                <CloseIcon
                  width={Scale.moderateScale(30)}
                  height={Scale.moderateScale(30)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topTextsContainer}>
              <View style={styles.iconTop}>
                <View style={styles.iconContainer}>
                  <EmailIcon
                    width={Scale.moderateScale(120)}
                    height={Scale.moderateScale(120)}
                  />
                </View>
              </View>
              <Text style={styles.firstToText}>{Languages.Profile.CheckYourEmail}</Text>
              <Text style={styles.secTopText}>{Languages.Profile.WeHaveSendAnEmail(styles.emailText, email)}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  showLable={false}
                  placeholder={Languages.Placeholder.VerificationCode}
                  id="code"
                  initialValue={''}
                  maxLength={50}
                  editable={true}
                  required={true}
                  // showRequireStart={true}
                  enableRealTimeTextChangeListener={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                />
              </View>

              <View style={styles.buttonContainer}>
                <MainButton onPress={submitHandler}>{Languages.Common.Verify}</MainButton>
              </View>

              <View style={styles.counterContainer}>
                <CountDown resendText={Languages.Profile.SendNewEmail} ref={countDownRef} minutes={3} onResendPressed={resendPressHandler} />
              </View>

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


export default ForgotPasswordVerifyCodeScreen;
