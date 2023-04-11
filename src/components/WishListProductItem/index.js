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
import { CategoryItem, ProductItemSec } from 'components/UI';

import LikeIcon from 'assets/icons/like-gray-fill.svg';
import TrashIcon from 'assets/icons/trash.svg';
import CartIcon from 'assets/icons/cart-gray.svg';
import { Picker } from '@react-native-picker/picker';

// import DropDownPicker from 'react-native-dropdown-picker';

const WishListProductItem = (props) => {

    return (
        <View style={styles.componentWrapper}>
            <ProductItemSec
                modelNumber={props.data.modelNumber}
                onPress={props.onProductPresss}
                onPressValue={props.data}
                data={props.data}
                title={props.data.title}
                showPrice={props.data.finalPrice}
                discountPercent={props.data.discountPercentage}
                discountAmount={props.data.discountAmount}
                offLineLabelPrice={props.data.price + props.data.vat}
                showMarketOrExpress={props.data.saleWithCall == true ? null : props.data.shippingPossibilities} // true market, false express, null dont't show
                checkSaleWithCall={true}
                saleWithCall={props.data.saleWithCall}
                checkInventory={true}
                inventoryCount={props.data?.inventoryCount}
                showShippingMethod={true}
                shippingMethodType={props.data?.method}
                currency={props.currency}
            />
            <View style={styles.bottomSection}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => props.removeFromListPress(props.data.goodsId)} style={styles.itemContainer}>
                        <TrashIcon
                            style={{ color: '#acb1b8' }}
                            width={Scale.moderateScale(18)}
                            height={Scale.moderateScale(18)}
                        />
                        <Text style={styles.itemText}>{Languages.Cart.RemoveFromList}</Text>
                    </TouchableOpacity>
                    {props.data?.inventoryCount > 0 && props.data?.saleWithCall != true ?
                        <TouchableOpacity onPress={() => props.moveToCartPress(props.data)}
                            style={[styles.itemContainer, styles.moveToCartContainer]}>
                            <CartIcon
                                style={{ color: '#acb1b8' }}
                                width={Scale.moderateScale(18)}
                                height={Scale.moderateScale(18)}
                            />
                            <Text style={styles.itemText}>{Languages.Cart.MoveToCart}</Text>
                        </TouchableOpacity>
                        :
                        null}
                    {/* <View style={[styles.itemContainer, styles.moveToWishlistContainer]}>
                        <LikeIcon
                            width={Scale.moderateScale(18)}
                            height={Scale.moderateScale(18)}
                        />
                        <Text style={styles.itemText}>{Languages.Cart.MoveToWishlist}</Text>
                    </View> */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomSection: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingBottom: Scale.moderateScale(20),
        flexDirection: "row"
    },
    leftSection: {
        flex: 1,
        flexDirection: "row"
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
    moveToWishlistContainer: {
        marginTop: Scale.moderateScale(10)
    },
    moveToCartContainer: {
        marginLeft: Scale.moderateScale(10)
    }
});

export default WishListProductItem;