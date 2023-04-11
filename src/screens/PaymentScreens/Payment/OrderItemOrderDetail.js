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
    ProductItemSec
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
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

const OrderItemOrderDetail = (props) => {

    return (
        <>
            <View style={styles.container}>

                <View style={styles.orderItemFooter}>
                    <View style={styles.orderItemFooterContainer}>
                        {props.data.status == true ?
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
                    props.data.status == false ? styles.orderItemFooterTextCancel : {}]}>
                        {props.data.status == true ?
                            'Delivered '
                            :
                            'Cancelled '
                        }
                    </Text>

                    {props.data.status == true ?
                        <Text style={[styles.deliverData]}>
                            on Jun 30, 2020
                        </Text>
                        :
                        null
                    }

                </View>

                <ProductItemSec
                    titleTextStyle={styles.productTitleText}
                    modelNumber={props.data.modelNumber}
                    data={props.data}
                    title={'dflsdjfls'}
                    showPrice={1000}
                    discountPercent={0}
                    discountAmount={0}
                    provider={'Nile Appliances'}
                    offLineLabelPrice={0}
                    showMarketOrExpress={true} // true market, false express, null dont't show
                    currency={'TR'}
                />

                {props.data.status == true ?
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>EGP 26,997{'\u00A0\u00A0\u00A0\u00A0'}</Text>
                        <Text style={styles.itemCountText}>3 Items</Text>
                    </View>
                    :
                    null}

                {props.data.status == true ?
                    <View style={styles.btnContainer}>
                        <View style={styles.btnWrapper}>
                            <View style={styles.btnArrowIconContainer}>
                                <ArrowIcon
                                    style={{ color: Colors.WHITE }}
                                    width={Scale.moderateScale(17)}
                                    height={Scale.moderateScale(17)}
                                />
                            </View>
                            <MainButton onPress={() => {
                                if (props.onReviewPress)
                                    props.onReviewPress();
                            }} textStyle={styles.buttonText}>
                                Review
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
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
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
        alignItems: "flex-end",
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
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    }
});


export default OrderItemOrderDetail;
