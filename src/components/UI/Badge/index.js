import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';

const Badge = (props) => {

    return (
        <View style={[styles.badgeContainer, props.containerStyle]}>
            <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
        </View>
    );
};

Badge.propTypes = {
    containerStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style
};

Badge.defaultProps = {
    containerStyle: {},
    textStyle: {}
};

const styles = StyleSheet.create({
    badgeContainer: {
        backgroundColor: Colors.ROYALBLUE,
        borderRadius: Scale.verticalScale(50),
        // padding: Scale.moderateScale(5),
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "baseline",
        width: Scale.moderateScale(18),
        height: Scale.moderateScale(18),
    },
    text: {
        color: Colors.WHITE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_11
    }
});

export default Badge;