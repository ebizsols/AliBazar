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

import { Languages, Scale } from 'common'
import { Stars } from 'components/UI'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const Progressbar = (props) => {

    return (
        <View style={styles.container} >
            <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{props.value}</Text>
            </View>
            <View style={styles.barContainer}>
                <View style={styles.barWrapper}>
                    <View style={[styles.barFill, { width: props.percent + '%' }]}></View>
                </View>
            </View>
            <View style={styles.percentContainer}>
                <Text style={styles.percentText}>{props.percent}%</Text>
            </View>
        </View>
    );
};

Progressbar.propTypes = {
    value: PropTypes.number,
    percent: PropTypes.number,
};

Progressbar.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1
    },
    barContainer: {
        flex: 1,
        justifyContent: "center"
    },
    barWrapper: {
        backgroundColor: Colors.MERCURY,
        height: Scale.moderateScale(6),
        borderRadius: Scale.moderateScale(5)
    },
    valueContainer: {
        width: Scale.moderateScale(35),
        alignItems: "center"
    },
    valueText: {
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    percentContainer: {
        width: Scale.moderateScale(40),
        textAlign: "right",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    percentText: {
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    barFill: {
        borderRadius: Scale.moderateScale(5),
        backgroundColor: '#3AD976',
        height: '100%'
    }
});

export default Progressbar;