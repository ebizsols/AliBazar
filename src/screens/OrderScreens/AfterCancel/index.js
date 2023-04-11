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
import {
    clientAuth,
    clientProfile
} from 'api/client';
import {
    ModuleSelection,
    HomeHeader,
    AddressesHeader,
    BottomSheetHeader,
    BottomSheetBackView
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    ProductItemSec,
    TextWithRadio,
    FloatButtonWrapper,
    RadioButton
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import TickIcon from 'assets/icons/tick.svg';
import CloseIcon from 'assets/icons/close-gray.svg';

const AfterCancelScreen = (props) => {

    const { items, orderId = 0 } = props.route?.params;

    const currency = axiosClient.getCurrency();

    const onProductItemPressHandler = (item) => {
        if (item.providerId && item.goodsId)
            props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
    };

    const backToOrderPressHandler = () => {
        props.navigation.navigate("OrderDetail", { orderId: orderId });
    };

    return (
        <>
            <ScrollView style={styles.container}>

                <ShadowWrapper
                    shadowContainerStyle={{ paddingTop: 0 }}
                >
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={backToOrderPressHandler} style={styles.headerTopIconContainer}>
                            <CloseIcon
                                width={Scale.moderateScale(25)}
                                height={Scale.moderateScale(25)}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        <View style={styles.headerIconContainer}>
                            <View style={styles.headerIconWrapper}>
                                <TickIcon
                                    style={{ color: Colors.WHITE }}
                                    width={Scale.moderateScale(20)}
                                    height={Scale.moderateScale(20)}
                                />
                            </View>
                        </View>
                        <Text style={styles.headerText}>{Languages.Cancel.ThisItemSuccessfullyRemovedFromYourOrder}</Text>
                    </View>
                </ShadowWrapper>

                <ShadowWrapper>
                    <View>
                        <View style={styles.carouselHeader}>
                            <View style={styles.headerLeftColor}></View>
                            <View style={styles.carouselHeaderTextsContainer}>
                                <Text style={styles.title}>{Languages.Cancel.RemovedItems}</Text>
                                <Text style={styles.itemCountText}>{Languages.Common.NumberItems(items?.length)}</Text>
                            </View>
                        </View>
                        <View>
                            {items?.map((item, index) => {
                                return (
                                    <View key={item.itemId}>
                                        {/* // Todo: check this */}
                                        <View style={styles.productitemContainer}>
                                            <ProductItemSec
                                                onPress={onProductItemPressHandler}
                                                onPressValue={item}
                                                disabled={true}
                                                titleTextStyle={styles.productTitleText}
                                                modelNumber={item?.modelNumber}
                                                data={item}
                                                showItemCount={true}
                                                itemCount={item?.quantity}
                                                title={item?.title}
                                                showPrice={item?.totalPrice}
                                                provider={item?.shopName}
                                                // discountPercent={item?.discountPercent}
                                                // discountAmount={item?.discountAmount}
                                                // offLineLabelPrice={(item?.unitPrice * item?.quantity) + item?.vat}
                                                // showMarketOrExpress={item.shippingAvailable == false ? null : props.data.method == 1} // true market, false express, null dont't show
                                                currency={currency}
                                            />
                                        </View>
                                        {index != items.length - 1 ?
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
                <MainButton onPress={backToOrderPressHandler}>
                    {Languages.Cancel.BackToOrder}
                </MainButton>
            </FloatButtonWrapper>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        // flex: 1,
        // paddingVertical: Scale.moderateScale(10),
        // paddingHorizontal: Scale.moderateScale(20),
    },
    headerTop: {
        alignItems: "flex-end",
        // paddingTop: Scale.moderateScale(15),
        // paddingHorizontal: Scale.moderateScale(15)
    },
    headerTopIconContainer: {
        // backgroundColor: 'red',
        height: Scale.moderateScale(45),
        width: Scale.moderateScale(45),
        justifyContent: "flex-end"
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(50),
        paddingBottom: Scale.moderateScale(25)
    },
    headerIconContainer: {
        marginBottom: Scale.moderateScale(15)
    },
    headerIconWrapper: {
        backgroundColor: '#4CAF50',
        width: Scale.moderateScale(40),
        height: Scale.moderateScale(40),
        borderRadius: Scale.moderateScale(5),
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
        textAlign: "center"
    },
    // 
    carouselHeader: {
        alignItems: "center",
        flexDirection: "row"
    },
    headerLeftColor: {
        backgroundColor: Colors.TULIPTREE,
        width: Scale.moderateScale(10),
        height: Scale.moderateScale(50),
        borderTopRightRadius: Scale.moderateScale(15),
        borderBottomRightRadius: Scale.moderateScale(15),
    },
    carouselHeaderTextsContainer: {

    },
    title: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        marginHorizontal: Scale.moderateScale(15)
    },
    itemCountText: {
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        marginHorizontal: Scale.moderateScale(15),
        marginTop: Scale.moderateScale(3),
        textAlign: 'left'
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '90%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
});


export default AfterCancelScreen;
