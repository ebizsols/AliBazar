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
    TouchableOpacity
} from 'react-native';
import { Languages, Scale } from 'common';
import { MainInput } from 'components/UI';
import HeaderWrapper from './../HeaderWrapper';

import LogoIcon from 'assets/icons/logo-black.svg';
import { Colors } from 'styles';

const CategoryHeader = (props) => {

    const inputPressHandler = () => {
        if (props.navigation)
            props.navigation.navigate('SearchDialog');
    }

    return (
        <HeaderWrapper showBackIcon={props.showBackIcon}>
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={inputPressHandler}>
                    <MainInput
                        closeIconColor={Colors.FIORD}
                        inputStyle={styles.input}
                        showLabel={false}
                        initialValue={''}
                        editable={false}
                        showSearchIcon={true}
                        placeholder={Languages.Common.WhatAreYouLookingFor}
                    />
                </TouchableOpacity>
            </View>
        </HeaderWrapper>
    );
};

const styles = StyleSheet.create({
    rightContainer: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: Scale.moderateScale(15)
    },
    iconContainer: {
        flexDirection: "column",
        marginRight: Scale.moderateScale(5),
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(15),
    },
    input: {
        height: Scale.verticalScale(30),
        paddingVertical: 0,
        borderRadius: Scale.moderateScale(9)
    }
});


export default CategoryHeader;
