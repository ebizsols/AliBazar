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
import TopicItem from './TopicItem';
const { width, height } = Dimensions.get('window');


const TopicDetailScreen = (props) => {

  const snackBarRef = useRef(null);

  const [isLoading, setIsLoading] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);

  const { title, topicId } = props.route.params;

  const getHelpParentTopicDetail = () => {
    setIsLoading(true);
    clientHome.getHelpParentTopicDetail(topicId)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        setTopicDetail(res.result);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    getHelpParentTopicDetail();
  }, []);

  const onPressArticleHandler = (articleId) => {
    props.navigation.navigate('ArticleDetail', { articleId: articleId });
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitleText}>{topicDetail?.title}</Text>
            <Text style={styles.articleCountText}>{Languages.HelpCenter.ArticlesCount(topicDetail?.articleCount)}</Text>
            <Text style={styles.headerDescription}>{topicDetail?.description}</Text>
          </View>

          {topicDetail?.childs?.map((item, index) => {
            return (
              <View key={item.topicId}>
                <View style={styles.topicItemContainer}>
                  <TopicItem onPressArticle={onPressArticleHandler} data={item} />
                </View>
                {index != topicDetail?.childs?.length - 1 ?
                  <View style={styles.itemLine}></View>
                  :
                  null}
              </View>
            )
          })}
        </View>

      </ScrollView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default TopicDetailScreen;

const tempData = {
  "articleCount": 4,
  "childs": [
    {
      "articleCount": 2,
      "articles": [
        {
          "articleId": 52,
          "subject": "من نحن",
          "topic": "About us"
        },
        {
          "articleId": 53,
          "subject": "التزامنا تجاهك",
          "topic": "About us"
        }
      ],
      "title": "About us",
      "topicId": 39,
      "topicParentId": 17,
      "topicParentTitle": "About Ajyal"
    },
    {
      "articleCount": 2,
      "articles": [],
      "title": "Contact us",
      "topicId": 40,
      "topicParentId": 17,
      "topicParentTitle": "About Ajyal"
    }
  ],
  "description": "Ajyal is an easy and secure marketplace platform for people to discover and shop the products they love.",
  "iconUrl": "0a117d8c-e370-43a7-a353-f700c5386755.png",
  "title": "About Ajyal",
  "topicId": 17
}