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
import HeaderWrapper from '../HeaderWrapper';

const CommonHeader = (props) => {

    const backIconPressHandler = () => {
        if (props.onPressBack) {
            props.onPressBack()
        } else {
            if (props.navigation) {
                props.navigation.goBack();
            }
        }
    }

    return (
        <HeaderWrapper
            containerStyle={props.containerStyle}
            backIconStyle={styles.backiconStyle}
            showRightIcon={props.showRightIcon}
            onPressRightIcon={() => {
                if (props.onPressRightIcon) {
                    props.onPressRightIcon();
                }
            }}
            onPressBackIcon={backIconPressHandler}
            showBackIcon={props.showBackIcon}>
            <View style={styles.container}>
                <Text style={styles.primaryText}>{props.title}</Text>
            </View>
        </HeaderWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    primaryText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    backiconStyle: {
        position: "absolute",
        height: '100%'
    }
});


export default CommonHeader;
