import React, { useState, forwardRef, useImperativeHandle, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, PathHelper, Scale } from 'common';
import {
    MainButton,
    MainInput,
    ShadowWrapper,
    TextWithRadio,
    ScreenLoader,
    DropdownPickerInput,
    RadioButton,
    ProgressiveImage
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/icons/close-gray.svg';
import { Picker } from '@react-native-picker/picker';
import FastImage from 'react-native-fast-image';


const SelectCountryModal = forwardRef((props, ref) => {

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            style={styles.modal}
        >
            <View style={styles.modalHeaderContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>{Languages.Common.CountryCode}</Text>
                    <TouchableOpacity onPress={props.onRequestClose} style={styles.modalHeaderCloseIconContainer}>
                        <CloseIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.citiesContainer} contentContainerStyle={styles.citiesContentContainer}>
                {props.isLoading ?
                    <View style={styles.loaderContainer}>
                        <ScreenLoader />
                    </View>
                    :
                    props.countries?.map((item, index) => {

                        const image = PathHelper.getFlagIconImagePath(item.flagUrl);

                        return (
                            <TouchableOpacity key={item.countryId} onPress={() => props.onSelectCountry(item)} style={styles.selectItemContainer}>
                                <View style={styles.radioWrapper}>
                                    <RadioButton
                                        onPress={() => props.onSelectCountry(item)}
                                        isSelected={props.selectedCountryId == item.countryId} />
                                </View>
                                <View style={styles.iconRowWrapper}>
                                    <View style={styles.iconContainer}>
                                        <ProgressiveImage
                                            borderRadius={Scale.moderateScale(0)}
                                            height={Scale.moderateScale(30)}
                                            width={Scale.moderateScale(30)}
                                            source={image}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </View>
                                    <View style={styles.iconRowTextContainer}>
                                        <Text style={styles.iconRowText}>+ {item.phoneCode}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </Modal>
    );
});

SelectCountryModal.propTypes = {
    visible: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onCloseModal: PropTypes.func,
    childCategory: PropTypes.any,
    onApplyPressHandler: PropTypes.func
};

SelectCountryModal.defaultProps = {
    visible: false
};

const styles = StyleSheet.create({
    modal: {
        // width: '100%'
    },
    modalHeaderContainer: {
        backgroundColor: Colors.ALABASTER,
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Platform.OS === 'android' ? Scale.moderateScale(20) : Scale.moderateScale(40)
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modalHeaderText: {
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16
    },
    modalHeaderCloseIconContainer: {
        zIndex: 10,
        // backgroundColor: 'red'
    },
    citiesContainer: {
        // paddingHorizontal: Scale.moderateScale(25),
        backgroundColor: Colors.WHITE,
        height: '100%'
    },
    citiesContentContainer: {
        paddingHorizontal: Scale.moderateScale(25),
    },
    cityWrapper: {

    },
    headerInputsContainer: {
        marginTop: Scale.moderateScale(15)
    },
    inputStyle: {
        backgroundColor: Colors.WHITE
    },
    searchInputCotainer: {
        marginTop: Scale.moderateScale(18)
    },
    pickerWrapper: {
        backgroundColor: Colors.WHITE,
        // paddingVertical: Scale.moderateScale(12),
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
        paddingLeft: Scale.moderateScale(10),
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        borderRadius: Scale.moderateScale(5),
        marginVertical: Scale.moderateScale(5)
    },
    pickerItem: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIFIORDORD,
    },
    loaderContainer: {
        // flex: 1,
        // height: '100%',
        marginTop: Scale.moderateScale(30),
    },
    //
    selectItemContainer: {
        flexDirection: "row",
        paddingVertical: Scale.moderateScale(15),
        // backgroundColor: 'red',
        // paddingRight: Scale.moderateScale(50)
    },
    radioWrapper: {

    },
    iconRowWrapper: {
        flex: 1,
        flexDirection: "row"
    },
    cityIconRowWrapper: {
        marginLeft: Scale.moderateScale(10)
    },
    iconContainer: {
        marginHorizontal: Scale.moderateScale(10)
    },
    iconRowTextContainer: {
        justifyContent: "center"
    },
    iconRowText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
});

export default SelectCountryModal;