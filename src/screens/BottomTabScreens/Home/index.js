/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Platform,
  ScrollView,
  Linking,
  Modal,
  StyleSheet,
  Button
} from 'react-native';
import { clientHome } from 'api/client';
import styles from './style'

import {
  ModuleSelection,
  HomeHeader,
  SliderShimmer,
  CategoryCarouselShimmer,
  ProductCarouselShimmer,
  ImageModulShimmer
} from 'components';
import { Scale } from 'common';
import messaging from '@react-native-firebase/messaging';
import WebView from 'react-native-webview';


const HomeScreen = (props) => {

  const [webHomeModuleList, setWebHomeModuleList] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getHomeData = () => {
    setIsLoading(true);
    clientHome.getHomeData()
      .then((response) => {
        const res = response.data;
        // console.log(res.result);
        const sliderModule = {
          iModuleId: 0,
          fkModuleId: 0,
          sliders: res.result.slider
        }
        const webModuleList = res.result.webHomeModuleList;

        // webModuleList[1].webModuleCollections[0].goods[0].shippingPossibilities = true;
        // webModuleList[1].webModuleCollections[0].goods[0].surveyScore = 3.4;
        // webModuleList[1].webModuleCollections[0].goods[0].surveyCount = 14;
        // webModuleList[1].webModuleCollections[0].goods[0].finalPrice = 18000.50;
        // webModuleList[1].webModuleCollections[0].goods[0].discountPercentage = 10;
        // webModuleList[1].webModuleCollections[0].goods[0].surveyCount = 14;
        // webModuleList[1].webModuleCollections[0].goods[0].title = "10 Cups Drip Coffee Maker With Glass Carafe 1.25L 8 is the best";

        // webModuleList[1].webModuleCollections[0].goods[1].finalPrice = 17000;
        // webModuleList[1].webModuleCollections[0].goods[1].discountAmount = 10;

        // webModuleList[1].webModuleCollections[0].goods[1].discountAmount = 3000;
        // webModuleList[1].webModuleCollections[0].goods[1].discountAmount = 2000;

        webModuleList.unshift(sliderModule); // Add slider to top of array to show in FlatList
        setWebHomeModuleList(webModuleList);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        console.log('[HomeScreen | getHomeData()]', err);
      })
  };

  const onCategoryItemPressHandler = (item, type) => {

    props.navigation.navigate("Search", { type: type, id: item?.collectionId })

  }

  const onSliderItemPressHanlder = (item, type) => {
    props.navigation.navigate("Search", { type: type, id: item.sliderId })
  }

  const onImageItemPressHandler = (item, type) => {
    props.navigation.navigate("Search", { type: type, id: item?.collectionId })
    /*  if (item.haveLink == true) {
       Linking.canOpenURL(item.linkUrl).then(supported => {
         if (supported) {
           Linking.openURL(item.linkUrl);
         } else {
           try {
             Linking.openURL(item.linkUrl);
           } catch (error) {
             console.log('Error in openning: ', error);
           }
           console.log("Don't know how to open URI: " + item.linkUrl);
         }
       });
     } else {
       props.navigation.navigate("Search", { type: type, id: item?.collectionId })
     } */
  }

  const onProductItemPressHandler = (item) => {
    props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  useEffect(() => {
    getHomeData();
  }, []);

  useEffect(() => {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage && remoteMessage.data && remoteMessage.data?.HasNavigate == '1') {
            const params = remoteMessage.data.Params ? JSON.parse(remoteMessage.data.Params) : {};
            props.navigation.navigate(remoteMessage.data.ScreenName, params);
          }
          if (remoteMessage && remoteMessage.data && remoteMessage.data?.HasLink == '1') {
            Linking.canOpenURL(remoteMessage.data?.Link).then(supported => {
              if (supported) {
                Linking.openURL(remoteMessage.data?.Link);
              } else {
                try {
                  Linking.openURL(remoteMessage.data?.Link);
                } catch (error) {
                  console.log('Error in openning: ', error);
                }
                console.log("Don't know how to open URI: " + remoteMessage.data?.Link);
              }
            });
          }
        }
      });
  }, [])


  const _renderItem = useCallback(({ item }) => {
    return (
      <ModuleSelection
        data={item}
        onCategoryItemPress={onCategoryItemPressHandler}
        onSliderItemPress={onSliderItemPressHanlder}
        onImageItemPress={onImageItemPressHandler}
        onProductItemPress={onProductItemPressHandler}
      />
    )
  }, []);

  const _keyExtractor = useCallback(
    (item) => item.iModuleId.toString(),
    [],
  );

  return (
    <>
      <HomeHeader {...props} />
      {/* <Modal visible={true}>
        <View style={modalstyles.modal}>
          <View style={modalstyles.modalContainer}>
            <Button title="Go back to app" />
            <WebView
              style={{ flex: 1 }}
              source={{ uri: 'https://github.com/facebook/react-native' }} />
          </View>
        </View>
      </Modal> */}
      <View style={styles.container}>

        {isLoading == true ?
          <ScrollView>
            <View style={styles.shimmerItemWrapper}>
              <SliderShimmer />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <CategoryCarouselShimmer />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ProductCarouselShimmer />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ImageModulShimmer imageCount={1} />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ImageModulShimmer imageCount={2} />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ImageModulShimmer imageCount={3} />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ImageModulShimmer imageCount={4} />
            </View>
            <View style={styles.shimmerItemWrapper}>
              <ImageModulShimmer imageCount={6} />
            </View>
          </ScrollView>
          :
          null}

        {isLoading == false ?
          <FlatList
            data={webHomeModuleList}
            keyExtractor={_keyExtractor}
            showsVerticalScrollIndicator={false}
            // removeClippedSubviews={true}
            // maxToRenderPerBatch={5}
            renderItem={_renderItem}
            contentInset={{ // iOS ONLY
              top: 0,
              left: 0, // Left spacing for the very first card
              bottom: Scale.moderateScale(10),
              right: 0 // Right spacing for the very last card
            }}
            contentContainerStyle={{ // contentInset alternative for Android
              paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(60) : Scale.moderateScale(50) // Horizontal spacing before and after the ScrollView
            }}
          />
          :
          null}

      </View>
    </>
  );
};

export default HomeScreen;

const modalstyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: '90%',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
})
