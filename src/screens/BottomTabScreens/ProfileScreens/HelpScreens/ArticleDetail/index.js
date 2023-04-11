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
  Image,
  useWindowDimensions,
  Animated as ReactAnimated,
  I18nManager
} from 'react-native';
import styles from './style'
import { MainInput, MainButton, SnackBar, RequestLoader, ProgressiveImage, ShadowWrapper, HtmlWebviewRender } from 'components/UI';
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
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import Collapsible from 'react-native-collapsible';


const htm333l = `
      <html>
      <head>
      <style>
      .test {
        font-size: 3em;
        
      }
      </style>
      </head>
      <body>
      <p class='test'>fdssfdsfdsfdsfdsfdsfdsfsdfdf</p>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("eeeeeeeeeeeeeeeeeeeeee!")
          }, 2000)
        </script>
      </body>
      </html>
    `;

const ArticleDetailScreen = (props) => {

  const _animatedRotate = useRef(new ReactAnimated.Value(isCollapsed ? 1 : 0)).current;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const contentWidth = useWindowDimensions().width;
  const snackBarRef = useRef(null);

  const [isLoading, setIsLoading] = useState(null);
  const [isAccepted, setIsAccepted] = useState(null);
  const [articleDetail, setArticleDetail] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [html, setHtml] = useState('');

  useEffect(() => {
    ReactAnimated.timing(_animatedRotate, {
      toValue: (isCollapsed) ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isCollapsed]);

  const getHelpArticle = (articleId) => {
    setIsLoading(true);
    clientHome.getHelpArticle(articleId)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        setArticleDetail(res.result);
        setHtml(res.result.description);
        if (isCollapsed == false)
          setIsCollapsed(true);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const helpArticleYesNo = (accept) => {
    clientHome.helpArticleYesNo(accept, articleId)
      .then((response) => {
        const res = response.data;
      }).catch((err) => {
        console.log('err', err);
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    if (props.route?.params?.articleId) {
      setArticleId(props.route?.params?.articleId);
      getHelpArticle(props.route?.params?.articleId);
    }
    // getHelpArticle(articleId);
  }, [props.route?.params?.articleId]);

  useEffect(() => {
    // getHelpArticle(articleId);
  }, []);

  const helpfullPressHandler = (accept) => {
    if (accept == isAccepted)
      return;
    setIsAccepted(accept);
    helpArticleYesNo(accept);
  }

  const onOtherArticlePressHanlder = (articleId) => {
    setIsAccepted(null);
    setArticleId(articleId);
    getHelpArticle(articleId);
  }

  const rotateStyle = {
    transform: [
      {
        rotate: _animatedRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', I18nManager.isRTL ? '180deg' : '180deg'],
        }),
      }
    ]
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={Languages.HelpCenter.Article} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>

        <View style={styles.contentContainer}>

          <View style={{ paddingHorizontal: Scale.moderateScale(20), }}>
            <TouchableOpacity style={[styles.header]} onPress={() => setIsCollapsed(!isCollapsed)}>
              <Text style={styles.otherArticlesText}>
                {Languages.HelpCenter.ArticlesInThisSection}
              </Text>
              <ReactAnimated.View style={[rotateStyle]}>
                <ArrowIcon style={{ color: Colors.BIGSTONE }}
                  width={Scale.moderateScale(12)}
                  height={Scale.moderateScale(12)} />
              </ReactAnimated.View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
              <View style={styles.otherArticlesContainer}>
                {articleDetail?.articles?.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => onOtherArticlePressHanlder(item.articleId)} key={item.articleId} style={styles.otherArticleItem}>
                      <Text style={styles.otherArticleItemText}>{item.subject}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Collapsible>
          </View>


          <View style={styles.articleTexts}>
            <View style={{ paddingHorizontal: Scale.moderateScale(20), }}>
              <Text style={styles.headerTitleText}>{articleDetail?.subject}</Text>
            </View>
            <View>
              {/* <HTML html={html} contentWidth={contentWidth} /> */}
              <HtmlWebviewRender type={Constants.HtmlWebviewRenderComponentTypes.Article} articleId={articleId} />
              {/* <WebView
                source={{ html }}
                onMessage={(event) => {
                  alert(event.nativeEvent.data);
                }}
              /> */}
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.bottomSection}>
        <Text style={styles.wasHelpfulText}>{Languages.HelpCenter.WasArticleHelpful}</Text>
        <TouchableOpacity onPress={() => helpfullPressHandler(true)} style={[styles.button, isAccepted == true ? styles.activeBtn : {}]}>
          <Text style={[styles.buttonText, isAccepted == true ? styles.activeBtnText : {}]}>{Languages.Common.Yes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => helpfullPressHandler(false)} style={[styles.button, isAccepted == false ? styles.activeBtn : {}]}>
          <Text style={[styles.buttonText, isAccepted == false ? styles.activeBtnText : {}]}>{Languages.Common.No}</Text>
        </TouchableOpacity>
      </View>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ArticleDetailScreen;