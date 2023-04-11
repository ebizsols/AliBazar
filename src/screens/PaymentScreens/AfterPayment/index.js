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
    RadioButton,
    ShowPrice,
    OffLabel,
    ScreenLoader
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import CashIcon from 'assets/icons/cash.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import TickIcon from 'assets/icons/tick.svg';
import ErrorIcon from 'assets/icons/error.svg';
import ProcessingIcon from 'assets/icons/processing.svg';
import OrderAddressItem from './OrderAddressItem';
import { setCartFireChange } from 'store/actions/fireChange.action';
import { useDispatch } from 'react-redux';

const AfterPaymentScreen = (props) => {

    const { paymentId, token, payerID } = props.route.params;
    console.log('paymentId: ', paymentId);
    console.log('token: ', token);
    console.log('payerID: ', payerID);

    const [orderDetail, setOrderDetail] = useState(null);
    const [isSuccessPayment, setIsSuccessPayment] = useState(null);

    const dispatchFire = useDispatch();

    const setCartFireChangeRedux = useCallback((value) => {
        dispatchFire(setCartFireChange(value))
    }, [dispatchFire]);
    // 101202106164120452
    // 'paymentGateway'
    // 'ajyal'

    // paymentId:  101202106137422123
    // token:  paymentGateway
    // payerID:  ajyal

    // Unsucces payment
    // paymentId:  101202106141221625
    // token:  paymentGateway
    // payerID:  ajyal

    const backToOrdersPressHandler = () => {
        props.navigation.dispatch(state => {

            const routes = state.routes.filter(r => r.name !== 'AfterPayment');
            routes.push({ name: 'Orders' });

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });

        });
    }

    const backToHomePressHandler = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Home' },
                ],
            })
        );
    }

    const goToOrderDetailPressHandler = () => {
        props.navigation.dispatch(state => {

            const routes = state.routes.filter(r => r.name !== 'AfterPayment');
            routes.push({ name: 'OrderDetail', params: { orderId: orderDetail.orderId } });

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });

        });
    }


    const getPayOrder = () => {
        // setIsLoading(true);
        setCartFireChangeRedux(Math.random() + 1 * 100)
        clientUserOrder.payOrder(paymentId, token, payerID)
            .then((response) => {
                const res = response.data;
                setOrderDetail(res.result);
                setIsSuccessPayment(true);
                // setIsLoading(false); 
            }).catch((err) => {
                // setIsLoading(false)
                console.log(err);
                console.log(err.response?.data);
                setIsSuccessPayment(false);
                setOrderDetail(err.response?.data?.result);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    useEffect(() => {
        getPayOrder();

        props.navigation.dispatch(state => {

            const routes = state.routes.filter(r => r.name === 'Home' || r.name === 'AfterPayment');

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });

        });
    }, []);

    const currency = axiosClient.getCurrency();

    const onProductItemPressHandler = (item) => {
        if (item.providerId && item.goodsId)
            props.navigation.navigate("GoodsDetail", { goodsId: item.goodsId, providerId: item.providerId })
    };

    if (orderDetail == null) {
        return (<ScreenLoader />)
    } else {
        return (
            <>
                <ScrollView style={styles.container}>

                    <ShadowWrapper
                        shadowContainerStyle={{ paddingTop: 0 }}
                    >
                        <View style={styles.header}>
                            <View style={styles.headerIconContainer}>
                                <View style={[styles.headerIconWrapper, isSuccessPayment === false ? styles.notSuccessHeaderIconWrapper : {}]}>
                                    {isSuccessPayment == true ?
                                        <TickIcon
                                            style={{ color: Colors.WHITE }}
                                            width={Scale.moderateScale(20)}
                                            height={Scale.moderateScale(20)}
                                        />
                                        :
                                        null}
                                    {isSuccessPayment == false ?
                                        <ErrorIcon
                                            style={{ color: Colors.WHITE }}
                                            width={Scale.moderateScale(20)}
                                            height={Scale.moderateScale(20)}
                                        />
                                        :
                                        null}
                                </View>
                            </View>
                            {isSuccessPayment === true ?
                                <Text style={styles.headerText}>{Languages.Payment.ThankYouForYourOrder(orderDetail.transfereeName, orderDetail.transfereeFamily)}</Text>
                                :
                                <Text style={styles.headerText}>{Languages.Payment.YourPurchaseEncounteredError}</Text>
                            }
                            {isSuccessPayment === true && (
                                <Text style={styles.headerSecText}>{Languages.Payment.YouWillReceiveAnEmailAt(styles.headerSecEmailText, orderDetail.transfereeEmail)}</Text>
                            )}
                            <View style={styles.headerBtnContainer}>
                                <View style={styles.headerBtnWrapper}>
                                    {isSuccessPayment === true ?
                                        <MainButton onPress={backToOrdersPressHandler} >{Languages.Payment.BackToOrder}</MainButton>
                                        :
                                        <MainButton onPress={backToHomePressHandler} >{Languages.Common.BackToHome}</MainButton>
                                    }
                                </View>
                            </View>
                        </View>
                    </ShadowWrapper>

                    {isSuccessPayment === true ?
                        <ShadowWrapper>
                            <View style={styles.orderSection}>
                                <View style={styles.orderSummarySection}>
                                    <View style={styles.extraPaddingHorizontal}>
                                        <Text style={styles.orderSummarySectionTitle}>{Languages.Payment.OrderWithTracking(orderDetail.trackingCode)}</Text>
                                        <View style={styles.orderStatusSection}>
                                            <View style={styles.orderStatusContainer}>
                                                <View style={styles.orderStatusIconContainer}>
                                                    <ProcessingIcon
                                                        width={Scale.moderateScale(25)}
                                                        height={Scale.moderateScale(25)}
                                                    />
                                                </View>
                                                <Text style={styles.orderStatusText}>{Languages.Common.Processing}</Text>
                                            </View>
                                            <View style={styles.statusLinesContainer}>
                                                <View style={[styles.statusLine, styles.statusLineActive]}></View>
                                                <View style={[styles.statusLine, styles.statusLineActive]}></View>
                                                <View style={styles.statusLine}></View>
                                                <View style={styles.statusLine}></View>
                                            </View>
                                        </View>
                                        <View style={styles.summaryItem}>
                                            <View style={styles.summaryItemTitleContainer}>
                                                <Text style={styles.itemTitleText}>{Languages.Cart.Subtotal}</Text>
                                                <Text style={styles.itemItemsCount}>({Languages.Cart.NumberItems(orderDetail.itemsCount)})</Text>
                                            </View>
                                            <View style={styles.summaryItemValueContainer}>
                                                {/* <Text style={styles.itemValueText}> */}
                                                <ShowPrice
                                                    priceStyle={styles.itemValueText}
                                                    afterDotStyle={styles.itemValueText}
                                                    currencyStyle={styles.itemValueText}
                                                    price={orderDetail.totalWithOutDiscountCode - orderDetail.shipping - orderDetail.vat} currency={currency} />
                                                {/* </Text> */}
                                            </View>
                                        </View>

                                        <View style={styles.summaryItem}>
                                            <View style={styles.summaryItemTitleContainer}>
                                                <Text style={styles.itemTitleText}>{Languages.Cart.Shipping}</Text>
                                            </View>
                                            <View style={styles.summaryItemValueContainer}>
                                                {/* <Text style={[styles.itemValueText, styles.shippingValueText]}> */}
                                                {orderDetail.shipping == 0 ?
                                                    <Text style={[styles.itemValueText, styles.shippingValueText]}>{Languages.Cart.Free}</Text>
                                                    :
                                                    <ShowPrice
                                                        currencyStyle={[styles.itemValueText, styles.shippingValueText]}
                                                        priceStyle={[styles.itemValueText, styles.shippingValueText]}
                                                        afterDotStyle={[styles.itemValueText, styles.shippingValueText]}
                                                        price={orderDetail.shipping}
                                                        currency={currency}
                                                    />
                                                }
                                                {/* </Text> */}
                                            </View>
                                        </View>

                                        {orderDetail.discount > 0 ?
                                            <View style={styles.summaryItem}>
                                                <View style={styles.summaryItemTitleContainer}>
                                                    <Text style={[styles.itemTitleText, styles.discountTitle]}>{Languages.Cart.Discount}</Text>
                                                </View>
                                                <View style={styles.summaryItemValueContainer}>
                                                    {/* <Text style={[styles.itemValueText, styles.discountValue]}> */}
                                                    {/* <Text> */}
                                                    <ShowPrice
                                                        showMinus={true}
                                                        currencyStyle={[styles.itemValueText, styles.discountValue]}
                                                        priceStyle={[styles.itemValueText, styles.discountValue]}
                                                        afterDotStyle={[styles.itemValueText, styles.discountValue]}
                                                        price={orderDetail.discount} currency={currency} />
                                                    {/* </Text> */}
                                                    {/* </Text> */}
                                                </View>
                                            </View>
                                            :
                                            null}

                                        {/* Vat */}
                                        {orderDetail.vat > 0 && (
                                            <View style={styles.summaryItem}>
                                                <View style={styles.summaryItemTitleContainer}>
                                                    <Text style={styles.itemTitleText}>{Languages.Common.VatCap}</Text>
                                                </View>
                                                <View style={styles.summaryItemValueContainer}>
                                                    <ShowPrice
                                                        priceStyle={styles.itemValueText}
                                                        afterDotStyle={styles.itemValueText}
                                                        currencyStyle={styles.itemValueText}
                                                        price={orderDetail.vat} currency={currency} />
                                                </View>
                                            </View>
                                        )}
                                        {/* Vat */}

                                    </View>

                                    <View style={styles.summaryLine}></View>

                                    <View style={styles.extraPaddingHorizontal}>

                                        <View style={[styles.summaryItem, { marginBottom: Scale.moderateScale(0) }]}>
                                            <View style={[styles.summaryItemTitleContainer, { flexDirection: "column", alignItems: 'flex-start' }]}>
                                                <View style={styles.summaryTotalWrapper}>
                                                    <Text style={[styles.itemTitleText, styles.totalTitle]}>{Languages.Cart.Total}</Text>
                                                    {orderDetail.vat > 0 ?
                                                        <Text style={[styles.itemTitleText, styles.summaryInclusiveOfVat,
                                                        {
                                                            marginLeft: Scale.moderateScale(10)
                                                        }]}>({Languages.Cart.InclusiveOfVAT})</Text>
                                                        :
                                                        null}
                                                </View>
                                                {/* // Todo: get paywith type from server and uncomment this */}
                                                {/* <View style={styles.summaryPayWithSection}>
                                              <View style={styles.summaryPayWithIconContainer}>
                                                  <CashIcon
                                                      width={Scale.moderateScale(45)}
                                                      height={Scale.moderateScale(25)}
                                                  />
                                              </View>
                                              <Text style={styles.summaryPayWithText}>{Languages.Payment.PayWithCash}</Text>
                                          </View> */}
                                            </View>
                                            <View>
                                                {orderDetail.discount > 0 ?
                                                    <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                                                        <OffLabel
                                                            textStyle={styles.summaryItemOffLabelText}
                                                            containerStyle={styles.summaryOffContainer}>
                                                            <Text><Text>{currency} </Text>{Tools.formatMoney(orderDetail.totalWithOutDiscountCode)}</Text>
                                                        </OffLabel>
                                                    </View>
                                                    :
                                                    null}
                                                <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                                                    {/* <Text style={[styles.itemValueText, styles.summaryInclusiveItemValue]}> */}
                                                    <ShowPrice
                                                        afterDotStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                                                        currencyStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                                                        priceStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                                                        price={orderDetail.total} currency={currency} />
                                                    {/* </Text> */}
                                                </View>
                                            </View>
                                        </View>

                                        {/* <View style={[styles.summaryItem, { marginTop: Scale.moderateScale(0) }]}>
                      <View style={styles.summaryItemTitleContainer}>
                        <Text style={[styles.itemTitleText, styles.summaryInclusiveOfVat]}>({Languages.Cart.InclusiveOfVAT})</Text>
                      </View>
                      <View style={[styles.summaryItemValueContainer, styles.totalSummaryValueContainer]}>
                        <Text style={[styles.itemValueText, styles.summaryInclusiveItemValue]}>
                          <ShowPrice
                            afterDotStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            currencyStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            priceStyle={[styles.itemValueText, styles.summaryInclusiveItemValue]}
                            price={971.00} currency={currency} />
                        </Text>
                      </View>
                    </View> */}

                                    </View>

                                </View>
                            </View>

                        </ShadowWrapper>

                        :
                        null}

                    {isSuccessPayment === true ?
                        <ShadowWrapper>
                            <View style={styles.orderAddressContainer}>
                                <OrderAddressItem
                                    fullName={orderDetail.transfereeName + ' ' + orderDetail.transfereeFamily}
                                    mobile={orderDetail.transfereeMobile}
                                    countryCode={orderDetail.iso || 'BH'}
                                    address={orderDetail.address}
                                />
                                <TouchableOpacity onPress={goToOrderDetailPressHandler}>
                                    <Text style={styles.goToOrderDetailText}>{Languages.Payment.GoToOrderDetail}</Text>
                                </TouchableOpacity>
                            </View>
                        </ShadowWrapper>
                        :
                        null}

                    <ShadowWrapper>
                        <View>
                            <View style={styles.carouselHeader}>
                                <View style={styles.headerLeftColor}></View>
                                <View style={styles.carouselHeaderTextsContainer}>
                                    <Text style={styles.title}>{Languages.Payment.YourOrder}</Text>
                                    <Text style={styles.itemCountText}>{Languages.Cart.NumberItems(orderDetail.itemsCount)}</Text>
                                </View>
                            </View>
                            <View>
                                {orderDetail?.items.map((item, index) => {
                                    console.log(item);
                                    return (
                                        <View key={item.itemId}>
                                            <View style={styles.productitemContainer}>
                                                <ProductItemSec
                                                    onPress={onProductItemPressHandler}
                                                    onPressValue={item}
                                                    titleTextStyle={styles.productTitleText}
                                                    modelNumber={item.modelNumber}
                                                    data={item}
                                                    title={item.title}
                                                    // showItemCount={true}
                                                    // itemCount={item.quantity}
                                                    provider={item.storeName}
                                                    showMarketOrExpress={item.method == 1} // true market, false express, null dont't show
                                                    currency={currency}
                                                    showMainPrice={false}
                                                    // showPrice={item.priceWithDiscount}
                                                    // discountPercent={item.discountPercent}
                                                    // discountAmount={item.discountAmount}
                                                    // offLineLabelPrice={item.unitPrice * item.quantity}
                                                    showShippingMethod={true}
                                                    shippingMethodType={item.method}
                                                />
                                            </View>
                                            {index != orderDetail?.items.length - 1 ?
                                                <View style={styles.itemLine}></View>
                                                :
                                                null}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ShadowWrapper>

                </ScrollView>

            </>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(25),
        paddingVertical: Scale.moderateScale(25)
    },
    headerIconContainer: {
        marginBottom: Scale.moderateScale(15)
    },
    headerIconWrapper: {
        backgroundColor: '#4CAF50',
        width: Scale.moderateScale(40),
        height: Scale.moderateScale(40),
        borderRadius: Scale.moderateScale(5),
        justifyContent: "center",
        alignItems: "center"
    },
    notSuccessHeaderIconWrapper: {
        backgroundColor: '#fe1743'
    },
    headerText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
        textAlign: "center"
    },
    headerSecText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        textAlign: "center",
        marginTop: Scale.moderateScale(5)
    },
    headerSecEmailText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    headerBtnContainer: {
        width: '70%',
        marginTop: Scale.moderateScale(15)
    },
    headerBtnWrapper: {

    },
    // 
    carouselHeader: {
        alignItems: "center",
        flexDirection: "row"
    },
    headerLeftColor: {
        backgroundColor: Colors.TULIPTREE,
        width: Scale.moderateScale(10),
        height: Scale.moderateScale(50),
        borderTopRightRadius: Scale.moderateScale(15),
        borderBottomRightRadius: Scale.moderateScale(15),
    },
    carouselHeaderTextsContainer: {

    },
    title: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        marginHorizontal: Scale.moderateScale(15)
    },
    itemCountText: {
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        marginHorizontal: Scale.moderateScale(15),
        marginTop: Scale.moderateScale(3)
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '90%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    // Order Section
    orderSection: {
        paddingVertical: Scale.moderateScale(10)
    },
    orderStatusSection: {

    },
    orderStatusContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    orderStatusIconContainer: {
        marginRight: Scale.moderateScale(5)
    },
    orderStatusText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: '#F0CD40'
    },
    statusLinesContainer: {
        flexDirection: "row",
        marginVertical: Scale.moderateScale(10)
    },
    statusLine: {
        height: Scale.moderateScale(8),
        width: Scale.moderateScale(55),
        borderRadius: Scale.moderateScale(2),
        backgroundColor: Colors.MERCURY,
        marginRight: Scale.moderateScale(3)
    },
    statusLineActive: {
        backgroundColor: '#F0CD40',
    },
    orderSummarySection: {
        // backgroundColor: Colors.ALABASTER,
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(18),
        // borderRadius: Scale.moderateScale(5),
        marginBottom: Scale.moderateScale(20)
    },
    orderSummarySectionTitle: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(15),
        textAlign: 'left'
    },
    summaryItem: {
        flexDirection: "row",
        marginVertical: Scale.moderateScale(10)
    },
    summaryItemTitleContainer: {
        flex: 1,
        flexDirection: "row"
    },
    itemTitleText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD
    },
    itemItemsCount: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SILVERCHALICE,
        marginLeft: Scale.moderateScale(15)
    },
    summaryItemValueContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    itemValueText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
    },
    shippingValueText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.LOCHMARA,
    },
    discountTitle: {
        color: Colors.BIGSTONE
    },
    discountValue: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.SHAMROCK,
    },
    summaryLine: {
        height: Scale.moderateScale(2),
        width: '100%',
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    extraPaddingHorizontal: {
        paddingHorizontal: Scale.moderateScale(5)
    },
    totalTitle: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    totalSummaryValueContainer: {
        justifyContent: "flex-end",
        alignContent: "flex-end",
        alignSelf: "flex-end"
    },
    summaryOffContainer: {
        justifyContent: "flex-end",
        alignContent: "flex-end",
        alignSelf: "flex-end"
    },
    summaryItemOffLabelText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SILVERCHALICE,
    },
    summaryInclusiveOfVat: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SILVERCHALICE
    },
    summaryInclusiveItemValue: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    summaryTotalWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    summaryPayWithSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Scale.moderateScale(10)
    },
    summaryPayWithIconContainer: {
        marginRight: Scale.moderateScale(5)
    },
    summaryPayWithText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    //
    orderAddressContainer: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(20)
    },
    //
    goToOrderDetailText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.LOCHMARA,
        marginTop: Scale.moderateScale(20)
    }
});


export default AfterPaymentScreen;


const data = {
    orderId: 2321,
    itemsCount: 2,
    shipping: 100,
    discount: 0,
    vat: 0,
    totalWithOutDiscountCode: 1300,
    total: 1300,
    countryId: 137,
    provinceId: 11,
    countryTitle: "Bahrain",
    cityId: 1055,
    cityTitle: 'Manama',
    transfereeName: "Gghv",
    transfereeFamily: "Hhhh",
    transfereeMobile: "37755753",
    transfereeEmail: "test@gmail.com",
    address: "Rd No 2228, Damistan, Bahrain",
    trackingCode: '323jdslsfjds2',
    "items": [
        {
            "itemId": 126,
            "quantity": 1,
            "weight": 1,
            "title": "iphone 11 pro",
            "modelNumber": "MTGX3ZA/A",
            "goodsCode": "GN-12",
            "goodsImage": "533fb31c-bbef-41c5-b081-f62b5feb65ff.jpg",
            "goodsVariety": [
                {
                    "parameterTitle": "color",
                    "valueTitle": "white",
                    "imageUrl": null,
                    "valuesHaveImage": true
                },
                {
                    "parameterTitle": "Internal Memory",
                    "valueTitle": "64 gb",
                    "imageUrl": null,
                    "valuesHaveImage": false
                },
                {
                    "parameterTitle": "version",
                    "valueTitle": "Middle East Version",
                    "imageUrl": null,
                    "valuesHaveImage": false
                }
            ],
            "goodsId": 12,
            "categoryId": 24,
            "providerId": 1013,
            "shopId": 5,
            "exist": true,
            "discountAmount": 0,
            "discountPercent": 0,
            "unitPrice": 1200,
            "vat": 0,
            "totalPrice": 1300,
            "shipping": 100,
            "priceWithDiscount": 1200,
            "discountCouponAmount": 0,
            "method": 1,
            "shippingAvailable": true,
            "countryId": 137,
            "cityId": 1055,
            "inventoryCount": 12
        }
    ]
}