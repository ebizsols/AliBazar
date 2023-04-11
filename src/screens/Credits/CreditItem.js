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
    ShowPrice
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import AlertIcon from 'assets/icons/alert.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import { CommonActions } from '@react-navigation/native';

const CreditItem = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.purchasedItem}>
                <View style={styles.topLeft}>
                    <Text style={styles.purchasedItemText}>{props.data.transactionType}</Text>
                    <Text style={styles.purchasedItemDate}>{props.data.transactionDateTime}</Text>
                </View>
                <View style={styles.topRight}>
                    <View style={styles.topRightFirst}>
                        <Text style={styles.topRightBalance}>{Languages.Credits.Balance}{`\u00A0\u00A0\u00A0`}</Text>
                        <View style={styles.topRightBalancePrice}>
                            <ShowPrice
                                currencyStyle={[styles.balancePriceText]}
                                priceStyle={[styles.balancePriceText]}
                                afterDotStyle={[styles.balancePriceText]}
                                price={props.data.balance} currency={props.currency}
                            />
                        </View>
                    </View>
                    <View style={styles.secondePriceContainer}>
                        <ShowPrice
                            showMinus={props.data.transactionTypeId === 10}
                            showPlus={props.data.transactionTypeId !== 10}
                            currencyStyle={[styles.priceValueText, props.data.transactionTypeId !== 10 ? styles.priceValuePlusText : {}]}
                            priceStyle={[styles.priceValueText, props.data.transactionTypeId !== 10 ? styles.priceValuePlusText : {}]}
                            afterDotStyle={[styles.priceValueText, props.data.transactionTypeId !== 10 ? styles.priceValuePlusText : {}]}
                            price={props.data.amount} currency={props.currency}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerFirstText}>{props.data.comment}</Text>
                {/* <Text style={styles.footerSecText}>Bin amaar</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    purchasedItem: {
        flexDirection: "row"
    },
    topLeft: {
        flex: 1,
        alignItems: 'flex-start'
    },
    purchasedItemText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(10)
    },
    purchasedItemDate: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BOMBAY
    },
    topRight: {
        flex: 1,
        alignItems: "flex-end"
    },
    topRightFirst: {
        flexDirection: "row"
    },
    topRightBalance: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BOMBAY,
        marginBottom: Scale.moderateScale(10)
    },
    topRightBalancePrice: {

    },
    balancePriceText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    secondePriceContainer: {

    },
    priceValueText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.JAFFA
    },
    priceValuePlusText: {
        color: Colors.SHAMROCK
    },
    footer: {
        marginTop: Scale.moderateScale(20),
        alignItems: 'flex-start'
    },
    footerFirstText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    footerSecText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BOMBAY
    }
});


export default CreditItem;
