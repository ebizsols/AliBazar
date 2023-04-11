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
  SafeAreaView
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
  RadioButton
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import PenIcon from "assets/icons/pen.svg";
import { DeviceStorage } from "services";

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'

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


const ShippingAddressVerifyPhoneScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userName: null,
      firstName: null,
      lastName: null
    },
    inputValidities: {
      userName: true,
      firstName: false,
      lastName: false
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {

  }, []);

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

  const textChangeHandler = (value) => {
    if (props.onTextChange)
      props.onTextChange(value);
  };

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }

  }, [formState]);

  const changePhoneNumberPressHandler = () => {
    props.navigation.navigate('ShippingAddressChangeMobile');
  }

  const snackBarRef = useRef(null);

  return (
    <>
      <View>
        {isLoading == true ? <RequestLoader /> : null}

        <CommonHeader title={'Shipping Address'} showBackIcon={true} />

        <SafeAreaView>
          <ScrollView contentContainerStyle={{ minHeight: '100%' }} >
            <ShadowWrapper
              shadowContainerStyle={styles.shadowContainerStyle}
              contentContainer={styles.shadowContainerStyle}
            >
              <View style={styles.contentContainer}>
                <View style={styles.topSection}>
                  <Text style={styles.topFirstText}>{Languages.Address.PleaseVerifyMobileNumberToContinue}</Text>
                  <Text style={styles.topSecText}>{Languages.Address.ToProceedToCheckoutOTPVerifyMobileNumber}</Text>
                </View>
                <View style={styles.phoneNumberContainer}>
                  <Text style={styles.phoneNumberText}>+20-12-78727827</Text>
                </View>
                <TouchableOpacity onPress={changePhoneNumberPressHandler} style={styles.changePhoneContainer}>
                  <Text style={styles.changePhoneText}>{Languages.Address.ChangePhoneNumber}</Text>
                </TouchableOpacity>
                <View style={styles.verifyCodeContainer}>
                  <OTPInputView
                    autoFocusOnLoad
                    style={styles.otpContainer}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                      console.log(`Code is ${code}, you are good to go!`)
                    }}
                    pinCount={4} />
                </View>
                <View style={styles.resendContainer}>
                  <Text style={styles.resendFirstText}>{Languages.Address.DidNotReceiveOTP} </Text>
                  <Text style={styles.resendSecText}>{Languages.Common.ResendNow}</Text>
                </View>
                {/* <View style={styles.skipContainer}>
                  <Text style={styles.skipText}>{Languages.Common.Skip}</Text>
                </View> */}
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


export default ShippingAddressVerifyPhoneScreen;
