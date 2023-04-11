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
    Text
} from 'react-native';
import { Languages, Scale } from 'common';
import { MainInput } from 'components/UI';
import HeaderWrapper from './../HeaderWrapper';

import LogoIcon from 'assets/icons/logo-black.svg';
import { Colors } from 'styles';
import Constants from 'common/Constants';

const AddressMapHeader = (props) => {

    const inputPressHandler = () => {
        if (props.onSearchInputPress)
            props.onSearchInputPress();
    }

    return (
        <HeaderWrapper onPressBackIcon={props.onPressBack} showBackIcon={true}>
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={inputPressHandler}>
                    <MainInput
                        closeIconColor={Colors.FIORD}
                        inputStyle={styles.input}
                        showLabel={false}
                        initialValue={props.inputText}
                        editable={false}
                        showSearchIcon={true}
                        acceptEmptyInitialValue={true}
                        placeholder={Languages.Address.SearchForYourLocation}
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
    input: {
        height: Scale.verticalScale(45),
        borderRadius: Scale.moderateScale(9),
    }
});


export default AddressMapHeader;
