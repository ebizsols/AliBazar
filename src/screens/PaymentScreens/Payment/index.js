/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useEffect, useState, useRef, useCallback,
  useReducer
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Linking,
  AppState,
  StyleSheet,
  Modal,
  Button
} from 'react-native';
import { clientForm, clientUserOrder } from 'api/client';
import styles from './style'
import {
  CommonHeader,
} from 'components';
import {
  ShadowWrapper,
  MainButton,
  SnackBar,
  RequestLoader,
  ShowPrice,
  OffLabel,
  RadioButton,
  ProductItemSec,
  FloatButtonWrapper,
  ScreenLoader,
  MainInput,
  ProgressiveImage
} from 'components/UI';
import { Languages, PathHelper, Scale, Tools } from 'common';

import CashIcon from 'assets/icons/cash.svg';
import CreditCardIcon from 'assets/icons/credit-card.svg';
import OrderAddressItem from './OrderAddressItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axiosClient from 'api/axios';
import Collapsible from 'react-native-collapsible';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import WebView from 'react-native-webview';

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


const payWithCashType = 1;
const payWithCardType = 2;

const PaymentScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      cardName: null,
      cardNumber: null,
      cardMonth: null,
      cardYear: null,
      securityCode: null,
      cardZip: null,
    },
    inputValidities: {
      cardName: false,
      cardNumber: false,
      cardMonth: false,
      cardYear: false,
      securityCode: false,
      cardZip: false,
    },
    formIsValid: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(null);
  const [payWithType, setPayWithType] = useState(2); // 1 pay with cash, 2 pay with card
  const [orderDetail, setOrderDetail] = useState(null);
  const [activePaymentMethods, setActivePaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(0);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedDeliveryPartner, setSelectedDeliveryPartner] = useState(null);
  const [shippingRate, setShippingRate] = useState(0);
  const [returnUrl, setReturnUrl] = useState(null);

  const snackBarRef = useRef(null);

  const addressId = props.route?.params?.addressId;

  const currency = axiosClient.getCurrency();

  const isFocused = useIsFocused();

  const getOrderDetail = () => {
    setIsLoading(true);
    clientUserOrder.getOrderDetail()
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setOrderDetail(res.result);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false)
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    console.log('shipin', selectedDeliveryPartner)
    if (selectedDeliveryPartner)
      clientUserOrder.shippingRateCalculator(selectedDeliveryPartner)
        .then((response) => {
          const res = response.data;
          console.log('res', res);
          setShippingRate(res);
        }).catch((err) => {
          setIsLoading(false)
          console.log(err.response?.data);
          if (err.response?.data?.message)
            snackBarRef.current.show(err.response?.data?.message, 2);
        });

  }, [selectedDeliveryPartner])

  useEffect(() => {
    clientUserOrder.getShippingMethods()
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setShippingMethods(res.result);
        console.log(res.result.filter(item => item.shippingMethodTitle === 'Ubex')[0])
        setSelectedDeliveryPartner(res.result.filter(item => item.shippingMethodTitle === 'Ubex')[0]?.id)
      }).catch((err) => {
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  }, [])

  const initOrderPayment = () => {

    // if (true) {
    //   props.navigation.navigate('AfterPayment', {
    //     paymentId: 'b3d01f88-7def-4ed2-83fd-824e84914708',
    //     token: 'paymentGateway',
    //     payerID: 'ajyal',
    //   })
    //   return;
    // }

    setIsLoading(true);
    clientUserOrder.initOrderPayment(
      selectedPaymentMethodId,
      formState.inputValues.cardMonth,
      formState.inputValues.cardName,
      formState.inputValues.cardNumber,
      formState.inputValues.cardYear,
      formState.inputValues.cardZip,
      formState.inputValues.securityCode,
      selectedDeliveryPartner
    )
      .then((response) => {
        const res = response.data;
        console.log(res?.result);
        if (selectedPaymentMethodId == 2) { // Credimax
          const [paymentId, token, payerID] = res.result.split('/');
          props.navigation.navigate('AfterPayment', { paymentId: paymentId, token: token, payerID: payerID });
        } else {
          Linking.canOpenURL(res?.result).then(supported => {
            if (supported) {
              setReturnUrl(res?.result);
              //Linking.openURL(res?.result);
            } else {
              try {
                setReturnUrl(res?.result);
                //Linking.openURL(res?.result);
              } catch (error) {
                console.log('Error in openning: ', error);
              }
              console.log("Don't know how to open URI: " + res?.result);
            }
          });
        }
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false)
        console.log(err);
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const getActivePaymentMethod = () => {
    setIsLoading(true);
    clientForm.getActivePaymentMethod()
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setActivePaymentMethods(res.result);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false)
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    getOrderDetail();
    getActivePaymentMethod();
  }, []);

  const changePayWithType = (payWithTypeParam) => {
    setPayWithType(payWithTypeParam);
  }

  const changePaymentMethodhandler = (methodId) => {
    setSelectedPaymentMethodId(methodId);
  }

  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    };
    if (payWithType != payWithCardType) {
      snackBarRef.current.show(Languages.Payment.PleaseSelectPaymentMethodFirst, 2);
      return
    }
    if (payWithType == payWithCardType && selectedPaymentMethodId == 0) {
      snackBarRef.current.show(Languages.Payment.PleaseSelectPaymentMethodFirst, 2);
      return;
    }

    if (!formState.formIsValid && selectedPaymentMethodId === 2) {
      console.log('error', formState.inputValidities);
      return;
    }

    initOrderPayment();
  }, [formState, selectedPaymentMethodId, payWithType]);

  const onProductPresss = (item) => {
    props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  };

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

  const checkPayOrder = () => {
    setIsLoading(true);
    clientUserOrder.checkPayOrder(orderDetail?.orderId)
      .then((response) => {
        const res = response.data;

        props.navigation.navigate('AfterPayment', {
          paymentId: res.result?.paymentId,
          token: res.result?.paymentToken,
          payerID: res.result?.PayerId,
        })
        // console.log(res.result);
        // setOrderDetail(res.result);
        // setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false)
        console.log(err);
        console.log(err.response?.data);
        // if (err.response?.data?.message)
        //   snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [orderDetail]);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      checkPayOrder();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  const onProductItemPressHandler = (item) => {
    if (item.providerId && item.goodsId)
      props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  if (orderDetail == null) {
    return (<ScreenLoader />)
  } else {

    const subtotal = orderDetail.totalWithOutDiscountCode - orderDetail.shipping - orderDetail.vat
    const withoutDis = subtotal + (shippingRate || orderDetail.shipping) + orderDetail.vat
    const totalAmount = subtotal + (shippingRate || orderDetail.shipping) - orderDetail.discount + orderDetail.vat

    console.log('returnurk', returnUrl)

    return (
      <>
        {isLoading == true ? <RequestLoader /> : null}
        <Modal visible={returnUrl && true}>
          <View style={modalstyles.modal}>
            <View style={modalstyles.modalContainer}>
              <Button title="Go back to app" onPress={() => {

                props.navigation.navigate('Orders');
                setReturnUrl(null);
              }} />
              <WebView
                style={{ flex: 1 }}
                source={{ uri: returnUrl }} />
            </View>
          </View>
        </Modal>
        <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Payment.Payment} showBackIcon={true} />
        <ScrollView style={[styles.container]}>

          <ShadowWrapper>
            <View style={{}}>
              <View style={styles.orderSection}>
                <View style={styles.orderSummarySection}>
                  <View style={styles.extraPaddingHorizontal}>
                    <Text style={styles.orderSummarySectionTitle}>{Languages.Cart.OrderSummary}</Text>

                    <View style={styles.summaryItem}>
                      <View style={styles.summaryItemTitleContainer}>
                        <Text style={styles.itemTitleText}>{Languages.Cart.Subtotal}</Text>
                        <Text style={styles.itemItemsCount}>({Languages.Cart.NumberItems(orderDetail.itemsCount)})</Text>
                      </View>
                      <View style={styles.summaryItemValueContainer}>
                        {/* <Text style={styles.itemValueText}> */}
                        <ShowPrice
                          priceStyle={styles.itemValueText}
                          afterDotStyle={styles.itemValueText}
                          currencyStyle={styles.itemValueText}
                          price={subtotal} currency={currency} />
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
                            price={shippingRate || orderDetail.shipping}
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
                              <Text><Text>{currency} </Text>{Tools.formatMoney(withoutDis)}</Text>
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
                            price={totalAmount} currency={currency} />
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

              {addressId ?
                <View style={styles.screenPadding}>
                  <View>
                    <OrderAddressItem
                      fullName={orderDetail.transfereeName + ' ' + orderDetail.transfereeFamily}
                      mobile={orderDetail.transfereeMobile}
                      countryCode={orderDetail.iso || 'BH'}
                      isDefualt={orderDetail.isDefualt} // todo: iso not getting from server fix later
                      address={orderDetail.address} />
                  </View>
                </View>
                :
                null}

              {/* <View style={[styles.screenPadding]}>
                <Text style={styles.paymentText}>Payment</Text>
                <View style={styles.payWithCashContainer}>
                  <View style={styles.switchContainer}>
                    <Switch
                      trackColor={{ false: '#D1D1D1', true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#fff"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                  <View style={styles.textsContainer}>
                    <Text style={styles.paymentFirstText}>Use my credits for this order</Text>
                    <Text style={styles.paymentSecText}>Available balance: SAR 12.00</Text>
                  </View>
                </View>
              </View> */}

              <View style={styles.payWithSection}>
                {/* <View style={styles.payWithItemContainer}>
                  <TouchableOpacity onPress={() => changePayWithType(payWithCashType)} style={styles.payWithItem}>
                    <View style={styles.payWithItemLeft}>
                      <RadioButton onPress={() => changePayWithType(payWithCashType)} isSelected={payWithType == payWithCashType} />
                    </View>
                    <View style={styles.payWithItemRight}>
                      <View style={styles.payWithItemIconContainer}>
                        <CashIcon
                          width={Scale.moderateScale(45)}
                          height={Scale.moderateScale(25)}
                        />
                      </View>
                      <View style={styles.payWithItemTextContainer}>
                        <Text style={styles.payWithItemText}>{Languages.Payment.PayWithCash}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.withCashText}>{Languages.Payment.PayWithCashDescription(styles.withCashTextDiff)}</Text>
                </View> */}
                <View style={styles.cartItemLine}></View>
                <View style={styles.payWithItemContainer}>
                  <TouchableOpacity disabled={true} onPress={() => changePayWithType(payWithCardType)} style={styles.payWithItem}>
                    {/* <View style={styles.payWithItemLeft}>
                      <RadioButton onPress={() => changePayWithType(payWithCardType)} isSelected={payWithType == payWithCardType} />
                    </View> */}
                    <View style={styles.payWithItemRight}>
                      <View style={styles.payWithItemIconContainer}>
                        <CreditCardIcon
                          width={Scale.moderateScale(45)}
                          height={Scale.moderateScale(25)}
                        />
                      </View>
                      <View style={styles.payWithItemTextContainer}>
                        <Text style={styles.payWithItemText}>{Languages.Payment.PayWithCard}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Collapsible collapsed={payWithType != payWithCardType}>
                      <View style={styles.paymentMethodsContainer}>
                        {activePaymentMethods?.map((item, index) => {
                          const paymentLogoImgPath = item.methodImageUrl ? PathHelper.getPaymentLogoPath(item.methodImageUrl) : null;

                          return (
                            <TouchableOpacity key={item.methodId} onPress={() => changePaymentMethodhandler(item.methodId)} style={styles.paymentMethodItem}>
                              <View style={styles.paymentMethodItemRadioContainer}>
                                <RadioButton
                                  onPress={() => changePaymentMethodhandler(item.methodId)}
                                  isSelected={selectedPaymentMethodId == item.methodId}
                                  styleType={'circle'}
                                  width={Scale.moderateScale(20)}
                                  height={Scale.moderateScale(20)}
                                />
                              </View>
                              <View style={styles.paymentLogoContainer}>
                                <ProgressiveImage
                                  borderRadius={0}
                                  height={Scale.moderateScale(20)}
                                  width={Scale.moderateScale(20)}
                                  source={paymentLogoImgPath}
                                  resizeMode={FastImage.resizeMode.contain}
                                />
                              </View>
                              <Text style={styles.paymentMethodItemText}>{item.methodTitle}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </View>
                    </Collapsible>
                  </View>
                  {/*  <View>
                    <Text style={{ marginTop: 20, ...styles.payWithItemText }}>Select Delivery Partner</Text>
                    <Picker
                      selectedValue={selectedDeliveryPartner}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedDeliveryPartner(itemValue)}
                    >
                      {shippingMethods.map((item, index) => {
                        return (
                          <Picker.Item key={index} label={item.shippingMethodTitle} value={item.id} />
                        )
                      })}
                    </Picker>
                  </View> */}

                  {selectedPaymentMethodId !== 0 && (
                    <View style={styles.dataBox}>

                      {/* 2 is crediMax */}
                      {selectedPaymentMethodId !== 2 ?
                        <View>
                          <Text style={styles.dataBoxText}>{Languages.Payment.InOrderToCompleteYourTransaction}</Text>
                        </View>
                        :
                        <View style={styles.crediMaxInputsContainer}>
                          <View style={[styles.inputContainer, { marginTop: 0 }]}>
                            <MainInput
                              lableText={Languages.InputLabels.NameOnCard}
                              inputStyle={styles.inputStyle}
                              // placeholder={null}
                              id="cardName"
                              initialValue={formState.inputValues.cardName}
                              maxLength={200}
                              editable={true}
                              required={true}
                              enableRealTimeTextChangeListener={true}
                              showRequireStart={true}
                              onInputChange={inputChangeHandler}
                              formSubmitted={formSubmitted}
                            />
                          </View>
                          <View style={styles.inputContainer}>
                            <MainInput
                              lableText={Languages.InputLabels.CardNumber}
                              inputStyle={styles.inputStyle}
                              placeholder={'_ _ _ _   _ _ _ _   _ _ _ _   _ _ _ _'}
                              id="cardNumber"
                              keyboardType={'numeric'}
                              initialValue={formState.inputValues.cardNumber}
                              maxLength={20}
                              editable={true}
                              required={true}
                              enableRealTimeTextChangeListener={true}
                              showRequireStart={true}
                              onInputChange={inputChangeHandler}
                              formSubmitted={formSubmitted}
                            />
                          </View>

                          <View style={[styles.inputContainer, styles.expireInputsContainer]}>
                            <View style={[styles.expireInputContainer, styles.monthExpireInputContainer]}>
                              <MainInput
                                lableText={Languages.InputLabels.ExpiryDate}
                                placeholder={Languages.Placeholder.MonthMM}
                                inputStyle={styles.inputStyle}
                                id="cardMonth"
                                initialValue={formState.inputValues.cardMonth}
                                maxLength={2}
                                keyboardType={'numeric'}
                                editable={true}
                                required={true}
                                enableRealTimeTextChangeListener={true}
                                showRequireStart={true}
                                onInputChange={inputChangeHandler}
                                formSubmitted={formSubmitted}
                              />
                            </View>
                            <View style={[styles.expireInputContainer, styles.yearExpireInputContainer]}>
                              <MainInput
                                showLabel={false}
                                placeholder={Languages.Placeholder.YearYY}
                                inputStyle={styles.inputStyle}
                                id="cardYear"
                                initialValue={formState.inputValues.cardYear}
                                maxLength={2}
                                keyboardType={'numeric'}
                                editable={true}
                                required={true}
                                enableRealTimeTextChangeListener={true}
                                showRequireStart={true}
                                onInputChange={inputChangeHandler}
                                formSubmitted={formSubmitted}
                              />
                            </View>
                          </View>

                          <View style={styles.inputContainer}>
                            <MainInput
                              lableText={Languages.InputLabels.SecurityCode}
                              // placeholder={Languages.Placeholder.EnterFirstName}
                              id="securityCode"
                              initialValue={formState.inputValues.securityCode}
                              inputStyle={styles.inputStyle}
                              maxLength={100}
                              keyboardType={'numeric'}
                              editable={true}
                              required={true}
                              enableRealTimeTextChangeListener={true}
                              showRequireStart={true}
                              onInputChange={inputChangeHandler}
                              formSubmitted={formSubmitted}
                            />
                          </View>
                          <View style={styles.inputContainer}>
                            <MainInput
                              lableText={Languages.InputLabels.ZipPostalCode}
                              // placeholder={Languages.Placeholder.EnterFirstName}
                              id="cardZip"
                              initialValue={formState.inputValues.cardZip}
                              inputStyle={styles.inputStyle}
                              maxLength={100}
                              // keyboardType={'numeric'}
                              editable={true}
                              // required={true}
                              enableRealTimeTextChangeListener={true}
                              // showRequireStart={true}
                              onInputChange={inputChangeHandler}
                              formSubmitted={formSubmitted}
                            />
                          </View>
                        </View>
                      }

                    </View>
                  )}


                </View>
              </View>

            </View>
          </ShadowWrapper>

          <ShadowWrapper>
            <View>
              <View style={styles.carouselHeader}>
                <View style={styles.headerLeftColor}></View>
                <View style={styles.carouselHeaderTextsContainer}>
                  <Text style={styles.title}>{Languages.Payment.YourOrder}</Text>
                  <Text style={styles.itemCountText}>{Languages.Cart.NumberItems(orderDetail.itemsCount)}</Text>
                </View>
              </View>
              <View>
                {orderDetail?.items?.map((item, index) => {
                  return (
                    <View key={item.itemId}>
                      <View style={styles.productitemContainer}>
                        <ProductItemSec
                          onPress={onProductItemPressHandler}
                          onPressValue={item}
                          titleTextStyle={styles.productTitleText}
                          modelNumber={item.modelNumber}
                          data={item}
                          title={item.title}
                          // showItemCount={true}
                          // itemCount={item.quantity}
                          provider={item.storeName}
                          showMarketOrExpress={item.method == 1} // true market, false express, null dont't show
                          currency={currency}
                          showMainPrice={false}
                          // showPrice={item.priceWithDiscount}
                          // discountPercent={item.discountPercent}
                          // discountAmount={item.discountAmount}
                          // offLineLabelPrice={item.unitPrice * item.quantity}
                          showShippingMethod={true}
                          shippingMethodType={item.method}
                        />
                      </View>
                      {index != orderDetail.items.length - 1 ?
                        <View style={styles.itemLine}></View>
                        :
                        null}
                    </View>
                  )
                })}
              </View>
            </View>
          </ShadowWrapper>

        </ScrollView>

        <FloatButtonWrapper>
          <MainButton onPress={submitHandler}>
            {selectedPaymentMethodId == 2 ?
              Languages.Payment.CompletePayment
              :
              Languages.Payment.PlaceOrder
            }
          </MainButton>
        </FloatButtonWrapper>

        <SnackBar
          ref={snackBarRef}
        />
      </>
    );
  }
};


export default PaymentScreen;

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


const activePaymentMethodsData = [
  { "methodId": 2, "methodTitle": "CrediMax", "methodImageUrl": "creditmax.png" },
  { "methodId": 4, "methodTitle": "Sadad", "methodImageUrl": "sadad.png" },
  { "methodId": 1, "methodTitle": "BenefitPay", "methodImageUrl": "benefit pay.png" },
  { "methodId": 3, "methodTitle": "PayPal", "methodImageUrl": "paypal.png" }
]

const data = {
  "orderId": 62,
  "itemsCount": 1,
  "shipping": 100,
  "discount": 0,
  "vat": 0,
  "totalWithOutDiscountCode": 1300,
  "total": 1300,
  "countryId": 137,
  "countryTitle": "Bahrain",
  "cityId": 1055,
  "cityTitle": "Manama",
  "transfereeName": "Gghv",
  "transfereeFamily": "Hhhh",
  "transfereeMobile": "37755753",
  "transfereeEmail": "test@gmail.com",
  "address": "Rd No 2228, Damistan, Bahrain",
  "trackingCode": null,
  "items": [
    {
      "itemId": 126,
      "quantity": 1,
      "weight": 1,
      "title": "iphone 11 pro",
      "modelNumber": "MTGX3ZA/A",
      "goodsCode": "GN-12",
      "goodsImage": "533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg",
      "goodsVariety": [
        {
          "parameterTitle": "color",
          "valueTitle": "white",
          "imageUrl": null,
          "valuesHaveImage": true
        },
        {
          "parameterTitle": "Internal Memory",
          "valueTitle": "64 gb",
          "imageUrl": null,
          "valuesHaveImage": false
        },
        {
          "parameterTitle": "version",
          "valueTitle": "Middle East Version",
          "imageUrl": null,
          "valuesHaveImage": false
        }
      ],
      "goodsId": 12,
      "categoryId": 24,
      "providerId": 1013,
      "shopId": 5,
      "exist": true,
      "discountAmount": 0,
      "discountPercent": 0,
      "unitPrice": 1200,
      "vat": 0,
      "totalPrice": 1300,
      "shipping": 100,
      "priceWithDiscount": 1200,
      "discountCouponAmount": 0,
      "method": 1,
      "shippingAvailable": true,
      "countryId": 137,
      "cityId": 1055,
      "inventoryCount": 12
    }
  ]
}