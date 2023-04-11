import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    TouchableOpacity,
    I18nManager
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';
import { Directions } from 'react-native-gesture-handler';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import { color } from 'react-native-reanimated';

const IconRow = (props) => {

    const Icon = props.icon

    return (
        <TouchableOpacity onPress={() => {
            if (props.onPress)
                props.onPress();
        }}
            disabled={!props.clickable} style={[styles.container, props.containerStyle]}>
            {props.showIcon ?
                <View style={[styles.iconContainer, props.iconContainerStyle]}>
                    <Icon
                        width={props.iconWidth}
                        height={props.iconHeight}
                    />
                </View>
                :
                null}

            <View style={[styles.containerStyle, props.contentStyle]}>
                {props.children}
            </View>
            {props.clickable == true && props.showArrowIcon == true ?
                <View style={[styles.arrowIconContainer, I18nManager.isRTL ? styles.arrowIconContainerRtl : {}]}>
                    <ArrowIcon
                        style={{ color: Colors.BOMBAY }}
                        width={Scale.moderateScale(16)}
                        height={Scale.moderateScale(16)} />
                </View>
                :
                null}
        </TouchableOpacity>
    );
};

IconRow.propTypes = {
    containerStyle: ViewPropTypes.style,
    iconContainerStyle: ViewPropTypes.style,
    iconContainer: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    icon: PropTypes.any,
    clickable: PropTypes.bool,
    showArrowIcon: PropTypes.bool,
    onPress: PropTypes.func,
    showIcon: PropTypes.bool
};

IconRow.defaultProps = {
    containerStyle: {},
    iconContainer: {},
    iconContainerStyle: {},
    contentStyle: {},
    showArrowIcon: true,
    iconWidth: Scale.moderateScale(27),
    iconHeight: Scale.moderateScale(27),
    clickable: true,
    showIcon: true
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    iconContainer: {
        paddingHorizontal: Scale.moderateScale(15)
    },
    arrowIconContainer: {
        position: "absolute",
        right: Scale.moderateScale(15),
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        transform: [
            { rotate: '90deg' }
        ]
    },
    arrowIconContainerRtl: {
        transform: [
            { rotate: '270deg' }
        ]
    },
    containerStyle: {
        flex: 1
    }
});

export default IconRow;