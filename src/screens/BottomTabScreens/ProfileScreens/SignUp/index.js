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
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { clientAuth, clientForm } from 'api/client';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader } from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';
import { DropDownPicker } from 'components';
import SelectCountryModal from 'components/Modals/SelectCountryModal';
import { useDispatch } from 'react-redux';
import { setToken } from 'store/actions/auth.action';

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

const SignUpScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: null,
      password: null,
      confirmPassword: null,
      name: null,
      family: null,
      mobile: null
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
      name: false,
      family: false,
      mobile: false
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(null);
  const mobileInputRef = useRef();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [countries, setCountries] = useState([]);
  const [requestId, setRequestId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const dispatchToken = useDispatch();
  const setTokenRedux = useCallback((token) => {
    dispatchToken(setToken(token))
  }, [dispatchToken]);

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

  const customerRegister = () => {
    setIsLoading(true);
    clientAuth.customerRegister({
      userName: formState.inputValues.email,
      password: formState.inputValues.password,
      confirmPassword: formState.inputValues.confirmPassword,
      name: formState.inputValues.name,
      family: formState.inputValues.family,
      captchaToken: Constants.CaptchaToken
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

            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Home' },
                ],
              })
            );
          })

        console.log(res);
      }).catch((err) => {
        setIsLoading(false)
        console.log(err.response.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const sendVerifyMobileNumberCustomer = () => {
    setIsLoading(true);
    clientAuth.sendVerifyMobileNumberCustomer(
      Constants.CaptchaToken,
      formState.inputValues.email,
      '+' + selectedCountry?.phoneCode + formState.inputValues.mobile
    )
      .then((response) => {
        const res = response.data;
        console.log(res);
        setRequestId(res.result?.requestId)
        setIsLoading(false)
        // if (res.result?.status != 0) {
        //   if (res.result?.errorText)
        //     snackBarRef.current.show(res.result?.errorText, 2);
        //   return;
        // };
        props.navigation.navigate('SignUpVerifyMobile', {
          requestId: res.result.requestId,
          mobile: formState.inputValues.mobile,
          email: formState.inputValues.email,
          password: formState.inputValues.password,
          confirmPassword: formState.inputValues.confirmPassword,
          name: formState.inputValues.name,
          family: formState.inputValues.family,
          iso: selectedCountry?.iso,
          phoneCode: selectedCountry?.phoneCode,
          countryId: selectedCountry?.countryId
        });
      }).catch((err) => {
        setIsLoading(false);
        Keyboard.dismiss();
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
    sendVerifyMobileNumberCustomer();
    // customerRegister();
  }, [formState]);

  const snackBarRef = useRef(null);

  const createAccountPressHandler = () => {
    // snackBarRef.current.show('sdfsdfdsfdsfsdfsdfsfsfsfs', 1);
    submitHandler();
  }

  const getAcitveCountries = () => {
    clientForm.getAciveCountries()
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setCountries(result);
      }).catch((err) => {

      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    getAcitveCountries();
  }, []);

  const onSelectCountry = (item) => {
    setSelectedCountry(item);
    mobileInputRef?.current?.validatePhoneNumberTry(formState.inputValues.mobile, item.iso);
    setModalVisible(false);
  };

  const onLoginPressHandler = () => {
    props.navigation.navigate('SignIn')
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{flex: 1}}
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
              <Text style={styles.createAccountText}>{Languages.Profile.CreateAjyalAccount}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.MobileNumber}
                  placeholder={Languages.Placeholder.EnterMobileNumber}
                  id="mobile"
                  selectableMobilePrefix={true}
                  countryCode={selectedCountry?.iso}
                  phonePrefix={selectedCountry?.phoneCode}
                  phonePrefixFlagUrl={selectedCountry?.flagUrl}
                  onSelectMobileCodePress={openModal}
                  required={true}
                  initialValue={''}
                  editable={true}
                  phoneNumber
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  ref={mobileInputRef}
                  enableRealTimeTextChangeListener={true}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.Email}
                  placeholder={Languages.Placeholder.EnterEmailSAddress}
                  id="email"
                  minLength={4}
                  maxLength={50}
                  required={true}
                  initialValue={''}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  email={true}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                  keyboardType={'email-address'}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.Password}
                  placeholder={Languages.Placeholder.EnterPassword}
                  id="password"
                  minLength={6}
                  maxLength={400}
                  initialValue={''}
                  editable={true}
                  required={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  isPassword={true}
                  enableRealTimeTextChangeListener={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.InputLabels.ConfirmPassword}
                  placeholder={Languages.Placeholder.EnterConfirmPassword}
                  isPassword={true}
                  id="confirmPassword"
                  initialValue={''}
                  maxLength={400}
                  editable={true}
                  matchPassword={formState.inputValues.password}
                  checkMatchPassword={true}
                  required={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  isPassword={true}
                  enableRealTimeTextChangeListener={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.Profile.Name}
                  placeholder={Languages.Placeholder.EnterYourName}
                  id="name"
                  initialValue={''}
                  maxLength={30}
                  editable={true}
                  required={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <MainInput
                  lableText={Languages.Profile.Family}
                  placeholder={Languages.Profile.EnterYourFamily}
                  id="family"
                  initialValue={''}
                  maxLength={50}
                  editable={true}
                  required={true}
                  onInputChange={inputChangeHandler}
                  formSubmitted={formSubmitted}
                  enableRealTimeTextChangeListener={true}
                />
              </View>

              <View style={styles.textAndForgetContainer}>
                <MainButton onPress={createAccountPressHandler}>{Languages.Common.CreateAnAccount}</MainButton>
              </View>

            </View>


            <View style={styles.bottomSection}>
              <View style={styles.bottomTexts}>
                <Text style={styles.firstText}> {Languages.Profile.HaveAnAccount} </Text>
                <Text onPress={onLoginPressHandler} style={styles.bottomLoginText}>{Languages.Profile.LogIn}</Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectCountryModal
        countries={countries}
        isLoading={false}
        onRequestClose={closeModal}
        visible={modalVisible}
        onSelectCountry={onSelectCountry}
        selectedCountryId={selectedCountry?.countryId}
      />

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default SignUpScreen;
