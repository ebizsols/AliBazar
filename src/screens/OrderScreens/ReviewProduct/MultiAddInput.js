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
    clientProfile,
    clientUserActivity
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
    FloatButtonWrapper
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import PlusIcon from 'assets/icons/plus.svg';
import CloseIcon from 'assets/icons/close-gray.svg';
import StarRating from 'react-native-star-rating';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const MultiAddInput = (props) => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            text: null
        },
        inputValidities: {
            text: false
        },
        formIsValid: false
    });

    const inputRef = useRef();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCloseClick = (itemIndex) => {
        // const newItems = this.state.items.filter((item) => {
        //   return item.id !== itemId;
        // });
        // this.setState({ items: [...newItems] });
        props.handleCloseClick(itemIndex);
    };

    const handleAddClick = () => {
        props.handleAddClick(formState.inputValues.text);
        inputRef.current?.clear();
    };

    const submitHandler = useCallback(async () => {
        if (!formSubmitted) {
            setFormSubmitted(true);
        }

        if (!formState.formIsValid) {
            console.log('error', formState.inputValidities);
            return;
        }
        if (formState.inputValues.text) {
            handleAddClick();
            inputChangeHandler('text', '', false);
        }
    }, [formState]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <View style={styles.prosConsInputSection}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
            <View style={styles.prosConsInputContainer}>
                <MainInput
                    showLabel={false}
                    placeholder={props.placeholder}
                    id="text"
                    ref={inputRef}
                    initialValue={formState.inputValues.text}
                    maxLength={350}
                    editable={!props.disabled}
                    // required={true}
                    // showRequireStart={true}
                    enableRealTimeTextChangeListener={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                />
                <View style={styles.prosConsIconWrapper}>
                    <TouchableOpacity onPress={submitHandler} style={[styles.plusIconContainer, props.disabled === true ? styles.plusIconContainerDisabled : {}]}>
                        <PlusIcon
                            style={{ color: Colors.WHITE }}
                            width={Scale.moderateScale(20)}
                            height={Scale.moderateScale(20)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                {props.items?.map((item, index) => {
                    return (
                        <View style={[styles.itemWrapper, { backgroundColor: props.itemBgColor, paddingRight: props.disabled != true ? 0 : Scale.moderateScale(5) }]}>
                            <View style={styles.itemTextContainer}>
                                <Text style={[styles.itemText, { color: props.itemColor }]}>{item.pointText}</Text>
                            </View>
                            {props.disabled != true ?
                                <TouchableOpacity onPress={() => handleCloseClick(index)} style={styles.itemIconContainer}>
                                    <CloseBlackIcon
                                        width={Scale.moderateScale(13)}
                                        height={Scale.moderateScale(13)}
                                    />
                                </TouchableOpacity>
                                :
                                null}

                        </View>
                    )
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    prosConsInputSection: {
        marginTop: Scale.moderateScale(20),
        // marginBottom: Scale.moderateScale(100)
    },
    labelContainer: {
        marginBottom: Scale.moderateScale(8),
        flexDirection: "row",
        alignItems: "center"
    },
    labelText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD
    },
    prosConsInputContainer: {

    },
    prosConsIconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        position: "absolute",
        right: Scale.moderateScale(4),
    },
    plusIconContainer: {
        width: Scale.moderateScale(40),
        height: Scale.moderateScale(40),

        backgroundColor: Colors.LOCHMARA,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Scale.moderateScale(8)
    },
    plusIconContainerDisabled: {
        backgroundColor: Colors.BOMBAY
    },
    //
    itemsContainer: {
        marginTop: Scale.moderateScale(2),
        flexDirection: "row",
        flexWrap: "wrap"
    },
    itemWrapper: {
        backgroundColor: '#F0FDF4',
        marginTop: Scale.moderateScale(5),
        alignSelf: "baseline",
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: Scale.moderateScale(5),
        paddingLeft: Scale.moderateScale(5),
        paddingVertical: Scale.moderateScale(5),
        marginRight: Scale.moderateScale(10),
        maxWidth: '100%'
    },
    itemText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SHAMROCK,
        lineHeight: Scale.moderateScale(20)
    },
    itemTextContainer: {
        // flex: 1
        flexShrink: 1
    },
    itemIconContainer: {
        // height: '100%',
        width: Scale.moderateScale(30),
        alignItems: "center",
        // flex: 1
        justifyContent: "center"
    },
    consItmeWrapper: {
        backgroundColor: '#FEF0EB',
    },
    consItemText: {
        color: Colors.JAFFA,
    },
});

export default MultiAddInput;