import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
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

const ChangePasswordScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null
    },
    inputValidities: {
      currentPassword: false,
      newPassword: false,
      confirmNewPassword: false
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

  const changeCustomerPassword = () => {
    setIsLoading(true);
    clientAuth.changeCustomerPassword(
      formState.inputValues.currentPassword,
      formState.inputValues.newPassword,
      null
    )
      .then((response) => {
        const res = response.data;
        setIsLoading(false)
        console.log(res);
        if (res.message)
          snackBarRef.current.show(res.message, 1);
        setTimeout(() => {
          props.navigation.navigate('Profile', { fireChange: Math.random() + 1 });
        }, 1500);
      }).catch((err) => {
        setIsLoading(false)
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
              <Text style={styles.firstToText}>{Languages.Profile.ChangePassword}</Text>
              <Text style={styles.secTopText}>{Languages.Profile.EnterYourCurrentPassword}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.CurrentPassword}
                  placeholder={Languages.Placeholder.EnterCurrentPassword}
                  isPassword={true}
                  id="currentPassword"
                  required={true}
                  initialValue={''}
                  editable={true}
                  enableRealTimeTextChangeListener={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.NewPassword}
                  placeholder={Languages.Placeholder.EnterNewPassword}
                  isPassword={true}
                  id="newPassword"
                  required={true}
                  initialValue={''}
                  editable={true}
                  // matchPassword={formState.inputValues.confirmNewPassword}
                  // checkMatchPassword={true}
                  // mainNewPassword={true}
                  enableRealTimeTextChangeListener={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
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
                  initialValue={''}
                  editable={true}
                  enableRealTimeTextChangeListener={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                />
              </View>

            </View>

          </View>

          <View style={styles.buttonContainer}>
            <MainButton onPress={submitHandler}>{Languages.Profile.SavePassword}</MainButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ChangePasswordScreen;
