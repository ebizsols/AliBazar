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
    TouchableOpacity,
    Image
} from 'react-native';
import { Languages, Scale } from 'common';
import { MainInput } from 'components/UI';
import HeaderWrapper from './../HeaderWrapper';

import LogoIcon from 'assets/icons/alibazar.svg';
import { Colors } from 'styles';

const HomeHeader = (props) => {

    const inputPressHandler = () => {
        if (props.navigation)
            props.navigation.navigate('SearchDialog');
    }

    return (
        <HeaderWrapper showBackIcon={props.showBackIcon}>
            <View style={styles.iconContainer}>
                {/* <Image source={require('../../../assets/icons/logoAlibazar.png')} style={{ width: 100, height: 50 }} /> */}
                <LogoIcon
                    width={Scale.moderateScale(100)}
                    height={Scale.moderateScale(30)}
                />
            </View>
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
        paddingRight: Scale.moderateScale(15)
    },
    iconContainer: {
        flexDirection: "column",
        marginRight: Scale.moderateScale(5),
        paddingVertical: Scale.moderateScale(5),
        paddingHorizontal: Scale.moderateScale(15)
    },
    input: {
        height: Scale.verticalScale(30),
        paddingVertical: 0,
        borderRadius: Scale.moderateScale(9)
    }
});


export default HomeHeader;
