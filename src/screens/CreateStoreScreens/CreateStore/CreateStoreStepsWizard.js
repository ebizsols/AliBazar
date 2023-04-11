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
    TouchableOpacity,
    Animated
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
    CommonHeader
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    ProductItemSec,
    TextWithRadio,
    FloatButtonWrapper,
    RadioButton,
    ShowPrice,
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";

import { CommonActions } from '@react-navigation/native';

import LoginIcon from 'assets/icons/createStoreIcons/login.svg';
import BankIcon from 'assets/icons/createStoreIcons/bank-details.svg';
import CountryIcon from 'assets/icons/createStoreIcons/country.svg';
import DocumentIcon from 'assets/icons/createStoreIcons/document.svg';
import StoreIcon from 'assets/icons/createStoreIcons/store.svg';
import VatIcon from 'assets/icons/createStoreIcons/vat-details.svg';

const selectedWidth = 27;
const othersWidth = 14.6;

const TabItem = (props) => {

    const _animatedWidth = useRef(new Animated.Value(0)).current;
    const _animatedOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(_animatedOpacity, {
            toValue: props.item.isSelected ? 1 : 0,
            duration: props.item.isSelected ? 1000 : 0,
            useNativeDriver: false,
        }).start();

        Animated.timing(_animatedWidth, {
            toValue: props.item.isSelected ? 100 : 0,
            duration: props.item.isSelected ? 200 : 1000,
            useNativeDriver: false,
        }).start();

    }, [props.item.isSelected]);


    const textContainerWidth = {
        width: _animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        }),
    };

    const textContainerOpacity = {
        opacity: _animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    };

    return (
        <TouchableOpacity disabled={true} onPress={() => props.pressTabItemHandler(props.item, props.index)} key={props.item.id}
            style={[styles.tabItem,
            {
                width: props.item.isSelected ? selectedWidth + '%' : othersWidth + '%',
            }]}>
            <Animated.View style={[styles.tabItemIconContainer, textContainerWidth]}>
                <props.item.icon
                    style={{ color: props.item.isActive ? Colors.BIGSTONE : Colors.BOMBAY }}
                    width={Scale.moderateScale(25)}
                    height={Scale.moderateScale(25)}
                />
                {props.item.isSelected ?
                    <Animated.View style={[
                        styles.tabItemTextContainer,
                        textContainerOpacity
                    ]}>
                        <Text style={styles.tabItemText}>{props.item.title}</Text>
                    </Animated.View>
                    :
                    null}
            </Animated.View>
        </TouchableOpacity>
    )
}

const CreateStoreStepsWizard = (props) => {

    const [tabItems, setTabItems] = useState([
        {
            id: 1,
            icon: LoginIcon,
            title: Languages.CreateStore.Register,
            isActive: true,
            isSelected: true,
            width: '16.6%'
        },
        {
            id: 2,
            icon: CountryIcon,
            title: Languages.CreateStore.Country,
            isActive: false,
            isSelected: false,
            width: '16.6%'
        },
        {
            id: 3,
            icon: StoreIcon,
            title: Languages.CreateStore.Store,
            isActive: false,
            isSelected: false,
            width: '16.6%'
        },
        {
            id: 4,
            icon: DocumentIcon,
            title: Languages.CreateStore.Document,
            isActive: false,
            isSelected: false,
            width: '16.6%'
        },
        {
            id: 5,
            icon: BankIcon,
            title: Languages.CreateStore.Bank,
            isActive: false,
            isSelected: false,
            width: '16.6%'
        },
        {
            id: 6,
            icon: VatIcon,
            title: Languages.CreateStore.Vat,
            isActive: false,
            isSelected: false,
            width: '16.6%'
        },
    ]);

    const pressTabItemHandler = (item, newIndex) => {
        const tempItems = [...tabItems];

        const length = tempItems.length;
        for (let index = 0; index < length; index++) {
            if (index > newIndex) {
                tempItems[index].isActive = false;
                tempItems[index].isSelected = false;
            } else {
                tempItems[index].isActive = true;
                tempItems[index].isSelected = false;
            }
        }

        tempItems[newIndex].isSelected = true;
        tempItems[newIndex].isActive = true;

        setTabItems(tempItems);
        // setSelectedIndex(newIndex);
    }

    const _animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        pressTabItemHandler({}, props.selectedIndex)
        Animated.timing(_animatedWidth, {
            toValue: (((props.selectedIndex) * othersWidth) + selectedWidth),
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [props.selectedIndex]);


    const progresssLineWidthStyle = {
        width: _animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        }),
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {tabItems.map((item, index) => {
                    return (
                        <TabItem key={item.id} pressTabItemHandler={pressTabItemHandler} item={item} index={index} />
                    )
                })}
            </View>
            <View style={styles.progressLineContainer}>
                <Animated.View style={[styles.progressLine, progresssLineWidthStyle]}></Animated.View>
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ALABASTER,
    },
    tabs: {
        flexDirection: "row",
    },
    tabItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(7),
        height: Scale.moderateScale(50)
    },
    tabItemIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        // paddingRight: Scale.moderateScale(3)
        flexDirection: "row"
    },
    tabItemTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: Scale.moderateScale(3)
    },
    tabItemText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    //
    progressLineContainer: {
        height: Scale.moderateScale(5),
        backgroundColor: '#E9E9E9'
    },
    progressLine: {
        height: '100%',
        backgroundColor: Colors.TULIPTREE
    }
});


export default CreateStoreStepsWizard;
