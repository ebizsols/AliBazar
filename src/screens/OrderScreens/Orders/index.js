/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { clientAuth, clientProfile, clientUserActivity } from 'api/client';
import styles from './style'
import {
  ModuleSelection,
  HomeHeader,
  AddressesHeader,
  AddressItem,
  BottomSheetBackView,
  BottomSheetHeader,
  CommonHeader,
  OrderItem
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  ScreenLoader
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";
import Animated, { Easing } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import LottieView from 'lottie-react-native';

import CloseIcon from 'assets/icons/close-unfill-circle.svg';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyBoxIcon from 'assets/icons/empty-box.svg';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setOrdersFireChange } from 'store/actions/fireChange.action';

const OrdersScreen = (props) => {

  const reduxFireChange = useSelector(state => state.fireChangeReducer.ordersFireChange);

  const dispatch = useDispatch();

  const setOrdersFireChangeRedux = useCallback((value) => {
    dispatch(setOrdersFireChange(value));
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [orders, setOrders] = useState(null);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10
  });

  const currency = axiosClient.getCurrency();

  useEffect(() => {
    if (reduxFireChange) {
      setOrdersFireChangeRedux(null);
      setPagination({
        pageNumber: 1,
        pageSize: 10
      });
      getProfileOrdersList(1, 10, true, true);
    }
  }, [reduxFireChange]);

  useEffect(() => {
    setPagination({
      pageNumber: 1,
      pageSize: 10
    });
    getProfileOrdersList(1, 10, true, true);
  }, []);

  const getProfileOrdersList = (pageNumber, pageSize, setLoader = false, resetData = false) => {
    if (setLoader)
      setIsLoading(true);
    else
      setIsLoadingMore(true)
    clientProfile.getProfileOrdersList(pageNumber, pageSize)
      .then((response) => {
        console.log('******* Requesting......', pageNumber, pageSize, '*********');
        const res = response.data;
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false)
        // console.log(res.result.data);
        if (Array.isArray(orders)) {
          if (resetData === true) {
            setOrders(res.result.data);
          } else {
            setOrders(orders.concat(res.result.data));
          }
        } else {
          setOrders(res.result.data);
        }
        // setOrders(data);
        if (res.result?.data?.length < pagination.pageSize) {
          setShouldLoadMore(false);
        }
      }).catch((err) => {
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false);
        console.log('err', err.response.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const RenderFooter = () => {
    // if (isLoadingMore == false) {
    //   return null;
    // }
    return (
      <View style={[styles.footerLoaderContainer, isLoadingMore == false ? { opacity: 0 } : {}]} >
        <LottieView
          imageAssetsFolder="lottie"
          style={styles.lottie}
          autoPlay={true}
          loop={true}
          speed={1}
          // resizeMode='cover'
          source={require('./../../../assets/animations/pagination-loader.json')}
        />
      </View>
    )
  }

  const loadMoreHandler = () => {
    console.log('load moree...');
    if (shouldLoadMore) {
      console.log('make request in load more');
      const tempPagination = { ...pagination };
      tempPagination.pageNumber = tempPagination.pageNumber + 1;
      setPagination(tempPagination);

      getProfileOrdersList(tempPagination.pageNumber, tempPagination.pageSize);
    }

    // if (!onEndReachedCalledDuringMomentum && shouldLoadMore) {
    //     console.log('Load more send request...');
    //     const tempFilterModal = {...filterModel};
    //     tempFilterModal.pageNumber = tempFilterModal.pageNumber + 1;
    //     console.log(tempFilterModal);
    //     setFilterModel(tempFilterModal);

    //     getFilterGoods(tempFilterModal);
    // }
  };

  const snackBarRef = useRef(null);

  const onPressOrderHandler = (orderId) => {
    props.navigation.navigate('OrderDetail', { orderId: orderId })
  };

  const continueShoppingPressHanlder = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.orderItemWrapper}>
          <OrderItem
            currency={currency}
            data={item}
            onPressOrder={() => onPressOrderHandler(item.orderId)}
          />
        </View>
        {index != orders.length - 1 ?
          <View style={styles.cartItemLine}></View>
          :
          null}
      </>
    )
  };

  if (orders == null) {
    return (<ScreenLoader />)
  } else {
    return (
      <>
        {isLoading == true ? <RequestLoader /> : null}

        <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Order.Orders} showBackIcon={true} />
        <View style={[styles.container]}>
          {orders?.length > 0 ?
            <ShadowWrapper
              shadowContainerStyle={{
                flex: 1,
                paddingBottom: 0,
                paddingTop: 0
              }}
              contentContainer={{
                flex: 1
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={orders}
                renderItem={_renderItem}
                keyExtractor={(item) => item.orderId.toString()}
                onEndReached={loadMoreHandler}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false); }}
                contentInset={{ // iOS ONLY
                  top: 0,
                  left: 0, // Left spacing for the very first card
                  bottom: Scale.moderateScale(80),
                  right: 0 // Right spacing for the very last card
                }}
                ListFooterComponent={<RenderFooter />}
                contentContainerStyle={{ // contentInset alternative for Android
                  paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(80) : 0, // Horizontal spacing before and after the ScrollView
                  paddingTop: Platform.OS === 'android' ? 0 : 0 // Horizontal spacing before and after the ScrollView
                }}
              />
            </ShadowWrapper>
            :
            null
          }

          {orders?.length == 0 && isLoading == false ?
            <View style={styles.emptyViewContainer}>
              <View style={styles.emptyTop}>
                <View style={styles.emptyIconContainer}>
                  <EmptyBoxIcon
                    width={Scale.moderateScale(200)}
                    height={Scale.moderateScale(200)}
                  />
                </View>
              </View>
              <View style={styles.emptyMiddle}>
                <Text style={styles.emptyTextFirst}>{Languages.Order.YouDontHaveAnyOrdersYet}</Text>
                <Text style={styles.emptyTextSecond}>{Languages.Order.WhatAreYouWaitingForStartShopping}</Text>
              </View>
              <View style={styles.emptyBottom}>
                <MainButton onPress={continueShoppingPressHanlder}>{Languages.Order.ContinueShopping}</MainButton>
              </View>
            </View>
            :
            null
          }
        </View>

        <SnackBar
          ref={snackBarRef}
        />
      </>
    );
  }
};


export default OrdersScreen;


// const data = [
//   {
//     orderId: 1,
//     trackingCode: 'NSACIF515415FD152S',
//     placedDateTime: Date.now(),
//     finalPrice: 2000,
//     shipping: 100,
//     discount: 0,
//     vat: 0,
//     totalWithOutDiscountCode: 2000,
//     total: 2000,

//     transfereeName: 'ramin',
//     transfereeFamily: 'gahdiri',
//     transfereeMobile: '37754559',
//     address: 'iran, ardabil',
//     statusTitle: 'status title',
//     statusId: 1,
//     returningAllowed: true,
//     cancelingAllowed: false,
//     items: [
//       {
//         itemId: 1,
//         title: 'Iphone',
//         goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
//         goodsId: 12,
//         statusTitle: 'Canceled',
//         statusId: '100',
//         shippingMethod: 1,
//         quantity: 1,
//         weight: 100,
//         modelNumber: 'M32NI',
//         goodsCode: 'fsfsfs',
//         shopName: 'Test shop',
//         discountAmount: 0,
//         discountPercent: 0,
//         unitPrice: 1000,
//         vat: 0,
//         totalPrice: 2000,
//         shipping: 100,
//         priceWithDiscount: 2000,
//         returningAllowed: true,
//         cancelingAllowed: true,
//         orderStatusPlacedDateTime: Date.now(),
//       },
//       {
//         itemId: 1,
//         title: 'Iphone',
//         goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
//         goodsId: 12,
//         statusTitle: 'sfsdfdsf',
//         statusId: '6',
//         shippingMethod: 1,
//         quantity: 1,
//         weight: 100,
//         modelNumber: 'M32NI',
//         goodsCode: 'fsfsfs',
//         shopName: 'Test shop',
//         discountAmount: 0,
//         discountPercent: 0,
//         unitPrice: 1000,
//         vat: 0,
//         totalPrice: 2000,
//         shipping: 100,
//         priceWithDiscount: 2000,
//         returningAllowed: true,
//         cancelingAllowed: true,
//         orderStatusPlacedDateTime: Date.now(),
//       }
//     ]
//   },
//   {
//     orderId: 2,
//     trackingCode: 'NSACIF515415FD152S',
//     placedDateTime: Date.now(),
//     finalPrice: 2000,
//     shipping: 100,
//     discount: 0,
//     vat: 0,
//     totalWithOutDiscountCode: 2000,
//     total: 2000,

//     transfereeName: 'ramin',
//     transfereeFamily: 'gahdiri',
//     transfereeMobile: '37754559',
//     address: 'iran, ardabil',
//     statusTitle: 'status title',
//     statusId: 1,
//     returningAllowed: true,
//     cancelingAllowed: false,
//     items: [
//       {
//         itemId: 126,
//         title: 'Iphone',
//         goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
//         goodsId: 12,
//         statusTitle: 'sfsdfdsf',
//         statusId: '1',
//         shippingMethod: 1,
//         quantity: 1,
//         weight: 100,
//         modelNumber: 'M32NI',
//         goodsCode: 'fsfsfs',
//         shopName: 'Test shop',
//         discountAmount: 0,
//         discountPercent: 0,
//         unitPrice: 1000,
//         vat: 0,
//         totalPrice: 2000,
//         shipping: 100,
//         priceWithDiscount: 2000,
//         returningAllowed: true,
//         cancelingAllowed: true,
//         orderStatusPlacedDateTime: Date.now(),
//       }
//     ]
//   },
//   {
//     orderId: 2,
//     trackingCode: 'NSACIF515415FD152S',
//     placedDateTime: Date.now(),
//     finalPrice: 2000,
//     shipping: 100,
//     discount: 0,
//     vat: 0,
//     totalWithOutDiscountCode: 2000,
//     total: 2000,

//     transfereeName: 'ramin',
//     transfereeFamily: 'gahdiri',
//     transfereeMobile: '37754559',
//     address: 'iran, ardabil',
//     statusTitle: 'status title',
//     statusId: 1,
//     returningAllowed: true,
//     cancelingAllowed: false,
//     items: [
//       {
//         itemId: 126,
//         title: 'Iphone',
//         goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
//         goodsId: 12,
//         statusTitle: 'sfsdfdsf',
//         statusId: '1',
//         shippingMethod: 1,
//         quantity: 1,
//         weight: 100,
//         modelNumber: 'M32NI',
//         goodsCode: 'fsfsfs',
//         shopName: 'Test shop',
//         discountAmount: 0,
//         discountPercent: 0,
//         unitPrice: 1000,
//         vat: 0,
//         totalPrice: 2000,
//         shipping: 100,
//         priceWithDiscount: 2000,
//         returningAllowed: true,
//         cancelingAllowed: true,
//         orderStatusPlacedDateTime: Date.now(),
//       }
//     ]
//   }
// ]