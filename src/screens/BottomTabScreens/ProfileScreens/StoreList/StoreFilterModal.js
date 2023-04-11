import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity,
    I18nManager
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import {
    FilterSpecificationItem,
    FilterCategoryItem,
    FilterPriceItem,
    FilterBrandItem,
    MainButton,
    ShadowWrapper,
    DropdownPickerInput
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/icons/close-gray.svg';

const StoreFilterModal = forwardRef((props, ref) => {

    const [tempScreenData, setTempScreenData] = useState({
        categories: [],
        countries: [],
        provinces: [],
        cities: []
    });

    const [selectedData, setSelectedData] = useState({
        countryId: null,
        provinceId: null,
        cityId: null,
        categoryId: null
    });

    useImperativeHandle(ref, () => ({

        setSelectedData(categoryId, countryId, cityId, provinceId) {
            setSelectedData({
                categoryId: categoryId,
                countryId: countryId,
                provinceId: provinceId,
                cityId: cityId,
            });
        }

    }));

    const onApplyPressHandler = () => {
        props.onApplyPressHandler(selectedData);
    }

    const onClearAllPressHandler = () => {
        const tempSelectedData = { ...selectedData };
        tempSelectedData.categoryId = null;
        tempSelectedData.cityId = null;
        tempSelectedData.countryId = null;
        tempSelectedData.provinceId = null;

        setSelectedData(tempSelectedData);
        props.onApplyPressHandler(tempSelectedData);
    }

    const categorySelectHandler = (value, index) => {
        setSelectedData((prev) => ({
            ...prev,
            categoryId: value
        }));
    }

    const onCountryChangeHandler = (value, index) => {
        setSelectedData((prev) => ({
            ...prev,
            cityId: null,
            countryId: value
        }));

        props.countryChanged(value);
    }

    const onProvinceChangeHandler = (value, index) => {
        setSelectedData((prev) => ({
            ...prev,
            provinceId: value,
            cityId: null
        }));

        props.provinceChanged(value);
    }

    const onCityChangeHanlder = (value, index) => {
        setSelectedData((prev) => ({
            ...prev,
            cityId: value
        }));
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            style={styles.modal}>
            <View style={styles.modalHeaderContainer}>
                <View style={styles.modalHeader}>
                    <View style={styles.filtersTextContainer}>
                        <Text style={styles.filtersText}>{Languages.Common.Filters}</Text>
                    </View>
                    <View style={styles.closeIconContainer}>
                        <TouchableOpacity style={styles.closeIconWrapper} onPress={() => props.onRequestClose()}>
                            <CloseIcon
                                width={Scale.moderateScale(30)}
                                height={Scale.moderateScale(30)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.container}>
                <View>

                    <View style={styles.inputContainer}>
                        <DropdownPickerInput
                            lableText={Languages.InputLabels.Category}
                            showLabel={true}
                            placeholder={Languages.Placeholder.All}
                            items={props.categories}
                            selectedValue={selectedData.categoryId}
                            itemValue={"categoryId"}
                            itemTitle={"categoryTitle"}
                            onValueChange={categorySelectHandler}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <DropdownPickerInput
                            showLabel={true}
                            lableText={Languages.Profile.Country}
                            selectedValue={selectedData.countryId}
                            enabled={true}
                            placeholder={Languages.Placeholder.All}
                            items={props.countries}
                            itemTitle={'countryTitle'}
                            itemValue={'countryId'}
                            onValueChange={onCountryChangeHandler}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <DropdownPickerInput
                            showLabel={true}
                            lableText={Languages.InputLabels.Province}
                            selectedValue={selectedData.provinceId}
                            enabled={true}
                            placeholder={Languages.Placeholder.All}
                            items={props.provinces}
                            itemTitle={'provinceName'}
                            itemValue={'provinceId'}
                            onValueChange={onProvinceChangeHandler}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <DropdownPickerInput
                            showLabel={true}
                            lableText={Languages.Address.City}
                            selectedValue={selectedData.cityId}
                            placeholder={Languages.Placeholder.All}
                            items={props.cities}
                            itemTitle={'cityTitle'}
                            itemValue={'cityId'}
                            onValueChange={onCityChangeHanlder}
                        />
                    </View>

                </View>
            </ScrollView>
            <View style={styles.bottomStickyContainer}>
                <View style={styles.clearAllContainer}>
                    <MainButton
                        onPress={onClearAllPressHandler}
                        buttonStyle={styles.clearBtn}
                        textStyle={styles.clearText}>{Languages.Common.Reset}</MainButton>
                </View>
                <View style={styles.applySection}>
                    <MainButton onPress={onApplyPressHandler}>{Languages.Common.Apply}</MainButton>
                </View>
            </View>

        </Modal>
    );
});

StoreFilterModal.propTypes = {
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onCloseModal: PropTypes.func,
    childCategory: PropTypes.any,
    onApplyPressHandler: PropTypes.func
};

StoreFilterModal.defaultProps = {
    visible: false
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Colors.WHITE,
    },
    container: {
        backgroundColor: Colors.WHITE,
        height: '100%',
        paddingBottom: Scale.moderateScale(30)
    },
    modalHeaderContainer: {
        // overflow: 'hidden',
        // paddingBottom: 10,
        // backgroundColor: 'red',
        borderBottomWidth: Scale.moderateScale(1),
        borderBottomColor: Colors.GALLERY,
        marginBottom: Scale.moderateScale(15),
        paddingTop: Platform.OS === 'android' ? Scale.moderateScale(0) : Scale.moderateScale(20)
    },
    modalHeader: {
        // backgroundColor: 'blue',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(16),
        paddingVertical: Scale.moderateScale(16),
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 5,
    },
    filtersTextContainer: {

    },
    filtersText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    closeIconContainer: {

    },
    closeIconWrapper: {
        // flex: 1, 
        flexDirection: "column",
        // flex: 1,
        // backgroundColor: 'red'
    },
    bottomStickyContainer: {
        flexDirection: "row",
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(9),
        borderTopWidth: Scale.moderateScale(1),
        borderTopColor: Colors.GALLERY,
    },
    clearAllContainer: {
        flex: 1,
        paddingRight: Scale.moderateScale(4)
    },
    applySection: {
        flex: 2,
        paddingLeft: Scale.moderateScale(4)
    },
    clearBtn: {
        backgroundColor: Colors.WHITE
    },
    clearText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.LOCHMARA
    },
    itemWrapper: {
        paddingVertical: Scale.moderateScale(7)
    },
    //
    inputContainer: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(10)
    }
});

export default StoreFilterModal;