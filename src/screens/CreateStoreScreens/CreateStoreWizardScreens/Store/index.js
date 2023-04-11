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
  TouchableOpacity
} from 'react-native';
import { clientAuth } from 'api/client';
import styles from './style'
import {
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  DropdownPickerInput
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";
import MarkerIcon from 'assets/icons/map-marker.svg';

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';
import { Colors } from 'styles';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const personTypes = [
  { value: 1, label: Languages.CreateStore.Legal },
  { value: 2, label: Languages.CreateStore.Natural },
];


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

const Store = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullName: null,
      companyLegalName: null,
      // phoneNumber: null,
      storeName: null,
      address: null
    },
    inputValidities: {
      fullName: false,
      companyLegalName: false,
      // phoneNumber: false,
      storeName: false,
      address: false
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (props.route.params?.editLocationAddress) {
      props.locationAddressChanged(props.route.params?.editLocationAddress?.lat, props.route.params?.editLocationAddress?.lng);
      if (!!!formState.inputValues.address)
        inputChangeHandler('address', props.route.params?.editLocationAddress?.description, true);
    }
    // {"countryCode": "BH", "description": "Unnamed Road, Bahrain", "lat": 26.0333024217797, "lng": 50.5324674770236, "name": "Al-Muḥāfaẓat al-Janūbīyah"}
  }, [props.route.params?.editLocationAddress]);

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      if (props.selectedPersonType == 1) {
        // legal
        let invalidCount = 0;
        let fullNameIsValid = formState.inputValidities['fullName'];
        for (const key in formState.inputValidities) {
          const value = formState.inputValidities[key];
          if (value == false) {
            invalidCount += 1;
          }
        }
        console.log('invalidCount', invalidCount);
        console.log('fullNameIsValid', fullNameIsValid);
        if (fullNameIsValid == false && invalidCount == 1) {
          console.log('you good to go');
        } else {
          console.log('validation error');
          return;
        }
      }

      if (props.selectedPersonType == 2) {
        // legal
        let invalidCount = 0;
        let companyLegalNameIsValid = formState.inputValidities['companyLegalName'];
        for (const key in formState.inputValidities) {
          const value = formState.inputValidities[key];
          if (value == false) {
            invalidCount += 1;
          }
        }
        console.log('invalidCount', invalidCount);
        console.log('companyLegalNameIsValid', companyLegalNameIsValid);
        if (companyLegalNameIsValid == false && invalidCount == 1) {
          console.log('you good to go');
        } else {
          console.log('validation error');
          return;
        }
      }
      // return;
    }
    if (props.selectedCategoryId == null) {
      return;
    }
    console.log('props.goToNexStep(formState.inputValues)');
    props.goToNexStep(formState.inputValues);
  }, [formState, props.selectedPersonType, props.selectedCategoryId]);

  const personTypeValueChanged = (value, index) => {
    props.selectedPersonTypeChange(value);
  }

  const categorySelectHandler = (value, index) => {
    props.categorySelectHandler(value);
  }

  const onSelectAddressOnMapPressHandler = () => {
    const locationModel = { lat: props.lat, lng: props.lng };
    props.navigation.navigate('AddressMap', {
      afterSaveScreen: 'CreateStore',
      editLocation: locationModel,
      cityLocation: props.cityLocation,
      iso: props.iso
    });
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <DropdownPickerInput
                lableText={Languages.CreateStore.Person}
                showLabel={true}
                items={personTypes}
                selectedValue={props.selectedPersonType}
                itemValue={"value"}
                itemTitle={"label"}
                showRequireStart={true}
                onValueChange={personTypeValueChanged}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              {props.selectedPersonType == 1 ?
                <MainInput
                  lableText={Languages.InputLabels.CompanyLegalName}
                  placeholder={Languages.Placeholder.EnterCompanyLegalName}
                  id="companyLegalName"
                  minLength={2}
                  maxLength={100}
                  required={true}
                  showRequireStart={true}
                  initialValue={formState.inputValues.companyLegalName}
                  enableRealTimeTextChangeListener={true}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  // email={true}
                  formSubmitted={formSubmitted}
                />
                :
                null}
              {props.selectedPersonType == 2 ?
                <MainInput
                  lableText={Languages.InputLabels.FullName}
                  placeholder={Languages.Placeholder.EnterFullName}
                  id="fullName"
                  minLength={2}
                  maxLength={100}
                  showRequireStart={true}
                  required={true}
                  initialValue={formState.inputValues.fullName}
                  enableRealTimeTextChangeListener={true}
                  editable={true}
                  onInputChange={inputChangeHandler}
                  // email={true}
                  formSubmitted={formSubmitted}
                />
                :
                null}
            </View>
            {/* <View style={styles.inputContainer}>
              <MainInput
                lableText={props.selectedPersonType == 1 ? Languages.InputLabels.CompanyPhoneNumber : Languages.InputLabels.PhoneNumber}
                placeholder={props.selectedPersonType == 1 ? Languages.Placeholder.EnterCompanyPhoneNumber : Languages.Placeholder.EnterPhoneNumber}
                id="phoneNumber"
                // minLength={6}
                // maxLength={50}
                countryCode={props.iso}
                showPhonePrefix={true}
                phoneNumber={true}
                phonePrefix={'+' + (props.phonePrefix)}
                initialValue={''}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={true}
                showRequireStart={true}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View> */}
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.WhatsYourStoreName}
                placeholder={Languages.Placeholder.EnterStoreName}
                id="storeName"
                initialValue={''}
                editable={true}
                required={true}
                showRequireStart={true}
                enableRealTimeTextChangeListener={true}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>

            <View style={styles.inputContainer}>
              <DropdownPickerInput
                lableText={Languages.InputLabels.WhatKindOfProductDoYouSell}
                showLabel={true}
                placeholder={Languages.Placeholder.SelectKindOfProduct}
                items={props.categories}
                selectedValue={props.selectedCategoryId}
                itemValue={"categoryId"}
                itemTitle={"categoryTitle"}
                onValueChange={categorySelectHandler}
                showRequireStart={true}
                formSubmitted={formSubmitted}
              />
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={onSelectAddressOnMapPressHandler}
                style={[styles.selectAddressBox]}>
                {props.lat == 0 ?
                  <Text style={styles.selectAddressBoxText}>{Languages.CreateStore.SelectAddressFromMap}</Text>
                  :
                  <Text style={styles.selectAddressBoxSelectedText}>{Languages.CreateStore.LocationSelected}</Text>
                }
                <View>
                  <MarkerIcon
                    style={{ color: props.lat != 0 ? '#fe1743' : Colors.BOMBAY }}
                    width={Scale.moderateScale(30)}
                    height={Scale.moderateScale(30)}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <MainInput
                id="address"
                lableText={Languages.InputLabels.FullAddress}
                inputStyle={styles.commentInputStyle}
                placeholder={Languages.Placeholder.EnterFullAddress}
                initialValue={formState.inputValues.address}
                // maxLength={50}
                editable={true}
                required={false}
                // showRequireStart={true}
                enableRealTimeTextChangeListener={true}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
          </View>

        </View>
      </ScrollView>

      <FloatButtonWrapper>
        <MainButton onPress={submitHandler}>
          {Languages.Common.Next}
        </MainButton>
      </FloatButtonWrapper>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default Store;
