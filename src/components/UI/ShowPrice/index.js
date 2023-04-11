import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    I18nManager
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Tools } from 'common';
import PropTypes from 'prop-types';

const ShowPrice = (props) => {

    let price = null;
    let afterDot = null;
    if (props.price) {
        let tempRealPrice = props.price.toFixed(2);
        let tempPrice = tempRealPrice.toString();
        let tempAfterDotExist = tempPrice.includes('.');
        if (tempAfterDotExist) {
            const dotIndex = tempPrice.indexOf('.');
            price = tempPrice.substring(0, dotIndex);
            afterDot = tempPrice.substring(dotIndex, tempPrice.length);

        } else {
            price = props.price;
        }
    }

    return (
        <View style={[
            styles.priceContainer,
            props.priceContainerStyle,
            // I18nManager.isRTL ? {justifyContent: 'flex-end'} : {}
        ]}>
            {props.showMinus == true && !I18nManager.isRTL ?
                <Text style={[styles.price, props.priceStyle]}>- </Text>
                :
                null}
            {props.showPlus == true && !I18nManager.isRTL ?
                <Text style={[styles.price, props.priceStyle]}>+ </Text>
                :
                null}
            <Text style={[styles.currency, props.currencyStyle]}>{I18nManager.isRTL ? '\u00A0' : ''}{props.currency}{I18nManager.isRTL ? '\u00A0' : ''}</Text>
            <Text style={[styles.price, props.priceStyle]}>
                {I18nManager.isRTL ? null : ' '}
                {Tools.formatMoney(price, 0)}
                {afterDot != null ?
                    <Text style={[styles.afterDot, props.afterDotStyle]}>{afterDot}</Text>
                    :
                    null
                }
                {I18nManager.isRTL ? ' ' : null}
            </Text>
            {props.showMinus == true && I18nManager.isRTL ?
                <Text style={[styles.price, props.priceStyle]}>- </Text>
                :
                null}
            {props.showPlus == true && I18nManager.isRTL ?
                <Text style={[styles.price, props.priceStyle]}>+ </Text>
                :
                null}
        </View>
    );
};

ShowPrice.propTypes = {
    priceStyle: ViewPropTypes.style,
    priceContainerStyle: ViewPropTypes.style,
    currencyStyle: ViewPropTypes.style,
    afterDotStyle: ViewPropTypes.style,
    currency: PropTypes.string,
    price: PropTypes.number,
    showMinus: PropTypes.bool,
    showPlus: PropTypes.bool,
};

ShowPrice.defaultProps = {
    priceStyle: {},
    currencyStyle: {},
    afterDotStyle: {},
    showMinus: false,
    showPlus: false
};

const styles = StyleSheet.create({
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    price: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
        textAlign: "left"
    },
    currency: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULAR,
        color: Colors.BIGSTONE,
        textAlign: "left"
    },
    afterDot: {
        fontSize: Typography.FONT_SIZE_11
    }
});

export default ShowPrice;