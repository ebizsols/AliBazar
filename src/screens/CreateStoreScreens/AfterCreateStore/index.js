/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  useWindowDimensions
} from 'react-native';
import styles from './style'
import { FloatButtonWrapper, HtmlWebviewRender, MainButton, RequestLoader, SnackBar } from 'components/UI';
import { Constants, Languages, Scale } from 'common';

import CloseIcon from 'assets/icons/close-gray.svg';
import TickIcon from 'assets/icons/big-tick.svg';
import { CommonActions } from '@react-navigation/native';
import { clientForm } from 'api/client';
import HTML from "react-native-render-html";


const AfterCreateStoreScreen = (props) => {

  const snackBarRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const contentWidth = useWindowDimensions().width;

  const [description, setDescription] = useState();


  const backToHomePressHandler = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  }

  const getRegistrationFinalMessage = () => {
    setIsLoading(true);

    clientForm.getRegistrationFinalMessage()
      .then((response) => {
        const res = response.data;

        setIsLoading(false);
        setDescription(res.result.description);

      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

  };

  useEffect(() => {
    getRegistrationFinalMessage();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    backToHomePressHandler();
    return true;
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={backToHomePressHandler} style={styles.closeIconWrapper}>
              <CloseIcon
                width={Scale.moderateScale(30)}
                height={Scale.moderateScale(30)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tickIconContainer}>
            <TickIcon
              width={Scale.moderateScale(120)}
              height={Scale.moderateScale(120)}
            />
          </View>

          {/* <View style={styles.topTextsContainer}>
            <Text style={styles.firstText}>{Languages.AfterCreateStore.ThankYou}</Text>
            <Text style={styles.secText}>{Languages.AfterCreateStore.YourStoreHasBeenCreated}</Text>
          </View>

          <View style={styles.contentTextsContainer}>
            <Text style={styles.contentText}>{Languages.AfterCreateStore.PleaseAllowUsToCheck}</Text>
            <Text style={styles.contentText}>{Languages.AfterCreateStore.IfYouHaveAnyConcerns(styles.emailText, "seller@ajyal.com")}</Text>
          </View> */}
          <View>
            {/* <HTML html={description} contentWidth={contentWidth} /> */}
            <HtmlWebviewRender type={Constants.HtmlWebviewRenderComponentTypes.AfterCreateStore} />
          </View>

        </View>

      </ScrollView>

      <FloatButtonWrapper>
        <MainButton onPress={backToHomePressHandler}>{Languages.Common.BackToHome}</MainButton>
      </FloatButtonWrapper>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default AfterCreateStoreScreen;
