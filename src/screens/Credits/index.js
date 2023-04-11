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
    StyleSheet
} from 'react-native';
import {
    clientProfile
} from 'api/client';
import {
    CommonHeader
} from 'components';
import {
    RequestLoader,
    ShowPrice
} from 'components/UI';
import { Languages, Scale } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";

import WalletEmptyIcon from 'assets/icons/empty-wallet.svg';
import CreditItem from './CreditItem';
import LottieView from 'lottie-react-native';

const CreditsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [credits, setCredits] = useState([]);
    const [balance, setBalance] = useState(null);
    const [, setOnEndReachedCalledDuringMomentum] = useState(true);
    const [shouldLoadMore, setShouldLoadMore] = useState(true);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 20
    });

    const currency = axiosClient.getCurrency();

    useEffect(() => {
        getProfileAjyalCredit(pagination.pageNumber, pagination.pageSize, true);
    }, []);

    const getProfileAjyalCredit = (pageNumber, pageSize, setLoader = false) => {
        if (setLoader)
            setIsLoading(true);
        else
            setIsLoadingMore(true)
        clientProfile.getProfileAjyalCredit(pageNumber, pageSize)
            .then((response) => {
                const res = response?.data;
                console.log(res.result);
                if (setLoader)
                    setIsLoading(false);
                else
                    setIsLoadingMore(false);

                setCredits((prev) => prev.concat(res.result.transactionList));
                setBalance(res.result.credit);
                if (res.result.transactionList?.length < pagination.pageSize) {
                    setShouldLoadMore(false);
                }
            }).catch((err) => {
                if (setLoader)
                    setIsLoading(false);
                else
                    setIsLoadingMore(false)
                console.log(err);
                console.log('err', err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const RenderFooter = () => {
        // if (isLoadingMore == false) {
        //     return null;
        // }
        return (
            <View style={[styles.footerLoaderContainer, isLoadingMore == false ? { opacity: 0 } : {}]} >
                <LottieView
                    imageAssetsFolder="lottie"
                    style={styles.lottie}
                    autoPlay={true}
                    loop={true}
                    speed={1}
                    // resizeMode='cover'
                    source={require('./../../assets/animations/pagination-loader.json')}
                />
            </View>
        )
    }

    const loadMoreHandler = () => {
        console.log('load moree...');
        if (shouldLoadMore) {
            console.log('make request in load more');
            const tempPagination = { ...pagination };
            tempPagination.pageNumber = tempPagination.pageNumber + 1;
            setPagination(tempPagination);

            getProfileAjyalCredit(tempPagination.pageNumber, tempPagination.pageSize);
        }
    };

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}
            <View style={{ flex: 1 }}>
                <CommonHeader onPressBack={() => props.navigation.goBack()} showBackIcon={true} title={Languages.Credits.Credits} />
                <View style={[styles.header, styles.screenPaddingHorizontal]}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitleText}>{Languages.Credits.AvailableBalance}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <ShowPrice
                            currencyStyle={styles.headerPriceText}
                            priceStyle={styles.headerPriceText}
                            afterDotStyle={styles.headerPriceText}
                            price={balance} currency={currency} />
                    </View>
                </View>

                {/* <View style={[styles.inputContainer, styles.screenPaddingHorizontal]}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Redeem your Ajyal gift card</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <MainInput
                        showLabel={false}
                        placeholder={'Redeem your Ajyal gift card'}
                    />
                    <View style={styles.inputIconWrapper}>
                        <TouchableOpacity style={styles.plusIconContainer}>
                            <PlusIcon
                                style={{ color: Colors.WHITE }}
                                width={Scale.moderateScale(20)}
                                height={Scale.moderateScale(20)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}

                {credits?.length > 0 ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            style={{ backgroundColor: Colors.WHITE }}
                            data={credits}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <View style={styles.creditItemContainer}>
                                            <CreditItem data={item} currency={currency} />
                                        </View>
                                        {index != credits.length - 1 ?
                                            <View style={styles.itemLine}></View>
                                            :
                                            null}
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.transactionId.toString()}
                            onEndReached={loadMoreHandler}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false); }}
                            contentInset={{ // iOS ONLY
                                top: 0,
                                left: 0, // Left spacing for the very first card
                                bottom: Scale.moderateScale(80),
                                right: 0 // Right spacing for the very last card
                            }}
                            ListFooterComponent={<RenderFooter />}
                            contentContainerStyle={{ // contentInset alternative for Android
                                paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(80) : 0, // Horizontal spacing before and after the ScrollView
                                paddingTop: Platform.OS === 'android' ? 0 : 0 // Horizontal spacing before and after the ScrollView
                            }}
                        />
                    </View>
                    :
                    <View style={styles.emptyView}>
                        <View style={styles.emptyViewIconContainer}>
                            <WalletEmptyIcon
                                width={Scale.moderateScale(145)}
                                height={Scale.moderateScale(145)}
                            />
                        </View>
                        <Text style={styles.emptyViewText}>{Languages.Credits.YouDoNotHaveAnyAjyaCreditsYet}</Text>
                    </View>
                }

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(20),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Scale.moderateScale(15),
        backgroundColor: Colors.ALABASTER
    },
    headerTitleContainer: {

    },
    headerTitleText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    priceContainer: {

    },
    headerPriceText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    // 
    screenPaddingHorizontal: {
        paddingHorizontal: Scale.moderateScale(20)
    },
    //
    inputContainer: {
        paddingVertical: Scale.moderateScale(20),
        backgroundColor: Colors.WHITE
        // marginBottom: Scale.moderateScale(100)
    },
    labelContainer: {
        marginBottom: Scale.moderateScale(8),
        flexDirection: "row",
        alignItems: "center"
    },
    labelText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD
    },
    inputWrapper: {

    },
    inputIconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        position: "absolute",
        right: Scale.moderateScale(4),
    },
    plusIconContainer: {
        width: Scale.moderateScale(44),
        height: Scale.moderateScale(44),

        backgroundColor: Colors.LOCHMARA,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Scale.moderateScale(8)
    },
    //
    creditItemContainer: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(15)
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    //
    emptyView: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyViewIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Scale.moderateScale(50)
    },
    emptyViewText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    //
    lottie: {
        width: Scale.moderateScale(50),
        height: Scale.moderateScale(50),
        justifyContent: "center",
        alignSelf: "center",
    },
});


export default CreditsScreen;

const data = {
    credit: 0,
    count: 0,
    transactionList: [
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: -3200,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },
        {
            transactionId: 1,
            transactionType: 'dsfsdfs',
            transactionTypeId: 1,
            transactionDateTime: Date.now(),
            amount: 2100,
            balance: 50,
            comment: 'dssfsddfs'
        },

    ]
}
