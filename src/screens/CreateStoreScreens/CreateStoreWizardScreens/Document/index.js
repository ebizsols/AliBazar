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
  MainInput, MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  RadioButton,
  UploadImageBox
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";

import BahrainIcon from 'assets/icons/countries/bahrain.svg';
import { clientAuth } from 'api/client';
import { CommonActions } from '@react-navigation/native';


const Document = (props) => {

  const snackBarRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitHandler = () => {
    if (formSubmitted == false)
      setFormSubmitted(true);

    // let selectedFilesLength = 0;
    // for (let index = 0; index < props.files?.length; index++) {
    //   if (props.files[index])
    //     selectedFilesLength += 1;
    // }

    // if (selectedFilesLength == props.activeDocuments?.length) {
    //   props.goToNexStep();
    // }
    props.goToNexStep();
  }

  return (
    <>
      {props.isLoading == true ? <RequestLoader /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.topContainer}>
            <Text style={styles.topText}>{Languages.CreateStore.DocumentVerification}</Text>
          </View>

          <View style={{ flex: 1, flexGrow: 1, flexShrink: 2 }}>

            {props.activeDocuments?.map((item, index) => {
              return (
                <View key={item.documentTypeId} style={{ marginTop: index > 0 ? Scale.moderateScale(50) : 0 }}>
                  <UploadImageBox
                    // isInvalid={formSubmitted && !!!props.files[index]}
                    fileName={props.files[index]?.fileName}
                    uri={props.files[index]?.uri}
                    onPress={() => props.requestSelectImage('document', item.documentTypeId, index)}
                    lableText={Languages.CreateStore.UploadWithTitle(item.documentTitle)}
                  />
                </View>
              )
            })}


            {/* <View style={{ marginTop: Scale.moderateScale(50) }}>
              <UploadImageBox
                lableText={'Upload National ID'}
              />
              <Text style={styles.bottomText}>(Emirates ID, Saudi Iqama or Passport copy with VISA)</Text>
            </View> */}

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


export default Document;
