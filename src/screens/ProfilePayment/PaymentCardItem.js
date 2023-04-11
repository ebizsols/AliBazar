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
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    clientProfile
} from 'api/client';
import {
    CommonHeader
} from 'components';
import {
    SnackBar,
    RequestLoader,
    RadioButton,
    ProgressiveImage,
    ShadowWrapper
} from 'components/UI';
import { Languages, PathHelper, Scale } from 'common';
import { Colors, Typography } from 'styles';


import CreditCardIcon from 'assets/icons/credit-card.svg';
import TrashIcon from 'assets/icons/trash.svg';
import FastImage from 'react-native-fast-image';
import moment from "moment";

const PaymentCardItem = (props) => {

    const imageUrl = PathHelper.getPaymentLogoPath(props.data.paymentMethodImageName);
    const strDate = '20' + props.data.bankCardYear + '-' + props.data.bankCardMonth + '-01';
    const date = new Date(strDate);
    const cardDate = moment(date).format('MMM YYYY');

    return (
        <ShadowWrapper shadowContainerStyle={{ paddingHorizontal: Scale.moderateScale(10) }} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <ProgressiveImage
                        borderRadius={Scale.moderateScale(1)}
                        // imageStyle={{ width: width }}
                        height={Scale.moderateScale(30)}
                        width={Scale.moderateScale(50)}
                        source={imageUrl}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.headerRight}>
                    {props.data.bankCardNumber && (
                        <Text style={styles.cardNumberText}>{props.data.bankCardNumber}</Text>
                    )}
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyLeft}>
                    {props.data.bankCardYear != null && (
                        Languages.Profile.ExpiryDate(styles.expiryText, styles.expiryDate, cardDate)
                    )}
                </View>
                <View style={styles.bodyRight}>

                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => props.onDeletePress(props.data.bankCardId)} style={styles.footerInner}>
                    <TrashIcon
                        style={{ color: Colors.TORCHRED2 }}
                        width={Scale.moderateScale(25)}
                        height={Scale.moderateScale(25)}
                    />
                    <Text style={styles.deleteText}>{Languages.Common.Delete}</Text>
                </TouchableOpacity>
            </View>
        </ShadowWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        // flex: 1,
        // backgroundColor: "red",
        // height: 500
        borderWidth: Scale.moderateScale(1),
        borderRadius: Scale.moderateScale(10),
        borderColor: Colors.GALLERY,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(10)
    },
    headerLeft: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end'
    },
    cardNumberText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD
    },
    body: {
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(10),
        paddingBottom: Scale.moderateScale(20)
    },
    bodyLeft: {
        flexDirection: 'row'
    },
    bodyRight: {

    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Scale.moderateScale(10),
        borderTopWidth: Scale.moderateScale(0.5),
        borderTopColor: Colors.ALTO
    },

    expiryText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SILVERCHALICE
    },
    expiryDate: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.FIORD
    },
    deleteText: {
        color: Colors.TORCHRED2
    },

    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
});


export default PaymentCardItem;
