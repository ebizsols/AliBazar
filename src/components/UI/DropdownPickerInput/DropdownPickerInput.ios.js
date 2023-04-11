import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    TouchableOpacity,
    Appearance,
    TouchableHighlight
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import { isIphoneX } from "./utils";
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import Modal from './Modal';
import ArrowIcon from 'assets/icons/drop-down-arrow.svg';

export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = Typography.FONT_SIZE_18;
export const HIGHLIGHT_COLOR_DARK = "#444444";
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
export const TITLE_FONT_SIZE = Typography.FONT_SIZE_18;
export const TITLE_COLOR = "#8f8f8f";

export const DropdownPickerInput = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tempSelectedItem, setTempSelectedItem] = useState({
        itemValue: null,
        itemIndex: null
    });

    let inputErrorStyle = {};
    if (((props.selectedValue == null || props.selectedValue == undefined) && props.formSubmitted && props.required)) {
        inputErrorStyle = {
            borderColor: '#F44336',
        };
    }

    const handleCancel = () => {
        // this.didPressConfirm = false;
        // this.props.onCancel();
        setTempSelectedItem({
            itemIndex: null,
            itemValue: props.selectedValue
        });
        setIsVisible(false);
    };

    const handleConfirm = () => {
        // this.didPressConfirm = true;
        // this.props.onConfirm(this.state.currentDate);
        if (tempSelectedItem.itemValue == props.selectedValue) {
            setIsVisible(false);
            return;
        }
        props.onValueChange(tempSelectedItem.itemValue, tempSelectedItem.itemIndex);
        setIsVisible(false);
    };

    const handleHide = () => {
        // const { onHide } = this.props;
        // if (onHide) {
        //     onHide(this.didPressConfirm, this.state.currentDate);
        // }
        // this.setState({ isPickerVisible: false });
        setIsVisible(false);
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        const dropItems = props.items || [];

        if (props.placeholder && dropItems?.findIndex(x => x[props.itemValue] == null) == -1) {
            const placeHolderItem = {};
            placeHolderItem[props.itemTitle] = props.placeholder;
            placeHolderItem[props.itemValue] = null;
            dropItems.unshift(placeHolderItem);
        }
        setItems(dropItems);
    }, [props.items]);

    useEffect(() => {
        setTempSelectedItem({
            itemIndex: null,
            itemValue: props.selectedValue
        });
    }, [props.selectedValue]);

    let _renderError = null;
    if ((props.selectedValue == null || props.selectedValue == undefined) && props.formSubmitted && props.required) {
        _renderError = <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{Languages.InputValidates.ThisFieldIsRequired}</Text>
        </View>
    }

    const isAppearanceModuleAvailable = !!(
        Appearance && Appearance.getColorScheme
    );
    const _isDarkModeEnabled =
        props.isDarkModeEnabled === undefined && isAppearanceModuleAvailable
            ? Appearance.getColorScheme() === "dark"
            : props.isDarkModeEnabled || false;

    const ConfirmButtonComponent = props.customConfirmButtonIOS || ConfirmButton;
    const CancelButtonComponent = props.customCancelButtonIOS || CancelButton;
    const HeaderComponent = props.customHeaderIOS || Header;

    const themedContainerStyle = _isDarkModeEnabled
        ? pickerStyles.containerDark
        : pickerStyles.containerLight;

    const selectedItem = items.find(x => x[props.itemValue] === props.selectedValue)

    return (
        <>
            <View>
                {props.showLabel == true ?
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>{props.lableText}</Text>
                        {props.showRequireStart ?
                            <Text style={styles.requireStartText}>*</Text>
                            :
                            null
                        }
                    </View>
                    :
                    null}
                <View style={[styles.pickerWrapper, props.containerStyle, inputErrorStyle]}>
                    {/* <Picker
                        itemStyle={styles.pickerItem}
                        mode={"dropdown"}
                        selectedValue={props.selectedValue}
                        style={{ height: 50, width: '100%' }}
                        enabled={props.enabled}
                        onValueChange={(itemValue, itemIndex) => {
                            props.onValueChange(itemValue, itemIndex)
                        }}>
                        {items.map((item, index) => {
                            return (
                                <Picker.Item key={item[props.itemValue]} label={item[props.itemTitle]} value={item[props.itemValue]} />
                            )
                        })}
                    </Picker> */}
                    <TouchableOpacity disabled={!props.enabled} onPress={() => setIsVisible(true)}
                        style={{
                            height: Scale.moderateScale(42),
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                        <Text style={{ textAlign: 'left' }}>{selectedItem ? selectedItem[props.itemTitle] : props.placeholder ? props.placeholder : ''}</Text>
                        <View>
                            <ArrowIcon
                                // style={{color: 'red'}}
                                width={Scale.moderateScale(10)}
                                height={Scale.moderateScale(10)}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {_renderError}
            </View>

            <Modal
                isVisible={isVisible}
                contentStyle={[pickerStyles.modal, props.modalStyleIOS]}
                onBackdropPress={handleCancel}
                onHide={handleHide}>
                {/* <View style={[styles.pickerWrapper, props.containerStyle, inputErrorStyle]}>
                    <Picker
                        // itemStyle={styles.pickerItem}
                        mode={"dropdown"}
                        selectedValue={props.selectedValue}
                        style={{ width: '100%' }}
                        enabled={props.enabled}
                        onValueChange={(itemValue, itemIndex) => {
                            props.onValueChange(itemValue, itemIndex)
                        }}>
                        {items.map((item, index) => {
                            return (
                                <Picker.Item key={item[props.itemValue]} label={item[props.itemTitle]} value={item[props.itemValue]} />
                            )
                        })}
                    </Picker>
                </View> */}
                <View
                    style={[
                        pickerStyles.container,
                        themedContainerStyle,
                        props.pickerContainerStyleIOS,
                    ]}
                >
                    <HeaderComponent label={props.headerTextIOS || Languages.Common.PleaseSelect} />
                    <Picker
                        // itemStyle={styles.pickerItem}
                        mode={"dropdown"}
                        selectedValue={tempSelectedItem.itemValue}
                        style={{ width: '100%' }}
                        enabled={props.enabled}
                        onValueChange={(itemValue, itemIndex) => {
                            // props.onValueChange(itemValue, itemIndex);
                            setTempSelectedItem({
                                itemIndex: itemIndex,
                                itemValue: itemValue
                            });
                        }}>
                        {items.map((item, index) => {
                            return (
                                <Picker.Item key={item[props.itemValue]} label={item[props.itemTitle]} value={item[props.itemValue]} />
                            )
                        })}
                    </Picker>

                    <View style={{ flexDirection: "row", width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <CancelButtonComponent
                                isDarkModeEnabled={_isDarkModeEnabled}
                                onPress={handleCancel}
                                label={props.cancelTextIOS || Languages.Common.Cancel}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <ConfirmButtonComponent
                                isDarkModeEnabled={_isDarkModeEnabled}
                                onPress={handleConfirm}
                                label={props.confirmTextIOS || Languages.Common.Confirm}
                            />
                        </View>
                    </View>
                    
                </View>
            </Modal>
        </>
    );
};

DropdownPickerInput.propTypes = {
    containerStyle: ViewPropTypes.style,
    items: PropTypes.array,
    selectedValue: PropTypes.any,
    itemTitle: PropTypes.string,
    itemValue: PropTypes.string,
    onValueChange: PropTypes.func,
    lableText: PropTypes.string,
    showLabel: PropTypes.bool,
    showRequireStart: PropTypes.bool,
    formSubmitted: PropTypes.bool,
    placeholder: PropTypes.string,
    enabled: PropTypes.bool,
    required: PropTypes.bool
};

DropdownPickerInput.defaultProps = {
    containerStyle: {},
    showLabel: false,
    showRequireStart: false,
    enabled: true,
    required: true,
    cancelTextIOS: null,
    confirmTextIOS: null,
    headerTextIOS: null,
    modalPropsIOS: {},
    isDarkModeEnabled: undefined,
    isVisible: false,
    pickerContainerStyleIOS: {},
};

const styles = StyleSheet.create({
    pickerWrapper: {
        // backgroundColor: Colors.WHITE,
        backgroundColor: Colors.ALABASTER,
        // paddingVertical: Scale.moderateScale(12),
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        paddingHorizontal: Scale.moderateScale(10),
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
    },
    pickerItem: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIFIORDORD,
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
    requireStartText: {
        color: '#FE1743',
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        marginLeft: Scale.moderateScale(2)
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
});

const pickerStyles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: Scale.moderateScale(8),
        marginBottom: 0,
    },
    container: {
        borderRadius: BORDER_RADIUS,
        // marginBottom: 8,
        marginBottom: 0,
        overflow: "hidden",
    },
    containerLight: {
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    containerDark: {
        backgroundColor: BACKGROUND_COLOR_DARK,
    },
});

export const Header = ({ label, style = headerStyles }) => {
    return (
        <View style={style.root}>
            <Text style={style.text}>{label}</Text>
        </View>
    );
};

export const headerStyles = StyleSheet.create({
    root: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: Scale.moderateScale(12),
        backgroundColor: "transparent",
    },
    text: {
        textAlign: "center",
        color: TITLE_COLOR,
        fontSize: TITLE_FONT_SIZE,
    },
});

export const ConfirmButton = ({
    isDarkModeEnabled,
    onPress,
    label,
    style = confirmButtonStyles,
}) => {
    const underlayColor = isDarkModeEnabled
        ? HIGHLIGHT_COLOR_DARK
        : HIGHLIGHT_COLOR_LIGHT;
    return (
        <TouchableHighlight
            style={style.button}
            underlayColor={underlayColor}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text style={style.text}>{label}</Text>
        </TouchableHighlight>
    );
};

export const confirmButtonStyles = StyleSheet.create({
    button: {
        borderColor: BORDER_COLOR,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "transparent",
        height: Scale.moderateScale(50),
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: BUTTON_FONT_WEIGHT,
        backgroundColor: "transparent",
    },
});

export const CancelButton = ({
    isDarkModeEnabled,
    onPress,
    label,
    style = cancelButtonStyles,
}) => {
    const themedButtonStyle = isDarkModeEnabled
        ? cancelButtonStyles.buttonDark
        : cancelButtonStyles.buttonLight;
    const underlayColor = isDarkModeEnabled
        ? HIGHLIGHT_COLOR_DARK
        : HIGHLIGHT_COLOR_LIGHT;
    return (
        <TouchableHighlight
            style={[style.button, themedButtonStyle]}
            underlayColor={underlayColor}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text style={style.text}>{label}</Text>
        </TouchableHighlight>
    );
};

export const cancelButtonStyles = StyleSheet.create({
    button: {
        // borderRadius: BORDER_RADIUS,
        height: Scale.moderateScale(50),
        marginBottom: isIphoneX() ? 20 : 0,
        justifyContent: "center",
        borderColor: BORDER_COLOR,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    buttonLight: {
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    buttonDark: {
        backgroundColor: BACKGROUND_COLOR_DARK,
    },
    text: {
        // padding: 10,
        textAlign: "center",
        color: Colors.BOMBAY,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: "600",
        backgroundColor: "transparent",
    },
});