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
    TextWithRadio,
    FloatButtonWrapper,
    RadioButton
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import TickIcon from 'assets/icons/tick.svg';
import CloseIcon from 'assets/icons/close-gray.svg';

const TopicItem = (props) => {


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.data.title}</Text>
            {props.data.articles?.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => props.onPressArticle(item.articleId)} style={styles.article} key={item.articleId}>
                        <View style={styles.circleContainer}>
                            <View style={styles.circle}></View>
                        </View>
                        <Text style={styles.articleTitleText}>{item.subject}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    titleText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(10),
        textAlign: 'left'
    },
    article: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: Scale.moderateScale(5),
    },
    circleContainer: {

    },
    circle: {
        backgroundColor: '#f0b440',
        width: Scale.moderateScale(11),
        height: Scale.moderateScale(11),
        borderRadius: Scale.moderateScale(10),
        marginRight: Scale.moderateScale(8),
        marginTop: Scale.moderateScale(5)
    },
    articleTitleText: {
        flex: 1,
        textAlign: 'left'
    }
});


export default TopicItem;
