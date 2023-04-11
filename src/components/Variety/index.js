/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes,
    I18nManager,
    ScrollView
} from 'react-native';
import { Languages, Scale } from 'common';
import { Colors, Typography } from 'styles';
import PropTypes from 'prop-types';
import VarietyItem from './VarietyItem';

const Variety = (props) => {
    let varietyTitleContainerStyle = {}
    if (props.index == 0) {
        varietyTitleContainerStyle = {
            marginBottom: Scale.moderateScale(10)
        }
    } else if (props.index > 0) {
        varietyTitleContainerStyle = {
            marginVertical: Scale.moderateScale(10)
        }
    }

    const varitySort = (arr) => {
        arr.sort((a, b) => {
            return a - b;
        });
        return arr;
    };

    const selectedArrayWithoutMe = [];
    for (let key in props.selectedVariety) {
        if (key !== props.data.varieties[0].parameterTitle)
            selectedArrayWithoutMe.push(props.selectedVariety[key]);
    }

    const isAvailable = (id) => {
        const newArray = varitySort([
            ...selectedArrayWithoutMe,
            id,
        ]).toString();

        if (props.varietyExistencePossibility == undefined)
            return;
        if (props.varietyExistencePossibility[newArray] === 0) return true;
        if (props.varietyExistencePossibility[newArray]) return true;
        return false;
    };

    const varietySelectHandler = (item) => {
        const newSelectedObj = {
            ...props.selectedVariety,
            [props.data.varieties[0].parameterTitle]: item.fkVariationParameterValueId
        };

        const newArray = varitySort([
            ...selectedArrayWithoutMe,
            item.fkVariationParameterValueId,
        ]).toString();
        if (props.varietyExistencePossibility[newArray] != undefined &&
            props.varietyExistencePossibility[newArray] != null) {
            // So this variety exist
            props.handleVariSelect(
                newSelectedObj,
                props.varietyExistencePossibility[newArray]
            );
        } else {
            // Variety not exist, find match variety with this selected item
            const type = props.data.varieties[0].parameterTitle;
            let findedMatchVariety = null;

            for (let index = 0; index < props.varietyExistencePossibilityWithType.length; index++) {
                const element = props.varietyExistencePossibilityWithType[index];
                if (element[type] == item.fkVariationParameterValueId) {
                    findedMatchVariety = element;
                    break;
                }
            }

            if (findedMatchVariety != null) {
                const values = Object.values(findedMatchVariety);
                const sortedValues = varitySort(values);
                const joinedValues = sortedValues.join(',');
                props.handleVariSelect(
                    findedMatchVariety,
                    props.varietyExistencePossibility[joinedValues]
                );
            }
        }

    };

    return (
        <View style={styles.container}>
            <View style={[styles.varietyTitleContainer, varietyTitleContainerStyle]}>
                <Text style={styles.varietyTitleText}>{props.data.varietyTitle}</Text>
                <Text style={styles.selectedVarietyText}>
                    {I18nManager.isRTL ? '\u00a0\u00a0\u00a0\u00a0' : '\u00a0\u00a0\u00a0\u00a0'}
                    {props.selectedVarietyItem?.valueTitle}
                    {/* {I18nManager.isRTL ? '\u00a0\u00a0\u00a0\u00a0' : null} */}
                </Text>
            </View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.varietiesContainer}>
                {
                    props.data.varieties.map((item, index) => {
                        const isAva = isAvailable(item.fkVariationParameterValueId);

                        const isSelected = props.selectedVariety[item.parameterTitle] == item.fkVariationParameterValueId;

                        return (
                            <View key={item.varietyId} style={styles.itemVarietyWrapper}>
                                <VarietyItem
                                    onVarietyItemPress={varietySelectHandler}
                                    selectedVariety={props.selectedVariety}
                                    data={item}
                                    isSelected={isSelected}
                                    canBeSelected={!isAva}
                                    isImage={item.valuesHaveImage && item.imageUrl != null} />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

Variety.propTypes = {
    selectedVariety: PropTypes.any,
    onVarietyItemPress: PropTypes.func,
    varietyExistencePossibility: PropTypes.any,
    selectedVarietyItem: PropTypes.any,
    varietyExistencePossibilityWithType: PropTypes.any
};

Variety.defaultProps = {

};

const styles = StyleSheet.create({
    varietyTitleText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BOMBAY,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    varietiesContainer: {
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    itemVarietyWrapper: {
        marginLeft: Scale.moderateScale(10),
        marginRight: Scale.moderateScale(5),
        marginBottom: Scale.moderateScale(10)
    },
    selectedVarietyText: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    varietyTitleContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: Scale.moderateScale(15)
        // marginVertical: Scale.moderateScale(10)
    }
});


export default Variety;