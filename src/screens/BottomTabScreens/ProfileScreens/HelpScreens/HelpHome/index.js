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
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader, ProgressiveImage, ShadowWrapper } from 'components/UI';
import { CommonHeader } from 'components';
import { Languages, Scale, Constants, PathHelper, Tools } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";
import FastImage from 'react-native-fast-image';

import CloseIcon from 'assets/icons/close-gray.svg';
import { clientAuth, clientHome } from 'api/client';
import { CommonActions } from '@react-navigation/native';
import { Colors } from 'styles';
const { width, height } = Dimensions.get('window');

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

const HelpHomeScreen = (props) => {

  const snackBarRef = useRef(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userName: null,
      password: null
    },
    inputValidities: {
      userName: false,
      password: false
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageHeight, setHeaderImageHeight] = useState(10);
  const [helpTopics, setHelpTopics] = useState(null);

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

  const getHelpImage = () => {
    setIsLoading(true);
    clientHome.getHelpImage()
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        setHeaderImage(res.result);
        Image.getSize(PathHelper.getImageInLogoFolderPath(res.result), (mainWidth, mainHeight) => {
          let h = Tools.getImageHeight(width, mainWidth, mainHeight);
          setHeaderImageHeight(h);
        })
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const getHelp = () => {
    setIsLoading(true);
    clientHome.getHelp()
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        setHelpTopics(res.result)
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    getHelpImage();
    getHelp();
  }, []);

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    customerLogin();
  }, [formState]);

  const onTopicPressHandler = (item) => {
    props.navigation.navigate('TopicDetail', { title: item.title, topicId: item.topicId })
  }

  const onPressSearchHanlder = () => {
    props.navigation.navigate('ArticleSearchDialog')
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={Languages.HelpCenter.HelpCenter} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {headerImageHeight != null ?
              <ProgressiveImage
                borderRadius={Scale.moderateScale(1)}
                // imageStyle={{ width: width }}
                height={headerImageHeight < Scale.moderateScale(150) ? Scale.moderateScale(150) : headerImageHeight}
                width={width}
                source={PathHelper.getImageInLogoFolderPath(headerImage)}
                resizeMode={FastImage.resizeMode.cover}
              />
              :
              null}
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={onPressSearchHanlder} activeOpacity={1} style={styles.headerInputContainer}>
                <MainInput
                  closeIconColor={Colors.WHITE}
                  showSearchIconLeft={true}
                  inputStyle={styles.input}
                  labelTextstyle={styles.inputLabel}
                  placeholderTextColor={Colors.WHITE}
                  showLabel={true}
                  lableText={Languages.HelpCenter.HowCanWeHelp}
                  initialValue={''}
                  editable={false}
                  showSearchIcon={true}
                  acceptEmptyInitialValue={true}
                  placeholder={Languages.HelpCenter.SearchTheHelpCenter}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.itemsContainer}>
            {helpTopics?.map((item, index) => {

              const iconSource = PathHelper.getTopicIconPath(item.iconUrl, item.topicId);

              return (
                <ShadowWrapper
                  key={item.topicId}
                  contentContainer={styles.shadowContentContainer}
                  shadowContainerStyle={styles.itemShadowContainer}>
                  <TouchableOpacity onPress={() => onTopicPressHandler(item)} activeOpacity={0.5} style={styles.itemContainer}>
                    <View style={styles.itemImageContainer}>
                      <ProgressiveImage
                        borderRadius={Scale.moderateScale(0)}
                        // imageStyle={{ width: width }}
                        height={Scale.moderateScale(50)}
                        width={Scale.moderateScale(50)}
                        source={iconSource}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <View style={styles.itemBodyContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                      <View style={styles.itemFooter}>
                        <View style={styles.itemLine}></View>
                        <Text style={styles.itemFooterText}>{Languages.HelpCenter.ArticlesCount(item.articleCount)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ShadowWrapper>
              )
            })}
          </View>
        </View>

      </ScrollView>

      <SnackBar
        ref={snackBarRef}
      />

    </>
  );
};


export default HelpHomeScreen;

const tempData = [
  {
    "articleCount": 4,
    "description": "Ajyal is an easy and secure marketplace platform for people to discover and shop the products they love.",
    "iconUrl": "0a117d8c-e370-43a7-a353-f700c5386755.png",
    "title": "About Ajyal",
    "topicId": 17
  }
]