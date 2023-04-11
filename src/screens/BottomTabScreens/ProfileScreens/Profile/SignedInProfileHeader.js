/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Platform,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    I18nManager
} from 'react-native';
import { clientHome } from 'api/client';

import { ModuleSelection, HomeHeader } from 'components';
import { Badge, IconRow, ShadowWrapper } from 'components/UI';
import { Languages, Scale } from 'common';

import ProfilePlaceHolderIcon from 'assets/icons/profile-img.svg';
import { Colors, Typography } from 'styles';
import ArrowIcon from 'assets/icons/up-arrow.svg';

import OrderIcon from 'assets/icons/menu-orders.svg';
import PaymentIcon from 'assets/icons/menu-payment.svg';
import ReturnIcon from 'assets/icons/menu-return.svg';
import AlertIcon from 'assets/icons/alert.svg';
import style from 'screens/BottomTabScreens/Home/style';

const SignedInProfileHeader = (props) => {

    const onPressEmailVerifyHandler = () => {
        props.onPressEmailVerifyHandler();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.userDataContainer}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.imageWrapper}>
                        <ProfilePlaceHolderIcon
                            height={Scale.moderateScale(30)}
                            width={Scale.moderateScale(30)} />
                    </View>
                </View>
                <View style={styles.usernameAndEmailContainer}>
                    <View style={styles.usernameAndEmailWrapper} >
                        <Text style={styles.usernameText}>{props.profileData?.fullName}</Text>
                        <View style={styles.emailWrapper}>
                            <View style={styles.emailTextContainer}>
                                <Text numberOfLines={1} style={styles.emailText}>{props.profileData?.email}</Text>
                            </View>
                            {props.profileData.emailValid == false ?
                                <TouchableOpacity onPress={onPressEmailVerifyHandler} style={styles.verifyEmailWrapper}>
                                    <View style={styles.verifyEmailTextContainer}>
                                        <Text style={styles.verifyEmailText}>{Languages.Profile.VerifyYourEmail}</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                null}
                        </View>
                    </View>
                </View>
                <View style={[styles.arrowIconContainer, I18nManager.isRTL ? styles.arrowIconContainerRtl : {}]}>
                    <ArrowIcon
                        style={{ color: Colors.BIGSTONE }}
                        width={Scale.moderateScale(16)}
                        height={Scale.moderateScale(16)} />
                </View>
            </TouchableOpacity>

            <View style={[styles.itemsContainer]}>
                <TouchableOpacity style={styles.item} onPress={props.onOrdersPress}>
                    <View style={styles.itemIconContainer}>
                        <OrderIcon width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)} />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.headerItemSecondText}>{Languages.Profile.Orders}</Text>
                        {props.profileData?.orderCount > 0 ?
                            <View style={styles.itemBadgeContainer}>
                                <Badge textStyle={styles.badgeText} containerStyle={styles.badgeStyle}>{props.profileData?.orderCount}</Badge>
                            </View>
                            :
                            null}
                    </View>
                </TouchableOpacity>
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity style={styles.item} onPress={props.onPaymentPress}>
                    <View style={styles.itemIconContainer}>
                        <PaymentIcon width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)} />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.headerItemSecondText}>{Languages.Profile.Payment}</Text>
                        {props.profileData?.paymentCount > 0 ?
                            <View style={styles.itemBadgeContainer}>
                                <Badge textStyle={styles.badgeText} containerStyle={styles.badgeStyle}>{props.profileData?.paymentCount}</Badge>
                            </View>
                            :
                            null}
                    </View>
                </TouchableOpacity>
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity style={styles.item} onPress={props.onReturnsPress}>
                    <View style={styles.itemIconContainer}>
                        <ReturnIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)} />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.headerItemSecondText}>{Languages.Profile.Returns}</Text>
                        {props.profileData?.returnCount > 0 ?
                            <View style={styles.itemBadgeContainer}>
                                <Badge textStyle={styles.badgeText} containerStyle={styles.badgeStyle}>{props.profileData?.returnCount}</Badge>
                            </View>
                            :
                            null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Scale.moderateScale(17)
    },
    userDataContainer: {
        flexDirection: "row",
        paddingHorizontal: Scale.moderateScale(18)
    },
    profileImageContainer: {

    },
    imageWrapper: {
        borderWidth: Scale.moderateScale(1.2),
        borderRadius: Scale.moderateScale(10),
        padding: Scale.moderateScale(6),
        borderColor: Colors.BOMBAY,
        backgroundColor: Colors.ALABASTER,
    },
    usernameAndEmailContainer: {
        flex: 1,
        paddingRight: Scale.moderateScale(40)
    },
    usernameAndEmailWrapper: {
        flex: 1,
        marginLeft: Scale.moderateScale(15),
        justifyContent: "space-between",
    },
    usernameText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BIGSTONE,
        textAlign: "left"
    },
    emailText: {
        fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR,
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.BIGSTONE
    },
    arrowIconContainer: {
        position: "absolute",
        right: Scale.moderateScale(15),
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        transform: [
            { rotate: '90deg' }
        ]
    },
    arrowIconContainerRtl: {
        transform: [
            { rotate: '270deg' }
        ]
    },
    itemsContainer: {
        flexDirection: "row",
        paddingTop: Scale.moderateScale(17),
    },
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    itemIconContainer: {
        marginBottom: Scale.moderateScale(10),
        alignItems: "center",
        justifyContent: "center"
    },
    headerItemSecondText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.FIORD,
        textAlign: "center"
    },
    lineContainer: {
        justifyContent: "center"
    },
    line: {
        width: Scale.moderateScale(1.3),
        backgroundColor: Colors.GALLERY,
        height: Scale.moderateScale(36)
    },

    itemBadgeContainer: {
        marginLeft: Scale.moderateScale(3)
    },
    badgeStyle: {
        borderRadius: Scale.moderateScale(3),
        // paddingVertical: Scale.moderateScale(7),
        // paddingHorizontal: Scale.moderateScale(3)
    },
    badgeText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },

    itemTextContainer: {
        flexDirection: "row"
    },
    //
    emailWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    emailTextContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    verifyEmailWrapper: {
        // flex: 1,
        // flexShrink: 1,
        // flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: Scale.moderateScale(5)
    },

    verifyEmailTextContainer: {
        backgroundColor: Colors.TORCHRED,
        paddingHorizontal: Scale.moderateScale(5),
        paddingVertical: Scale.moderateScale(1),
        borderRadius: Scale.moderateScale(4)
    },
    verifyEmailText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_10,
        color: Colors.WHITE,
    }
});

export default SignedInProfileHeader;
