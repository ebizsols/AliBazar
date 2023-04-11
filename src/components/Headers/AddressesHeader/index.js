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

const AddressesScreen = (props) => {

    return (
        <HeaderWrapper
            backIconStyle={styles.backiconStyle}
            rightIconStyle={styles.rightIconStyle}
            onPressBackIcon={() => props.onPressBack()}
            onPressRightIcon={props.onPressRightIcon}
            showRightIcon={true}
            showBackIcon={props.showBackIcon}>
            <View style={styles.container}>
                <Text style={styles.primaryText}>{Languages.Address.Addresses}</Text>
            </View>
        </HeaderWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    primaryText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    backiconStyle: {
        position: "absolute",
        height: '100%'
    },
    rightIconStyle: {
        position: "absolute",
        height: '100%'
    }
});


export default AddressesScreen;
