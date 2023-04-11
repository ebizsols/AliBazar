import React, { useState, useRef, useEffect, useReducer, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    ViewPropTypes,
    I18nManager,
    TouchableOpacity,
    Platform
} from 'react-native';
import ShowIcon from "assets/icons/show.svg";
import HideIcon from "assets/icons/hide.svg";
import SearchIcon from "assets/icons/search.svg";
import CloseIcon from "assets/icons/close-fill.svg";
import { Scale, Tools, Languages, PathHelper } from "common";
import { ProgressiveImage } from "components/UI";
import { Colors, Typography } from "styles";
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import DateTimePickerModal from 'components/ModalDatePicker';
import { TouchableOpacity as TouchableOpacityGestureHandler, TouchableWithoutFeedback as TouchableWithoutFeedbackGestureHandler } from 'react-native-gesture-handler';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

const MainInput = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        validatePhoneNumberTry(value, countryCode) {
            console.log('validating...................');
            let isValid = true;
            if (props.phoneNumber && value?.length > 0 && !Tools.isValidPhoneNumber(value, countryCode)) {
                setHasErrors((prevState) => {
                    return ({
                        email: false,
                        max: false,
                        min: false,
                        required: false,
                        minLength: false,
                        matchPassword: false,
                        phoneNumber: true,
                        mainNewPassword: false
                    })
                });
                isValid = false;
            } else {
                setHasErrors((prevState) => {
                    return ({
                        email: false,
                        max: false,
                        min: false,
                        required: false,
                        minLength: false,
                        matchPassword: false,
                        phoneNumber: false,
                        mainNewPassword: false
                    })
                });
            }

            if (props.required && (value == null || value?.length <= 0)) {
                setHasErrors((prevState) => {
                    return ({
                        email: false,
                        max: false,
                        min: false,
                        required: true,
                        minLength: false,
                        matchPassword: false,
                        phoneNumber: false,
                        mainNewPassword: false
                    })
                });
                isValid = false;
            }

            dispatch({ type: INPUT_CHANGE, value: value, isValid: isValid });
        },
        clear() {
            textChangeHandler('');
        },
        isValidPhoneNumber() {
            return inputState.isValid;
        }
    }));

    const [showDatepicker, setShowDatepicker] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (selectedDate) => {
        const currentDate = selectedDate || date;
        // setShowDatepicker(Platform.OS === 'ios');
        console.log('(onChange) currentDate', currentDate);
        setDate(currentDate);
        const formatDate = moment(currentDate).format("YYYY[/]MM[/]DD");
        textChangeHandler(formatDate);
        setShowDatepicker(false);
    };

    const hideDatePicker = () => {
        setShowDatepicker(false);
    };

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const [hasErrors, setHasErrors] = useState({
        required: false,
        email: false,
        min: false,
        max: false,
        minLength: false,
        matchPassword: false,
        phoneNumber: false,
        mainNewPassword: false
    });

    useEffect(() => {
        if (props.initialValue || props.acceptEmptyInitialValue) {
            textChangeHandler(props.initialValue);
        }
    }, [props.initialValue]);

    useEffect(() => {
        if (props.matchPassword || props.checkMatchPassword) {
            textChangeHandler(inputState.value);
        }
    }, [props.matchPassword]);

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            if (onInputChange)
                onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {

        if (props.type == 'datepicker') {
            console.log('text', text);
            if (text) {
                console.log('(textChangeHandler) text', text);
                const dateSplits = text.split('/');
                console.log(dateSplits);
                const date = new Date(parseInt(dateSplits[0]), parseInt(dateSplits[1]) - 1, parseInt(dateSplits[2]));
                console.log('(textChangeHandler) date', date);
                console.log('(textChangeHandler) date.toString()', date.toString());
                console.log('(textChangeHandler) date.toUTCString()', date.toUTCString());
                text = moment(date.toUTCString()).format("YYYY[/]MM[/]DD");
                console.log('(textChangeHandler) text', text);

                setDate(date);
            }
        }

        if (props.isPassword || props.username) {
            text = text.trim();
        }
        if (props.textChangeListener) {
            props.textChangeListener(text.trim());
        }

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if ((props.required && text?.trim().length === 0) || (props.required && !!!text)) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    max: false,
                    min: false,
                    required: true,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (((props.email && text.trim().length > 0)) && !emailRegex.test(text.trim().toLowerCase())) {
            setHasErrors((prevState) => {
                return ({
                    minLength: false,
                    max: false,
                    min: false,
                    required: false,
                    email: true,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (props.min != null && +text < props.min) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    max: false,
                    required: false,
                    min: true,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (props.max != null && +text > props.max) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    min: false,
                    required: false,
                    max: true,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (props.minLength != null && text.length < props.minLength) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    max: false,
                    min: false,
                    required: false,
                    minLength: true,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (props.phoneNumber && text.length > 0 && !Tools.isValidPhoneNumber(text, props.countryCode)) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    max: false,
                    min: false,
                    required: false,
                    minLength: false,
                    matchPassword: false,
                    phoneNumber: true,
                    mainNewPassword: false
                })
            });
            isValid = false;
        }
        else if (isValid) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    max: false,
                    min: false,
                    required: false,
                    matchPassword: false,
                    phoneNumber: false,
                    mainNewPassword: false
                })
            });
        }

        if (text == '' && !props.required) {
            if (onInputChange) {
                onInputChange(id, inputState.value, true);
                isValid = true;
            }
        }

        if (props.checkMatchPassword && isValid) {
            if (props.matchPassword !== text) {
                if (props.mainNewPassword === true) {
                    setHasErrors((prevState) => {
                        return ({
                            email: false,
                            minLength: false,
                            max: false,
                            min: false,
                            required: false,
                            matchPassword: false,
                            phoneNumber: false,
                            mainNewPassword: true
                        })
                    });
                } else {
                    setHasErrors((prevState) => {
                        return ({
                            email: false,
                            minLength: false,
                            max: false,
                            min: false,
                            required: false,
                            matchPassword: true,
                            phoneNumber: false,
                            mainNewPassword: false
                        })
                    });
                }

                isValid = false;
            } else {
                setHasErrors((prevState) => {
                    return ({
                        email: false,
                        minLength: false,
                        max: false,
                        min: false,
                        required: false,
                        matchPassword: false,
                        phoneNumber: false,
                        mainNewPassword: false
                    })
                });
                isValid = true;
            }
        }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });

        if (props.enableRealTimeTextChangeListener) {
            onInputChange(id, text, isValid)
        }
    };

    useEffect(() => {
        textChangeHandler(inputState.value);
    }, [])

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    const [isFocused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showClose, setShowClose] = useState(false)

    handleFocus = () => setFocused(true);
    handleBlur = () => {
        setFocused(false);
        dispatch({ type: INPUT_BLUR });
    }

    const onInputPressHandler = () => {
        if (props.type == 'datepicker') {
            setShowDatepicker(true);
        }
    };

    let _showIcon = null;
    if (props.isPassword && props.showTogglePasswordIcon) {
        if (showPassword) {
            _showIcon = <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                <View
                    style={styles.showIcon}>
                    <HideIcon height={Scale.moderateScale(15)} />
                </View></TouchableWithoutFeedback>;
        } else {
            _showIcon = <TouchableWithoutFeedback
                onPress={() => setShowPassword(!showPassword)}>
                <View
                    style={styles.showIcon}>
                    <ShowIcon height={Scale.moderateScale(15)} />
                </View></TouchableWithoutFeedback>;
        }
    };

    const onClearTextPress = () => {
        textChangeHandler('');
        if (props.onClearTextHandler)
            props.onClearTextHandler();
    };

    if (props.showSearchIcon == true) {
        if (inputState.value?.length > 0) {
            if (props.searchIconFixAndroid === true) {
                _showIcon = <TouchableWithoutFeedback onPress={onClearTextPress}>
                    <TouchableOpacity onPress={onClearTextPress} style={styles.showIcon}>
                        <CloseIcon
                            style={{ color: props.closeIconColor }}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(20)}
                        /></TouchableOpacity>
                </TouchableWithoutFeedback>;
            } else {
                _showIcon = <TouchableWithoutFeedback onPress={onClearTextPress}>
                    <TouchableOpacityGestureHandler onPress={onClearTextPress} containerStyle={styles.showIcon}>
                        <CloseIcon
                            style={{ color: props.closeIconColor }}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(20)}
                        /></TouchableOpacityGestureHandler>
                </TouchableWithoutFeedback>;
            }

        } else {
            _showIcon = <TouchableWithoutFeedback>
                <View style={styles.showIcon}>
                    <SearchIcon
                        style={{ color: props.closeIconColor }}
                        height={Scale.moderateScale(20)}
                        width={Scale.moderateScale(20)}
                    /></View>
            </TouchableWithoutFeedback>;
        }

    }

    if (props.showSearchIconLeft == true) {

        if (inputState.value?.length > 0) {
            if (props.searchIconFixAndroid === true) {
                _showIcon = <TouchableWithoutFeedback onPress={onClearTextPress}>
                    <TouchableOpacity onPress={onClearTextPress} containerStyle={styles.showIconLeft}>
                        <CloseIcon
                            style={{ color: props.closeIconColor }}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(20)}
                        /></TouchableOpacity>
                </TouchableWithoutFeedback>;
            } else {
                _showIcon = <TouchableWithoutFeedback onPress={onClearTextPress}>
                    <TouchableOpacityGestureHandler onPress={onClearTextPress} containerStyle={styles.showIconLeft}>
                        <CloseIcon
                            style={{ color: props.closeIconColor }}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(20)}
                        /></TouchableOpacityGestureHandler>
                </TouchableWithoutFeedback>;
            }
        } else {
            _showIcon = <TouchableWithoutFeedback>
                <View style={styles.showIconLeft}>
                    <SearchIcon
                        style={{ color: props.closeIconColor }}
                        height={Scale.moderateScale(20)}
                        width={Scale.moderateScale(20)}
                    /></View>
            </TouchableWithoutFeedback>;
        }
    }

    // if (props.isClosable) {
    //     if (inputState.value !== '') {
    //         _showIcon = <TouchableWithoutFeedback onPress={() => {
    //             if (props.onClearPress) {
    //                 props.onClearPress();
    //                 textChangeHandler('');
    //             }
    //         }} ><View style={styles.showIcon}><Close fill={"#90A4AE"} height={12} /></View></TouchableWithoutFeedback>;
    //     } else {
    //         _showIcon = null;
    //     }
    // }

    let inputErrorStyle = {};
    let labelErrorStyle = {};
    if ((!inputState.isValid && props.formSubmitted)) {
        inputErrorStyle = {
            borderColor: '#F44336',
        };
        labelErrorStyle = {
            color: '#F44336'
        }
    }

    let _renderError = null;
    if (hasErrors.required && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.ThisFieldIsRequired}</Text>
        </View>
    } else if (hasErrors.email && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.EmailIncorrect}</Text>
        </View>
    } else if (hasErrors.min && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.MustBeAtLeastCharacter(props.min)}</Text>
        </View>
    } else if (hasErrors.max && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.MaxCharacterLengthIs(props.max)}</Text>
        </View>
    } else if (hasErrors.minLength && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.MustAtLeastLength(props.minLength)}</Text>
        </View>
    } else if (hasErrors.matchPassword && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.PasswordNotMatch}</Text>
        </View>
    } else if (hasErrors.phoneNumber && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.PhoneNumberIsIncorrect}</Text>
        </View>
    } else if (hasErrors.mainNewPassword && props.formSubmitted) {
        _renderError = <View style={styles.errorContainer}>
            {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
            <Text style={styles.errorText}>{Languages.InputValidates.PasswordNotMatchSame}</Text>
        </View>
    }

    let TouchableOpacityBaseOnPlatform = null;
    if (Platform.OS === 'ios') {
        TouchableOpacityBaseOnPlatform = TouchableOpacityGestureHandler;
    } else {
        TouchableOpacityBaseOnPlatform = TouchableOpacity;
    }

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.inputContainer]}>
                    {props.showLabel == true ?
                        <View style={styles.labelContainer}>
                            <Text style={[styles.labelText, props.labelTextstyle]}>{props.lableText}</Text>
                            {props.showRequireStart ?
                                <Text style={styles.requireStartText}>*</Text>
                                :
                                null
                            }
                        </View>
                        :
                        null}

                    <TouchableOpacityBaseOnPlatform onPress={onInputPressHandler} disabled={props.type != 'datepicker'}
                        containerStyle={[
                            styles.inputWrapperTouch,
                            props.showPhonePrefix ? styles.inputContainerWithPrefix : {},
                        ]}
                        style={[styles.inputWrapperTouch, props.showPhonePrefix ? styles.inputContainerWithPrefix : {}]}>
                        {props.showPhonePrefix ?
                            <View style={styles.phonePrefixContainer}>
                                <Text style={styles.phonePrefixText}>{props.phonePrefix}</Text>
                            </View>
                            :
                            null}
                        <View style={[
                            props.showPhonePrefix ? styles.inputWrapperWithPrefix : {},
                            props.selectableMobilePrefix == true ? styles.withSelectableMobilePrefixContainer : {},
                            inputErrorStyle
                        ]}>
                            {_showIcon}
                            {props.selectableMobilePrefix ?
                                <TouchableOpacityBaseOnPlatform onPress={props.onSelectMobileCodePress} containerStyle={styles.codePrefixContainer} style={styles.codePrefixContainer}>
                                    {props.phonePrefix ?
                                        <View style={styles.codeIconWrapper}>
                                            <View style={styles.iconContainer}>
                                                <ProgressiveImage
                                                    borderRadius={Scale.moderateScale(0)}
                                                    height={Scale.moderateScale(20)}
                                                    width={Scale.moderateScale(20)}
                                                    source={PathHelper.getFlagIconImagePath(props.phonePrefixFlagUrl)}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                            </View>
                                            <Text style={styles.phoneCodeText}>+ {props.phonePrefix}</Text>
                                        </View>
                                        :
                                        <Text style={styles.phoneCodeText}>{Languages.Placeholder.Code}</Text>
                                    }

                                    <View style={styles.codeViewLine}></View>
                                </TouchableOpacityBaseOnPlatform>
                                :
                                null}
                            <TextInput
                                // {...newprops}
                                editable={props.editable}
                                style={[styles.input, props.inputStyle,
                                    inputErrorStyle,
                                props.showSearchIconLeft ? styles.inputWithLeftIcon : {},
                                I18nManager.isRTL ? styles.inputRtl : {},
                                props.selectableMobilePrefix == true ? styles.inputWithSelectableMobilePrefix : {}
                                ]}
                                keyboardType={props.keyboardType}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={inputState.value}
                                maxLength={props.maxLength}
                                placeholder={props.placeholder}
                                placeholderTextColor={props.placeholderTextColor}
                                blurOnSubmit
                                secureTextEntry={props.isPassword && !showPassword}
                                onChangeText={textChangeHandler}
                                multiline={props.multiline}
                            />
                        </View>
                    </TouchableOpacityBaseOnPlatform>

                </View>

                {_renderError}
            </View>

            {/* {props.type == 'datepicker' && showDatepicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    maximumDate={new Date()}
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                // />
            )} */}
            <DateTimePickerModal
                testID="dateTimePicker"
                maximumDate={new Date()}
                date={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                // onChange={onChange}
                isVisible={showDatepicker}
                onConfirm={onChange}
                onCancel={hideDatePicker}
            />


        </>
    );
});

MainInput.propTypes = {
    initialValue: PropTypes.string,
    initiallyValid: PropTypes.bool,
    isPassword: PropTypes.bool,
    username: PropTypes.any,
    textChangeListener: PropTypes.func,
    required: PropTypes.any,
    email: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    phoneNumber: PropTypes.any,
    countryCode: PropTypes.any,
    checkMatchPassword: PropTypes.any,
    matchPassword: PropTypes.any,
    showTogglePasswordIcon: PropTypes.any,
    isClosable: PropTypes.any,
    onClearPress: PropTypes.func,
    formSubmitted: PropTypes.bool,
    showLabel: PropTypes.bool,
    placeholder: PropTypes.string,
    showSearchIcon: PropTypes.bool,
    editable: PropTypes.bool,
    inputStyle: ViewPropTypes.style,
    lableText: PropTypes.string,
    closeIconColor: PropTypes.string,
    showSearchIconLeft: PropTypes.bool,
    showRequireStart: PropTypes.bool,
    showPhonePrefix: PropTypes.bool,
    phonePrefix: PropTypes.string,
    enableRealTimeTextChangeListener: PropTypes.bool,
    acceptEmptyInitialValue: PropTypes.bool,
    labelTextstyle: ViewPropTypes.style,
    placeholderTextColor: PropTypes.any,
    multiline: PropTypes.bool,
    selectableMobilePrefix: PropTypes.bool,
    onSelectMobileCodePress: PropTypes.func,
    phonePrefixFlagUrl: PropTypes.string,
    type: PropTypes.oneOf(['input', 'datepicker']),
    keyboardType: PropTypes.string,
    mainNewPassword: PropTypes.bool,
    searchIconFixAndroid: PropTypes.bool
};

MainInput.defaultProps = {
    initiallyValid: false,
    showLabel: true,
    showSearchIcon: false,
    editable: true,
    closeIconColor: Colors.SILVER,
    maxLength: 1000,
    showSearchIconLeft: false,
    showRequireStart: false,
    showPhonePrefix: false,
    enableRealTimeTextChangeListener: false,
    acceptEmptyInitialValue: false,
    labelTextstyle: {},
    placeholderTextColor: Colors.BOMBAY,
    multiline: false,
    selectableMobilePrefix: false,
    type: 'input',
    keyboardType: 'default',
    mainNewPassword: false,
    searchIconFixAndroid: false
};

const styles = StyleSheet.create({
    phonePrefixContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(20)
    },
    phonePrefixText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BOMBAY
    },
    container: {

    },
    inputContainer: {

    },
    inputContainerWithPrefix: {
        flexDirection: "row",
        flex: 1
    },
    input: {
        // height: Scale.verticalScale(37.9),
        backgroundColor: Colors.ALABASTER,
        // paddingVertical: Scale.moderateScale(12),
        paddingVertical: Platform.OS === 'android' ? Scale.moderateScale(10) : Scale.moderateScale(10),
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        paddingHorizontal: Scale.moderateScale(18),
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
        textAlign: "left"
    },
    inputWrapperWithPrefix: {
        flex: 1
    },
    inputRtl: {
        textAlign: "right",
    },
    errorContainer: {
        position: "absolute",
        bottom: Scale.moderateScale(-20),
    },
    errorText: {
        color: '#F44336',
        fontSize: Typography.FONT_SIZE_11,
        fontFamily: Typography.FONT_FAMILY_REGULAR
    },
    showIcon: {
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 5,
        // height: Scale.moderateScale(40),
        // width: Scale.moderateScale(41),
        right: Scale.moderateScale(15),
        alignContent: "center",
        justifyContent: "center",
    },
    showIconLeft: {
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 5,
        // height: Scale.moderateScale(40),
        // width: Scale.moderateScale(41),
        left: Scale.moderateScale(15),
        alignContent: "center",
        justifyContent: "center"
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
    inputWithLeftIcon: {
        paddingLeft: Scale.moderateScale(45)
    },
    requireStartText: {
        color: '#FE1743',
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        marginLeft: Scale.moderateScale(2)
    },
    // when selectableMobilePrefix is true
    withSelectableMobilePrefixContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.ALABASTER,
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
        textAlign: "left",
        paddingRight: Scale.moderateScale(0.5),
        paddingBottom: Scale.moderateScale(0.5)
    },
    inputWithSelectableMobilePrefix: {
        // backgroundColor: 'yellow',
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(18),
        borderWidth: Scale.moderateScale(0),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(0),
        flex: 1
    },
    codePrefixContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Scale.moderateScale(75)
    },
    phoneCodeText: {
        color: Colors.LOCHMARA,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    },
    codeViewLine: {
        width: Scale.moderateScale(1),
        height: '70%',
        position: 'absolute',
        backgroundColor: Colors.ALTO,
        right: 0,
    },
    codeIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        marginRight: Scale.moderateScale(5)
    },
    //
    inputWrapperTouch: {
        // zIndex: 100,
        // backgroundColor: 'red',
        // flex: 1
    }
})


export default MainInput;

