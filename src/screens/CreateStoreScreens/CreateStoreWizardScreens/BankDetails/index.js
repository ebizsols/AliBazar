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
import { clientAuth } from 'api/client';
import styles from './style'
import {
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  DropdownPickerInput,
  UploadImageBox
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';

const currencyOptions = [
  { value: 0, label: Languages.CreateStore.Dollar },
  { value: 1, label: Languages.CreateStore.Dinar },
];

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

const BankDetails = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      beneficiaryName: null,
      bankName: null,
      branchName: null,
      accountNumber: null,
      iBANNumber: null,
      swiftCode: null
    },
    inputValidities: {
      beneficiaryName: false,
      bankName: false,
      branchName: false,
      accountNumber: false,
      iBANNumber: false,
      swiftCode: false
    },
    formIsValid: false
  });

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

    // let selectedFilesLength = 0;
    // for (let index = 0; index < props.files?.length; index++) {
    //   if (props.files[index])
    //     selectedFilesLength += 1;
    // }

    // if (selectedFilesLength == props.activeDocuments?.length) {
    //   props.goToNexStep(formState.inputValues);
    // }
    props.goToNexStep(formState.inputValues);
  }, [formState, props.activeDocuments, props.files]);



  return (
    <>
      {props.isLoading == true ? <RequestLoader /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.topContainer}>
            <Text style={styles.topText}>{Languages.CreateStore.BankDetails}</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.BeneficiaryName}
                placeholder={Languages.Placeholder.EnterBeneficiaryName}
                id="beneficiaryName"
                // minLength={4}
                // maxLength={50}
                required={false}
                initialValue={''}
                editable={true}
                enableRealTimeTextChangeListener={true}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.BankName}
                placeholder={Languages.Placeholder.EnterBankName}
                id="bankName"
                // minLength={6}
                // maxLength={50}
                initialValue={''}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={false}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.BranchName}
                placeholder={Languages.Placeholder.EnterBranchName}
                id="branchName"
                initialValue={''}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={false}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.AccountNumber}
                placeholder={Languages.Placeholder.EnterAccountNumber}
                id="accountNumber"
                initialValue={''}
                // maxLength={50}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={false}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.IBANNumber}
                placeholder={Languages.Placeholder.EnterIBANNumber}
                id="iBANNumber"
                initialValue={''}
                // maxLength={50}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={false}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <MainInput
                lableText={Languages.InputLabels.SwiftCode}
                placeholder={Languages.Placeholder.EnterSwiftCode}
                id="swiftCode"
                initialValue={''}
                // maxLength={50}
                editable={true}
                enableRealTimeTextChangeListener={true}
                required={false}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>
            <View style={styles.inputContainer}>
              <DropdownPickerInput
                lableText={Languages.InputLabels.Currency}
                showLabel={true}
                items={currencyOptions}
                selectedValue={props.selectedCurrencyId}
                itemValue={"value"}
                itemTitle={"label"}
                onValueChange={props.currencyTypeChanged}
                formSubmitted={formSubmitted}
              />
            </View>

            {props.activeDocuments?.map((item, index) => {
              return (
                <View key={item.documentTypeId} style={{ marginTop: index > 0 ? Scale.moderateScale(50) : 0 }}>
                  <UploadImageBox
                    // isInvalid={formSubmitted && !!!props.files[index]}
                    fileName={props.files[index]?.fileName}
                    uri={props.files[index]?.uri}
                    onPress={() => props.requestSelectImage('bankDetails', item.documentTypeId, index)}
                    lableText={Languages.CreateStore.UploadWithTitle(item.documentTitle)}
                  />
                </View>
              )
            })}
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


export default BankDetails;
