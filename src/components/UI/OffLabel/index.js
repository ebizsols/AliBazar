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

const OffLabel = (props) => {

    return (
        <View style={[styles.labelContainer, props.containerStyle]}>
            <View style={styles.lineContainer}><View style={styles.line}></View></View>
            {props.wrapWithView === true ?
                <View style={[styles.labelText, props.textStyle]}>{props.children}</View>
                :
                <Text style={[styles.labelText, props.textStyle]}>{props.children}</Text>
            }
        </View>
    );
};

OffLabel.propTypes = {
    containerStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    wrapWithView: PropTypes.bool
};

OffLabel.defaultProps = {
    containerStyle: {},
    textStyle: {},
    wrapWithView: false
};

const styles = StyleSheet.create({
    labelContainer: {
        paddingHorizontal: Scale.moderateScale(3),
        paddingVertical: Scale.moderateScale(4),
        alignSelf: "baseline",
        position: "relative",
    },
    labelText: {
        color: Colors.SILVER,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    lineContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        height: Scale.moderateScale(1),
        backgroundColor: Colors.SILVER,
        width: '100%',
    }
});

export default OffLabel;