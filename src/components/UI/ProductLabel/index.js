import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';

const ProductLabel = (props) => {

    return (
        <View style={[styles.labelContainer, props.containerStyle]}>
            <Text style={[styles.labelText, props.textStyle]}>{props.children}</Text>
        </View>
    );
};

ProductLabel.propTypes = {
    containerStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style
};

ProductLabel.defaultProps = {
    containerStyle: {},
    textStyle: {}
};

const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: Colors.ROYALBLUE,
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(4),
        borderTopRightRadius: Scale.moderateScale(5),
        borderBottomRightRadius: Scale.moderateScale(5)
    },
    labelText: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_10,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    }
});

export default ProductLabel;