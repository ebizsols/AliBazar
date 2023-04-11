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
  OrderItem,
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  ShowPrice,
  OffLabel
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";
import Animated, { Easing } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import CloseIcon from 'assets/icons/close-unfill-circle.svg';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyBoxIcon from 'assets/icons/empty-box.svg';
import { CommonActions } from '@react-navigation/native';
import OrderItemOrderDetail from './OrderItemOrderDetail';


const ReturnsRequestFirstStepScreen = (props) => {

  const [isLoading, setIsLoading] = useState(null);
  const [orders, setOrders] = useState(null);
  const snackBarRef = useRef(null);

  const currency = axiosClient.getCurrency();

  useEffect(() => {
    getProfileOrdersItemReturned();
  }, []);


  const getProfileOrdersItemReturned = () => {
    setIsLoading(true);
    clientProfile.getProfileOrdersItemReturned()
      .then((response) => {
        const res = response.data;
        console.log('getProfileOrdersItemReturned', res.result);
        setIsLoading(false);
        console.log(res.result);
        setOrders(res.result);
      }).catch((err) => {
        setIsLoading(false);
        console.log('err', err);
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const onItemBtnPressHandler = (data) => {
    props.navigation.navigate('ReturnsRequestSecondStep', { itemId: data.itemId });
  }

  const onCancelOrderPressHandler = () => {
    props.navigation.navigate('CancelOrder');
  }

  const onProductItemPressHandler = (item) => {
    if (item.providerId && item.goodsId)
      props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Returns.ReturnsRequest} showBackIcon={true} />
      <ScrollView style={[styles.container]}>
        <ShadowWrapper
          shadowContainerStyle={{
            flex: 1,
            // paddingBottom: 0,
            // paddingTop: 0
          }}
          contentContainer={{
            flex: 1
          }}>
          <View style={styles.screenPadding}>
            <View>
              <Text style={styles.selectItemsText}>{Languages.Returns.SelectItemsForReturn} </Text>
            </View>
            <View>
              {orders?.map((item, index) => {
                return (
                  <>
                    <View>
                      <OrderItemOrderDetail
                        onBtnPress={onItemBtnPressHandler}
                        onProductPresss={onProductItemPressHandler}
                        currency={currency}
                        data={item} />
                    </View>
                    {index != orders.length - 1 ?
                      <View style={styles.cartItemLine}></View>
                      :
                      null}
                  </>
                )
              })}
            </View>
          </View>
        </ShadowWrapper>
      </ScrollView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ReturnsRequestFirstStepScreen;


const data = [
  {

    itemId: 1,
    title: 'Iphone',
    goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
    goodsId: 12,
    statusTitle: 'Canceled',
    statusId: '100',
    shippingMethod: 1,
    quantity: 1,
    weight: 100,
    modelNumber: 'M32NI',
    goodsCode: 'fsfsfs',
    shopName: 'Test shop',
    discountAmount: 0,
    discountPercent: 0,
    unitPrice: 1000,
    vat: 0,
    totalPrice: 2000,
    shipping: 100,
    priceWithDiscount: 2000,
    returningAllowed: true,
    cancelingAllowed: true,
    orderStatusPlacedDateTime: Date.now()
  }
]