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
    RadioButton
} from 'components/UI';
import { Languages, Scale } from 'common';
import { Colors, Typography } from 'styles';

import CreditCardIcon from 'assets/icons/credit-card.svg';
import LogoIcon from 'assets/icons/logo-white.svg';
import PaymentCardItem from './PaymentCardItem';
import WalletEmptyIcon from 'assets/icons/empty-wallet.svg';

const ProfilePaymentScreen = (props) => {

    const [paymentCards, setPaymentCards] = useState(null); // 1 wallet refund, 2 card refund
    const [isLoading, setIsLoading] = useState(null);
    const snackBarRef = useRef(null);


    const getCustomerBankCards = () => {
        setIsLoading(true);
        clientProfile.getCustomerBankCards()
            .then((response) => {
                const res = response.data;
                setPaymentCards(res.result);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const removeCustomerBankCard = (bankCardId) => {
        setIsLoading(true);
        clientProfile.removeCustomerBankCard(bankCardId)
            .then((response) => {
                const res = response.data;
                console.log('getCustomerBankCards', res.result);
               
                getCustomerBankCards()
                setIsLoading(false);
                if (res?.message)
                    snackBarRef.current.show(res?.message, 1);
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    useEffect(() => {
        getCustomerBankCards();
    }, []);

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={Languages.Profile.ProfilePayment} />

            {paymentCards?.length > 0 ?
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    {paymentCards?.map((item, index) => {
                        return (
                            <PaymentCardItem
                                key={item.bankCardId}
                                onDeletePress={removeCustomerBankCard}
                                data={item}
                            />
                        )
                    })}
                </ScrollView>
                :
                <View style={styles.emptyView}>
                    <View style={styles.emptyViewIconContainer}>
                        <WalletEmptyIcon
                            width={Scale.moderateScale(145)}
                            height={Scale.moderateScale(145)}
                        />
                    </View>
                    <Text style={styles.emptyViewText}>{Languages.Profile.YouDontHaveAnyPaymentCardYet}</Text>
                </View>}

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
        paddingVertical: Scale.moderateScale(10),
        // paddingHorizontal: Scale.moderateScale(10),
    },
    contentContainer: {
        paddingHorizontal: Scale.moderateScale(10),
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },

    emptyView: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyViewIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Scale.moderateScale(25)
    },
    emptyViewText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
});


export default ProfilePaymentScreen;
