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
    TouchableOpacity,
    Linking,
    I18nManager
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
    ShowPrice,
    OrderStatus
} from 'components/UI';
import { Languages, Scale, Constants, Tools, PathHelper } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import { CommonActions } from '@react-navigation/native';
import TickIcon from 'assets/icons/tick-green-circle.svg';
import CloseIcon from 'assets/icons/close-red-circle.svg';
import { OrderStatusEnum } from 'common/Enums';

const OrderItemOrderDetail = (props) => {

    const onDowloadPress = () => {
        const downloadUrl = PathHelper.getFileDownloadPath(props.data.goodsId, props.data.downloadUrl);

        Linking.canOpenURL(downloadUrl).then(supported => {
            if (supported) {
                Linking.openURL(downloadUrl);
            } else {
                try {
                    Linking.openURL(downloadUrl);
                } catch (error) {
                    console.log('Error in openning: ', error);
                }
                console.log("Don't know how to open URI: " + downloadUrl);
            }
        });
    };

    return (
        <>
            <View style={styles.container}>

                <View style={styles.orderItemFooter}>
                    {/* <View style={styles.orderItemFooterContainer}>
                        {props.data.statusId == 6 ?
                            <TickIcon
                                width={Scale.moderateScale(20)}
                                height={Scale.moderateScale(20)}
                            />
                            :
                            <CloseIcon
                                width={Scale.moderateScale(20)}
                                height={Scale.moderateScale(20)}
                            />
                        }
                    </View>
                    <Text style={[styles.orderItemFooterText,
                    props.data.statusId == 100 ? styles.orderItemFooterTextCancel : {}]}>
                        {props.data.statusTitle}
                    </Text> */}
                    <OrderStatus
                        id={props.data.statusId}
                        title={props.data.statusTitle}
                    />

                    <Text style={[styles.deliverData]}>
                        {/* {'\u00A0'}{Languages.Common.On}{'\u00A0'}{props.data.orderStatusPlacedDateTime}{'\u00A0'}{'\u00A0'} */}
                        {'\u00A0'}{Languages.Common.OnText(props.data.orderStatusPlacedDateTime)}{'\u00A0'}
                    </Text>

                </View>

                <ProductItemSec
                    onPress={props.onProductPress}
                    onPressValue={props.data}
                    titleTextStyle={styles.productTitleText}
                    modelNumber={props.data.modelNumber}
                    showReturningAllowed={true}
                    returningAllowed={props.data.returningAllowed}
                    data={props.data}
                    title={props.data.title}
                    showItemCount={true}
                    itemCount={props.data.quantity}
                    // showMarketOrExpress={props.data.shippingMethod == 1} // true market, false express, null dont't show
                    currency={props.currency}
                    showPrice={props.data.priceWithDiscount}
                    discountPercent={props.data.discountPercent}
                    discountAmount={props.data.discountAmount}
                    offLineLabelPrice={props.data.unitPrice}
                    showShippingMethod={true}
                    shippingMethodType={props.data.shippingMethod}
                />

                {/* {props.data.statusId == 6 ? */}
                <View style={styles.priceContainer}>
                    <ShowPrice
                        currencyStyle={[styles.priceText]}
                        priceStyle={[styles.priceText]}
                        afterDotStyle={[styles.priceText]}
                        price={props.data.totalPrice}
                        currency={props.currency} />
                    <Text>{'\u00A0\u00A0\u00A0\u00A0'}</Text>
                    <Text style={styles.itemCountText}>{Languages.Cart.NumberItems(props.data.quantity)}</Text>
                </View>
                {/* :
                    null} */}

                {props.data.statusId != OrderStatusEnum.Cancelled && props.data.statusId != OrderStatusEnum.ReturnComplete && props.data.isDownloadable ?
                    <View style={[styles.btnContainer, styles.downloadBtnContainer]}>
                        <MainButton onPress={() => {
                            if (onDowloadPress)
                                onDowloadPress();
                        }} textStyle={styles.buttonText}>
                            {Languages.Common.Download}
                        </MainButton>
                    </View>
                    :
                    null}

                {/* // Todo: in wich status show this .... and so for downloadies ....?????  */}
                {props.data.statusId != OrderStatusEnum.Cancelled && props.data.statusId != OrderStatusEnum.ReturnComplete ?
                    <View style={styles.btnContainer}>
                        <View style={styles.btnWrapper}>
                            <View style={[styles.btnArrowIconContainer, I18nManager.isRTL ? styles.btnArrowIconContainerRtl : {}]}>
                                <ArrowIcon
                                    style={{ color: Colors.LOCHMARA }}
                                    width={Scale.moderateScale(17)}
                                    height={Scale.moderateScale(17)}
                                />
                            </View>
                            <MainButton onPress={() => {
                                if (props.onReviewPress)
                                    props.onReviewPress();
                            }}
                                textStyle={styles.reviewBtnText}
                                buttonStyle={styles.reviewBtnStyle}>
                                {Languages.Common.Review}
                            </MainButton>
                        </View>
                    </View>
                    :
                    null}

            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Scale.moderateScale(10)
    },
    orderItemFooter: {
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        marginTop: Scale.moderateScale(5)
    },
    orderItemFooterContainer: {
        marginRight: Scale.moderateScale(5)
    },
    orderItemFooterText: {
        color: Colors.SHAMROCK,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    orderItemFooterTextCancel: {
        color: Colors.JAFFA
    },
    deliverData: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        marginBottom: Scale.moderateScale(3)
    },
    btnContainer: {
        // paddingHorizontal: Scale.moderateScale(20)
    },
    btnWrapper: {

    },
    btnArrowIconContainer: {
        position: "absolute",
        right: Scale.moderateScale(18),
        bottom: 0,
        zIndex: 100,
        justifyContent: "center",
        height: '100%',
        transform: [
            { rotate: '90deg' }
        ]
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        marginVertical: Scale.moderateScale(10),
        marginLeft: Scale.moderateScale(20)
    },
    priceText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    itemCountText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    buttonText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    reviewBtnStyle: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.LOCHMARA,
    },
    reviewBtnText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.LOCHMARA,
    },
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    downloadBtnContainer: {
        marginBottom: Scale.moderateScale(10)
    },
    downloadBtnStyle: {
        backgroundColor: Colors.SHAMROCK,
        borderColor: Colors.SHAMROCK
    },
    btnArrowIconContainerRtl: {
        transform: [
            {
                rotate: '270deg',
            }
        ]
    }
});


export default OrderItemOrderDetail;
