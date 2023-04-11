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
import { fcmService } from 'NotificationServices/FCMService';

const VerifyMobile = (props) => {

  const [code, setCode] = useState(null);

  const countDownRef = useRef();

  const changeRegisterDataPressHandler = () => {
    props.changeRegisterDataPressHandler()
  }

  return (
    <>
      <View>
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <Text style={styles.topFirstText}>{Languages.Address.PleaseVerifyMobileNumberToContinue}</Text>
            <Text style={styles.topSecText}>{Languages.Profile.ToProceedToRegisterOTPVerifyMobileNumber}</Text>
          </View>
          <View style={styles.phoneNumberContainer}>
            <Text style={styles.phoneNumberText}>{Tools.formatPhoneNumber(props.mobile, props.iso)}</Text>
          </View>
          <TouchableOpacity
            onPress={changeRegisterDataPressHandler}
            style={styles.changePhoneContainer}>
            <Text style={styles.changePhoneText}>{Languages.CreateStore.ChangeRegisterData}</Text>
          </TouchableOpacity>
          <View style={styles.verifyCodeContainer}>
            <OTPInputView
              autoFocusOnLoad={false}
              style={styles.otpContainer}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeChanged={(code) => {
                props.verifyCodeChanged(code);
              }}
              onCodeFilled={(code) => {
                setCode(code)
                console.log(`Code is ${code}, you are good to go!`)
              }}
              pinCount={4} />
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.resendFirstText}>{Languages.Address.DidNotReceiveOTP} </Text>
            {/* <Text style={styles.resendSecText}>{Languages.Common.ResendNow}</Text> */}
            <CountDown ref={countDownRef} minutes={5}
            // onResendPressed={resendPressHandler}
            />
          </View>
          {/* <TouchableOpacity onPress={onSkipPressHandler} style={styles.skipContainer}>
                  <Text style={styles.skipText}>{Languages.Common.Skip}</Text>
                </TouchableOpacity> */}
        </View>

      </View>
    </>
  );
};


export default VerifyMobile;
