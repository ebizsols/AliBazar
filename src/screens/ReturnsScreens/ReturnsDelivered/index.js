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
  FloatButtonWrapper
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";
import Animated, { Easing } from 'react-native-reanimated';
import ReturnsItem from './ReturnsItem';

import CloseIcon from 'assets/icons/close-unfill-circle.svg';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyBoxIcon from 'assets/icons/return-empty.svg';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const ReturnsDeliveredScreen = (props) => {

  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [products, setProducts] = useState([]);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const snackBarRef = useRef(null);

  const currency = axiosClient.getCurrency();

  useEffect(() => {
    getProfileReturnDeliverd(pagination.pageNumber, pagination.pageSize, true);
  }, []);

  const getProfileReturnDeliverd = (pageNumber, pageSize, setLoader = false) => {
    if (setLoader)
      setIsLoading(true);
    else
      setIsLoadingMore(true)
    clientProfile.getProfileReturnDeliverd(pageNumber, pageSize)
      .then((response) => {
        const res = response?.data;
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false);

        setProducts((prev) => prev.concat(res.result.data));
        // setProducts((prev) => prev.concat(data));
        if (res.result?.data?.length < pagination.pageSize) {
          setShouldLoadMore(false);
        }
      }).catch((err) => {
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false)
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

      getProfileReturnDeliverd(tempPagination.pageNumber, tempPagination.pageSize);
    }
  };

  const handleNewReturnRequestPress = () => {
    props.navigation.navigate('ReturnsRequestFirstStep')
  }

  const onProductItemPressHandler = (item) => {
    if (item.providerId && item.goodsId)
      props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <View style={[styles.container]}>
        {products?.length > 0 ?
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
              data={products}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <View style={styles.iteWrapper}>
                      <ReturnsItem
                        onProductPresss={onProductItemPressHandler}
                        data={item}
                        currency={currency} />
                    </View>
                    {index != products.length - 1 ?
                      <View style={styles.cartItemLine}></View>
                      :
                      null}
                  </>
                )
              }}
              keyExtractor={(item) => item.itemId.toString()}
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

        {products?.length == 0 && isLoading == false ?
          <View style={styles.emptyViewContainer}>
            <View style={styles.emptyTop}>
              <View style={styles.emptyIconContainer}>
                <EmptyBoxIcon
                  width={Scale.moderateScale(160)}
                  height={Scale.moderateScale(160)}
                />
              </View>
            </View>
            <View style={styles.emptyMiddle}>
              <Text style={styles.emptyTextFirst}>{Languages.Returns.WeDontSeeReturnsDelivered}</Text>
              <Text style={styles.emptyTextSecond}>{Languages.Returns.NeedSubmitRequest}</Text>
              <Text style={[styles.emptyTextSecond, { marginTop: Scale.moderateScale(5) }]}>{Languages.Returns.JustClickButton}</Text>
            </View>
          </View>
          :
          null
        }
      </View>
      {/* 
      <FloatButtonWrapper>
        <MainButton onPress={handleNewReturnRequestPress}>
          {Languages.Returns.FileANewReturnRequest}
        </MainButton>
      </FloatButtonWrapper> */}

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ReturnsDeliveredScreen;

const data = [
  {
    itemId: 1,
    title: 'Iphon 11',
    goodsImage: "533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg",
    goodsId: 12,
    modelNumber: "MTGX3ZA/A",
    goodsCode: "GN-12",
    shopName: "eshak shop",
    returnReason: "eshak reason",
    returnAction: "Refunddsf",
    vat: 1000,
    totalPrice: 2000,
    unitPrice: 2000,
    priceWithDiscount: 1900,
    orderStatusPlacedDateTime: Date.now(),
    trackingCode: '#SDFDFSDFSDFSFDFs'
  }
]