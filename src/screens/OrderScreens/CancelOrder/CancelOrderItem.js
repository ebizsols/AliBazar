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
    BottomSheetBackView
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    ProductItemSec,
    DropdownPickerInput,
    RadioButton
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import { CommonActions } from '@react-navigation/native';
import TickIcon from 'assets/icons/tick-green-circle.svg';
import CloseIcon from 'assets/icons/close-red-circle.svg';
import Collapsible from 'react-native-collapsible';

const CancelOrderItem = (props) => {

    const isCollapse = props.isSelected === false;

    return (
        <>
            <View style={styles.container}>
                <View style={styles.productRowContainer}>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton onPress={props.onSelectItem} isSelected={props.isSelected} />
                    </View>
                    <View style={styles.productitemContainer}>
                        <ProductItemSec
                            onPress={props.onProductItemPress}
                            onPressValue={props.data}
                            titleTextStyle={styles.productTitleText}
                            modelNumber={props.data?.modelNumber}
                            data={props.data}
                            showItemCount={true}
                            itemCount={props.data?.quantity}
                            title={props.data?.title}
                            showPrice={props.data?.totalPrice}
                            provider={props.data?.shopName}
                            // discountPercent={props.data?.discountPercent}
                            // discountAmount={props.data?.discountAmount}
                            // offLineLabelPrice={(props.data?.unitPrice * props.data?.quantity) + props.data?.vat}
                            // showMarketOrExpress={props.data.shippingAvailable == false ? null : props.data.method == 1} // true market, false express, null dont't show
                            currency={props.currency}
                        // showShippingMethod={true}
                        // shippingMethodType={props.data.method}
                        />
                    </View>
                </View>

                <Collapsible collapsed={isCollapse}>
                    <View style={styles.bottomSection}>
                        <View style={styles.reasonDropDownContainer}>
                            <DropdownPickerInput
                                showLabel={true}
                                lableText={Languages.InputLabels.WhyWouldYouLikeToCancelThisItem}
                                selectedValue={props.selectedReasonId}
                                // showRequireStart={true}
                                formSubmitted={true}
                                placeholder={Languages.Placeholder.SelectReason}
                                items={props.reasons}
                                required={props.isSelected}
                                itemTitle={'reasonTitle'}
                                itemValue={'reasonId'}
                                onValueChange={(value, index) => props.onSelectReason(value, props.data?.itemId)}
                            />
                        </View>
                    </View>
                </Collapsible>

            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Scale.moderateScale(10)
    },
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    productRowContainer: {
        flexDirection: "row"
    },
    productitemContainer: {
        flex: 1
    },
    radioButtonContainer: {
        justifyContent: "center"
    },
    //
    bottomSection: {
        // flexDirection: "row"
    },
    reasonDropDownContainer: {

    }
});


export default CancelOrderItem;
