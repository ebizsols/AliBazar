import React, { useState, forwardRef, useImperativeHandle, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import {
    MainButton,
    MainInput,
    ShadowWrapper,
    TextWithRadio,
    ScreenLoader,
    DropdownPickerInput
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/icons/close-gray.svg';
import { Picker } from '@react-native-picker/picker';
import { DropDownPicker } from 'components';

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

const ChangeAreaModal = forwardRef((props, ref) => {

    const [cities, setCities] = useState([]);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            filter: null
        },
        inputValidities: {
            filter: true
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
        props.citiesSearchTextChanged(value)
    };

    const [tempScreenData, setTempScreenData] = useState({
        specs: [],
        brands: [],
        childCategory: null,
        maxPrice: 0,
        highPrice: 0,
        lowPrice: 0
    });

    useImperativeHandle(ref, () => ({

        setCities(cities) {
            setCities(cities)
        }
    }));


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
                    <Text style={styles.modalHeaderText}>{Languages.Common.DeliveryLocation}</Text>
                    <TouchableOpacity onPress={props.onRequestClose} style={styles.modalHeaderCloseIconContainer}>
                        <CloseIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerInputsContainer}>
                    <View>
                        <View style={{}}>
                            <DropdownPickerInput
                                showLabel={false}
                                // lableText={Languages.InputLabels.Province}
                                selectedValue={props.selectedCountryId}
                                // showRequireStart={true}
                                // formSubmitted={formSubmitted}
                                // placeholder={Languages.Placeholder.PleaseSelectProvince}
                                items={props.countries}
                                // required={true}
                                itemTitle={'countryTitle'}
                                itemValue={'countryId'}
                                onValueChange={(value, index) => props.selectedCountryChanged(value)}
                            />
                            {/* <Picker
                                itemStyle={styles.pickerItem}
                                mode={"dropdown"}
                                selectedValue={props.selectedCountryId}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    props.selectedCountryChanged(itemValue)
                                }}>
                                {props.countries?.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.countryTitle} value={item.countryId} />
                                    )
                                })}
                            </Picker> */}
                        </View>
                        <View style={[{marginTop: Scale.moderateScale(10)}]}>
                            <DropdownPickerInput
                                showLabel={false}
                                // lableText={Languages.InputLabels.Province}
                                selectedValue={props.selectedProvinceId}
                                // showRequireStart={true}
                                // formSubmitted={formSubmitted}
                                // placeholder={Languages.Placeholder.PleaseSelectProvince}
                                items={props.provinces}
                                // required={true}
                                itemTitle={'provinceName'}
                                itemValue={'provinceId'}
                                onValueChange={(value, index) => props.selectedProvinceChanged(value)}
                            />
                            {/* <Picker
                                itemStyle={styles.pickerItem}
                                mode={"dropdown"}
                                selectedValue={props.selectedProvinceId}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    props.selectedProvinceChanged(itemValue)
                                }}>
                                {props.provinces?.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.provinceName} value={item.provinceId} />
                                    )
                                })}
                            </Picker> */}
                        </View>
                        {/* <DropdownPickerInput
                            containerStyle={{ backgroundColor: Colors.WHITE }}
                            items={props.countries}
                            itemValue={"countryId"}
                            itemTitle={"countryTitle"}
                            onValueChange={(itemValue, itemIndex) => {
                                props.selectedCountryChanged(itemValue);
                            }}
                            selectedValue={props.selectedCountryId}
                        /> */}
                        {/* <DropDownPicker
                            items={props.countries}
                            label={'countryTitle'}
                            value={'countryId'}
                            defaultValue={props.selectedCountryId}
                            containerStyle={{ height: 45 }}
                            style={{ backgroundColor: '#fafafa' }}
                            placeholder={'PlaceHolder'}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                // backgroundColor: 'red'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => {
                                console.log(item);
                            }}
                        /> */}

                    </View>
                    <View style={styles.searchInputCotainer}>
                        <MainInput
                            showLabel={false}
                            inputStyle={styles.inputStyle}
                            placeholder={Languages.Common.SearchCities}
                            showSearchIconLeft={true}
                            id="filter"
                            maxLength={100}
                            initialValue={''}
                            editable={true}
                            onInputChange={inputChangeHandler}
                            textChangeListener={textChangeHandler}
                        />
                    </View>
                </View>
            </View>
            <ScrollView style={styles.citiesContainer} contentContainerStyle={styles.citiesContentContainer}>
                {/* <View style={styles.loaderContainer}>
                    <ScreenLoader />
                </View> */}
                {props.isLoading ?
                    <View style={styles.loaderContainer}>
                        <ScreenLoader />
                    </View>
                    :
                    cities?.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => props.selectedCityChanged(item.cityId, item.cityTitle, props.selectedCountryId)} key={item.cityId} style={styles.cityWrapper}>
                                <TextWithRadio onPress={() => props.selectedCityChanged(item.cityId, item.cityTitle, props.selectedCountryId)} isSelected={item.cityId == props.selectedCityId} title={item.cityTitle} />
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </Modal>
    );
});

ChangeAreaModal.propTypes = {
    visible: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onCloseModal: PropTypes.func,
    childCategory: PropTypes.any,
    onApplyPressHandler: PropTypes.func
};

ChangeAreaModal.defaultProps = {
    visible: false
};

const styles = StyleSheet.create({
    modalHeaderContainer: {
        backgroundColor: Colors.ALABASTER,
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(20),
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

    },
    citiesContainer: {
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
    }
});

export default ChangeAreaModal;