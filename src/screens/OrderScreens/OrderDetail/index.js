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
  OffLabel,
  ScreenLoader
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
import CreditCardIcon from 'assets/icons/credit-card.svg';
import OrderAddressItem from './OrderAddressItem';
import { CommonActions } from '@react-navigation/native';
import OrderItemOrderDetail from './OrderItemOrderDetail';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetailFireChange } from 'store/actions/fireChange.action';

const OrderDetailScreen = (props) => {

  const reduxFireChange = useSelector(state => state.fireChangeReducer.orderDetailFireChange);

  const dispatch = useDispatch();

  const setOrderDetailFireChangeRedux = useCallback((value) => {
    dispatch(setOrderDetailFireChange(value));
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [isJustDownloadableFiles, setIsJustDownloadableFiles] = useState(false);

  const { orderId } = props.route.params;

  const currency = axiosClient.getCurrency();

  const getProfileOrdersItem = () => {
    setIsLoading(true);
    clientProfile.getProfileOrdersItem(orderId)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        console.log('OrderDetail: ', res.result);

        const downloadableFindIndex = res?.result?.items?.findIndex(x => x.isDownloadable == true);
        const normalProductFindIndex = res?.result?.items?.findIndex(x => x.isDownloadable != true);

        if (downloadableFindIndex != -1 && normalProductFindIndex == -1) {
          setIsJustDownloadableFiles(true)
        } else {
          setIsJustDownloadableFiles(false);
        }

        setOrderDetail(res.result);
        // setOrderDetail(data);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    getProfileOrdersItem();
  }, []);

  useEffect(() => {
    if (reduxFireChange) {
      getProfileOrdersItem();
      setOrderDetailFireChangeRedux(null);
    }
  }, [reduxFireChange]);

  const snackBarRef = useRef(null);

  const onReviewPressHandler = (item) => {
    props.navigation.navigate('ReviewProduct', { goodsId: item.goodsId, orderItemId: item.itemId });
  }

  const onCancelOrderPressHandler = () => {
    props.navigation.navigate('CancelOrder', { orderId: orderId });
  }

  const onProductItemPressHandler = (item) => {
    if (item.providerId && item.goodsId)
      props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  if (orderDetail == null) {
    return (<ScreenLoader />)
  } else {
    return (
      <>
        {isLoading == true ? <RequestLoader /> : null}

        <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Order.OrderDetail} showBackIcon={true} />
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
              {isJustDownloadableFiles == false ?
                <View>
                  <OrderAddressItem
                    trackingCode={orderDetail.trackingCode}
                    fullName={orderDetail.transfereeName + ' ' + orderDetail.transfereeFamily}
                    mobile={orderDetail.transfereeMobile}
                    placedDateTime={orderDetail.placedDateTime}
                    countryCode={orderDetail.iso}
                    address={orderDetail.address}
                  />
                </View>
                :
                null}
              {/* // Todo for download file ??????????????????? */}
              {/* // important: Todo uncomment cancel and implement this */}
              {orderDetail.cancelingAllowed ?
                <View style={styles.cancelBtnContainer}>
                  <MainButton
                    onPress={onCancelOrderPressHandler}
                    textStyle={styles.cancelBtnTextStyle}
                    buttonStyle={styles.cancelBtnStyle}>{Languages.Order.CancelItemsFromThisOrder}</MainButton>
                </View>
                :
                null}

              <View style={styles.cartItemLine}></View>
              <View>
                {orderDetail.items.map((item, index) => {
                  return (
                    <>
                      <View>
                        <OrderItemOrderDetail
                          onProductPress={onProductItemPressHandler}
                          onReviewPress={() => onReviewPressHandler(item)}
                          currency={currency}
                          data={item} />
                      </View>
                      {index != orderDetail.items.length - 1 ?
                        <View style={styles.cartItemLine}></View>
                        :
                        null}
                    </>
                  )
                })}
              </View>
            </View>
          </ShadowWrapper>

          <ShadowWrapper>
            <View style={{}}>
              <View style={styles.orderSection}>
                <View style={styles.orderSectionTop}>
                  <Text style={styles.orderSectionTopText}>{Languages.Order.PaymentMethod}</Text>
                  <View style={styles.orderSectionTopCreditCard}>
                    {/* <Text style={styles.orderSectionTopCardNumber}>376655 xxxxx 3114</Text> */}
                    <View style={styles.paymentMethodContainer}>
                      <CreditCardIcon
                        width={Scale.moderateScale(30)}
                        height={Scale.moderateScale(30)}
                      />
                      <Text style={styles.orderSectionTopCardText}>{'\u00A0\u00A0\u00A0'}{Languages.Order.CreditCard(orderDetail.payment)}{'\u00A0\u00A0\u00A0'}</Text>
                    </View>
                    {/* <Text style={styles.orderSectionTopCardText}>{orderDetail.payment}</Text> */}
                  </View>
                </View>
                <View style={styles.orderSummarySection}>
                  <View style={styles.extraPaddingHorizontal}>
                    <Text style={styles.orderSummarySectionTitle}>{Languages.Cart.OrderSummary}</Text>

                    <View style={styles.summaryItem}>
                      <View style={styles.summaryItemTitleContainer}>
                        <Text style={styles.itemTitleText}>{Languages.Cart.Subtotal}</Text>
                        <Text style={styles.itemItemsCount}>({Languages.Cart.NumberItems(orderDetail.itemQuantity)})</Text>
                      </View>
                      <View style={styles.summaryItemValueContainer}>
                        {/* <Text style={styles.itemValueText}> */}
                        <ShowPrice
                          priceStyle={styles.itemValueText}
                          afterDotStyle={styles.itemValueText}
                          currencyStyle={styles.itemValueText}
                          price={orderDetail.totalWithOutDiscountCode - orderDetail.shipping - orderDetail.vat} currency={currency} />
                        {/* </Text> */}
                      </View>
                    </View>

                    <View style={styles.summaryItem}>
                      <View style={styles.summaryItemTitleContainer}>
                        <Text style={styles.itemTitleText}>{Languages.Cart.Shipping}</Text>
                      </View>
                      <View style={styles.summaryItemValueContainer}>
                        {/* <Text style={[styles.itemValueText, styles.shippingValueText]}> */}
                        {orderDetail.shipping == 0 ?
                          <Text style={[styles.itemValueText, styles.shippingValueText]}>{Languages.Cart.Free}</Text>
                          :
                          <ShowPrice
                            currencyStyle={[styles.itemValueText, styles.shippingValueText]}
                            priceStyle={[styles.itemValueText, styles.shippingValueText]}
                            afterDotStyle={[styles.itemValueText, styles.shippingValueText]}
                            price={orderDetail.shipping}
                            currency={currency}
                          />
                        }
                        {/* </Text> */}
                      </View>
                    </View>

                    {orderDetail.discount > 0 ?
                      <View style={styles.summaryItem}>
                        <View style={styles.summaryItemTitleContainer}>
                          <Text style={[styles.itemTitleText, styles.discountTitle]}>{Languages.Cart.Discount}</Text>
                        </View>
                        <View style={styles.summaryItemValueContainer}>
                          {/* <Text style={[styles.itemValueText, styles.discountValue]}> */}
                          {/* <Text> */}
                          <ShowPrice
                            showMinus={true}
                            currencyStyle={[styles.itemValueText, styles.discountValue]}
                            priceStyle={[styles.itemValueText, styles.discountValue]}
                            afterDotStyle={[styles.itemValueText, styles.discountValue]}
                            price={orderDetail.discount} currency={currency} />
                          {/* </Text> */}
                          {/* </Text> */}
                        </View>
                      </View>
                      :
                      null}

                    {/* Vat */}
                    {orderDetail.vat > 0 && (
                      <View style={styles.summaryItem}>
                        <View style={styles.summaryItemTitleContainer}>
                          <Text style={styles.itemTitleText}>{Languages.Common.VatCap}</Text>
                        </View>
                        <View style={styles.summaryItemValueContainer}>
                          <ShowPrice
                            priceStyle={styles.itemValueText}
                            afterDotStyle={styles.itemValueText}
                            currencyStyle={styles.itemValueText}
                            price={orderDetail.vat} currency={currency} />
                        </View>
                      </View>
                    )}
                    {/* Vat */}

                  </View>

                  <View style={styles.summaryLine}></View>

                  <View style={styles.extraPaddingHorizontal}>

                    <View style={[styles.summaryItem, { marginBottom: Scale.moderateScale(0) }]}>
                      <View style={[styles.summaryItemTitleContainer, { flexDirection: "column", alignItems: 'flex-start' }]}>
                        <Text style={[styles.itemTitleText, styles.totalTitle]}>{Languages.Cart.Total}</Text>
                        {orderDetail.vat > 0 ?
                          <Text style={[styles.itemTitleText, styles.summaryInclusiveOfVat]}>({Languages.Cart.InclusiveOfVAT})</Text>
                          :
                          null}
                      </View>
                      <View>
                        {orderDetail.discount > 0 ?
                          <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                            <OffLabel
                              textStyle={styles.summaryItemOffLabelText}
                              containerStyle={styles.summaryOffContainer}>
                              <Text><Text>{currency} </Text>{Tools.formatMoney(orderDetail.totalWithOutDiscountCode)}</Text>
                            </OffLabel>
                          </View>
                          :
                          null}
                        <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                          {/* <Text style={[styles.itemValueText, styles.summaryInclusiveItemValue]}> */}
                          <ShowPrice
                            afterDotStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            currencyStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            priceStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            price={orderDetail.total} currency={currency} />
                          {/* </Text> */}
                        </View>
                      </View>
                    </View>

                    {/* <View style={[styles.summaryItem, { marginTop: Scale.moderateScale(0) }]}>
                    <View style={styles.summaryItemTitleContainer}>
                      <Text style={[styles.itemTitleText, styles.summaryInclusiveOfVat]}>({Languages.Cart.InclusiveOfVAT})</Text>
                    </View>
                    <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                      <Text style={[styles.itemValueText, styles.summaryInclusiveItemValue]}>
                        <ShowPrice
                          afterDotStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                          currencyStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                          priceStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                          price={971.00} currency={currency} />
                      </Text>
                    </View>
                  </View> */}

                  </View>

                </View>
              </View>
            </View>
          </ShadowWrapper>

        </ScrollView>

        <SnackBar
          ref={snackBarRef}
        />
      </>
    );
  }
};


export default OrderDetailScreen;

const data = {
  orderId: 1,
  trackingCode: 'NSACIF515415FD152S',
  placedDateTime: Date.now(),
  finalPrice: 2000,
  shipping: 100,
  discount: 0,
  vat: 0,
  totalWithOutDiscountCode: 2000,
  total: 2000,

  transfereeName: 'ramin',
  transfereeFamily: 'gahdiri',
  transfereeMobile: '37754559',
  address: 'iran, ardabil',
  statusTitle: 'status title',
  statusId: 1,
  returningAllowed: true,
  cancelingAllowed: true,
  payment: 'Credit Card',
  items: [
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
      orderStatusPlacedDateTime: Date.now(),
    },
    {
      itemId: 1,
      title: 'Iphone',
      goodsImage: '533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg',
      goodsId: 12,
      statusTitle: 'Delivered',
      statusId: '6',
      shippingMethod: 1,
      quantity: 2,
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
      orderStatusPlacedDateTime: Date.now(),
    }
  ]
}