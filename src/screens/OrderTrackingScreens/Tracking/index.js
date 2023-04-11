/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useReducer, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { clientHome, clientProfile, clientUserActivity } from 'api/client';
import styles from './style'
import {
  AddressesHeader,
  AddressItem,
  BottomSheetBackView,
  BottomSheetHeader,
  CommonHeader
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainButton,
  SnackBar,
  RequestLoader,
  MainInput,
  FloatButtonWrapper
} from 'components/UI';
import { Languages, Scale } from 'common';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import CloseIcon from 'assets/icons/close-unfill-circle.svg';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyIcon from 'assets/icons/tracking.svg';

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


const TrackingScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      trackingCode: null
    },
    inputValidities: {
      trackingCode: false
    },
    formIsValid: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(null);

  const snackBarRef = useRef(null);

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
    getOrderWithCode();
  }, [formState]);

  const getOrderWithCode = () => {
    setIsLoading(true);
    clientHome.getOrderWithCode(formState.inputValues.trackingCode)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        // console.log(res);
        Keyboard.dismiss();
        props.navigation.navigate('TrackingOrder', { orderDetailRoute: res.result });
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        Keyboard.dismiss();
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.OrderTracking.OrderTracking} showBackIcon={true} />

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{}}>
          <View style={[styles.container]}>
            <View style={styles.emptyViewContainer}>
              <View style={styles.emptyTop}>
                <View style={styles.emptyIconContainer}>
                  <EmptyIcon
                    width={Scale.moderateScale(200)}
                    height={Scale.moderateScale(200)}
                  />
                </View>
              </View>
              <View style={styles.emptyMiddle}>
                <Text style={styles.emptyTextFirst}>{Languages.OrderTracking.TrackYourOrdersDetailsMoreInformation}</Text>
                {/* <Text style={styles.emptyTextSecond}>{Languages.OrderTracking.AddAnAddressGetCrackingDelivery}</Text> */}
                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.PleaseEnterYourOrderTrackingNumber}
                    placeholder={Languages.Placeholder.EnterOrderTrackingNumber}
                    id="trackingCode"
                    initialValue={''}
                    maxLength={150}
                    editable={true}
                    enableRealTimeTextChangeListener={true}
                    showLabel={true}
                    required={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <FloatButtonWrapper>
          <MainButton onPress={submitHandler}>{Languages.OrderTracking.Tracking}</MainButton>
        </FloatButtonWrapper>
      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default TrackingScreen;
