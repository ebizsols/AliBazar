/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
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
import { MainInput, MainButton, SnackBar, RequestLoader } from 'components/UI';
import { Languages, Scale } from 'common';

import CloseIcon from 'assets/icons/close-gray.svg';
import { clientAuth } from 'api/client';

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

const ForgotChangePasswordScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      newPassword: null,
      confirmNewPassword: null
    },
    inputValidities: {
      newPassword: false,
      confirmNewPassword: false
    },
    formIsValid: false
  });
  const { email } = props.route.params;

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

  const changeCustomerPassword = () => {
    setIsLoading(true);
    clientAuth.changeCustomerEmailForgetPass(
      email,
      formState.inputValues.newPassword,
    )
      .then((response) => {
        const res = response.data;
        setIsLoading(false)
        console.log(res);
        Keyboard.dismiss();
        if (res.message) {
          snackBarRef.current.show(res.message, 1);
        }
        setTimeout(() => {
          props.navigation.navigate('Profile');
        }, 1000);

      }).catch((err) => {
        Keyboard.dismiss();
        setIsLoading(false);
        console.log(err);
        console.log(err.response?.data);
        if (err.response?.data?.message)
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
    changeCustomerPassword();
  }, [formState]);

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
              <Text style={styles.firstToText}>{Languages.Profile.changeYourPasswordNow}</Text>
              {/* <Text style={styles.secTopText}>{Languages.Profile.EnterYourCurrentPassword}</Text> */}
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.NewPassword}
                  placeholder={Languages.Placeholder.EnterYourNewPassword}
                  isPassword={true}
                  id="newPassword"
                  required={true}
                  initialValue={''}
                  minLength={6}
                  maxLength={200}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.ConfirmNewPassword}
                  placeholder={Languages.Placeholder.ConfirmYourPassword}
                  isPassword={true}
                  id="confirmNewPassword"
                  matchPassword={formState.inputValues.newPassword}
                  checkMatchPassword={true}
                  required={true}
                  maxLength={200}
                  initialValue={''}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                />
              </View>

            </View>

          </View>

          <View style={styles.buttonContainer}>
            <MainButton onPress={submitHandler}>{Languages.Common.Submit}</MainButton>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ForgotChangePasswordScreen;
