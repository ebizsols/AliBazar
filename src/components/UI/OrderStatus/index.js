import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';

import CancelledIcon from 'assets/icons/orderStatus/cancelled.svg';
import CompletedIcon from 'assets/icons/orderStatus/completed.svg';
import ConfirmedIcon from 'assets/icons/orderStatus/confirmed.svg';
import DeliveredIcon from 'assets/icons/orderStatus/delivered.svg';
import OngoingIcon from 'assets/icons/orderStatus/ongoing.svg';
import PorcessingIcon from 'assets/icons/orderStatus/porcessing.svg';
import ShippedIcon from 'assets/icons/orderStatus/shipped.svg';
import ShippingIcon from 'assets/icons/orderStatus/shipping.svg';
import ReturnProcessingIcon from 'assets/icons/orderStatus/return-processing.svg';
import ReturnCompleteIcon from 'assets/icons/orderStatus/return-complete.svg';

const OrderStatus = (props) => {

    let icon, color, text;
    switch (props.id) {
        case 1:
            icon = <OngoingIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#03045e";
            text = props.title;
            break;
        case 2:
            icon = <ConfirmedIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#3a0ca3";
            text = props.title;
            break;
        case 3:
            icon = <PorcessingIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#ffca3a";
            text = props.title;
            break;
        case 4:
            icon = <ShippingIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#9c89b8";
            text = props.title;
            break;
        case 5:
            icon = <ShippedIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#10002b";
            text = props.title;
            break;
        case 6:
            icon = <DeliveredIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#118ab2";
            text = props.title;
            break;
        case 7:
            icon = <CompletedIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#00a896";
            text = props.title;
            break;
        case 100:
            icon = <CancelledIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#ef476f";
            text = props.title;
            break;
        case 200:
            icon = <ReturnProcessingIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#03045e";
            text = props.title;
            break;
        case 201:
            icon = <ReturnCompleteIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#03045e";
            text = props.title;
            break;
        default:
            icon = <OngoingIcon
                width={Scale.moderateScale(20)}
                height={Scale.moderateScale(20)}
            />;
            color = "#03045e";
            text = props.title;
            break;
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={[styles.statusTitleText, { color: color }]}>
                {text}
            </Text>
        </View>
    );
};

OrderStatus.propTypes = {
    // containerStyle: ViewPropTypes.style,
    // textStyle: ViewPropTypes.style
};

OrderStatus.defaultProps = {
    // containerStyle: {},
    // textStyle: {}
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconContainer: {
        marginRight: Scale.moderateScale(5)
    },
    statusTitleText: {
        color: Colors.SHAMROCK,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    }
});

export default OrderStatus;