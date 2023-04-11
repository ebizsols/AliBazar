import React, { useState } from 'react';
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

const FloatButtonWrapper = (props) => {

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.innerContainer}>
                {props.children}
            </View>
        </View>
    );
};

FloatButtonWrapper.propTypes = {
    containerStyle: ViewPropTypes.style,
    // textStyle: ViewPropTypes.style
};

FloatButtonWrapper.defaultProps = {
    containerStyle: {},
    // textStyle: {}
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(10),
        backgroundColor: Colors.WHITE,
        borderTopColor: Colors.GALLERY,
        borderTopWidth: Scale.moderateScale(1),
        paddingTop: Scale.moderateScale(10)
    },
    innerContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});

export default FloatButtonWrapper;