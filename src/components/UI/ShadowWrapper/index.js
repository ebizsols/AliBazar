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
import { Scale } from 'common';
import PropTypes from 'prop-types';

const ShadowWrapper = (props) => {

    return (
        <View style={[styles.shadowVerticalContainer, props.shadowContainerStyle]}>
            <View style={[styles.shadowBox, props.contentContainer]}>
                {props.children}
            </View>
        </View>
    );
};

ShadowWrapper.propTypes = {
    shadowContainerStyle: ViewPropTypes.style,
    contentContainer: ViewPropTypes.style,
    // afterDotStyle: ViewPropTypes.style,
    // currency: PropTypes.string,
    // price: PropTypes.number
};

ShadowWrapper.defaultProps = {
    // priceStyle: {},
    // currencyStyle: {},
    // afterDotStyle: {},
};

const styles = StyleSheet.create({
    shadowVerticalContainer: {
        backgroundColor: Colors.WHITE,
        overflow: "hidden",
        paddingVertical: Scale.moderateScale(10)
    },
    shadowBox: {
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.8,

        elevation: 3.5,
    },
});

export default ShadowWrapper;