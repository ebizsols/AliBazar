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
import { Scale, Languages, Tools } from 'common';
import { RadioButton, ShowPrice } from 'components/UI';
import { } from 'components';
import PropTypes from 'prop-types';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import Collapsible from 'react-native-collapsible';
import RangeSlider from 'rn-range-slider';

// Used in goods detail
const FilterPriceItem = (props) => {
    const _animatedRotate = useRef(new ReactAnimated.Value(isCollapsed ? 1 : 0)).current;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [priceRange, setPriceRange] = useState({
        low: props.lowPrice,
        high: props.highPrice,
        maxPrice: props.maxPrice
    });

    useEffect(() => {
        ReactAnimated.timing(_animatedRotate, {
            toValue: (isCollapsed) ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isCollapsed]);

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

    const priceChangeHandler = (low, high, fromUser) => {
        setPriceRange({
            low: low,
            high: high
        })
    }

    let step = 50;
    if (props.maxPrice <= 500) {
        step = 5;
    } else if (props.maxPrice <= 1000) {
        step = 20;
    } else if (props.maxPrice <= 5000) {
        step = 50;
    } else if (props.maxPrice <= 10000) {
        step = 50;
    } else if (props.maxPrice <= 100000) {
        step = 100;
    }

    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.header, headerStyle]} onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={styles.headerTextsContainer}>
                    <Text style={styles.headerText}>{Languages.Common.Price}</Text>
                    <Text style={styles.currency}>({props.currency})</Text>
                </View>
                <ReactAnimated.View style={[rotateStyle]}>
                    <ArrowIcon style={{ color: Colors.BIGSTONE }}
                        width={Scale.moderateScale(15)}
                        height={Scale.moderateScale(15)} />
                </ReactAnimated.View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.contentContainer}>
                    <RangeSlider
                        style={{ width: '100%', height: 80 }}
                        gravity={'top'}
                        min={0}
                        max={props.maxPrice}
                        step={step}
                        initialHighValue={priceRange.high}
                        initialLowValue={priceRange.low}
                        labelBackgroundColor={Colors.GALLERY}
                        labelBorderColor={Colors.GALLERY}
                        labelTextColor={Colors.FIORD}
                        selectionColor={Colors.TULIPTREE}
                        blankColor={Colors.GALLERY}
                        onValueChanged={(low, high, fromUser) => {
                            priceChangeHandler(low, high, fromUser);
                        }}
                        onTouchEnd={() => props.onPriceChanged(priceRange.low, priceRange.high)}
                    />

                    <View style={styles.priceShowContainer}>
                        <Text style={styles.priceText}>{Tools.formatMoney(priceRange.low)}</Text>
                        <Text style={styles.priceToText}>{Languages.Common.To}</Text>
                        <Text style={styles.priceText}>{Tools.formatMoney(priceRange.high)}</Text>
                    </View>
                </View>
            </Collapsible>
        </View>
    );
};

FilterPriceItem.propTypes = {
    maxPrice: PropTypes.number,
    onPriceChanged: PropTypes.func
};

FilterPriceItem.defaultProps = {
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
        // borderBottomColor: Colors.GALLERY,
        // borderTopColor: Colors.GALLERY
    },
    headerTextsContainer: {
        flexDirection: "row"
    },
    headerText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    },
    currency: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR,
        marginLeft: Scale.moderateScale(10)
    },
    contentContainer: {
        // borderBottomWidth: Scale.moderateScale(1),
        // borderBottomColor: Colors.GALLERY,
        paddingHorizontal: Scale.moderateScale(35),
        paddingBottom: Scale.moderateScale(10),
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: 'red'
    },
    priceShowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    priceText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR,
    },
    priceToText: {
        marginHorizontal: Scale.moderateScale(10),
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR,
    }
});

export default FilterPriceItem;