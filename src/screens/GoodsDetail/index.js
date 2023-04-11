/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Animated as ReactAnimated,
  Dimensions
} from 'react-native';
import { clientHome, clientForm, clientUserOrder, clientUserActivity } from 'api/client';
import styles from './style'

import { GoodsDetailHeader, GoodsSlider, Variety, ChangeAreaModal, ProductCarousel } from 'components';
import { Stars, IconRow, GoodsProverItem, ScreenLoader, SnackBar, RequestLoader, ShadowWrapper } from 'components/UI';
import { Languages, PathHelper, Scale, Tools, Constants } from 'common';
import { GoodsDetail as goodsDetailData } from 'dummyData';
import Animated from 'react-native-reanimated';

import StorIcon from 'assets/icons/store.svg';
import CancelColoryIcon from 'assets/icons/cancel-colory.svg';
import DegreeIcon from 'assets/icons/degree.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import ReturnIcon from 'assets/icons/return.svg';
import HelpIcon from 'assets/icons/help-circle.svg';
import Collapsible from 'react-native-collapsible';
import LikeIcon from 'assets/icons/like-gray.svg';
import LikeFillIcon from 'assets/icons/like-red-fill.svg';
import UpArrowIcon from 'assets/icons/up-arrow2.svg';

import Bottombar from './Bottombar';
import SaleWithCallBottombar from './SaleWithCallBottombar';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from 'styles';
import { LazyHOC } from 'HOCs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axiosClient from 'api/axios';
import { DeviceStorage } from "services";
import RatingHeader from './RatingHeader';
import { useDispatch } from 'react-redux';
import { setCartCount } from 'store/actions/cart.action';
import { CommonActions } from '@react-navigation/native';
// const initialLayout = { width: Dimensions.get('window').width };
import { useSelector } from 'react-redux';

const GoodsDetailScreen = (props) => {
  // const [index, setIndex] = React.useState(0);
  const token = useSelector(state => state.authReducer.token);
  // console.log('token', token);
  const _scrollViewRef = useRef(null);

  const snackBarRef = useRef(null);
  const currency = axiosClient.getCurrency();
  const lang = axiosClient.getLang();
  const [isLoading, setIsLoading] = useState(null);
  const [isChangeAreaModalLoading, setIsChangeAreaModalLoading] = useState(false);
  const [shopDetailAccess, setShopDetailAccess] = useState(false);
  const [showDeliverMethodType, setShowDeliverMethodType] = useState(false);
  const [postMethod, setPostMethod] = useState({
    postMethodType: null,
    postTimeoutDay: null,
    shippingMethodDesc: null,
    shippingMethodImage: null
  });

  const [changeAreaModalIsVisible, setChangeAreaModalIsVisible] = React.useState(false)
  const [screenData, setScreenData] = React.useState({
    varietySelected: null,
    varietyExistencePossibilityWithType: null,
    varietyExistencePossibility: null,
    varieties: null,
    selectedProviderVarietyIndex: null,
    selectedProviderVariety: null,
    goodsDetail: null
  });
  const changeAreaModalRef = useRef();

  const [changeAreaData, setChangeAreaData] = React.useState({
    countries: [],
    cities: [],
    provinces: [],
    selectedCityTitle: null,
    selectedCityId: null,
    selectedCountryId: null,
    selectedProvinceId: null,
    postMethodType: null
  });

  const dispatch = useDispatch();

  const setCartCountRedux = useCallback((cartCount) => {
    dispatch(setCartCount(cartCount))
  }, [dispatch]);

  // const renderScene = ({ route }) => {
  //   switch (route.key) {
  //     case 'first':
  //       return <OverviewTabItem htmlString={screenData.goodsDetail?.description} />;
  //     case 'second':
  //       return <SpecificationsTabItem goodsId={goodsId} />;
  //     case 'third':
  //       return <RatingAndReviewsTabItem goodsId={goodsId} />;
  //     default:
  //       return null;
  //   }
  // };

  const { providerId, goodsId } = props.route.params;
  console.log('goodsId', goodsId);
  console.log('providerId', providerId);
  const [routes] = React.useState([
    { key: 'first', title: Languages.GoodsDetail.Overview },
    { key: 'second', title: Languages.GoodsDetail.Specifications },
    { key: 'third', title: Languages.GoodsDetail.RatingReviews },
  ]);

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute
  // });

  const [showCollapse, setShowCollapse] = useState(false);
  const [showSelectCountView, setShowSelectCountView] = useState(false);
  const [selectedCount, setSelectedCount] = useState(1);
  const [tempProviderheight, setTempProviderheight] = useState({
    height: 1,
    showTempProviderItem: true,
    minusAmount: 0
  });

  // const _animatedHeight = useRef(new ReactAnimated.Value(showCollapse ? 1 : 0)).current;
  const _animatedRotate = useRef(new ReactAnimated.Value(showCollapse ? 1 : 0)).current;

  const getGoodsDetails = () => {
    clientHome.getGoodsDetails(goodsId, providerId)
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        let result = res.result;
        console.log(result);
        // result.otherProvider = [
        //   {
        //     "providerId": 1018,
        //     "fkShopId": 5,
        //     "shopTitle": "ameen",
        //     "fkGoodsId": 13,
        //     "fkGuaranteeId": null,
        //     "guaranteeTitle": "",
        //     "haveGuarantee": false,
        //     "guaranteeMonthDuration": null,
        //     "vatfree": true,
        //     "price": 1200.0,
        //     "vatamount": 0.0,
        //     "postTimeoutDayByShop": 12,
        //     "returningAllowed": false,
        //     "maxDeadlineDayToReturning": null,
        //     "hasInventory": true,
        //     "inventoryCount": 12.0,
        //     "shippingPossibilities": 1,
        //     "discountPercentage": 0.0,
        //     "discountAmount": 0.0,
        //     "finalPrice": 1200.0,
        //     "tGoodsVariety": [
        //       {
        //         "varietyId": 1028,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 11,
        //         "parameterTitle": "color",
        //         "fkVariationParameterValueId": 42,
        //         "valueTitle": "white",
        //         "imageUrl": null,
        //         "valuesHaveImage": true
        //       },
        //       {
        //         "varietyId": 1029,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 10,
        //         "parameterTitle": "Internal Memory",
        //         "fkVariationParameterValueId": 39,
        //         "valueTitle": "128 gb",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       },
        //       {
        //         "varietyId": 1030,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 9,
        //         "parameterTitle": "version",
        //         "fkVariationParameterValueId": 37,
        //         "valueTitle": "usa version",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       }
        //     ]
        //   },
        //   {
        //     "providerId": 1019,
        //     "fkShopId": 5,
        //     "shopTitle": "ameen",
        //     "fkGoodsId": 13,
        //     "fkGuaranteeId": 4,
        //     "guaranteeTitle": "tpdco",
        //     "haveGuarantee": true,
        //     "guaranteeMonthDuration": 12,
        //     "vatfree": true,
        //     "price": 1000.0,
        //     "vatamount": 0.0,
        //     "postTimeoutDayByShop": 20,
        //     "returningAllowed": false,
        //     "maxDeadlineDayToReturning": null,
        //     "hasInventory": true,
        //     "inventoryCount": 20.0,
        //     "shippingPossibilities": 2,
        //     "discountPercentage": 0.0,
        //     "discountAmount": 0.0,
        //     "finalPrice": 1000.0,
        //     "tGoodsVariety": [
        //       {
        //         "varietyId": 1031,
        //         "fkProviderId": 1019,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 10,
        //         "parameterTitle": "Internal Memory",
        //         "fkVariationParameterValueId": 41,
        //         "valueTitle": "512 gb",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       },
        //       {
        //         "varietyId": 1032,
        //         "fkProviderId": 1019,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 11,
        //         "parameterTitle": "color",
        //         "fkVariationParameterValueId": 45,
        //         "valueTitle": "black",
        //         "imageUrl": null,
        //         "valuesHaveImage": true
        //       },
        //       {
        //         "varietyId": 1033,
        //         "fkProviderId": 1019,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 9,
        //         "parameterTitle": "version",
        //         "fkVariationParameterValueId": 36,
        //         "valueTitle": "Middle East Version",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       }
        //     ]
        //   },
        //   {
        //     "providerId": 1018,
        //     "fkShopId": 5,
        //     "shopTitle": "ameen",
        //     "fkGoodsId": 13,
        //     "fkGuaranteeId": null,
        //     "guaranteeTitle": "",
        //     "haveGuarantee": false,
        //     "guaranteeMonthDuration": null,
        //     "vatfree": true,
        //     "price": 1200.0,
        //     "vatamount": 0.0,
        //     "postTimeoutDayByShop": 12,
        //     "returningAllowed": false,
        //     "maxDeadlineDayToReturning": null,
        //     "hasInventory": true,
        //     "inventoryCount": 12.0,
        //     "shippingPossibilities": 1,
        //     "discountPercentage": 0.0,
        //     "discountAmount": 0.0,
        //     "finalPrice": 1200.0,
        //     "tGoodsVariety": [
        //       {
        //         "varietyId": 1028,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 11,
        //         "parameterTitle": "color",
        //         "fkVariationParameterValueId": 42,
        //         "valueTitle": "white",
        //         "imageUrl": null,
        //         "valuesHaveImage": true
        //       },
        //       {
        //         "varietyId": 1029,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 10,
        //         "parameterTitle": "Internal Memory",
        //         "fkVariationParameterValueId": 39,
        //         "valueTitle": "128 gb",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       },
        //       {
        //         "varietyId": 1030,
        //         "fkProviderId": 1018,
        //         "fkGoodsId": 13,
        //         "fkVariationParameterId": 9,
        //         "parameterTitle": "version",
        //         "fkVariationParameterValueId": 37,
        //         "valueTitle": "usa version",
        //         "imageUrl": null,
        //         "valuesHaveImage": false
        //       }
        //     ]
        //   }
        // ];

        // result.goodsProviderVarity[0].discountAmount = 10;
        // result.goodsProviderVarity[0].finalPrice = 800;
        // result.goodsProviderVarity[0].hasInventory = true;
        // result.goodsProviderVarity[0].discountPercentage = 15;

        setScreenData((prev) => ({
          ...prev,
          goodsDetail: result
        }));

        setShopDetailAccess(result.shopDetailAccess);


        setChangeAreaData((prev) => ({
          ...prev,
          selectedCityId: result.shopCityId,
          selectedCityTitle: result.shopCityTitle,
          selectedCountryId: result.shopCountryId,
          selectedProvinceId: result.shopProvinceId
        }));
        getActiveCities(result.shopProvinceId);
        getActiveProvinces(result.shopCountryId);
        getPostMethod(result.goodsProviderVarity[0]?.fkShopId, result.shopCountryId, result.shopCityId,
          result.shopProvinceId);

        initScreenData(res.result);
      }).catch((err) => {
        console.log(err);
      });
  };

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

  const viewGoods = (goodsId) => {
    clientUserActivity.viewGoods(goodsId)
      .then((response) => {
      }).catch((err) => {
        console.log('viewGoods', err);
      });
  };

  const getActiveCities = (provinceId, setLoader = false) => {
    if (setLoader == true)
      setIsChangeAreaModalLoading(true);
    clientForm.getActiveCities(provinceId)
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setChangeAreaData((prev) => ({
          ...prev,
          cities: result
        }));
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

  const countryChangeHandler = (countryId) => {
    setChangeAreaData((prev) => ({
      ...prev,
      selectedCountryId: countryId
    }));
    // getActiveCities(countryId, true);
    getActiveProvinces(countryId, false, true);
  }

  const provinceChangeHandler = (provinceId) => {
    if (provinceId == changeAreaData.selectedProvinceId)
      return;
    setChangeAreaData((prev) => ({
      ...prev,
      selectedProvinceId: provinceId,
    }));
    // getPostMethod(screenData.goodsDetail?.goodsProviderVarity[0]?.fkShopId,
    //   changeAreaData.selectedCountryId,
    //   changeAreaData.selectedCityId, provinceId
    // );
    // setChangeAreaModalIsVisible(false);
    getActiveCities(provinceId, true)
  }

  const cityChangeHandler = (cityId, cityTitle) => {
    if (cityId == changeAreaData.selectedCityId)
      return;
    setChangeAreaData((prev) => ({
      ...prev,
      selectedCityId: cityId,
      selectedCityTitle: cityTitle
    }));
    getPostMethod(screenData.goodsDetail?.goodsProviderVarity[0]?.fkShopId,
      changeAreaData.selectedCountryId,
      cityId, changeAreaData.selectedProvinceId
    );
    setChangeAreaModalIsVisible(false);
  }

  const getPostMethod = (shopId, countryId, cityId, provinceId) => {
    setIsLoading(true);
    clientHome.getPostMethod(shopId, countryId, cityId, provinceId)
      .then((response) => {
        const res = response.data;
        let result = res.result;
        console.log('getPostMethod', result);
        setIsLoading(false);
        // setChangeAreaData((prev) => ({
        //   ...prev,
        //   postMethodType: result?.postMethodType
        // }));
        setPostMethod((prev) => ({
          postMethodType: result?.postMethodType,
          postTimeoutDay: result?.postTimeoutDay,
          shippingMethodDesc: result?.shippingMethodDesc,
          shippingMethodImage: result?.shippingMethodImage,
        }));
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const varitySort = (arr) => {
    arr.sort((a, b) => {
      return a - b;
    });
    return arr;
  };

  const generatetGoodsVarietyExistencePossibilityAndPrintStructure = (
    goodsProviderVarity
  ) => {
    const printStructure = [];
    const VarietyExistencePossibility = {};
    const VarietyExistencePossibilityWithType = [];

    const AddedVarietyIdsForPrintStruc = [];
    goodsProviderVarity.forEach((Provider, index) => {
      const varietyIds = [];
      const varietyWithType = {};

      Provider.tGoodsVariety.forEach((GoodVariety) => {
        varietyIds.push(GoodVariety.fkVariationParameterValueId);

        varietyWithType[GoodVariety.parameterTitle] = GoodVariety.fkVariationParameterValueId;

        /// create print structure
        printStructure[GoodVariety.parameterTitle] =
          printStructure[GoodVariety.parameterTitle] || [];
        if (!AddedVarietyIdsForPrintStruc.includes(GoodVariety.fkVariationParameterValueId)) {
          printStructure[GoodVariety.parameterTitle].push(GoodVariety);
          AddedVarietyIdsForPrintStruc.push(GoodVariety.fkVariationParameterValueId);
        }

      });
      VarietyExistencePossibility[varitySort(
        varietyIds
      ).toString()] = index;
      VarietyExistencePossibilityWithType.push(varietyWithType);
    });

    return [printStructure, VarietyExistencePossibility, VarietyExistencePossibilityWithType];
  };

  const citiesSearchtextChangeHandler = (text) => {
    const filterCites = changeAreaData.cities.filter(x => x.cityTitle.includes(text));
    changeAreaModalRef.current.setCities(filterCites)
  }

  const initScreenData = (data) => {

    const varitySelected = [];

    // selecting default providerVarity
    let selectedProviderVariety = null;
    let selectedProviderVarietyIndex = null;
    for (let index = 0; index < data.goodsProviderVarity.length; index++) {
      if (data.goodsProviderVarity[index].hasInventory == true) {
        // setSelectedProviderVariety(data.goodsProviderVarity[index]);
        selectedProviderVariety = data.goodsProviderVarity[index];

        // setSelectedProviderVarietyIndex(index);
        selectedProviderVarietyIndex = index;
        data.goodsProviderVarity[index].tGoodsVariety.forEach((vari) => {
          varitySelected[vari.parameterTitle] = vari.fkVariationParameterValueId;
        });
        break;
      }
      if (index == data.goodsProviderVarity.length - 1) {
        // not item selected at the end, we select first item default
        data.goodsProviderVarity[0].tGoodsVariety.forEach((vari) => {
          varitySelected[vari.parameterTitle] = vari.fkVariationParameterValueId;
        });

        // setSelectedProviderVarietyIndex(0);
        selectedProviderVarietyIndex = 0;
        selectedProviderVariety = data.goodsProviderVarity[0];
        // setSelectedProviderVariety(data.goodsProviderVarity[0]); // default selected provider variety is first item
        break;
      }
    }


    // setVarietySelected(varitySelected);

    const [
      printStructure,
      VarietyExistencePossibility,
      varietyExistencePossibilityWithType
    ] = generatetGoodsVarietyExistencePossibilityAndPrintStructure(
      data.goodsProviderVarity
    );

    const varitiesArray = [];
    for (let key in printStructure) {
      const model = {
        varietyTitle: printStructure[key][0].parameterTitle,
        fkVariationParameterId: printStructure[key][0].fkVariationParameterId,
        varieties: printStructure[key]
      }
      varitiesArray.push(model);
    }

    // setVarietyExistencePossibilityWithType(varietyExistencePossibilityWithType);
    // setVarieties(varitiesArray);
    // setVarietyExistencePossibility(VarietyExistencePossibility);

    setScreenData((prev) => ({
      ...prev,
      selectedProviderVariety: data.goodsProviderVarity[selectedProviderVarietyIndex],
      selectedProviderVarietyIndex: selectedProviderVarietyIndex,
      varietySelected: varitySelected,
      varietyExistencePossibility: VarietyExistencePossibility,
      varieties: varitiesArray,
      varietyExistencePossibilityWithType: varietyExistencePossibilityWithType
    }));
  }

  useEffect(() => {
    getAciveCountries();
    getGoodsDetails();
    viewGoods(goodsId);
    getGoodsCustomerComment(1, 1, goodsId);
  }, []);

  const closeChangeAreaModal = () => {
    setChangeAreaModalIsVisible(false);
  };

  useEffect(() => {
    // ReactAnimated.timing(_animatedHeight, {
    //   toValue: (showCollapse) ? 1 : 0,
    //   duration: 300,
    //   useNativeDriver: false,
    // }).start();

    ReactAnimated.timing(_animatedRotate, {
      toValue: (showCollapse) ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showCollapse]);

  // const viewStyle = {
  //   height: _animatedHeight.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [50, (tempProviderheight.height * (screenData.goodsDetail?.otherProvider.length || 1))],
  //   }),
  // };

  const rotateStyle = {
    transform: [
      {
        rotate: _animatedRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '0deg'],
        }),
      }
    ]
  };

  // const onLayoutProviderItem = (event) => {
  //   const { x, y, width, height } = event.nativeEvent.layout;

  //   setTempProviderheight((prev) => {
  //     return (
  //       {
  //         ...prev,
  //         minusAmount: 0 // expres width with margin in <GoodsProverItem />
  //       }
  //     )
  //   })

  //   if (tempProviderheight.showTempProviderItem == true) {
  //     setTempProviderheight((prev) => {
  //       return {
  //         ...prev,
  //         height: height,
  //         showTempProviderItem: false
  //       }
  //     })
  //   }

  // }

  // const _renderTabBar = props => {
  //   return (
  //     <TabBar
  //       {...props}
  //       scrollEnabled
  //       indicatorStyle={styles.indicator}
  //       style={styles.tabbar}
  //       labelStyle={styles.label}
  //       tabStyle={styles.tabStyle}
  //       activeColor={'#172840'}
  //       inactiveColor={'#ACB1B8'}
  //     />
  //   )
  // };

  const onVarietyItemPress = (newVariSelected, providerIndex) => {
    setScreenData((prev) => ({
      ...prev,
      selectedProviderVariety: screenData.goodsDetail.goodsProviderVarity[providerIndex],
      selectedProviderVarietyIndex: providerIndex,
      varietySelected: newVariSelected
    }));
    setSelectedCount(1);
  }

  const openSelectCountView = () => {
    setShowSelectCountView(!showSelectCountView);
  }

  const onChangeCountHandler = (count) => {
    setShowSelectCountView(false);
    if (count != selectedCount) {
      setSelectedCount(count);
    }
  }

  const addOrder = (goodsId, providerId, number, countryId, cityId) => {
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
              .then((res) => {
                props.navigation.navigate('Cart', { screen: 'Cart', params: { fireChange: Math.random() } })
              });
          })

        snackBarRef?.current?.show(res?.message, 2);
      }).catch((err) => {
        setIsLoading(false);
        console.log('error', err.response?.data?.message);
        snackBarRef?.current?.show(err.response?.data?.message, 2);
      });
  };

  const onAddToCartPressHandler = () => {
    addOrder(goodsId,
      screenData.goodsDetail?.goodsProviderVarity[0]?.providerId,
      selectedCount,
      changeAreaData.selectedCountryId,
      changeAreaData.selectedCityId);
  }

  const likeGoods = (goodsId) => {
    clientUserActivity.likeGoods(goodsId)
      .then((response) => {
        const res = response.data;
        // getGoodsDetails();
        const tempGoodDetail = { ...screenData.goodsDetail }
        tempGoodDetail.like = !tempGoodDetail.like;
        setScreenData((prev) => ({
          ...prev,
          goodsDetail: tempGoodDetail
        }))
      }).catch((err) => {
        console.log(err);
      });
  };

  const onToggleLikeHandler = () => {
    likeGoods(screenData.goodsDetail.goodsId);
  };

  const onGotoSignIn = () => {
    props.navigation.navigate('SignIn', { backScreen: 'GoodsDetail', backParams: { fireChange: Math.random() + 1 } });
  };

  const onPressBackIconHanlder = () => {
    props.navigation.goBack();
  };

  const onProviderNamePressHandler = (vendorUrl) => {
    props.navigation.navigate('Provider', { storeName: vendorUrl, type: 2 });
  };

  const onProductItemPress = (item) => {
    // props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId });
    props.navigation.push('GoodsDetail', {
      goodsId: item.goodsId,
      providerId: item.providerId,
      resetBefore: Math.random() + 1
    });
  };

  const overViewPressHandler = () => {
    props.navigation.navigate("Overview", { id: screenData.goodsDetail?.goodsId });
  };

  const onSpecificationsPressHandler = () => {
    props.navigation.navigate("Specifications", { goodsId: screenData.goodsDetail?.goodsId });
  };

  const onRatingAndReviewsPressHandler = () => {
    props.navigation.navigate("RatingAndReviews", { goodsId: screenData.goodsDetail?.goodsId });
  };

  const [data, setData] = useState({
    surveyList: null,
    goodsComment: null,
    goodsCommentCount: null,
    allSurveyAverage: null
  });

  const getGoodsCustomerComment = (pageNumber, pageSize, goodsId) => {
    setIsLoading(true);

    clientHome.getGoodsCustomerComment(pageNumber, pageSize, goodsId)
      .then((response) => {
        const res = response.data;
        // res.result.goodsCommentCount = 10;
        // res.result.allSurveyAverage = 4.3;
        // res.result.goodsComment = [];

        // res.result.surveyList = [];
        // res.result.surveyList.push({
        //   value: 1,
        //   average: 50
        // });
        // res.result.surveyList.push({
        //   value: 2,
        //   average: 60
        // });
        // res.result.surveyList.push({
        //   value: 3,
        //   average: 70
        // });
        // res.result.surveyList.push({
        //   value: 4,
        //   average: 83
        // });
        // res.result.surveyList.push({
        //   value: 5,
        //   average: 60
        // });

        setData({
          allSurveyAverage: res.result.allSurveyAverage,
          goodsComment: res.result.goodsComment,
          goodsCommentCount: res.result.goodsCommentCount,
          surveyList: res.result.surveyList,
        });


        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
      });
  };

  const callRequestGoods = (goodsId, providerId) => {
    const token = axiosClient.getToken();
    if (token) {

    } else {
      props.navigation.navigate('SignIn', { backScreen: 'GoodsDetail', backParams: { fireChange: Math.random() + 1 } });
      return;
    }
    setIsLoading(true);
    clientUserActivity.callRequestGoods(goodsId, providerId)
      .then((response) => {
        const res = response.data;
        setShopDetailAccess(true);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onCallRequestPressHandler = () => {
    callRequestGoods(goodsId, providerId);
  };

  useEffect(() => {
    if (props.route.params?.resetBefore) {
      setTimeout(() => {
        props.navigation.dispatch(state => {
          const tempStateRoutes = [...state.routes]

          const removeIndex = state.routes.length - 2

          const routesdsfsdfdfsf = state.routes.splice(removeIndex, 1);
          const routes = tempStateRoutes.splice(removeIndex, 1);

          return CommonActions.reset({
            ...state,
            tempStateRoutes,
            index: tempStateRoutes.length - 1,
          });
        });
      }, 300);
    }
  }, [props.route.params?.resetBefore]);

  useEffect(() => {
    if (props.route.params?.fireChange) {
      getGoodsDetails();
    }
  }, [props.route.params?.fireChange]);

  const onSelectProviderHandler = (data) => {
    console.log(data);
    props.navigation.push('GoodsDetail', {
      goodsId: data.fkGoodsId,
      providerId: data.providerId,
      resetBefore: Math.random() + 1
    });
  };

  const renderDeliverType = () => {
    let content = null;
    // const shippingPossibilitie = screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.shippingPossibilities;
    const shippingPossibilitie = postMethod.postMethodType;
    if (shippingPossibilitie == Constants.ShippingMethods.NOT_POSSIBL) {
      content = (
        <View style={styles.notAvailabelContainer}>
          <Text style={styles.notAvailabelText}>{Languages.GoodsDetail.SorrythisProductIsNotAvailable}</Text>
        </View>
      );
    } else {
      const imagePath = PathHelper.getShippingMethodPathWithName(postMethod.shippingMethodImage);
      content = (
        <View style={styles.marketIconContainer}>
          <TouchableOpacity disabled={postMethod.shippingMethodDesc ? false : true} onPress={() => { setShowDeliverMethodType(!showDeliverMethodType) }} style={styles.shippinIconContainer}>
            <Image
              style={{
                width: Scale.moderateScale(80),
                height: Scale.moderateScale(20),
                resizeMode: "contain"
              }}
              source={{
                uri: imagePath
              }} />
            {postMethod.shippingMethodDesc && (
              <View style={styles.shippinHelpIconContainer}>
                <HelpIcon
                  width={Scale.moderateScale(20)}
                  height={Scale.moderateScale(20)}
                />
              </View>
            )}
          </TouchableOpacity>
          {postMethod.shippingMethodDesc && (
            <View>
              <Collapsible collapsed={!showDeliverMethodType}>
                <View style={styles.postMethodDescTextContainer}>
                  <Text style={styles.postMethodDescText}>{postMethod.shippingMethodDesc}</Text>
                </View>
              </Collapsible>
            </View>
          )}
        </View >
      );
    }

    return content;
  };

  const toggleLikeHandler = () => {
    if (token) {
      // loggedin
      onToggleLikeHandler();
    } else {
      onGotoSignIn();
    }
  };

  const backToTopPressHandler = () => {
    _scrollViewRef.current.scrollTo({ x: 0, y: 0, animation: true });
  };

  if (screenData.goodsDetail == null) {
    return <ScreenLoader></ScreenLoader>
  } else {
    return (
      <>
        {isLoading == true ? <RequestLoader /> : null}

        <LazyHOC>
          <>
            {showSelectCountView ?
              <TouchableWithoutFeedback
                onPress={() => setShowSelectCountView(false)} containerStyle={styles.backdrop}></TouchableWithoutFeedback>
              :
              null}
            <GoodsDetailHeader
              token={token}
              onPressBackIcon={onPressBackIconHanlder}
              // onGotoSignIn={onGotoSignIn}
              // onToggleLikePress={onToggleLikeHandler}
              liked={screenData.goodsDetail.like} showBackIcon={true} />
            <ScrollView ref={_scrollViewRef} style={styles.scrollViewContainer}>
              <View style={styles.productSliderSection}>

                <View style={styles.likeIcnContainer}>
                  <TouchableOpacity onPress={toggleLikeHandler} style={styles.likeIconContainer}>
                    <View style={{ marginTop: Scale.moderateScale(1) }}>
                      {screenData.goodsDetail.like == true ?
                        <LikeFillIcon
                          width={Scale.moderateScale(20)}
                          height={Scale.moderateScale(20)} />
                        :
                        <LikeIcon
                          width={Scale.moderateScale(20)}
                          height={Scale.moderateScale(20)} />}
                    </View>
                  </TouchableOpacity>
                </View>

                <GoodsSlider
                  firstImage={PathHelper.getGoodsImagePath(screenData.goodsDetail.image, screenData.goodsDetail.goodsId)}
                  images={screenData.goodsDetail.goodsDocument} />
              </View>

              <View style={styles.contentSection}>

                <View style={[styles.mainPaddingContent, styles.goodsInfoAndVarietySection]}>
                  <View style={styles.goodsTitleContainer}>
                    <Text style={styles.goodsTitleText}>{screenData.goodsDetail.title}</Text>
                  </View>
                  <View style={[styles.paddingWrapper]}>
                    <Text style={styles.brandTitleText}>{screenData.goodsDetail.brand}</Text>
                  </View>
                  <View style={[styles.starsContainer]}>
                    <Stars
                      height={Scale.moderateScale(20)}
                      width={Scale.moderateScale(20)}
                      rate={screenData.goodsDetail.surveyScore}
                      rateOrCountShowText={screenData.goodsDetail.surveyCount + ' ' + Languages.GoodsDetail.Reviews} />
                  </View>
                  {/* <View style={[styles.paddingWrapper]}>
                    <Text style={styles.twoTextFirst}>{Languages.GoodsDetail.ModelNumber}:<Text style={styles.twoTextSecond}>{'\u00a0\u00a0\u00a0\u00a0'}{screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.ModelNumber}</Text></Text>
                  </View> */}
                  {screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.vatfree == false && screenData.goodsDetail?.saleWithCall == false ?
                    <View style={[styles.paddingWrapper]}>
                      <Text style={styles.vatText}>({Languages.GoodsDetail.InclusiveOfVAT})</Text>
                    </View>
                    :
                    null}
                  {(screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.discountPercentage > 0 ||
                    screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.discountAmount > 0 &&
                    screenData.goodsDetail?.saleWithCall == false) &&
                    postMethod.postMethodType != Constants.ShippingMethods.NOT_POSSIBL &&
                    screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.hasInventory === true ?
                    (screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.discountAmount > 0 ?
                      <View style={[styles.paddingWrapper]}>
                        <Text style={styles.twoTextFirst}>{Languages.GoodsDetail.Saving}:<Text style={styles.twoTextSecond}>{'\u00a0\u00a0\u00a0\u00a0'}{currency} {Tools.formatMoney(screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.discountAmount)}</Text></Text>
                      </View>
                      :
                      null)
                    :
                    null}
                </View>
                <View style={styles.separateLineContainer}>
                  <View style={styles.separateLine}></View>
                </View>

                <View style={[styles.varietySection]}>
                  {
                    screenData.varieties?.map((item, index) => {
                      const selectedItemIndex = screenData.selectedProviderVariety?.tGoodsVariety.findIndex(x => x.fkVariationParameterId == item.fkVariationParameterId);
                      return (
                        <View key={item.fkVariationParameterId}>
                          <Variety
                            selectedVarietyItem={screenData.selectedProviderVariety?.tGoodsVariety[selectedItemIndex]}
                            selectedVariety={screenData.varietySelected}
                            varietyExistencePossibility={screenData.varietyExistencePossibility}
                            varietyExistencePossibilityWithType={screenData.varietyExistencePossibilityWithType}
                            handleVariSelect={onVarietyItemPress}
                            index={index}
                            data={item} />
                        </View>
                      )
                    })
                  }
                </View>

                {screenData.goodsDetail?.saleWithCall == false && screenData.goodsDetail?.isDownloadable == false ?
                  <View style={styles.deliverToSection}>
                    <View style={[styles.deliverToContainer, styles.mainPaddingContent]}>
                      <View style={styles.changeAreaRow}>
                        <View style={styles.deliverToTextContainer}>
                          <Text style={styles.deliverToText}>{Languages.GoodsDetail.DeliverTo}</Text>
                          <Text style={styles.deliverToValueText}>{changeAreaData.selectedCityTitle}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setChangeAreaModalIsVisible(true)} style={styles.changeAreaContainer}>
                          <Text style={styles.changeAreaText}>{Languages.GoodsDetail.ChangeArea}</Text>
                        </TouchableOpacity>
                      </View>

                      {postMethod.postTimeoutDay && (
                        <View style={styles.deliveredByContainer}>
                          <Text style={styles.deliverByText}>{Languages.GoodsDetail.DeliveredBy}
                            <Text style={styles.deliverByDayText}> {postMethod.postTimeoutDay}</Text>
                          </Text>
                        </View>
                      )}

                      {renderDeliverType()}
                      {/* <View style={styles.marketIconContainer}>
                        {
                          changeAreaData.postMethodType == 1 ?
                            <Image
                              style={{
                                width: 110,
                                height: 40,
                                resizeMode: "contain"
                              }}
                              source={{ uri: Tools.getMarketPlaceIconPath() }} />
                            :
                            null
                        }
                        {
                          changeAreaData.postMethodType == 2 ?
                            <Image
                              style={{
                                width: 110,
                                height: 40,
                                resizeMode: "contain"
                              }}
                              source={{ uri: Tools.getExpressIconPath() }} />

                            :
                            null
                        }
                      </View> */}
                      {/* {
                        changeAreaData.postMethodType == 1 ?
                          <View style={styles.postByContainer}>
                            <Text style={styles.postByText}>{Languages.GoodsDetail.PostedBySeller}</Text>
                          </View>
                          :
                          null
                      } */}
                      {/* {
                        changeAreaData.postMethodType == 3 ?
                          <View style={styles.notAvailabelContainer}>
                            <Text style={styles.notAvailabelText}>{Languages.GoodsDetail.SorrythisProductIsNotAvailable}</Text>
                          </View>
                          :
                          null
                      } */}
                    </View>
                  </View>
                  :
                  null}

                <View style={styles.providerSection}>
                  <View style={styles.providerContainer}>
                    <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                      <IconRow clickable={false} icon={StorIcon} >
                        <View style={styles.providerTextsContainer}>
                          <Text style={styles.soldByText}>{Languages.GoodsDetail.SoldBy}:  </Text>
                          <TouchableOpacity disabled={screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.microstore != true} onPress={() => onProviderNamePressHandler(screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.vendorUrl)}>
                            <Text style={[styles.providerTitle, screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.microstore != true ? styles.deActiveProviderTitle : {}]}>{screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.shopTitle}</Text>
                          </TouchableOpacity>
                        </View>
                      </IconRow>
                    </View>
                    {screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.haveGuarantee ?
                      <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                        <IconRow clickable={false} icon={DegreeIcon} >
                          <View style={styles.providerTextsContainer}>
                            <Text style={styles.iconText}>{Languages.GoodsDetail.MonthWarranty(screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.guaranteeMonthDuration)}</Text>
                          </View>
                        </IconRow>
                      </View>
                      :
                      null}
                    {screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.returningAllowed == false ?
                      <View style={styles.textRowContainer}>
                        <IconRow clickable={false} icon={CancelColoryIcon} >
                          <View style={styles.providerTextsContainer}>
                            <Text style={styles.iconText}>{Languages.GoodsDetail.ThisItemCannotBeExchangedOrReturned}</Text>
                          </View>
                        </IconRow>
                      </View>
                      :
                      null}
                    {screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.returningAllowed == true ?
                      <View style={styles.textRowContainer}>
                        <IconRow clickable={false} icon={ReturnIcon} >
                          <View style={styles.providerTextsContainer}>
                            <Text style={styles.iconText}>{Languages.GoodsDetail.GetFreeReturnsEligibleItems}</Text>
                          </View>
                        </IconRow>
                      </View>
                      :
                      null}
                  </View>
                </View>

                {/* <ReactAnimated.View
              style={[styles.otherProvidersWrapper,
                viewStyle]}
            > */}
                <Collapsible collapsed={!showCollapse}>
                  <View
                    style={styles.providersScrollView}>
                    {
                      screenData.goodsDetail?.otherProvider.map((provider, index) => {
                        return (
                          <>
                            <View>
                              <GoodsProverItem currency={currency} onSelectProvider={onSelectProviderHandler} onShopTitlePress={() => onProviderNamePressHandler(provider.shopTitle)} data={provider} />
                              {index == screenData.goodsDetail?.otherProvider.length - 1 ?
                                null
                                :
                                <View style={styles.providerSeprateLine}></View>
                              }
                            </View>
                          </>
                        )
                      })}
                  </View>
                </Collapsible>

                {
                  screenData.goodsDetail?.otherProvider.length > 0 ?
                    <TouchableOpacity style={styles.otherOfferContainer} onPress={() => setShowCollapse((prev) => !prev)}>
                      <Text style={styles.otherOfferText}>{Languages.GoodsDetail.NumberOtherOffer(screenData.goodsDetail?.otherProvider.length)} <Text style={styles.lessText}>{showCollapse ? Languages.GoodsDetail.Less : Languages.GoodsDetail.ViewAllOffers}</Text></Text>
                      <ReactAnimated.View style={rotateStyle}>
                        <ArrowIcon
                          style={{ color: Colors.LOCHMARA }}
                          width={Scale.moderateScale(12)}
                          height={Scale.moderateScale(12)}
                        />
                      </ReactAnimated.View>
                    </TouchableOpacity>
                    :
                    null
                }
                {/* </ReactAnimated.View> */}

                {/* {
              tempProviderheight.showTempProviderItem ?
                <View onLayout={onLayoutProviderItem}>
                  <GoodsProverItem
                    getWarrantyTextHeight={}
                    showExpress={true}
                    showguarantee={true} />
                  <View style={styles.providerSeprateLine}></View>
                </View>
                :
                null
            } */}

                <View style={styles.goodsDetailInfo}>
                  <View style={styles.rowItem}>
                    <IconRow
                      containerStyle={styles.rowItemContainerStyle}
                      showArrowIcon={true}
                      showIcon={false}
                      onPress={overViewPressHandler}
                    >
                      <View style={styles.rowItemTextContainer}>
                        <Text style={styles.rowItemText}>{Languages.GoodsDetail.Overview}</Text>
                      </View>
                    </IconRow>
                  </View>
                  <View style={styles.separateLineContainer}>
                    <View style={styles.separateLine}></View>
                  </View>

                  <View style={styles.rowItem}>
                    <IconRow
                      containerStyle={styles.rowItemContainerStyle}
                      showArrowIcon={true}
                      showIcon={false}
                      onPress={onSpecificationsPressHandler}
                    >
                      <View style={styles.rowItemTextContainer}>
                        <Text style={styles.rowItemText}>{Languages.GoodsDetail.Specifications}</Text>
                      </View>
                    </IconRow>
                  </View>

                  <View style={styles.separateLineContainer}>
                    <View style={styles.separateLine}></View>
                  </View>

                  {data.goodsCommentCount > 0 ?
                    <>
                      <IconRow
                        containerStyle={[styles.rowItemContainerStyle]}
                        showArrowIcon={true}
                        showIcon={false}
                        onPress={onRatingAndReviewsPressHandler}
                      >
                        <View style={styles.rowItemTextContainer}>
                          <Text style={styles.rowItemText}>{Languages.GoodsDetail.RatingReviews}</Text>
                        </View>
                      </IconRow>

                      <View style={[styles.rowItem, { marginTop: Scale.moderateScale(10) }]}>


                        <RatingHeader
                          allSurveyAverage={data.allSurveyAverage}
                          goodsCommentCount={data.goodsCommentCount}
                          surveyList={data.surveyList}
                        />
                      </View>

                    </>
                    :
                    null}

                </View>

                <View style={styles.backToTopContainer}>
                  <TouchableOpacity style={styles.backToTopWrapper} onPress={backToTopPressHandler}>
                    <Text style={styles.backToTopText}>{Languages.Common.BackToTop}</Text>
                    <UpArrowIcon
                      width={Scale.moderateScale(16)}
                      height={Scale.moderateScale(16)}
                    />
                  </TouchableOpacity>
                </View>

                {screenData?.goodsDetail?.recommendation?.length > 0 ?
                  <View>
                    <ShadowWrapper>
                      <ProductCarousel
                        title={Languages.GoodsDetail.CustomerAlsoViewed}
                        goods={screenData?.goodsDetail?.recommendation}
                        currency={currency}
                        onPressItem={onProductItemPress} />
                    </ShadowWrapper>
                  </View>
                  :
                  null}

                {/* <View style={styles.tabsContainer}>
                  <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={_renderTabBar}
                  />
                </View> */}

              </View>

              <View style={{ paddingTop: Scale.moderateScale(30) }}></View>
            </ScrollView>

            {screenData.goodsDetail?.saleWithCall == false ?
              <View style={{ zIndex: 12 }}>
                <Bottombar
                  currency={currency}
                  onAddToCartPress={onAddToCartPressHandler}
                  inventoryCount={screenData.goodsDetail?.goodsProviderVarity[screenData.selectedProviderVarietyIndex]?.inventoryCount}
                  onCountSelect={onChangeCountHandler}
                  selectedCount={selectedCount}
                  openSelectCountView={openSelectCountView}
                  showSelectCountView={showSelectCountView}
                  postMethodType={postMethod.postMethodType}
                  data={screenData.goodsDetail.goodsProviderVarity[screenData.selectedProviderVarietyIndex]}
                  isDownloadable={screenData.goodsDetail?.isDownloadable}
                />
              </View>
              :
              null
            }

            {screenData.goodsDetail?.saleWithCall == true ?
              <View style={{ zIndex: 12 }}>
                <SaleWithCallBottombar
                  onCallRequestPress={onCallRequestPressHandler}
                  shopDetailAccess={shopDetailAccess}
                />
              </View>
              :
              null
            }
          </>
          <ChangeAreaModal
            cities={changeAreaData.cities}
            isLoading={isChangeAreaModalLoading}
            selectedCountryChanged={countryChangeHandler}
            selectedProvinceChanged={provinceChangeHandler}
            selectedCityChanged={cityChangeHandler}
            countries={changeAreaData.countries}
            provinces={changeAreaData.provinces}
            selectedCityId={changeAreaData.selectedCityId}
            selectedCountryId={changeAreaData.selectedCountryId}
            selectedProvinceId={changeAreaData.selectedProvinceId}
            onRequestClose={closeChangeAreaModal}
            visible={changeAreaModalIsVisible}
            citiesSearchTextChanged={citiesSearchtextChangeHandler}
            ref={changeAreaModalRef}
          />
        </LazyHOC>
        <SnackBar
          ref={snackBarRef}
        />
      </>
    );
  };
};

export default GoodsDetailScreen;
