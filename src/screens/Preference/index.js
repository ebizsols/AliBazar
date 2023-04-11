/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    RadioButton
} from 'components/UI';
import { Languages, Scale } from 'common';
import { Colors, Typography } from 'styles';


import CreditCardIcon from 'assets/icons/credit-card.svg';
import LogoIcon from 'assets/icons/alibazar.svg';
import { useDispatch } from 'react-redux';
import { setCancelOrderFireChange } from 'store/actions/fireChange.action';

const refundWalletType = 1;
const refundCardType = 2;

const PreferenceScreen = (props) => {

    const dispatch = useDispatch();

    const setCancelOrderFireChangeRedux = useCallback((value) => {
        dispatch(setCancelOrderFireChange(value));
    }, [dispatch]);

    const [selectedRefundType, setSelectedRefundType] = useState(0); // 1 wallet refund, 2 card refund
    const [isLoading, setIsLoading] = useState(null);
    const snackBarRef = useRef(null);

    const changeSelectedRefundType = (refundTypeParam) => {
        setCustomerRefundPreference(refundTypeParam)
    }

    const getCustomerRefundPreference = () => {
        setIsLoading(true);
        clientProfile.getCustomerRefundPreference()
            .then((response) => {
                const res = response.data;

                setSelectedRefundType(res.result);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const setCustomerRefundPreference = (refundType) => {
        setIsLoading(true);
        clientProfile.setCustomerRefundPreference(refundType)
            .then((response) => {

                setSelectedRefundType(refundType);
                setIsLoading(false);
                if (props.route?.params?.backScreen === 'CancelOrder')
                    setCancelOrderFireChangeRedux((Math.random() + 1) * 100);
            }).catch((err) => {
                setIsLoading(false)
                console.log(err);
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    useEffect(() => {
        getCustomerRefundPreference();
    }, []);

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={Languages.Preference.Preference} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.topSection}>
                    <Text style={styles.topText}>{Languages.Preference.SelectYourDefaultRefundMethod}</Text>
                </View>

                <View style={styles.selectRefundSection}>
                    <View style={styles.refundItemContainer}>
                        <TouchableOpacity onPress={() => changeSelectedRefundType(refundWalletType)} style={styles.refundItem}>
                            <View style={styles.refundLeft}>
                                <RadioButton onPress={() => changeSelectedRefundType(refundWalletType)} isSelected={selectedRefundType == refundWalletType} />
                            </View>
                            <View style={styles.refundRight}>
                                <View style={styles.rightTop}>
                                    <View style={styles.refundItemIconContainer}>
                                        <View style={styles.iconContainer}>
                                            <LogoIcon
                                                width={Scale.moderateScale(35)}
                                                height={Scale.moderateScale(30)}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.refundItemTextContainer}>
                                        <Text style={styles.refundItemText}>{Languages.Preference.WalletRefund}</Text>
                                    </View>
                                </View>
                                <View style={styles.rightBottom}>
                                    <Text style={styles.refundItemDescriptionText}>{Languages.Preference.WalletRefundDescription}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemLine}></View>
                    <View style={styles.refundItemContainer}>
                        <TouchableOpacity onPress={() => changeSelectedRefundType(refundCardType)} style={styles.refundItem}>
                            <View style={styles.refundLeft}>
                                <RadioButton onPress={() => changeSelectedRefundType(refundCardType)} isSelected={selectedRefundType == refundCardType} />
                            </View>
                            <View style={styles.refundRight}>
                                <View style={styles.rightTop}>
                                    <View style={styles.refundItemIconContainer}>
                                        <CreditCardIcon
                                            width={Scale.moderateScale(45)}
                                            height={Scale.moderateScale(25)}
                                        />
                                    </View>
                                    <View style={styles.refundItemTextContainer}>
                                        <Text style={styles.refundItemText}>{Languages.Preference.CardRefund}</Text>
                                    </View>
                                </View>
                                <View style={styles.rightBottom}>
                                    <Text style={styles.refundItemDescriptionText}>{Languages.Preference.CardRefundDescription}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <SnackBar
                ref={snackBarRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    contentContainerStyle: {
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(20),
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    //
    topSection: {
        paddingHorizontal: Scale.moderateScale(20),
        marginBottom: Scale.moderateScale(20),
        flex: 1
    },
    topText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BOMBAY,
        textAlign: 'left'
    },
    //
    selectRefundSection: {
        // paddingHorizontal: Scale.moderateScale(10)
    },
    refundItemContainer: {
        paddingVertical: Scale.moderateScale(15)
    },
    refundItem: {
        flexDirection: "row"
    },
    refundLeft: {
        paddingRight: Scale.moderateScale(18)
    },
    refundRight: {
        // flexDirection: "row",
        flex: 1
    },
    rightTop: {
        flexDirection: "row"
    },
    rightBottom: {
        flex: 1,
        // backgroundColor: 'red'
        // width: 300
    },
    refundItemIconContainer: {
        marginRight: Scale.moderateScale(15)
    },
    refundItemTextContainer: {
        justifyContent: 'center'
    },
    refundItemText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    refundItemDescriptionText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        marginTop: Scale.moderateScale(10),
        textAlign: 'left'
    },
    withCashTextDiff: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.FIORD
    },
    iconContainer: {
        backgroundColor: Colors.BIGSTONE,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: Scale.moderateScale(8)
        width: Scale.moderateScale(45),
        height: Scale.moderateScale(25),
        borderRadius: Scale.moderateScale(5),
        // height: Scale.moderateScale()
        // marginRight: Scale.moderateScale(10)
    },
});


export default PreferenceScreen;
