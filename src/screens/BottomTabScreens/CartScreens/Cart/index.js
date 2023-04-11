/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useCallback, useRef, useReducer } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import styles from './style'
import { CartProductItem, ChangeAreaModal } from 'components';
import { clientForm, clientUserOrder } from 'api/client';
import {
  ShadowWrapper,
  MainInput, MainButton, OffLabel,
  ShowPrice,
  RequestLoader,
  SnackBar
} from 'components/UI';
import { Constants, Languages, Scale, Tools } from 'common';
import CloseIcon from 'assets/icons/close-gray.svg';
import axiosClient from 'api/axios';

import ShoppingCartIcon from 'assets/icons/shopping-cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setCartCount } from 'store/actions/cart.action';

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

const CartScreen = (props) => {

  const reduxFireChange = useSelector(state => state.fireChangeReducer.cartFireChange);
  const token = useSelector(state => state.authReducer.token);

  const snackBarRef = useRef(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      code: null
    },
    inputValidities: {
      code: false
    },
    formIsValid: false
  });

  const [cartDetail, setCartDetail] = useState(false);
  const currency = axiosClient.getCurrency();
  const [isLoading, setIsLoading] = useState(null);
  const [code, setCode] = useState(null);
  const [checkOutActive, setCheckOutActive] = useState(false);
  const [isChangeAreaModalLoading, setIsChangeAreaModalLoading] = useState(false);
  const [changeAreaModalIsVisible, setChangeAreaModalIsVisible] = React.useState(false)
  const changeAreaModalRef = useRef();

  const inputRef = useRef();

  const [isJustDownloadableFiles, setIsJustDownloadableFiles] = useState(false);


  const [changeAreaData, setChangeAreaData] = React.useState({
    countries: [],
    cities: [],
    provinces: [],
    selectedCityTitle: null,
    selectedCityId: null,
    selectedCountryId: null,
    selectedProvinceId: null
    // postMethodType: null
  });

  const dispatch = useDispatch();

  const setCartCountRedux = useCallback((cartCount) => {
    dispatch(setCartCount(cartCount))
  }, [dispatch]);

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

  const getCartDetail = (cityId = null, provinceId = null, countryId = null, code = null) => {
    setIsLoading(true);
    clientUserOrder.getCartDetail(cityId, provinceId, countryId, code)
      .then((response) => {
        const res = response.data;
        // res.result.items[0].discountPercent = 10;
        // res.result.discount = 10;
        // console.log(res.result);
        Keyboard.dismiss();
        implementationAfterGetDetail(res, code)

      }).catch((err) => {
        setIsLoading(false);
        console.log(err);
        console.log('error', err.response?.data?.message);
        setCode(null);
        const res = err.response?.data;
        Keyboard.dismiss();
        implementationAfterGetDetail(res, null);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const implementationAfterGetDetail = (res, code) => {
    setCartCountRedux(res.result?.items?.length)
    setIsLoading(false);
    setCartDetail(res.result);

    const downloadableFindIndex = res?.result?.items?.findIndex(x => x.isDownloadable == true);
    const normalProductFindIndex = res?.result?.items?.findIndex(x => x.isDownloadable != true);

    if (downloadableFindIndex != -1 && normalProductFindIndex == -1) {
      setIsJustDownloadableFiles(true);
    } else {
      setIsJustDownloadableFiles(false);
    }

    setChangeAreaData((prev) => ({
      ...prev,
      selectedCityId: res.result?.cityId,
      selectedCityTitle: res.result?.cityTitle,
      selectedCountryId: res.result?.countryId,
      selectedProvinceId: res.result?.provinceId
    }));
    getActiveProvinces(res.result.countryId);
    getActiveCities(res.result.provinceId);
    if (code) {
      setCode(code);
      inputRef.current?.clear();
      if (res?.message) {
        snackBarRef.current.show(res?.message, 1);
      }
    } else {
      setCode(null);
    }

    if (res.result?.items?.length > 0) {
      console.log(res.result.items);
      const findNotAvailableIndex = res.result.items.findIndex(x => x.shippingAvailable == false);
      const findNotInInventoryIndex = res.result.items.findIndex(x => x.exist == false);

      if (findNotAvailableIndex != -1 || findNotInInventoryIndex != -1)
        setCheckOutActive(false);
      else
        setCheckOutActive(true);
    }
  };

  const deleteOrder = (itemId) => {
    setIsLoading(true);
    clientUserOrder.deleteOrder(itemId)
      .then((response) => {
        const res = response.data;

        setCartCountRedux(res.result.count)

        setIsLoading(false);
        getCartDetail(null, null, null, code);
      }).catch((err) => {
        setIsLoading(false);
        console.log('error', err.response?.data?.message);
      });
  };

  const increaseOrderItem = (cityId, countryId, goodsId, number, providerId) => {
    setIsLoading(true);
    clientUserOrder.increaseOrderItem(cityId, countryId, goodsId, number, providerId)
      .then((response) => {

        getCartDetail(null, null, null, code);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        console.log('error', err.response?.data?.message);
      });
  };

  useEffect(() => {
    getCartDetail();
    getAciveCountries();
  }, []);

  useEffect(() => {
    // console.log('redux firechange: ', reduxFireChange);
    if (reduxFireChange) {
      // console.log('doing firechange job');
      getCartDetail();
    }
  }, [reduxFireChange]);

  useEffect(() => {
    // console.log('[Cart] in fireChange');
    // console.log(props.route.params?.fireChange);
    if (props.route.params?.fireChange) {
      // console.log('[Cart] fireChange');
      getCartDetail();
    }
  }, [props.route.params?.fireChange]);

  const removeFromListPressHandler = (itemId) => {
    deleteOrder(itemId);
  };

  const changeItemQuantityHandler = (count, item) => {
    increaseOrderItem(item.cityId, item.countryId, item.goodsId, count, item.providerId)
  };

  const onProductItemPressHandler = (item) => {
    props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  };

  const onCheckoutPressHandler = () => {
    if (token) {
      // logged in
    } else {
      props.navigation.navigate('SignIn', { backScreen: 'Cart', backParams: { fireChange: Math.random() + 1 } });
      return;
    }

    if (isJustDownloadableFiles) {
      props.navigation.navigate('Payment', { addressId: null })
    } else {
      props.navigation.navigate("ShippingAddress")
    }
  };

  // change area modal
  const getAciveCountries = () => {
    clientForm.getAciveCountries()
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setChangeAreaData((prev) => ({
          ...prev,
          countries: result
        }))
      }).catch((err) => {

      });
  };

  const getActiveCities = (countryId, setLoader = false) => {
    if (setLoader == true)
      setIsChangeAreaModalLoading(true);
    clientForm.getActiveCities(countryId)
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setChangeAreaData((prev) => ({
          ...prev,
          cities: result
        }))
        changeAreaModalRef.current.setCities(result);
        if (setLoader == true)
          setIsChangeAreaModalLoading(false);
      }).catch((err) => {
        if (setLoader == true)
          setIsChangeAreaModalLoading(false);
      });
  };

  const getActiveProvinces = (countryId, setLoader = false, resetCitites = false) => {
    // if (setLoader == true)
    //   setIsChangeAreaModalLoading(true);
    clientForm.getActiveProvince(countryId)
      .then((response) => {
        const res = response.data;

        let result = res.result;

        if (resetCitites == true) {
          setChangeAreaData((prev) => ({
            ...prev,
            provinces: result,
            selectedProvinceId: result[0]?.provinceId
          }));
          if (result[0]?.provinceId) {
            getActiveCities(result[0]?.provinceId, true);
          }
        } else {
          setChangeAreaData((prev) => ({
            ...prev,
            provinces: result
          }));
        }
        // changeAreaModalRef.current.setCities([]);
        // if (setLoader == true)
        //   setIsChangeAreaModalLoading(false);
      }).catch((err) => {
        // if (setLoader == true)
        //   setIsChangeAreaModalLoading(false);
      });
  };

  const provinceChangeHandler = (provinceId) => {
    if (provinceId == changeAreaData.selectedProvinceId)
      return;
    setChangeAreaData((prev) => ({
      ...prev,
      selectedProvinceId: provinceId,
    }));
    // setChangeAreaModalIsVisible(false);
    getActiveCities(provinceId, true)
  }

  const countryChangeHandler = (countryId) => {
    setChangeAreaData((prev) => ({
      ...prev,
      selectedCountryId: countryId
    }));
    getActiveProvinces(countryId, false, true);
  }

  const cityChangeHandler = (cityId, cityTitle, countryId) => {
    // console.log(cityId, countryId);
    if (cityId == changeAreaData.selectedCityId)
      return;
    setChangeAreaData((prev) => ({
      ...prev,
      selectedCityId: cityId,
      selectedCityTitle: cityTitle
    }));
    // getPostMethod(screenData.goodsDetail?.goodsProviderVarity[0]?.fkShopId,
    //   changeAreaData.selectedCountryId,
    //   cityId
    // );
    setChangeAreaModalIsVisible(false);
    getCartDetail(cityId, changeAreaData.selectedProvinceId, countryId, code);
  }

  const closeChangeAreaModal = () => {
    setChangeAreaModalIsVisible(false);
  };

  const citiesSearchtextChangeHandler = (text) => {
    const filterCites = changeAreaData.cities.filter(x => x.cityTitle.includes(text));
    changeAreaModalRef.current.setCities(filterCites)
  }

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    if (formState.inputValues.code)
      getCartDetail(null, null, null, formState.inputValues.code);
  }, [formState]);

  const clearDiscountCodeHandler = () => {
    getCartDetail();
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      {cartDetail != null && isJustDownloadableFiles == false ?
        <View style={styles.deliverToSection}>
          <View style={[styles.deliverToContainer, styles.mainPaddingContent]}>
            <View style={styles.changeAreaRow}>
              <View style={styles.deliverToTextContainer}>
                <Text style={styles.deliverToText}>{Languages.GoodsDetail.DeliverTo}</Text>
                <Text style={styles.deliverToValueText}>{cartDetail?.cityTitle}</Text>
              </View>
              <TouchableOpacity onPress={() => setChangeAreaModalIsVisible(true)} style={styles.changeAreaContainer}>
                <Text style={styles.changeAreaText}>{Languages.GoodsDetail.ChangeArea}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        null}

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          style={styles.container}>
          {isLoading != null ?
            <View style={styles.contentContainer}>
              {cartDetail == null ?
                <>
                  <View style={styles.emptyView}>
                    <View style={styles.emptyIconContainer}>
                      <ShoppingCartIcon
                        width={Scale.moderateScale(80)}
                        height={Scale.moderateScale(80)}
                      />
                    </View>
                    <Text style={styles.emptyFirstText}>{Languages.Cart.YourShoppingCartEmpty}</Text>
                    <Text style={styles.emptySecText}>{Languages.Cart.WhatAreYouWaitingFor}</Text>
                  </View>

                  {/* <View>
                <ShadowWrapper>
                  <ProductCarousel data={data} />
                </ShadowWrapper>
              </View> */}
                </>
                :
                null}

              {cartDetail != null ?
                <>
                  <ShadowWrapper>
                    {cartDetail?.items?.map((item, index) => {
                      let counts = [];
                      counts = Array.from(Array(item.inventoryCount < Constants.QuantitySelectMax ? item.inventoryCount : Constants.QuantitySelectMax).keys())

                      const formattedCount = [];
                      for (let index = 0; index < counts.length; index++) {
                        const obj = { id: index + 1, value: (index + 1).toString() };
                        formattedCount.push(obj);
                      }

                      return (
                        <View key={item.itemId}>
                          <View>
                            <CartProductItem
                              onProductPresss={onProductItemPressHandler}
                              currency={currency}
                              onItemQuantityChanged={changeItemQuantityHandler}
                              counts={counts}
                              formattedCount={formattedCount}
                              removeFromListPress={removeFromListPressHandler}
                              data={item} />
                          </View>
                          {
                            index != cartDetail.items.length - 1 ?
                              <View style={styles.cartItemLine}></View>
                              :
                              null
                          }
                        </View>
                      )
                    })}
                  </ShadowWrapper>

                  <ShadowWrapper>
                    <View style={styles.orderSection}>
                      <View style={styles.orderSummarySection}>
                        <View style={styles.extraPaddingHorizontal}>
                          <Text style={styles.orderSummarySectionTitle}>{Languages.Cart.OrderSummary}</Text>

                          <View style={styles.summaryItem}>
                            <View style={styles.summaryItemTitleContainer}>
                              <Text style={styles.itemTitleText}>{Languages.Cart.Subtotal}</Text>
                              <Text style={styles.itemItemsCount}>({Languages.Cart.NumberItems(cartDetail.itemsCount)})</Text>
                            </View>
                            <View style={styles.summaryItemValueContainer}>
                              {/* <Text style={styles.itemValueText}> */}
                              <ShowPrice
                                priceStyle={styles.itemValueText}
                                afterDotStyle={styles.itemValueText}
                                currencyStyle={styles.itemValueText}
                                price={cartDetail.totalWithOutDiscountCode - cartDetail.shipping - cartDetail.vat} currency={currency} />
                              {/* </Text> */}
                            </View>
                          </View>

                          <View style={styles.summaryItem}>
                            <View style={styles.summaryItemTitleContainer}>
                              <Text style={styles.itemTitleText}>{Languages.Cart.Shipping}</Text>
                            </View>
                            <View style={styles.summaryItemValueContainer}>
                              {/* <Text style={[styles.itemValueText, styles.shippingValueText]}> */}
                              {cartDetail.shipping == 0 ?
                                <Text style={[styles.itemValueText, styles.shippingValueText]}>{Languages.Cart.Free}</Text>
                                :
                                <ShowPrice
                                  currencyStyle={[styles.itemValueText, styles.shippingValueText]}
                                  priceStyle={[styles.itemValueText, styles.shippingValueText]}
                                  afterDotStyle={[styles.itemValueText, styles.shippingValueText]}
                                  price={cartDetail.shipping}
                                  currency={currency}
                                />
                              }
                              {/* </Text> */}
                            </View>
                          </View>

                          {cartDetail.discount > 0 ?
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
                                  price={cartDetail.discount} currency={currency} />
                                {/* </Text> */}
                                {/* </Text> */}
                              </View>
                            </View>
                            :
                            null}
                          {/* Discount */}

                          {/* Vat */}
                          {cartDetail.vat > 0 && (
                            <View style={styles.summaryItem}>
                              <View style={styles.summaryItemTitleContainer}>
                                <Text style={styles.itemTitleText}>{Languages.Common.VatCap}</Text>
                              </View>
                              <View style={styles.summaryItemValueContainer}>
                                <ShowPrice
                                  priceStyle={styles.itemValueText}
                                  afterDotStyle={styles.itemValueText}
                                  currencyStyle={styles.itemValueText}
                                  price={cartDetail.vat} currency={currency} />
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
                              {cartDetail.vat > 0 ?
                                <Text style={[styles.itemTitleText, styles.summaryInclusiveOfVat]}>({Languages.Cart.InclusiveOfVAT})</Text>
                                :
                                null}
                            </View>
                            <View>
                              {cartDetail.discount > 0 ?
                                <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                                  <OffLabel
                                    textStyle={styles.summaryItemOffLabelText}
                                    containerStyle={styles.summaryOffContainer}>
                                    <Text><Text>{currency} </Text>{Tools.formatMoney(cartDetail.totalWithOutDiscountCode)}</Text>
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
                                  price={cartDetail.total} currency={currency} />
                                {/* </Text> */}
                              </View>
                            </View>
                          </View>

                          {/* <View style={[styles.summaryItem, {marginTop: Scale.moderateScale(0)}]}>
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

                      <View style={styles.couponCodeSection}>
                        <View style={styles.couponCodeInputContainer}>
                          <MainInput
                            inputStyle={styles.couponCodeInputStyle}
                            showLabel={false}
                            placeholder={Languages.Placeholder.CouponOrGiftCard}
                            id="code"
                            ref={inputRef}
                            maxLength={100}
                            initialValue={''}
                            enableRealTimeTextChangeListener={true}
                            editable={true}
                            onInputChange={inputChangeHandler}
                          // formSubmitted={formSubmitted}
                          />
                          <View style={styles.couponCodeApplyBtnContainer}>
                            <MainButton onPress={submitHandler} buttonStyle={styles.couponCodeApplyBtnStyle}>{Languages.Cart.Apply}</MainButton>
                          </View>
                        </View>

                        {code ?
                          <View style={styles.addedCouponCode}>
                            <View style={styles.addedCouponCodeWrapper}>
                              <Text style={styles.addedCouponText}>{Languages.Cart.Coupon}</Text>
                              <Text style={styles.addedCouponValueText}>{'\u00a0\u00a0\u00a0\u00a0'}{code}{I18nManager.isRTL ? '\u00a0\u00a0\u00a0\u00a0' : ''}</Text>
                              <TouchableOpacity onPress={clearDiscountCodeHandler} style={styles.addedCouponCloseIconContainer}>
                                <CloseIcon
                                  width={Scale.moderateScale(27)}
                                  height={Scale.moderateScale(27)}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          :
                          null}

                      </View>
                    </View>
                  </ShadowWrapper>
                </>
                :
                null}
            </View>
            :
            null}
        </ScrollView>

        {cartDetail != null ?
          <View style={styles.chackOutSection}>
            <View style={styles.chackOutPricesSection}>
              <Text style={styles.chackOutItemCountText}>{Languages.Cart.NumberItems(cartDetail.itemsCount)}</Text>
              <ShowPrice
                currencyStyle={styles.chackOutPriceText}
                afterDotStyle={styles.chackOutPriceText}
                priceStyle={styles.chackOutPriceText} price={cartDetail.total} currency={currency} />
            </View>
            <View style={styles.chackOutBtnSection}>
              <MainButton disabled={!checkOutActive} onPress={onCheckoutPressHandler}>
                {Languages.Cart.CheckoutNow}
              </MainButton>
            </View>
          </View>
          :
          null
        }
      </KeyboardAvoidingView>

      <ChangeAreaModal
        cities={changeAreaData.cities}
        isLoading={isChangeAreaModalLoading}
        selectedCountryChanged={countryChangeHandler}
        selectedCityChanged={cityChangeHandler}
        countries={changeAreaData.countries}
        selectedCityId={changeAreaData.selectedCityId}
        selectedCountryId={changeAreaData.selectedCountryId}
        onRequestClose={closeChangeAreaModal}
        visible={changeAreaModalIsVisible}
        citiesSearchTextChanged={citiesSearchtextChangeHandler}
        selectedProvinceId={changeAreaData.selectedProvinceId}
        provinces={changeAreaData.provinces}
        selectedProvinceChanged={provinceChangeHandler}
        ref={changeAreaModalRef}
      />

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default CartScreen;


// const tempData = {
//   "status": 200,
//   "result": {
//     "orderId": 135,
//     "itemsCount": 1,
//     "shipping": 0,
//     "discount": 0,
//     "vat": 0,
//     "totalWithOutDiscountCode": 1000,
//     "total": 1000,
//     "countryId": 137,
//     "countryTitle": "Bahrain",
//     "cityId": 28693,
//     "payerId": 59,
//     "cityTitle": "Manama",
//     "transfereeName": null,
//     "transfereeFamily": null,
//     "transfereeMobile": null,
//     "iso": null,
//     "transfereeEmail": "raminghadirimoghaddam@gmail.com",
//     "address": null,
//     "trackingCode": null,
//     "items": [
//       {
//         "itemId": 252,
//         "quantity": 1,
//         "weight": 1,
//         "title": "iphone 11",
//         "modelNumber": "MBGX3ZA/A",
//         "goodsCode": "GN-11",
//         "goodsImage": "6a4343ec-9245-4f1a-93ee-209b40c8e6c3.jpg",
//         "goodsVariety": [
//           {
//             "parameterTitle": "color",
//             "valueTitle": "red",
//             "imageUrl": "178e9783-c639-49bb-a22a-374ca98b6b8e.jpg",
//             "valuesHaveImage": true
//           },
//           {
//             "parameterTitle": "Internal Memory",
//             "valueTitle": "64 gb",
//             "imageUrl": null,
//             "valuesHaveImage": false
//           },
//           {
//             "parameterTitle": "version",
//             "valueTitle": "Middle East Version",
//             "imageUrl": null,
//             "valuesHaveImage": false
//           }
//         ],
//         "goodsId": 11,
//         "categoryId": 1,
//         "providerId": 10,
//         "shopId": 5,
//         "exist": true,
//         "discountAmount": 0,
//         "discountPercent": 0,
//         "unitPrice": 1000,
//         "vat": 0,
//         "totalPrice": 1000,
//         "shipping": 0,
//         "priceWithDiscount": 1000,
//         "discountCouponAmount": 0,
//         "method": 0,
//         "shippingAvailable": false,
//         "countryId": 137,
//         "cityId": 1000,
//         "inventoryCount": 12
//       }
//     ]
//   },
//   "message": "done successfully"
// }

