import React, { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated as ReactAnimated,
    I18nManager,
    Keyboard
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import { RadioButton, ShowPrice, MainInput } from 'components/UI';
import { } from 'components';
import PropTypes from 'prop-types';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import Collapsible from 'react-native-collapsible';
import LottieView from 'lottie-react-native';

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


const FilterBrandItem = (props) => {
    const _animatedRotate = useRef(new ReactAnimated.Value(isCollapsed ? 1 : 0)).current;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [seeAll, setSeeAll] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // console.log('*************************');
        // console.log('data changed');
        // console.log('*************************');
        setBrands(props.data);
    }, [props.data]);

    useEffect(() => {
        // console.log('###############################');
        // console.log('selectedBrands changed');
        // console.log('###############################');
        // setBrands(props.selectedBrands);
        // console.log('selectedBrands', props.selectedBrands);
    }, [props.selectedBrands]);

    useEffect(() => {
        ReactAnimated.timing(_animatedRotate, {
            toValue: (isCollapsed) ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isCollapsed]);

    useEffect(() => {
        if (Array.isArray(brands)) {
            const findIndex = brands.findIndex(x => x.isSelected == true);
            if (findIndex != -1) {
                if (showClear == false)
                    setShowClear(true);
            } else {
                if (showClear == true)
                    setShowClear(false);
            }
        }
    });

    let headerStyle = {};
    if (isCollapsed == false) {
        headerStyle = {
            borderBottomWidth: Scale.moderateScale(0),
        }
    }

    const rotateStyle = {
        transform: [
            {
                rotate: _animatedRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', I18nManager.isRTL ? '270deg' : '90deg'],
                }),
            }
        ]
    };

    const pressBrandHandler = (brand) => {
        props.onBrandPressHandler(brand);
    }

    const onPressBrandsClearHandler = () => {
        props.onPressBrandsClearHandler();
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            filter: null,
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
        if (props.isKeyboardVisible == false)
            return;
        if (props.onTextChange)
            props.onTextChange(value);
    };



    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.header, headerStyle]} onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={styles.headerTextsContainer}>
                    <Text style={styles.headerText}>{Languages.Common.Brands}</Text>
                    {props.selectedBrands?.length > 0 ?
                        <TouchableOpacity onPress={onPressBrandsClearHandler} style={styles.clearTextContainer}>
                            <Text style={styles.clearText}>{Languages.Common.Clear}</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
                <ReactAnimated.View style={[rotateStyle]}>
                    <ArrowIcon style={{ color: Colors.BIGSTONE }}
                        width={Scale.moderateScale(15)}
                        height={Scale.moderateScale(15)} />
                </ReactAnimated.View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.contentContainer}>
                    <View style={styles.searchInputContainer}>
                        <MainInput
                            id="filter"
                            inputStyle={styles.input}
                            showLabel={false}
                            initialValue={props.brandSearchText}
                            editable={true}
                            onClearTextHandler={props.onClearBrandTextHandler}
                            showSearchIcon={true}
                            searchIconFixAndroid={true}
                            onInputChange={inputChangeHandler}
                            textChangeListener={textChangeHandler}
                            placeholder={Languages.Placeholder.SearchBrand}
                        />
                    </View>
                    <View style={styles.brandsContainer}>
                        {brands?.map((brand, index) => {
                            const isSelect = props.selectedBrands?.findIndex(x => x == brand.brandId) != -1;

                            return (
                                <View key={brand.brandId} style={styles.specItemContainer}>
                                    <TouchableOpacity onPress={() => pressBrandHandler(brand)} style={styles.specItem}>
                                        <View style={styles.radioContainer}>
                                            <RadioButton onPressData={brand} onPress={pressBrandHandler} isSelected={isSelect} isCheckBox={true} />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.specText}>{brand.brandTitle}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                        {props.isAnyMoreBrands === true && props.isLoadingBrands == false ?
                            <TouchableOpacity onPress={props.loadMoreBrands} style={styles.seeAllContainer}>
                                <Text style={styles.clearText}>{Languages.Common.More}</Text>
                            </TouchableOpacity>
                            :
                            null}
                        {props.isLoadingBrands == true ?
                            <View style={styles.loaderContainer} >
                                <LottieView
                                    imageAssetsFolder="lottie"
                                    style={styles.lottie}
                                    autoPlay={true}
                                    loop={true}
                                    speed={1}
                                    // resizeMode='cover'
                                    source={require('./../../../assets/animations/screen-loader.json')}
                                />
                            </View>
                            :
                            null}
                    </View>
                </View>
            </Collapsible>
        </View >
    );
};

FilterBrandItem.propTypes = {
    onBrandPressHandler: PropTypes.func,
    onPressBrandsClearHandler: PropTypes.func,
};

FilterBrandItem.defaultProps = {
};

const styles = StyleSheet.create({
    container: {

    },
    header: {
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
    headerText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    contentContainer: {
        // borderBottomWidth: Scale.moderateScale(1),
        borderBottomColor: Colors.GALLERY,
        // paddingHorizontal: Scale.moderateScale(35),
        // paddingBottom: Scale.moderateScale(10)
    },
    searchInputContainer: {
        paddingHorizontal: Scale.moderateScale(25),
        paddingBottom: Scale.moderateScale(18),
    },
    brandsContainer: {
        paddingHorizontal: Scale.moderateScale(35),
        paddingBottom: Scale.moderateScale(10)
    },
    specItemContainer: {
        marginVertical: Scale.moderateScale(5)
    },
    specItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioContainer: {
        marginRight: Scale.moderateScale(15)
    },
    textContainer: {

    },
    specText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    headerTextsContainer: {
        flexDirection: "row"
    },
    clearTextContainer: {
        marginLeft: Scale.moderateScale(20),
    },
    clearText: {
        color: Colors.LOCHMARA,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    seeAllContainer: {
        marginTop: Scale.moderateScale(12),
    },
    input: {
        height: Scale.verticalScale(35),
        // backgroundColor: Colors.WHITE,
        // borderRadius: Scale.moderateScale(9)
    },
    //
    lottie: {
        width: Scale.moderateScale(30),
        height: Scale.moderateScale(30),
        justifyContent: "center",
        alignSelf: "flex-start",
    },
});

export default FilterBrandItem;