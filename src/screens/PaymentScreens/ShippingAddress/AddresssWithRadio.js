/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
    View,
    FlatList,
    Platform,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    clientAuth,
    clientProfile
} from 'api/client';
import {
    ModuleSelection,
    HomeHeader,
    AddressesHeader,
    BottomSheetHeader,
    BottomSheetBackView,
    AddressItem
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    RadioButton
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import AlertIcon from 'assets/icons/alert.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import { CommonActions } from '@react-navigation/native';

const AddresssWithRadio = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.radioContainer}>
                <RadioButton
                    onPress={props.onRadioPress}
                    isSelected={props.selectedAddressId == props.data.addressId} />
            </View>
            <View style={styles.itemContainer}>
                <AddressItem
                    onSetDefualtAddressPress={props.setDefaultAddressHandler}
                    onVerifyPhoneNumberPress={props.onVerifyPhoneNumberPressHandler}
                    onMenuPress={props.onAddressMenuPressHandler}
                    data={props.data} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    radioContainer: {
        paddingRight: Scale.moderateScale(15),
        paddingTop: Scale.moderateScale(36)
    },
    itemContainer: {
        flex: 1
    }
});


export default AddresssWithRadio;
