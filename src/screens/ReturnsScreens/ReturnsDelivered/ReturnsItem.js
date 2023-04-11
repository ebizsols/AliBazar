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

const ReturnsItem = (props) => {

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerLeftText}>{Languages.Returns.ReturnCapWithTrackingCode(props.data.trackingCode)}</Text>
                    </View>
                </View>

                {props.data.placedDateTime && (
                    <View style={styles.placedOnContainer}>
                        {/* <Text style={styles.placedOnText}>{Languages.Common.PlacedOn} {props.data.placedDateTime}</Text> */}
                        <Text style={styles.placedOnText}>{Languages.Common.PlacedOn(props.data.placedDateTime)}</Text>
                    </View>
                )}
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
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    //
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Scale.moderateScale(10)
    },
    headerRight: {

    },
    headerLeftText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    placedOnContainer: {

    },
    placedOnText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
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
});


export default ReturnsItem;
