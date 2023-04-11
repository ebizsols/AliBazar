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
    clientForm,
    clientProfile,
    clientUserOrder
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
    TextWithRadio,
    FloatButtonWrapper,
    RadioButton
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import CancelOrderItem from "./CancelOrderItem";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import PlusIcon from 'assets/icons/plus.svg';
import CloseIcon from 'assets/icons/close-gray.svg';
import StarRating from 'react-native-star-rating';

import CreditCardIcon from 'assets/icons/credit-card.svg';
import LogoIcon from 'assets/icons/alibazar.svg';
import { setCancelOrderFireChange, setOrderDetailFireChange, setOrdersFireChange } from 'store/actions/fireChange.action';
import { useDispatch, useSelector } from 'react-redux';

const CancelOrderScreen = (props) => {

    const reduxFireChange = useSelector(state => state.fireChangeReducer.cancelOrderFireChange);

    const dispatch = useDispatch();

    const setOrdersFireChangeRedux = useCallback((value) => {
        dispatch(setOrdersFireChange(value));
    }, [dispatch]);

    const dispatch2 = useDispatch();

    const setCancelOrderFireChangeRedux = useCallback((value) => {
        dispatch2(setCancelOrderFireChange(value));
    }, [dispatch2]);

    const dispatch3 = useDispatch();

    const setOrderDetailFireChangeRedux = useCallback((value) => {
        dispatch3(setOrderDetailFireChange(value));
    }, [dispatch3]);

    const { orderId } = props.route.params;
    const [isLoading, setIsLoading] = useState(null);

    const [items, setItems] = useState(null);
    const [selectedCancelItems, setSelectedCancelItems] = useState([]);
    const [cancellReasons, setCancellReasons] = useState(null);
    const snackBarRef = useRef(null);
    // {fkOrderId: "251", fkOrderItemId: 407, fkCancelingReasonId: 6}
    const currency = axiosClient.getCurrency();

    const getProfileOrdersItemCanceled = () => {
        setIsLoading(true);
        clientProfile.getProfileOrdersItemCanceled(orderId)
            .then((response) => {
                const res = response.data;
                setIsLoading(false);
                console.log('getProfileOrdersItemCanceled: ', res.result);

                setItems(res.result);
            }).catch((err) => {
                setIsLoading(false)
                console.log('err', err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const getActiveCancelingReason = () => {
        setIsLoading(true);
        clientForm.getActiveCancelingReason()
            .then((response) => {
                const res = response.data;
                setIsLoading(false);
                console.log('getActiveCancelingReason: ', res.result);

                setCancellReasons(res.result);
            }).catch((err) => {
                setIsLoading(false)
                console.log('err', err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    useEffect(() => {
        getProfileOrdersItemCanceled();
        getActiveCancelingReason();
    }, []);

    useEffect(() => {
        if (reduxFireChange) {
            console.log('CancelOrder Redux firechange');
            getProfileOrdersItemCanceled();
            getActiveCancelingReason();
            setCancelOrderFireChangeRedux(null);
        }
    }, [reduxFireChange]);

    const onSelectItemHandler = (item) => {
        console.log(item);
        const findedItemIndex = selectedCancelItems.findIndex(x => x.fkOrderItemId == item.itemId);
        if (findedItemIndex === -1) {
            // not found
            const model = { fkOrderId: orderId, fkOrderItemId: item.itemId, fkCancelingReasonId: null };
            const tempSelectedItems = [...selectedCancelItems];
            tempSelectedItems.push(model);
            setSelectedCancelItems(tempSelectedItems);
        } else {
            // item finded
            const tempSelectedItems = [...selectedCancelItems];
            tempSelectedItems.splice(findedItemIndex, 1);
            setSelectedCancelItems(tempSelectedItems);
        }
    };

    const onCancelPressHandler = () => {
        // props.navigation.navigate('AfterCancel');
        // setOrdersFireChangeRedux((Math.random() + 1) * 100);
        const findWithNoReasonItem = selectedCancelItems.findIndex(x => x.fkCancelingReasonId === null || x.fkCancelingReasonId == 0);
        if (findWithNoReasonItem !== -1) {
            snackBarRef.current.show(Languages.Cancel.SelectReasonRequired, 2);
            return;
        }

        console.log(selectedCancelItems);
        cancelOrder(selectedCancelItems);
    };

    const cancelOrder = (items) => {
        setIsLoading(true);
        clientUserOrder.cancelOrder(items)
            .then((response) => {
                const res = response.data;
                setIsLoading(false);
                console.log('cancelOrder: ', res.result);
                setOrdersFireChangeRedux((Math.random() + 1) * 100);
                setOrderDetailFireChangeRedux((Math.random() + 1) * 100);

                // props.navigation.navigate('AfterCancel', { items: res.result, orderId: orderId });
                props.navigation.dispatch(state => {

                    const routes = state.routes.filter(r => r.name !== 'CancelOrder');
                    routes.push({ name: 'AfterCancel', params: { items: res.result, orderId: orderId } });

                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });

                });
            }).catch((err) => {
                setIsLoading(false)
                console.log('err', err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const onChangePreferencePressHandler = () => {
        props.navigation.navigate('Preference', { backScreen: 'CancelOrder' });
    };

    const onSelectReasonHandler = (value, itemId) => {
        const findedItemIndex = selectedCancelItems.findIndex(x => x.fkOrderItemId == itemId);
        if (findedItemIndex !== -1) {
            const tempSelectedItems = [...selectedCancelItems];
            tempSelectedItems[findedItemIndex].fkCancelingReasonId = value;
            setSelectedCancelItems(tempSelectedItems);
        }
    };

    const onProductItemPressHandler = (item) => {
        console.log('onProductItemPressHandler', item);
        if (item.providerId && item.goodsId)
            props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
    };

    return (
        <>

            {isLoading == true ? <RequestLoader /> : null}

            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{Languages.Cancel.SelectItemsForCancellation}</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.headerIconContainer}>
                        <CloseIcon
                            width={Scale.moderateScale(25)}
                            height={Scale.moderateScale(25)}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.refundRight}>
                        <View style={styles.rightTop}>
                            <View style={styles.refundItemIconContainer}>
                                {items && items[0]?.customerRefound == 1 ?
                                    <View style={styles.iconContainer}>
                                        <LogoIcon
                                            width={Scale.moderateScale(35)}
                                            height={Scale.moderateScale(30)}
                                        />
                                    </View>
                                    :
                                    null}
                                {items && items[0]?.customerRefound == 2 ?
                                    <View style={styles.refundItemIconContainer}>
                                        <CreditCardIcon
                                            width={Scale.moderateScale(35)}
                                            height={Scale.moderateScale(30)}
                                        />
                                    </View>
                                    :
                                    null}
                            </View>
                            <View style={styles.refundItemTextContainer}>
                                {items && items[0]?.customerRefound == 1 && (
                                    <Text style={styles.refundItemText}>{Languages.Preference.WalletRefund}</Text>
                                )}
                                {items && items[0]?.customerRefound == 2 && (
                                    <Text style={styles.refundItemText}>{Languages.Preference.CardRefund}</Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.rightBottom}>
                            <Text style={styles.refundItemDescriptionText}>{Languages.Cancel.OnlyAppliesToPrepaidAmounts}</Text>
                        </View>
                        <TouchableOpacity onPress={onChangePreferencePressHandler} style={styles.changePreferenceTextContainer}>
                            <Text style={styles.changePreferenceText}>
                                {Languages.Cancel.ClickHereChangeDefaultRefundMethod}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.body}>
                    {items?.map((item, index) => {
                        const findedSelectedItem = selectedCancelItems.findIndex(x => x.fkOrderItemId === item.itemId);
                        const isSelected = findedSelectedItem !== -1;
                        let selectedReasonId = null;
                        if (findedSelectedItem !== -1) {
                            selectedReasonId = selectedCancelItems[findedSelectedItem].fkCancelingReasonId;
                        }

                        return (
                            <View>
                                <View style={styles.productContainer}>
                                    <CancelOrderItem
                                        onProductItemPress={onProductItemPressHandler}
                                        isSelected={isSelected}
                                        currency={currency}
                                        data={item}
                                        reasons={cancellReasons}
                                        onSelectItem={() => onSelectItemHandler(item)}
                                        onSelectReason={onSelectReasonHandler}
                                        selectedReasonId={selectedReasonId}
                                    />
                                </View>
                                {index != items.length - 1 ?
                                    <View style={styles.itemLine}></View>
                                    :
                                    null}
                            </View>
                        )
                    })}

                </View>
                <View style={{ paddingBottom: Scale.moderateScale(40) }}></View>

            </ScrollView>


            {selectedCancelItems.length > 0 ?
                <FloatButtonWrapper>
                    <MainButton onPress={onCancelPressHandler}>
                        {Languages.Cancel.CancelItemsWithCount(selectedCancelItems.length)}
                    </MainButton>
                </FloatButtonWrapper>
                :
                null}

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
        // paddingHorizontal: Scale.moderateScale(20),
        paddingBottom: Scale.moderateScale(100)
    },
    contentContainer: {
        paddingHorizontal: Scale.moderateScale(20),
    },
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Scale.moderateScale(15)
    },
    headerText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    headerIconContainer: {

    },
    body: {
        marginTop: Scale.moderateScale(10)
    },
    productContainer: {
        // marginTop: Scale.moderateScale(10),
        // flexDirection: "row"
    },
    //
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
    changePreferenceTextContainer: {
        marginTop: Scale.moderateScale(4)
    },
    changePreferenceText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.LOCHMARA,
        textAlign: 'left'
    }
});


export default CancelOrderScreen;
