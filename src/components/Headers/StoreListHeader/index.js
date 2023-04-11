/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useReducer } from 'react';
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

const StoreListHeader = (props) => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            filter: '',
        },
        inputValidities: {
            filter: true,
        },
        formIsValid: true
    });

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

    const textChangeHandler = (value) => {
        if (props.onTextChange)
            props.onTextChange(value);
    };

    const pressBackIconHandler = () => {
        props.backPressHandler();
    }

    return (
        <HeaderWrapper
            onPressBackIcon={pressBackIconHandler}
            containerStyle={styles.headerWrapperContainer}
            showBackIcon={props.showBackIcon}>
            <View style={styles.rightContainer}>
                <TouchableOpacity>
                    <MainInput
                        inputStyle={styles.input}
                        showLabel={false}
                        initialValue={''}
                        editable={true}
                        showSearchIcon={true}
                        onInputChange={inputChangeHandler}
                        textChangeListener={textChangeHandler}
                        placeholder={Languages.Placeholder.SearchVendors}
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
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(15),
    },
    input: {
        height: Scale.verticalScale(45),
        backgroundColor: Colors.WHITE,
        borderRadius: Scale.moderateScale(9)
    },
    headerWrapperContainer: {
        borderBottomWidth: 0
    }
});


export default StoreListHeader;
