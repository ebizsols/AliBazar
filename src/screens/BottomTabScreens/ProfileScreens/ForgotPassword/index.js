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

const ForgotPasswordScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: null
    },
    inputValidities: {
      email: false
    },
    formIsValid: false
  });

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
    sendEmailForgetPassword();
  }, [formState]);

  const sendEmailForgetPassword = () => {
    setIsLoading(true);
    clientAuth.sendEmailForgetPassword(formState.inputValues.email)
      .then((response) => {
        setIsLoading(false)
        props.navigation.navigate('ForgotPasswordVerifyCode', { email: formState.inputValues.email });
      }).catch((err) => {
        Keyboard.dismiss();
        setIsLoading(false);
        console.log('err', err);
        console.log(err?.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const onSignUpPressHandler = () => {
    props.navigation.navigate('SignUp')
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
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                <CloseIcon
                  width={Scale.moderateScale(30)}
                  height={Scale.moderateScale(30)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topTextsContainer}>
              <Text style={styles.firstToText}>{Languages.Profile.ForgetPassword}</Text>
              <Text style={styles.secTopText}>{Languages.Profile.EnterYourEmailAddressAndWellSend}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.Email}
                  placeholder={Languages.Placeholder.EnterEmailSAddress}
                  id="email"
                  initialValue={''}
                  maxLength={400}
                  editable={true}
                  required={true}
                  // showRequireStart={true}
                  email={true}
                  enableRealTimeTextChangeListener={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  keyboardType={'email-address'}
                />
              </View>

              <View style={styles.buttonContainer}>
                <MainButton onPress={submitHandler}>{Languages.Common.SubmitEmail}</MainButton>
              </View>

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


export default ForgotPasswordScreen;
