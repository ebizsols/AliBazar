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
    ShowPrice,
    ProgressiveImage
} from 'components/UI';
import { Languages, Scale, Constants, Tools, PathHelper } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import AlertIcon from 'assets/icons/alert.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import LocationIcon from 'assets/icons/img-location.svg';
import CallIcon from 'assets/icons/img-vendor-phonecall.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const StoreItem = (props) => {

    let imageSource = null;
    if (props.data.profileImage) {
        imageSource = PathHelper.getShopImagePath(props.data.profileImage, props.data.shopId);
    }

    return (
        <View style={styles.container}>
            <ProgressiveImage
                borderRadius={Scale.moderateScale(1)}
                imageStyle={{ width: '100%' }}
                height={Scale.moderateScale(200)}
                // width={width}
                source={imageSource}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.containerOverlay}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{props.data.storeName}</Text>
                    </View>
                    <View style={styles.body}>
                        {props.data.address ?
                            <View style={styles.addressContainer}>
                                <IconRow
                                    iconContainerStyle={styles.iconContainerStyle}
                                    containerStyle={styles.iconRowContainer}
                                    showArrowIcon={false}
                                    icon={LocationIcon}
                                    iconWidth={Scale.moderateScale(20)}
                                    iconHeight={Scale.moderateScale(20)}
                                    clickable={false}
                                // onPress={editAddressPressHandler}
                                >
                                    <View style={styles.iconRowTextContainer}>
                                        <Text numberOfLines={2} style={styles.iconRowText}>{props.data.address}</Text>
                                    </View>
                                </IconRow>
                            </View>
                            :
                            null}

                        <View style={styles.phoneContainer}>
                            <IconRow
                                iconContainerStyle={styles.iconContainerStyle}
                                containerStyle={styles.iconRowContainer}
                                showArrowIcon={false}
                                icon={CallIcon}
                                iconWidth={Scale.moderateScale(20)}
                                iconHeight={Scale.moderateScale(20)}
                                clickable={false}
                            // onPress={editAddressPressHandler}
                            >
                                <View style={styles.iconRowTextContainer}>
                                    <Text style={styles.iconRowText}>{Tools.formatPhoneNumber(props.data.phone, props.data.iso)}</Text>
                                </View>
                            </IconRow>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => props.onVisitStorePress(props.data)} style={styles.footerBtn}>
                            <Text style={styles.btnText}>{Languages.ShopList.VisitStore}</Text>
                            <View style={styles.btnIconContainer}>
                                <ArrowIcon
                                    style={{ color: Colors.WHITE }}
                                    width={Scale.moderateScale(15)}
                                    height={Scale.moderateScale(15)}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: Scale.moderateScale(8)
    },
    containerOverlay: {
        borderRadius: Scale.moderateScale(8),
        position: 'absolute',
        backgroundColor: '#00000080',
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: Scale.moderateScale(12),
        paddingVertical: Scale.moderateScale(12)
    },
    titleContainer: {
        alignItems: 'flex-start'
    },
    titleText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.WHITE
    },
    body: {
        marginTop: Scale.moderateScale(30)
    },
    iconRowContainer: {

    },
    iconRowTextContainer: {
        alignItems: 'flex-start',
    },
    iconContainerStyle: {
        paddingLeft: 0
    },
    iconRowText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.WHITE
    },
    addressContainer: {
        marginBottom: Scale.moderateScale(10)
    },
    phoneContainer: {

    },
    footer: {
        // flex: 1,
        // backgroundColor: 'red',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // paddingBottom: Scale.moderateScale(5)
    },
    footerBtn: {
        backgroundColor: '#f0b440ab',
        flexDirection: 'row',
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(7),
        borderRadius: Scale.moderateScale(5)
    },
    btnText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.WHITE
    },
    btnIconContainer: {
        transform: [
            { rotate: I18nManager.isRTL ? '270deg' : '90deg' }
        ],
        marginLeft: Scale.moderateScale(15)
    }
});


export default StoreItem;
