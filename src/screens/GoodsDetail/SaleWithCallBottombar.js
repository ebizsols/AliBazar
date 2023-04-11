import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import HTML from "react-native-render-html";
import { clientHome } from 'api/client';

import { Languages, Scale, Tools } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import { ShowPrice, ProductLabel, OffLabel } from 'components/UI';
import TrashIcon from 'assets/icons/trash.svg';
import ShopCartIcon from 'assets/icons/shop-cart.svg';
import StoreIcon from 'assets/icons/store-simp.svg';

const SaleWithCallBottombar = props => {

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.topText}>{Languages.GoodsDetail.ConnectProviderForPrice}</Text>
            </View>
            <TouchableOpacity disabled={props.shopDetailAccess} onPress={props.onCallRequestPress} style={[styles.btn, props.shopDetailAccess == true ? styles.deActiveBtn : {}]}>
                <View style={styles.iconContainer}>
                    <StoreIcon
                        style={{ color: props.shopDetailAccess == true ? Colors.BOMBAY : Colors.WHITE }}
                        width={Scale.moderateScale(27)}
                        height={Scale.moderateScale(27)}
                    />
                </View>
                <Text style={[styles.btnText, props.shopDetailAccess == true ? styles.deActiveText : {}]}> {props.shopDetailAccess == true ? Languages.GoodsDetail.WeWillContactYou : Languages.GoodsDetail.CallRequest}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderTopColor: '#D1D1D1',
        borderTopWidth: Scale.moderateScale(0.7)
    },
    topSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Scale.moderateScale(4)
    },
    topText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    btn: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Scale.moderateScale(15),
        paddingHorizontal: Scale.moderateScale(8)
    },
    iconContainer: {
        position: 'absolute',
        left: Scale.moderateScale(8)
    },
    btnText: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    deActiveText: {
        color: Colors.BOMBAY,
    },
    deActiveBtn: {
        backgroundColor: Colors.MERCURY
    }
});

export default SaleWithCallBottombar;