import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity,
    I18nManager,
    Switch,
    Platform
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import {
    FilterSpecificationItem,
    FilterCategoryItem,
    FilterPriceItem,
    FilterBrandItem,
    FilterBrandItemProvider,
    MainButton,
    ShadowWrapper
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/icons/close-gray.svg';

const FilterModal = forwardRef((props, ref) => {

    const [tempScreenData, setTempScreenData] = useState({
        specs: [],
        brands: [],
        childCategory: null,
        maxPrice: 0,
        highPrice: 0,
        lowPrice: 0,
        justExist: null
    });

    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useImperativeHandle(ref, () => ({

        setData(specs, brands, childCategory, maxPrice, highPrice, lowPrice, justExist) {
            setTempScreenData({
                brands: brands,
                specs: specs,
                childCategory: childCategory,
                maxPrice: maxPrice,
                highPrice: highPrice,
                lowPrice: lowPrice,
                justExist: justExist
            });
        },
        setBrands(brands) {
            setBrands(brands);
        },
        setSelectedBrands(brands) {
            setSelectedBrands(brands);
        }
    }));

    useEffect(() => {
        setBrands(props.brands);
    }, [props.brands]);

    useEffect(() => {
        // console.log('selected brands useeffect');
        // setSelectedBrands(props.selectedBrandIds)
    }, [props.selectedBrandIds]);

    const toggleSwitch = () => {
        setTempScreenData((prev) => ({
            ...prev,
            justExist: !tempScreenData.justExist
        }));
    }

    const onBrandPressHandler = (brand) => {
        const findBrandIndex = brands.findIndex(x => x.brandId == brand.brandId);
        if (findBrandIndex != -1) {
            // const tempBrands = [...brands];
            // tempBrands[findBrandIndex].isSelected = !!!tempBrands[findBrandIndex].isSelected;
            // setBrands(tempBrands);
            const isThisBrandSelected = selectedBrands.findIndex(x => x == brand.brandId) != -1;
            if (!isThisBrandSelected) {
                const tempSelectedBrands = [...selectedBrands];
                tempSelectedBrands.push(brand.brandId)
                setSelectedBrands(tempSelectedBrands);
            } else {
                const tempSelectedBrands = [...selectedBrands];
                const findUnselectBrandIndex = tempSelectedBrands.findIndex(x => x == brand.brandId);
                if (findUnselectBrandIndex != -1) {
                    tempSelectedBrands.splice(findUnselectBrandIndex, 1);
                    setSelectedBrands(tempSelectedBrands);
                }
            }
        }
    }

    const onPressBrandsClearHandler = () => {
        const temdata = [...brands];
        for (let index = 0; index < temdata.length; index++) {
            if (temdata[index].isSelected == true) {
                temdata[index].isSelected = false;
            }
        }
        setBrands(temdata);
        setSelectedBrands([])
    }

    const onSpecPressHandler = (spec, option) => {
        const findSpecIndex = tempScreenData?.specs?.findIndex(x => x.specId == spec.specId);
        if (findSpecIndex != -1) {
            const findOptionsIndex = tempScreenData?.specs[findSpecIndex].options.findIndex(x => x.optionId == option.optionId);
            if (findOptionsIndex != -1) {
                const temdata = { ...tempScreenData };
                if (spec.isMultiSelectInFilter == false) {
                    for (let index = 0; index < temdata.specs[findSpecIndex].options.length; index++) {
                        // const element = temdata.specs[findSpecIndex].options[index];
                        if (temdata.specs[findSpecIndex].options[index].optionId != option.optionId &&
                            temdata.specs[findSpecIndex].options[index].isSelected == true) {
                            temdata.specs[findSpecIndex].options[index].isSelected = false;
                        }
                    }
                }
                temdata.specs[findSpecIndex].options[findOptionsIndex].isSelected = !!!temdata.specs[findSpecIndex].options[findOptionsIndex].isSelected;
                setTempScreenData(temdata);
            }
        }
    }

    const onPressSpecsClearHandler = (specification) => {

        const temdata = { ...tempScreenData };
        const findSpecIndex = tempScreenData?.specs?.findIndex(x => x.specId == specification.specId);
        for (let index = 0; index < temdata.specs[findSpecIndex].options.length; index++) {
            if (temdata.specs[findSpecIndex].options[index].isSelected == true) {
                temdata.specs[findSpecIndex].options[index].isSelected = false;
            }
        }
        setTempScreenData(temdata);
    }

    const onCloseHnadler = () => {
        props.onCloseModal();
    }

    const onPriceChangeHandler = (low, high) => {
        setTempScreenData((prev) => ({
            ...prev,
            highPrice: high,
            lowPrice: low
        }))
    }

    const onApplyPressHandler = () => {
        props.onApplyPressHandler(tempScreenData, selectedBrands);
    }

    const onClearAllPressHandler = () => {
        const temdata = { ...tempScreenData };

        const notNullBrands = brands || [];
        const tempBrands = [...notNullBrands];
        for (let index = 0; index < tempBrands.length; index++) {
            if (tempBrands[index].isSelected == true) {
                tempBrands[index].isSelected = false;
            }
        }

        for (let index = 0; index < temdata.brands?.length; index++) {
            if (temdata.brands[index].isSelected == true) {
                temdata.brands[index].isSelected = false;
            }
        }

        for (let index = 0; index < temdata?.specs?.length; index++) {
            for (let index2 = 0; index2 < temdata.specs[index].options.length; index2++) {
                if (temdata.specs[index].options[index2].isSelected == true) {
                    temdata.specs[index].options[index2].isSelected = false;
                }
            }
        }

        temdata.lowPrice = 0;
        temdata.highPrice = temdata.maxPrice;

        setTempScreenData(temdata);
        setBrands(tempBrands);
        setSelectedBrands([]);
        props.onApplyPressHandler(temdata, []);
    }

    const onBrandSearchTextChange = (value) => {
        props.onBrandSearchTextChange(value, selectedBrands);
    }

    const onClearBrandTextHandler = () => {
        props.onBrandSearchTextChange(null, selectedBrands);
    }

    const onPressProviderBrandsClearHandler = () => {
        const temdata = { ...tempScreenData };
        for (let index = 0; index < temdata.brands.length; index++) {
            if (temdata.brands[index].isSelected == true) {
                temdata.brands[index].isSelected = false;
            }
        }
        setTempScreenData(temdata);
        setSelectedBrands([]);
    }

    const onBrandProviderPressHandler = (brand) => {
        const findBrandIndex = tempScreenData.brands.findIndex(x => x.brandId == brand.brandId);
        if (findBrandIndex != -1) {
            const temdata = { ...tempScreenData };
            temdata.brands[findBrandIndex].isSelected = !!!temdata.brands[findBrandIndex].isSelected;
            setTempScreenData(temdata);
        }
    }


    return (
        <Modal
            onLayout={() => console.log('on layoutttttttttttttttt')}
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            style={styles.modal}
        >
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
                    {tempScreenData.childCategory ?
                        <View style={styles.itemWrapper}>
                            <FilterCategoryItem
                                isProviderScreen={props.isProviderScreen}
                                titleCategory={tempScreenData.childCategory?.categoryTitle}
                                onCategoryPress={props.onCategoryPress}
                                childCategory={props.isProviderScreen === true ? tempScreenData.childCategory : tempScreenData.childCategory?.child}
                            />
                        </View>
                        :
                        null}
                    {tempScreenData.specs?.map((spec, index) => {
                        return (
                            <View style={styles.itemWrapper} key={spec.specId}>
                                {/* <View  style={styles.specificationWrapper}> */}
                                <FilterSpecificationItem
                                    onPressSpecsClearHandler={onPressSpecsClearHandler}
                                    onSpecPressHandler={onSpecPressHandler}
                                    specification={spec} />
                                {/* </View> */}
                            </View>
                        )
                    })}
                    {/* {props.brands?.length > 0 ? */}
                    {props.isProviderScreen == false ?
                        <View style={styles.itemWrapper}>
                            <FilterBrandItem
                                onClearBrandTextHandler={onClearBrandTextHandler}
                                isKeyboardVisible={props.isKeyboardVisible}
                                loadMoreBrands={props.loadMoreBrandsHandler}
                                isAnyMoreBrands={props.isAnyMoreBrands}
                                isLoadingBrands={props.isLoadingBrands}
                                onPressBrandsClearHandler={onPressBrandsClearHandler}
                                brandSearchText={props.brandSearchText}
                                onBrandPressHandler={onBrandPressHandler}
                                selectedBrands={selectedBrands}
                                onTextChange={onBrandSearchTextChange}
                                data={brands} />
                        </View>
                        :
                        tempScreenData.brands ?
                            <View style={styles.itemWrapper}>
                                <FilterBrandItemProvider
                                    onPressBrandsClearHandler={onPressProviderBrandsClearHandler}
                                    onBrandPressHandler={onBrandProviderPressHandler}
                                    data={tempScreenData.brands} />
                            </View>
                            :
                            null
                    }

                    {/* :
                        null} */}

                    <View style={styles.itemWrapper}>
                        <View style={styles.justExistItem}>
                            <View style={styles.justExistItemTextContainer}>
                                <Text style={styles.justExistItemText}>{Languages.GoodsDetail.JustExist}</Text>
                            </View>
                            <View style={styles.switchContainer}>
                                <Switch
                                    trackColor={{ false: Colors.BOMBAY, true: Colors.LOCHMARA }}
                                    thumbColor={tempScreenData.justExist ? Colors.WHITE : Colors.WHITE}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={tempScreenData.justExist}
                                />
                            </View>
                        </View>
                    </View>

                    {tempScreenData.maxPrice > 0 && (
                        <View style={styles.itemWrapper}>
                            <FilterPriceItem
                                currency={props.currency}
                                onPriceChanged={onPriceChangeHandler}
                                lowPrice={tempScreenData.lowPrice}
                                highPrice={tempScreenData.highPrice}
                                maxPrice={tempScreenData.maxPrice} />
                        </View>
                    )}

                </View>
            </ScrollView>
            <View style={styles.bottomStickyContainer}>
                
                <View style={styles.clearAllContainer}>
                    <MainButton
                        onPress={onClearAllPressHandler}
                        buttonStyle={styles.clearBtn}
                        textStyle={styles.clearText}>{Languages.Common.ClearAll}</MainButton>
                </View>
                <View style={styles.applySection}>
                    <MainButton onPress={onApplyPressHandler}>{Languages.Common.Apply}</MainButton>
                </View>
            </View>

        </Modal>
    );
});

FilterModal.propTypes = {
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onCloseModal: PropTypes.func,
    childCategory: PropTypes.any,
    onApplyPressHandler: PropTypes.func,
    isProviderScreen: PropTypes.bool
};

FilterModal.defaultProps = {
    visible: false,
    isProviderScreen: false
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
    specificationWrapper: {
        marginBottom: Scale.moderateScale(15)
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
        // paddingVertical: Scale.moderateScale(0),
        borderBottomWidth: Scale.moderateScale(0.6),
        borderBottomColor: Colors.MERCURY
    },
    //
    justExistItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: Scale.moderateScale(25),
        paddingVertical: Scale.moderateScale(18),
        alignItems: "center",

        // borderTopWidth: Scale.moderateScale(1),
        // borderBottomWidth: Scale.moderateScale(1),
        borderBottomColor: Colors.GALLERY,
        borderTopColor: Colors.GALLERY
    },
    justExistItemTextContainer: {

    },
    justExistItemText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    switchContainer: {

    }
});

export default FilterModal;