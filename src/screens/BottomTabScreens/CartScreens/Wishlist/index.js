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
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { clientHome, clientUserActivity, clientUserOrder } from 'api/client';
import styles from './style'
import { WishListProductItem } from 'components';
import {
  ShadowWrapper,
  RequestLoader
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import axiosClient from "api/axios";
import { DeviceStorage } from 'services'

import ShoppingCartIcon from 'assets/icons/shopping-cart.svg';
import { useDispatch } from 'react-redux';
import { setCartCount } from 'store/actions/cart.action';
import { setCartFireChange } from 'store/actions/fireChange.action';

const WishlistScreen = (props) => {

  const [wishLists, setWishLists] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const currency = axiosClient.getCurrency();

  const token = axiosClient.getToken();

  const dispatchFire = useDispatch();

  const setCartFireChangeRedux = useCallback((value) => {
    dispatchFire(setCartFireChange(value))
  }, [dispatchFire]);

  const dispatch = useDispatch();

  const setCartCountRedux = useCallback((cartCount) => {
    dispatch(setCartCount(cartCount))
  }, [dispatch]);

  const getCustomerLikes = () => {
    setIsLoading(true);
    clientHome.getCustomerLikes()
      .then((response) => {
        const res = response.data;
        setWishLists(res.result);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        console.log('error', err.response?.data?.message);
      });
  };

  // const deleteOrder = (itemId) => {
  //   clientUserOrder.deleteOrder(itemId)
  //     .then((response) => {
  //       const res = response.data;

  //       getCartDetail();
  //     }).catch((err) => {
  //       console.log('error', err.response?.data?.message);
  //     });
  // };

  useEffect(() => {
    getCustomerLikes();
  }, []);
  // useEffect(() => {
  //   console.log('props.route.params?.fireChange', props.route.params?.fireChange);
  //   if (props.route.params?.fireChange)
  //     getCartDetail();
  // }, [props.route.params?.fireChange]);

  const onSignInhandler = () => {
    props.navigation.navigate('SignIn');
  }

  const removeFromListHandler = (goodsId) => {
    toggleLikeGoods(goodsId);
  }

  const moveToCartHandler = (goods) => {
    addOrder(goods.goodsId, goods.providerId, 1)
  }

  const addOrder = (goodsId, providerId, number, countryId = null, cityId = null) => {
    setIsLoading(true);
    clientUserOrder.addOrder(goodsId, providerId, number, countryId, cityId)
      .then((response) => {
        const res = response.data;
        console.log('addOrder', res.result);
        if (res.result.cookieId)
          axiosClient.setCartId(res.result.cookieId);
        setCartCountRedux(res.result.count)

        setIsLoading(false);
        DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId)
          .then((storeData) => {
            if (res.result.cookieId)
              storeData.cartId = res.result.cookieId;
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeData)
              .then(() => {
                setCartFireChangeRedux(Math.random() + 1 * 100)
                props.navigation.navigate('Cart',
                  {
                    screen: 'Cart',
                    params: {
                      fireChange: Math.random() + 1
                    }
                  })
              });
          })

      }).catch((err) => {
        console.log('error', err.response?.data?.message);
        // snackBarRef?.current?.show(err.response?.data?.message, 2);
      });
  };

  const toggleLikeGoods = (goodsId) => {
    setIsLoading(true);
    clientUserActivity.likeGoods(goodsId)
      .then((response) => {
        setIsLoading(false);
        getCustomerLikes()
      }).catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const onProductItemPressHandler = (item) => {
    props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        style={styles.container}>
        {isLoading != null ?
          <View style={styles.contentContainer}>

            {wishLists == null || wishLists?.length == 0 ?
              <>
                <View style={styles.emptyView}>
                  <View style={styles.emptyIconContainer}>
                    <ShoppingCartIcon
                      width={Scale.moderateScale(80)}
                      height={Scale.moderateScale(80)}
                    />
                  </View>
                  {token ?
                    <>
                      <Text style={styles.emptyFirstText}>{Languages.Cart.YourWishListEmpty}</Text>
                      <Text style={styles.emptySecText}>{Languages.Cart.WhatAreYouWaitingFor}</Text>
                    </>
                    :
                    <>
                      <Text style={styles.emptyFirstText}>{Languages.Cart.PleaseSignInFirstToSeeYourWishlist}</Text>
                      <TouchableOpacity onPress={onSignInhandler}>
                        <Text style={styles.emptySignInText}>{Languages.Profile.SignIn}</Text>
                      </TouchableOpacity>
                    </>}

                </View>

                {/* <View>
                 <ShadowWrapper>
                   <ProductCarousel data={data} />
                 </ShadowWrapper>
               </View> */}
              </>
              :
              null}

            {wishLists != null || wishLists?.length == 0 ?
              <>
                <ShadowWrapper>
                  {wishLists?.map((item, index) => {

                    return (
                      <View key={item.itemId}>
                        <View>
                          <WishListProductItem
                            onProductPresss={onProductItemPressHandler}
                            currency={currency}
                            removeFromListPress={removeFromListHandler}
                            moveToCartPress={moveToCartHandler}
                            data={item}
                          />
                        </View>
                        {
                          index != wishLists?.length - 1 ?
                            <View style={styles.cartItemLine}></View>
                            :
                            null
                        }
                      </View>
                    )
                  })}
                </ShadowWrapper>

              </>
              :
              null}
          </View>
          :
          null}
      </ScrollView>



    </>
  );
};


export default WishlistScreen;

