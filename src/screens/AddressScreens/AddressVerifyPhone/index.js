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

// todo: Change here must apply to ShippingAddressVerifyPhoneScreen too
const AddressVerifyPhoneScreen = (props) => {

  const dispatch = useDispatch();

  const setShippingAddressRedux = useCallback((value) => {
    dispatch(setShippingAddressChange(value))
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(null);
  const [code, setCode] = useState(null);
  const [screenData, setScreenData] = useState({
    requestId: null
  })

  const { addressId, requestId, mobile, countryCode, phoneCode } = props.route.params; // data => {"addressId": 57, "errorText": null, "requestId": "60b15f214dce4b5eb54545a387ebfce1", "status": "0"}
  console.log('addressId', addressId);
  console.log('requestId', requestId);
  console.log('mobile', mobile);
  console.log('countryCode', countryCode);
  console.log('phoneCode', phoneCode);

  const countDownRef = useRef();

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (props.route.params?.fireMobileChanged) {
      console.log('[AddressVerifyPhone] fire mobile change');
      countDownRef.current.resetTimer();
    }
  }, [props.route.params?.fireMobileChanged]);

  const verifyMobileNumberAddress = () => {
    if (code === null || code === undefined)
      return;
    setIsLoading(true);
    clientProfile.verifyMobileNumberAddress(addressId, code, screenData.requestId || requestId)
      .then((response) => {
        const res = response.data;

        setIsLoading(false);
        if (props.route.params?.afterScreen) {
          if (props.route.params?.afterScreen == 'ShippingAddress') {
            setShippingAddressRedux((Math.random() + 1) * 100);
          }
          props.navigation.navigate(props.route.params?.afterScreen, props.route.params?.afterScreenParams);
          return;
        }
        props.navigation.navigate('Addresses', { fireChange: Math.random() + 2 })
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        Keyboard.dismiss();
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const resendCode = () => {
    setIsLoading(true);
    console.log(mobile);
    console.log(addressId);
    clientProfile.changeMobileNumberAddress(addressId, mobile)
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setScreenData((prev) => ({
          ...prev,
          requestId: res.result.requestId
        }))

        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        Keyboard.dismiss();
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const submitHandler = () => {
    verifyMobileNumberAddress();
  };

  const changePhoneNumberPressHandler = () => {
    props.navigation.navigate('ChangeAddressMobile', {
      addressId: addressId,
      countryCode: countryCode,
      phoneCode: phoneCode,
      afterScreen: props.route.params?.afterScreen,
      afterScreenParams: props.route.params?.afterScreenParams
    });
  }

  const resendPressHandler = () => {
    resendCode();
  }

  const onSkipPressHandler = () => {
    if (props.route.params?.afterScreen) {
      if (props.route.params?.afterScreen == 'ShippingAddress') {
        setShippingAddressRedux((Math.random() + 1) * 100);
      }
      props.navigation.navigate(props.route.params?.afterScreen, props.route.params?.afterScreenParams);
      return;
    }
    props.navigation.navigate('Addresses', { fireChange: Math.random() + 1 })
  }

  const snackBarRef = useRef(null);

  return (
    <>

      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Address.AddAddress} showBackIcon={true} />


      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1, backgroundColor: Colors.WHITE }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView keyboardShouldPersistTaps='handled'
          contentContainerStyle={{}}>
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
                <Text style={styles.phoneNumberText}>{Tools.formatPhoneNumber(mobile, countryCode)}</Text>
              </View>
              <TouchableOpacity onPress={changePhoneNumberPressHandler} style={styles.changePhoneContainer}>
                <Text style={styles.changePhoneText}>{Languages.Address.ChangePhoneNumber}</Text>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={onSkipPressHandler} style={styles.skipContainer}>
                <Text style={styles.skipText}>{Languages.Common.Skip}</Text>
              </TouchableOpacity>
            </View>
          </ShadowWrapper>
        </ScrollView>

        <FloatButtonWrapper containerStyle={{
          // position: "absolute",
          // width: '100%',
          // bottom: 0
        }}>
          <MainButton onPress={submitHandler}>
            {Languages.Address.SubmitVerifyPhone}
          </MainButton>
        </FloatButtonWrapper>

      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default AddressVerifyPhoneScreen;
