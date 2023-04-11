import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

export const DropdownPickerInput = (props) => {

    let inputErrorStyle = {};
    if (((props.selectedValue == null || props.selectedValue == undefined) && props.formSubmitted && props.required)) {
        inputErrorStyle = {
            borderColor: '#F44336',
        };
    }

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

    let _renderError = null;
    if ((props.selectedValue == null || props.selectedValue == undefined) && props.formSubmitted && props.required) {
        _renderError = <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{Languages.InputValidates.ThisFieldIsRequired}</Text>
        </View>
    }

    return (
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
                <Picker
                    itemStyle={styles.pickerItem}
                    mode={"dropdown"}
                    selectedValue={props.selectedValue}
                    style={[styles.pickerStyle, { height: Scale.moderateScale(42), width: '100%' }]}
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
            </View>
            {_renderError}
        </View>

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
    required: true
};

const styles = StyleSheet.create({
    pickerWrapper: {
        // backgroundColor: Colors.WHITE,
        backgroundColor: Colors.ALABASTER,
        // paddingVertical: Scale.moderateScale(12),
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        paddingLeft: Scale.moderateScale(10),
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
    },
    pickerStyle: {
        alignItems: 'flex-start'
    },
    pickerItem: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIFIORDORD,
        alignItems: 'flex-start'
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