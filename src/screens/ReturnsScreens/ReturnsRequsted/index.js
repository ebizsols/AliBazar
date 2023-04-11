/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Platform,
  Text
} from 'react-native';
import { clientProfile } from 'api/client';
import styles from './style'
import {
  ShadowWrapper,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper
} from 'components/UI';
import { Languages, Scale } from 'common';
import axiosClient from "api/axios";
import ReturnsItem from './ReturnsItem';

import EmptyBoxIcon from 'assets/icons/return-empty.svg';
import LottieView from 'lottie-react-native';

const ReturnsRequstedScreen = (props) => {

  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [products, setProducts] = useState([]);
  const [, setOnEndReachedCalledDuringMomentum] = useState(true);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const snackBarRef = useRef(null);

  const currency = axiosClient.getCurrency();

  useEffect(() => {
    getProfileReturnRequested(pagination.pageNumber, pagination.pageSize, true, true);
  }, []);

  useEffect(() => {
    if (props.route.params?.fireChange) {
      console.log('[ReturnsRequsted] fire change');
      setPagination((prev) => ({
        ...prev,
        pageNumber: 1
      }));
      getProfileReturnRequested(1, pagination.pageSize, true, true);
    }
  }, [props.route.params?.fireChange]);

  const getProfileReturnRequested = (pageNumber, pageSize, setLoader = false, resetData = false) => {
    if (setLoader)
      setIsLoading(true);
    else
      setIsLoadingMore(true)
    clientProfile.getProfileReturnRequested(pageNumber, pageSize)
      .then((response) => {
        const res = response?.data;
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false);

        if (resetData == true) {
          setProducts(res.result.data);
        } else {
          setProducts((prev) => prev.concat(res.result.data));
        }
        if (res?.result?.data?.length < pagination.pageSize) {
          setShouldLoadMore(false);
        }
      }).catch((err) => {
        if (setLoader)
          setIsLoading(false);
        else
          setIsLoadingMore(false)
        console.log('err', err.response?.data);
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

      getProfileReturnRequested(tempPagination.pageNumber, tempPagination.pageSize);
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
              }} />
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
              <Text style={styles.emptyTextFirst}>{Languages.Returns.WeDontSeeAnyReturnsRequested}</Text>
              <Text style={styles.emptyTextSecond}>{Languages.Returns.NeedSubmitRequest}</Text>
              <Text style={[styles.emptyTextSecond, { marginTop: Scale.moderateScale(5) }]}>{Languages.Returns.JustClickButton}</Text>
            </View>
          </View>
          :
          null
        }
      </View>

      <FloatButtonWrapper>
        <MainButton onPress={handleNewReturnRequestPress}>
          {Languages.Returns.FileRequest}
        </MainButton>
      </FloatButtonWrapper>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default ReturnsRequstedScreen;

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