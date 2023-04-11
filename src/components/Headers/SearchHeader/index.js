/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import { Languages, Scale } from 'common';
import { Typography, Colors } from 'styles';
import HeaderWrapper from './../HeaderWrapper';

const SearchHeader = (props) => {

    return (
        <HeaderWrapper
            onPressBackIcon={() => props.onPressBack()}
            showBackIcon={props.showBackIcon}>
            {props.resultForText ?
                <View style={styles.container}>
                    {Languages.Search.ResultsFor(styles.primaryText, styles.secondryText, styles.primaryText, props.allGoodsCount, props.resultForText)}
                </View>
                :
                <View style={styles.container}>
                    {Languages.Search.ResultsForWithoutText(styles.primaryText, styles.secondryText, styles.primaryText, props.allGoodsCount)}
                </View>}
        </HeaderWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: Scale.moderateScale(10)
    },
    primaryText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    secondryText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BOMBAY
    }
});


export default SearchHeader;
