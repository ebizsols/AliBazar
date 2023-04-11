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
import { useDispatch } from 'react-redux';
import { setShippingAddressChange } from 'store/actions/fireChange.action';

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

// todo: Change here must apply to ShippingAddressChangeMobileScreen too
const ChangeAddressMobileScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      mobile: null
    },
    inputValidities: {
      mobile: false
    },
    formIsValid: false
  });

  const dispatch = useDispatch();

  const setShippingAddressRedux = useCallback((value) => {
    dispatch(setShippingAddressChange(value))
  }, [dispatch]);

  const { addressId, countryCode, phoneCode } = props.route.params;

  const [isLoading, setIsLoading] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const snackBarRef = useRef(null);

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

  const changeMobileNumberAddress = () => {
    setIsLoading(true);
    clientProfile.changeMobileNumberAddress(addressId, formState.inputValues.mobile)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        if (props.route.params?.afterScreen) {
          if (props.route.params?.afterScreen == 'ShippingAddress') {
            setShippingAddressRedux((Math.random() + 1) * 100);
          }
        }
        props.navigation.navigate('AddressVerifyPhone', { requestId: res.result.requestId, mobile: formState.inputValues.mobile, fireMobileChanged: Math.random() + 1 })
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
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
    changeMobileNumberAddress();
  }, [formState]);


  return (
    <>
      <View>
        {isLoading == true ? <RequestLoader /> : null}

        <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Address.AddAddress} showBackIcon={true} />

        <SafeAreaView>
          <ScrollView contentContainerStyle={{ minHeight: '100%' }} >
            <ShadowWrapper
              shadowContainerStyle={styles.shadowContainerStyle}
              contentContainer={styles.shadowContainerStyle}
            >
              <View style={styles.contentContainer}>
                <View style={styles.topSection}>
                  <Text style={styles.topFirstText}>{Languages.Address.ChangeNumber}</Text>
                  <Text style={styles.topSecText}>{Languages.Address.PleaseEnterMobileNumberSendNewOTP}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.MobileNumber}
                    placeholder={Languages.Placeholder.EnterMobileNumber}
                    id="mobile"
                    initialValue={''}
                    maxLength={50}
                    countryCode={countryCode}
                    showPhonePrefix={true}
                    phoneNumber={true}
                    phonePrefix={'+' + phoneCode}
                    editable={true}
                    enableRealTimeTextChangeListener={true}
                    showLabel={false}
                    required={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>
              </View>
              <View style={styles.cancelContainer}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Text style={styles.cancelText}>{Languages.Common.Cancel}</Text>
                </TouchableOpacity>
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


export default ChangeAddressMobileScreen;
