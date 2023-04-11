/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader, FloatButtonWrapper } from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";

import CloseIcon from 'assets/icons/close-gray.svg';
import { clientAuth } from 'api/client';
import { CommonActions } from '@react-navigation/native';
import { SelectCountryModal } from 'components';
import VerifyMobile from './VerifyMobile';

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

const Login = (props) => {

  const snackBarRef = useRef(null);
  const mobileInputRef = useRef();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: null,
      mobile: null,
      password: null,
      confirmPassword: null
    },
    inputValidities: {
      email: false,
      mobile: false,
      password: false,
      confirmPassword: false
    },
    formIsValid: false
  });

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

  const submitVerifyMobile = () => {
    props.verifyMobile();
  };

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    props.goToNexStep(formState.inputValues)
  }, [formState, props.selectedCountry, props.verifiedMobileNumbers]);

  const onSelectCountry = (item) => {
    // setSelectedCountry(item);
    mobileInputRef?.current?.validatePhoneNumberTry(formState.inputValues.mobile, item.iso);
    // setModalVisible(false);
    props.onCountrySelected(item);
  };

  const openModal = () => {
    props.openModal();
  };

  const closeModal = () => {
    props.closeModal();
  };

  const codeChanged = (code) => {
    props.verifyCodeChanged(code);
  }

  const changeRegisterDataPressHandler = () => {
    props.changeRegisterDataPressHandler();
  }

  return (
    <>
      {props.isLoading == true ? <RequestLoader /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>


        <View style={styles.contentContainer}>

          {/* {props.showMobileVerfiyState == false ? */}
          <View style={[props.showMobileVerfiyState == true ? styles.hideComponent : {}]}>
            <View style={styles.topTextsContainer}>
              <Text style={styles.signYourAccountText}>{Languages.CreateStore.AccountInformation}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.MobileNumber}
                  placeholder={Languages.Placeholder.EnterMobileNumber}
                  id="mobile"
                  selectableMobilePrefix={true}
                  countryCode={props.selectedCountry?.iso}
                  phonePrefix={props.selectedCountry?.phoneCode}
                  phonePrefixFlagUrl={props.selectedCountry?.flagUrl}
                  onSelectMobileCodePress={openModal}
                  required={true}
                  initialValue={''}
                  editable={true}
                  enableRealTimeTextChangeListener={true}
                  phoneNumber
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  ref={mobileInputRef}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.Email}
                  placeholder={Languages.Placeholder.EnterEmailSAddress}
                  id="email"
                  required={true}
                  minLength={4}
                  maxLength={50}
                  initialValue={''}
                  enableRealTimeTextChangeListener={true}
                  editable={true}
                  email={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.Profile.Password}
                  placeholder={Languages.Placeholder.EnterPassword}
                  isPassword={true}
                  // showTogglePasswordIcon={true}
                  id="password"
                  required={true}
                  enableRealTimeTextChangeListener={true}
                  initialValue={''}
                  minLength={8}
                  maxLength={50}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.ConfirmPassword}
                  placeholder={Languages.Placeholder.EnterConfirmPassword}
                  isPassword={true}
                  id="confirmPassword"
                  initialValue={''}
                  enableRealTimeTextChangeListener={true}
                  editable={true}
                  matchPassword={formState.inputValues.password}
                  checkMatchPassword={true}
                  minLength={8}
                  maxLength={50}
                  required={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  isPassword={true}
                />
              </View>

              {/* <View style={styles.textAndForgetContainer}>
                      <TouchableOpacity onPress={onForgotPasswordPressHandler}>
                        <Text style={styles.foregetPasswordText}>{Languages.Profile.ForgetPassword}</Text>
                      </TouchableOpacity>
                    </View> */}

            </View>

            <View style={styles.bottomSection}>
              {/* <View style={styles.bottomTexts}>
                      <Text style={styles.firstText}>{Languages.Profile.NewHere} </Text>
                      <TouchableOpacity onPress={onSignUpPressHandler} style={styles.signUpTextContainer}>
                        <Text style={styles.signupText}>{Languages.Profile.SignUp}</Text>
                      </TouchableOpacity>
                    </View> */}


            </View>
          </View>
          {/* : */}
          {props.showMobileVerfiyState == true ?
            <View>
              <VerifyMobile
                changeRegisterDataPressHandler={changeRegisterDataPressHandler}
                verifyCodeChanged={codeChanged}
                iso={props.selectedCountry?.iso}
                mobile={formState.inputValues.mobile} />
            </View>
            :
            null}
          {/* } */}

        </View>
      </ScrollView>

      {props.showMobileVerfiyState == false ?
        <FloatButtonWrapper>
          <MainButton onPress={submitHandler}>
            {Languages.Common.Next}
          </MainButton>
        </FloatButtonWrapper>
        :
        <FloatButtonWrapper containerStyle={{
          position: "absolute",
          width: '100%',
          bottom: 0
        }}>
          <MainButton onPress={submitVerifyMobile}>
            {Languages.Address.SubmitVerifyPhone}
          </MainButton>
        </FloatButtonWrapper>}

      <SelectCountryModal
        countries={props.countries}
        isLoading={false}
        onRequestClose={closeModal}
        visible={props.countryModalVisible}
        onSelectCountry={onSelectCountry}
        selectedCountryId={props.selectedCountry?.countryId}
      />

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default Login;
