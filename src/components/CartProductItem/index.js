import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, PathHelper, Tools, Languages } from 'common';
import { CategoryItem, DropdownPickerInput, ProductItemSec, ShowPrice } from 'components/UI';

import LikeIcon from 'assets/icons/like-gray-fill.svg';
import TrashIcon from 'assets/icons/trash.svg';
import { Picker } from '@react-native-picker/picker';
import ArrowIcon from 'assets/icons/drop-down-arrow.svg';

// import DropDownPicker from 'react-native-dropdown-picker';

const CartProductItem = (props) => {

    return (
        <View style={styles.componentWrapper}>
            <ProductItemSec
                modelNumber={props.data.modelNumber}
                onPress={props.onProductPresss}
                onPressValue={props.data}
                data={props.data}
                title={props.data.title}
                showMainPrice={false}
                provider={props.data?.storeName}
                // showPrice={props.data.priceWithDiscount}
                discountPercent={props.data.discountPercent}
                discountAmount={props.data.discountAmount}
                offLineLabelPrice={(props.data.unitPrice * props.data.quantity) + props.data.vat}
                showMarketOrExpress={props.data.shippingAvailable == false ? null : props.data.method == 1} // true market, false express, null dont't show
                currency={props.currency}
                showShippingMethod={true}
                shippingMethodType={props.data.method}
                checkInventory={true}
                inventoryCount={props.data.inventoryCount}
            />

            <View style={styles.priceContainer}>
                <ShowPrice
                    currencyStyle={[styles.priceText]}
                    priceStyle={[styles.priceText]}
                    afterDotStyle={[styles.priceText]}
                    price={props.data.priceWithDiscount}
                    currency={props.currency} />
                <Text>{'\u00A0\u00A0\u00A0\u00A0'}</Text>
                {/* <Text style={styles.itemCountText}>{Languages.Cart.NumberItems(props.data.quantity)}</Text> */}
            </View>

            {props.data.shippingAvailable == false && props.data?.isDownloadable != true ?
                <View style={styles.cannotBeShippContainer}>
                    <Text style={styles.cannotBeShippText}>{Languages.Cart.ThisItemCannotBeShipped}</Text>
                </View>
                :
                null}
            <View style={styles.bottomSection}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => props.removeFromListPress(props.data.itemId)} style={styles.itemContainer}>
                        <TrashIcon
                            style={{ color: '#acb1b8' }}
                            width={Scale.moderateScale(18)}
                            height={Scale.moderateScale(18)}
                        />
                        <Text style={styles.itemText}>{Languages.Cart.RemoveFromList}</Text>
                    </TouchableOpacity>
                    {/* <View style={[styles.itemContainer, styles.moveToWishlistContainer]}>
                        <LikeIcon
                            width={Scale.moderateScale(18)}
                            height={Scale.moderateScale(18)}
                        />
                        <Text style={styles.itemText}>{Languages.Cart.MoveToWishlist}</Text>
                    </View> */}
                </View>
                {props.data?.isDownloadable != true && props.data?.exist == true &&
                    (

                        <View style={styles.rightSection}>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityText}>{Languages.Cart.Quantity}</Text>
                                <View style={styles.pickerWrapper}>
                                    <DropdownPickerInput
                                        showLabel={false}
                                        // lableText={Languages.InputLabels.Province}
                                        selectedValue={props.data.quantity}
                                        // showRequireStart={true}
                                        // formSubmitted={formSubmitted}
                                        // placeholder={Languages.Placeholder.PleaseSelectProvince}
                                        items={props.formattedCount}
                                        // required={true}
                                        itemTitle={'value'}
                                        itemValue={'id'}
                                        onValueChange={(value, index) => props.onItemQuantityChanged(value, props.data)}
                                    />
                                    {/* <Picker
                                    itemStyle={styles.pickerItem}
                                    mode={"dropdown"}
                                    selectedValue={props.data.quantity}
                                    style={{ height: Scale.moderateScale(40), width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        props.onItemQuantityChanged(itemValue, props.data)
                                    }}>
                                    {props.counts.map((item, index) => {
                                        return (
                                            <Picker.Item label={(item + 1).toString()} value={item + 1} />
                                        )
                                    })}
                                </Picker> */}
                                </View>
                            </View>
                        </View>

                    )
                }

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    bottomSection: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingBottom: Scale.moderateScale(20),
        flexDirection: "row"
    },
    leftSection: {
        flex: 1
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemText: {
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        marginLeft: Scale.moderateScale(10)
    },
    rightSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",

    },
    quantityContainer: {
        width: Scale.moderateScale(85),
        // backgroundColor: 'red',
        justifyContent: "center",
    },
    quantityText: {
        textAlign: "center",
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    },
    pickerWrapper: {
        marginTop: Scale.moderateScale(5),
        backgroundColor: Colors.ALABASTER,
        // paddingVertical: Scale.moderateScale(12),
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        // paddingLeft: Scale.moderateScale(10),
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
    },
    pickerItem: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIFIORDORD,
        backgroundColor: 'red'
    },
    moveToWishlistContainer: {
        marginTop: Scale.moderateScale(10)
    },
    // 
    cannotBeShippContainer: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(5)
    },
    cannotBeShippText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.TORCHRED,
    },
    //
    priceContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        marginVertical: Scale.moderateScale(5),
        marginLeft: Scale.moderateScale(20)
    },
    priceText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    itemCountText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
});

export default CartProductItem;