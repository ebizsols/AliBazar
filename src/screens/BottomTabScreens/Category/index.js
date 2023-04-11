/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Platform
} from 'react-native';
import { clientHome } from 'api/client';
import styles from './style'

import { CategoryHeader, CategoryProductCarousel } from 'components';
import { ShadowWrapper, RequestLoader } from 'components/UI';
import { Constants, Scale } from 'common';
import { LazyHOC } from 'HOCs';

const CategoryScreen = (props) => {

  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getMobileCategory = () => {
    setIsLoading(true);
    clientHome.mobileCategory()
      .then((response) => {
        const res = response.data;
        setCategories(res.result);
        setIsLoading(false);
      }).catch((err) => {
        console.log('[CategoryScreen | getHomeData()]', err);
        setIsLoading(false);
      })
  };

  useEffect(() => {
    getMobileCategory();
  }, []);

  const onCategoryPressHandler = (category) => {  
    console.log(category);
    if (category.haveWebPage == true) {
      props.navigation.navigate('CategoryModules', { categoryId: category.categoryId, categoryTitle: category.categoryTitle });
    } else {
      // navigate to search screen
      props.navigation.navigate('Search', { type: Constants.SearchScreenTypes.Category, id: category.categoryId })
    }
  };

  return (
    <LazyHOC>
      {isLoading == true ? <RequestLoader /> : null}
      <CategoryHeader {...props} showBackIcon={false} />
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.categoryId.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ShadowWrapper shadowContainerStyle={styles.shadowWrapper}>
                <CategoryProductCarousel onCategoryPress={onCategoryPressHandler} data={item} />
              </ShadowWrapper>
            )
          }}
          contentInset={{ // iOS ONLY
            top: 0,
            left: 0, // Left spacing for the very first card
            bottom: 0,
            right: 0 // Right spacing for the very last card
          }}
          contentContainerStyle={{ // contentInset alternative for Android
            paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(80) : Scale.moderateScale(50) // Horizontal spacing before and after the ScrollView
          }}
        />
      </View>
    </LazyHOC>
  );
};

export default CategoryScreen;
