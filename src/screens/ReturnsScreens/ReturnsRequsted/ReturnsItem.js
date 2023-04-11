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
    ShowPrice
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import OrderAddressItem from "screens/OrderScreens/OrderDetail/OrderAddressItem";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import AlertIcon from 'assets/icons/alert.svg';
import LogoIcon from 'assets/icons/logo-white.svg';
import { CommonActions } from '@react-navigation/native';
import ReturnItemAddress from './ReturnItemAddress';

const ReturnsItem = (props) => {

    return (
        <View style={styles.container}>
            <View>
                <ReturnItemAddress
                    trackingCode={props.data?.goodsCode}
                    fullName={props.data?.adTransfereeName + ' ' + props.data?.adTransfereeFamily}
                    countryCode={props.data?.iso}
                    mobile={props.data?.adTransfereeMobile}
                    address={props.data?.adAddress}
                    placedDateTime={props.data?.orderStatusPlacedDateTime}
                />
            </View>

            <View style={styles.refundContainer}>
                <Text style={styles.refundText}>{Languages.Returns.RefundMethod}</Text>
                <View style={[styles.rowContainer]}>
                    {/* <View style={styles.iconContainer}>
                        <LogoIcon
                            width={Scale.moderateScale(40)}
                            height={Scale.moderateScale(30)}
                        />
                    </View> */}
                    <Text style={styles.rowText}>{props.data.returnAction}</Text>
                </View>
            </View>

            <View>
                <ProductItemSec
                    onPress={props.onProductPresss}
                    onPressValue={props.data}
                    titleTextStyle={styles.productTitleText}
                    modelNumber={props.data?.modelNumber}
                    data={props.data}
                    title={props.data.title}
                    showPrice={props.data.priceWithDiscount}
                    discountPercent={props.data.discountPercent}
                    discountAmount={props.data.discountAmount}
                    offLineLabelPrice={props.data.unitPrice}
                    provider={props.data.shopName}
                    showProverInToOfPrice={true}
                    reason={props.data.returnReason}
                    showReason={true}
                    currency={props.currency}
                    showItemCount={true}
                    itemCount={props.data?.quantity}
                />

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
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    //
    refundContainer: {
        marginBottom: Scale.moderateScale(8)
    },
    refundText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        marginTop: Scale.moderateScale(3),
        marginBottom: Scale.moderateScale(5),
        textAlign: 'left'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: Colors.BIGSTONE,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: Scale.moderateScale(8)
        width: Scale.moderateScale(50),
        borderRadius: Scale.moderateScale(5),
        // height: Scale.moderateScale()
        marginRight: Scale.moderateScale(10)
    },
    rowText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: 'left'
    },
    //
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    //

    //
    headerTextContainer: {
    },
    headerText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    //
    priceContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        marginVertical: Scale.moderateScale(5),
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
});


export default ReturnsItem;
