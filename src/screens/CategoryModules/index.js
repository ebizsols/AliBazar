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
  ScrollView
} from 'react-native';
import { clientHome } from 'api/client';
import styles from './style'

import {
  ModuleSelection,
  HomeHeader,
  SliderShimmer,
  CategoryCarouselShimmer,
  ProductCarouselShimmer,
  ImageModulShimmer,
  CommonHeader
} from 'components';
import { Languages, Scale } from 'common';

const CategoryModules = (props) => {

  const { categoryId, categoryTitle } = props.route.params;
  const [isLoading, setIsLoading] = useState(null);

  const [webHomeModuleList, setWebHomeModuleList] = useState(null);

  const getCategory = () => {
    setIsLoading(true);
    clientHome.getCategory(categoryId)
      .then((response) => {
        const res = response.data;
        // const sliderModule = {
        //   iModuleId: 0,
        //   fkModuleId: 0,
        //   sliders: res.result.slider
        // }
        const webModuleList = res.result.webHomeModuleList;

        setIsLoading(false);

        // webModuleList.unshift(sliderModule); // Add slider to top of array to show in FlatList
        setWebHomeModuleList(webModuleList);
      }).catch((err) => {
        setIsLoading(false);
        console.log('[CategoryModules | getHomeData()]', err);
      });
  };

  const onCategoryItemPressHandler = (item, type) => {
    props.navigation.navigate("Search", { type: type, id: item?.collectionId })
  }

  const onSliderItemPressHanlder = (item, type) => {
    props.navigation.navigate("Search", { type: type, id: item.sliderId })
  }

  const onImageItemPressHandler = (item, type) => {
    props.navigation.navigate("Search", { type: type, id: item?.collectionId })
  }

  const onProductItemPressHandler = (item) => {
    props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  useEffect(() => {
    getCategory();
  }, []);

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
      <CommonHeader onPressBack={() => props.navigation.goBack()} title={categoryTitle} showBackIcon={true} />
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

export default CategoryModules;
