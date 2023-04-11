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
import { Scale } from 'common';
import PropTypes from 'prop-types';

const ProgressiveImage = (props) => {

    return (
        <View style={[props.containerStyle]}>
            <FastImage
                style={[{
                    width: props.width,
                    height: props.height,
                    borderRadius: props.borderRadius,
                    opacity: props.opacity
                }, props.imageStyle]}
                source={{
                    uri: props.source,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={props.resizeMode}
            />
        </View>
    );
    
};

ProgressiveImage.propTypes = {
    containerStyle: ViewPropTypes.style,
    imageStyle: ViewPropTypes.style,
    width: PropTypes.any,
    height: PropTypes.any,
    borderRadius: PropTypes.any,
    source: PropTypes.string,
    resizeMode: PropTypes.any,
    opacity: PropTypes.number
};

ProgressiveImage.defaultProps = {
    containerStyle: {},
    imageStyle: {},
    isLoading: false,
    width: Scale.moderateScale(50),
    height: Scale.moderateScale(50),
    borderRadius: Scale.moderateScale(3),
    resizeMode: FastImage.resizeMode.cover,
    opacity: 1
};

const styles = StyleSheet.create({

});

export default ProgressiveImage;