import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated as ReactAnimated,
    I18nManager
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import { RadioButton, ShowPrice } from 'components/UI';
import { } from 'components';
import PropTypes from 'prop-types';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import Collapsible from 'react-native-collapsible';

const FilterBrandItemProvider = (props) => {
    const _animatedRotate = useRef(new ReactAnimated.Value(isCollapsed ? 1 : 0)).current;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [seeAll, setSeeAll] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [brands, setBrands] = useState(props.data);

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


    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.header, headerStyle]} onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={styles.headerTextsContainer}>
                    <Text style={styles.headerText}>{Languages.Common.Brands}</Text>
                    {showClear == true ?
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
                    {brands?.slice(0, 4).map((brand, index) => {
                        return (
                            <View key={brand.brandId} style={styles.specItemContainer}>
                                <TouchableOpacity onPress={() => pressBrandHandler(brand)} style={styles.specItem}>
                                    <View style={styles.radioContainer}>
                                        <RadioButton onPressData={brand} onPress={pressBrandHandler} isSelected={brand.isSelected} isCheckBox={true} />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.specText}>{brand.brandTitle}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    {brands?.length > 4 && seeAll == false ?
                        <TouchableOpacity onPress={() => setSeeAll(!seeAll)} style={styles.seeAllContainer}>
                            <Text style={styles.clearText}>{Languages.Common.SeeAll}</Text>
                        </TouchableOpacity>
                        :
                        null}
                    <Collapsible collapsed={!seeAll}>
                        <View>
                            {brands?.slice(4, brands.length).map((brand, index) => {
                                return (
                                    <View key={brand.brandId} style={styles.specItemContainer}>
                                        <TouchableOpacity onPress={() => pressBrandHandler(brand)} style={styles.specItem}>
                                            <View style={styles.radioContainer}>
                                                <RadioButton onPressData={brand}
                                                    onPress={pressBrandHandler} isSelected={brand.isSelected} isCheckBox={true} />
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.specText}>{brand.brandTitle}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </Collapsible>
                </View>
            </Collapsible>
        </View>
    );
};

FilterBrandItemProvider.propTypes = {
    onBrandPressHandler: PropTypes.func,
    onPressBrandsClearHandler: PropTypes.func,
};

FilterBrandItemProvider.defaultProps = {
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
        // borderBottomColor: Colors.GALLERY,
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
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: 'left'
    },
    seeAllContainer: {
        marginTop: Scale.moderateScale(12),
    }
});

export default FilterBrandItemProvider;
