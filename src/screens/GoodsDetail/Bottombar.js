import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
    Animated as ReactAnimated,
} from 'react-native';
import HTML from "react-native-render-html";
import { clientHome } from 'api/client';

import { Constants, Languages, Scale, Tools } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import { ShowPrice, ProductLabel, OffLabel } from 'components/UI';
import TrashIcon from 'assets/icons/trash.svg';
import ShopCartIcon from 'assets/icons/shop-cart.svg';
import EmptyIcon from 'assets/icons/empty-set.svg';

const Bottombar = props => {
    console.log(props.data);

    const _animatedPosition = useRef(new ReactAnimated.Value(props.showSelectCountView ? 1 : 0)).current;

    let counts = [];
    // for (let index = 0; index < props.inventoryCount; index++) {
    //     counts.push(index + 1);
    // }

    useEffect(() => {
        ReactAnimated.timing(_animatedPosition, {
            toValue: (props.showSelectCountView) ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [props.showSelectCountView]);

    const selectQuantityStyle = {
        top: _animatedPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [Scale.moderateScale(100), Scale.moderateScale(0)],
        }),
    };

    const selectQuantityHieghtStyle = {
        height: _animatedPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [Scale.moderateScale(0), Scale.moderateScale(62)],
        }),
    };


    counts = Array.from(Array(props.inventoryCount < Constants.QuantitySelectMax ? props.inventoryCount : Constants.QuantitySelectMax).keys())
    // useEffect(() => {
    //     const counts = [];
    //     for (let index = 0; index < props.inventoryCount; index++) {
    //         counts.push(index + 1);
    //     }
    //     setCountsState(counts);
    //     console.log(counts);
    // }, [props.inventoryCount]);

    return (
        <>
            {/* {props.showSelectCountView ?
                <ScrollView
                    horizontal={true}
                    style={styles.selectCountScrollview}>
                    {counts.map((item, index) => {
                        return (
                            <TouchableOpacity key={item} onPress={() => props.onCountSelect(item + 1)} style={styles.numberItemContainer}>
                                <Text style={styles.numberItemText}>{item + 1}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                :
                null} */}
            <ReactAnimated.View style={[styles.quantitiySelectContainer, selectQuantityHieghtStyle]}>
                <ReactAnimated.ScrollView
                    horizontal={true}
                    // contentContainerStyle={[styles.quantitiySelectContainer, selectQuantityStyle]}
                    style={[styles.selectCountScrollview, selectQuantityStyle]}>
                    {counts.map((item, index) => {
                        return (
                            <TouchableOpacity key={item} onPress={() => props.onCountSelect(item + 1)} style={styles.numberItemContainer}>
                                <Text style={styles.numberItemText}>{item + 1}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ReactAnimated.ScrollView>
            </ReactAnimated.View>
            <View style={styles.container} >
                {props.data?.hasInventory ?
                    (
                        props.postMethodType != Constants.ShippingMethods.NOT_POSSIBL || props.isDownloadable == true ?
                            <>
                                <View style={styles.priceSection}>
                                    <View style={styles.priceContainer}>
                                        <ShowPrice currencyStyle={styles.priceCurrencyStyle}
                                            priceStyle={styles.priceStyle}
                                            afterDotStyle={styles.afterDotStyle}
                                            currency={props.currency} price={props.data.finalPrice} />
                                    </View>
                                    {props.data.discountAmount > 0 && props.data.discountAmount != null && props.data.discountAmount != undefined ?
                                        <View style={styles.offSection}>
                                            <View style={styles.productLabelWrapper}>
                                                <ProductLabel
                                                    textStyle={styles.offLabelText}
                                                    containerStyle={styles.offLabelContainer}>
                                                    <Text>{props.data.discountPercentage} % {Languages.Product.OffCap}</Text>
                                                </ProductLabel>
                                            </View>
                                            <View style={styles.offLabelWrapper}>
                                                <OffLabel wrapWithView={true} textStyle={styles.lineOffText}>
                                                    <ShowPrice
                                                        currencyStyle={[styles.priceText]}
                                                        priceStyle={[styles.priceText]}
                                                        afterDotStyle={[styles.priceText]}
                                                        price={props.data.price + props.data.vatamount}
                                                        currency={props.currency} />
                                                    {/* <Text><Text>{props.currency} </Text>{Tools.formatMoney(props.data.price)}</Text> */}
                                                </OffLabel>
                                            </View>
                                        </View>
                                        :
                                        null}

                                </View>

                                <View style={styles.addToCartSection}>

                                    {props.isDownloadable != true ?
                                        <TouchableOpacity
                                            onPress={props.openSelectCountView}
                                            style={styles.trashContainer}>
                                            <Text style={styles.qtyText}>{Languages.GoodsDetail.QTY}</Text>
                                            <Text style={styles.inCartCount}>{props.selectedCount}</Text>
                                        </TouchableOpacity>
                                        :
                                        null}

                                    <TouchableOpacity onPress={props.onAddToCartPress}
                                        style={styles.plusToCartContainer}>
                                        <View style={styles.addToCartIconContainer}>
                                            <ShopCartIcon
                                                style={{ color: Colors.WHITE }}
                                                width={Scale.moderateScale(30)}
                                                height={Scale.moderateScale(30)}
                                            />
                                        </View>
                                        <View style={styles.addToCartTextContainer}>
                                            <Text style={styles.addToCartText}>{Languages.GoodsDetail.AddToCart}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </>
                            :
                            <View style={styles.notAvailabelContainer}>
                                <Text style={styles.notAvailabelText}>{Languages.GoodsDetail.ThisProductNotAvailable}</Text>
                            </View>
                    )
                    :
                    <View style={styles.notExistContainer}>
                        <View style={styles.notExistIconContainer}>
                            <EmptyIcon
                                width={Scale.moderateScale(35)}
                                height={Scale.moderateScale(35)}
                            />
                        </View>
                        <Text style={styles.notExistText}>{Languages.GoodsDetail.ThisProductNotAvailable}</Text>
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(5),
        backgroundColor: Colors.WHITE,
        borderTopColor: '#D1D1D1',
        borderTopWidth: Scale.moderateScale(0.7)
    },
    priceSection: {
        flex: 1,
        justifyContent: "space-between"
    },
    priceContainer: {

    },
    offSection: {
        flexDirection: "row",
    },
    productLabelWrapper: {
        marginRight: Scale.moderateScale(15)
    },
    offLabelText: {
        color: Colors.TORCHRED2,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    offLabelContainer: {
        backgroundColor: Colors.PINK,
        borderRadius: Scale.moderateScale(3),
        paddingHorizontal: Scale.moderateScale(4),
        paddingVertical: Scale.moderateScale(1),
        alignSelf: "baseline"
    },
    addToCartSection: {
        flex: 1.4,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    trashContainer: {
        position: "relative",
        backgroundColor: Colors.WHITE,
        borderColor: Colors.LOCHMARA,
        borderWidth: Scale.moderateScale(1),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Scale.moderateScale(5),
        width: Scale.moderateScale(55),
        height: Scale.moderateScale(55),
        // flex: 1
    },
    qtyText: {
        // position: "absolute",
        // top: 0,
        // zIndex: 1000,
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    inCartCountContainer: {
        // flex: 1,
        // justifyContent: "space-between",
        alignItems: "center"
    },
    plusToCartContainer: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: Colors.LOCHMARA,
        borderColor: Colors.LOCHMARA,
        borderWidth: Scale.moderateScale(1),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Scale.moderateScale(5),
        width: '100%',
        height: Scale.moderateScale(55),
        marginLeft: Scale.moderateScale(7),
        // flex: 1
    },
    addToCartIconContainer: {
        // width: Scale.moderateScale(50),
        paddingHorizontal: Scale.moderateScale(5),
        flex: 1,
    },
    addToCartTextContainer: {
        flex: 3.3
    },
    addToCartText: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        textAlign: 'left'
    },
    inCartCount: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        // marginTop: Scale.moderateScale(3),
        // position: "absolute",
        // top: Scale.moderateScale(15),
        // left: 0,
        // zIndex: 10
    },
    inCartText: {
        color: Colors.SILVERCHALICE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    priceCurrencyStyle: {
        fontSize: Typography.FONT_SIZE_18,
    },
    afterDotStyle: {
        fontSize: Typography.FONT_SIZE_12,
    },
    priceStyle: {
        fontSize: Typography.FONT_SIZE_18,
    },
    lineOffText: {
        fontSize: Typography.FONT_SIZE_12,
    },
    notExistContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Scale.moderateScale(10)
    },
    notExistIconContainer: {
        marginRight: Scale.moderateScale(10)
    },
    notExistText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    notAvailabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingVertical: Scale.moderateScale(15)
    },
    notAvailabelText: {
        fontSize: Typography.FONT_SIZE_18,
        color: '#e62525',
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    numberItemContainer: {
        padding: Scale.moderateScale(20)
    },
    numberItemText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    priceText: {
        color: Colors.SILVER,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
    quantitiySelectContainer: {
        position: 'relative',
        backgroundColor: Colors.WHITE,
        // bottom: 100,
        // alignSelf: 'center',
        // width: 200
        // zIndex: 1000,

    },
    quantitiySelectContainerOpen: {
        height: Scale.moderateScale(62),
    },
    selectCountScrollview: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        height: Scale.moderateScale(62),
        // zIndex: 1,
        // top: -65,
        // elevation: 3
    },
});

export default Bottombar;