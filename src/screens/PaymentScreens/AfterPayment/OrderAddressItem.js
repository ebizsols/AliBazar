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
    RequestLoader
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

const OrderAddressItem = (props) => {

    return (
        <>
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerLeftText}>{Languages.Payment.ShipTo}</Text>
                    </View>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.bodyLeft}>
                        <View style={styles.officeIconContainer}>
                            <OfficeIcon
                                width={Scale.moderateScale(27)}
                                height={Scale.moderateScale(27)}
                            />
                        </View>
                    </View>
                    <View style={styles.bodyRight}>
                        <Text
                            style={styles.bodyText}>
                            {props.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.footerItemTitle}>{Languages.Profile.Name}</Text>
                        <Text style={styles.footerItemValue}>{props.fullName}</Text>
                        <Text style={[styles.footerItemTitle, { marginTop: Scale.moderateScale(5) }]}>{Languages.Common.Phone}</Text>
                        <Text style={styles.footerItemValue}>{Tools.formatPhoneNumber(props.mobile, props.countryCode)}</Text>
                    </View>
                </View>


            </View>


        </>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerRight: {

    },
    menuIconContainer: {
        // backgroundColor: 'red',
    },
    headerRightText: {
        color: Colors.LOCHMARA,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    headerLeftText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    bodyContainer: {
        flexDirection: "row",
        marginTop: Scale.moderateScale(10),
        marginBottom: Scale.moderateScale(10)
    },
    bodyLeft: {
        paddingRight: Scale.moderateScale(10),
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    officeIconContainer: {

    },
    bodyRight: {
        flex: 1,
        paddingRight: Scale.moderateScale(40)
    },
    bodyText: {
        lineHeight: Scale.moderateScale(25),
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    footerContainer: {
        marginTop: Scale.moderateScale(20),
        flexDirection: "row"
    },
    footerLeft: {
        flex: 1
    },
    footerItemTitle: {
        marginBottom: Scale.moderateScale(1),
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    footerItemValue: {
        marginTop: Scale.moderateScale(4),
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    }
});


export default OrderAddressItem;
