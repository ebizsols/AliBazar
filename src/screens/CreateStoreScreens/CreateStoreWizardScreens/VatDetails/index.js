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
import {
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  RadioButton,
  UploadImageBox,
  TextWithRadio,
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";

import BahrainIcon from 'assets/icons/countries/bahrain.svg';
import { clientAuth } from 'api/client';
import { CommonActions } from '@react-navigation/native';


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

const VatDetails = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      taxRegistrationNumber: null
    },
    inputValidities: {
      taxRegistrationNumber: false
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
    //   console.log('good to go');
    //   props.goToNexStep(formState.inputValues);
    // }
    props.goToNexStep(formState.inputValues);
  }, [formState, props.activeDocuments, props.files, props.filesModel]);

  return (
    <>
      {props.isLoading == true ? <RequestLoader /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.topContainer}>
            <Text style={styles.topText}>{Languages.CreateStore.VATDetails}</Text>
          </View>

          <View>

            <View>
              <MainInput
                lableText={Languages.InputLabels.TaxRegistrationNumber}
                placeholder={Languages.Placeholder.EnterTaxRegistrationNumber}
                id="taxRegistrationNumber"
                initialValue={''}
                // maxLength={50}
                editable={true}
                required={false}
                enableRealTimeTextChangeListener={true}
                onInputChange={inputChangeHandler}
                formSubmitted={formSubmitted}
              />
            </View>

            {props.activeDocuments?.map((item, index) => {
              return (
                <View key={item.documentTypeId} style={{ marginTop: Scale.moderateScale(30) }}>
                  <UploadImageBox
                    // isInvalid={formSubmitted && !!!props.files[index]}
                    fileName={props.files[index]?.fileName}
                    uri={props.files[index]?.uri}
                    onPress={() => props.requestSelectImage('vatDetails', item.documentTypeId, index)}
                    lableText={Languages.CreateStore.UploadWithTitle(item.documentTitle)}
                  />
                </View>
              )
            })}

            <View style={{ marginTop: Scale.moderateScale(20) }}>
              <TextWithRadio
                onPress={props.toggleAgreed}
                boldTextWhenSelected={false}
                isSelected={props.agreed}
                textStyle={styles.radioText} isCheckBox={true}
                title={Languages.CreateStore.AgreedText} />
            </View>

          </View>

        </View>
      </ScrollView>

      <FloatButtonWrapper>
        <MainButton disabled={!props.agreed} onPress={submitHandler}>
          {Languages.Common.Submit}
        </MainButton>
      </FloatButtonWrapper>
    </>
  );
};


export default VatDetails;
