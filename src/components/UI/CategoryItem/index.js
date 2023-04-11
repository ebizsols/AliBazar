import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    TouchableOpacity,
    Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { ProgressiveImage } from 'components/UI';
import { Scale, PathHelper } from 'common';
import PropTypes from 'prop-types';
import Constants from 'common/Constants';

const CategoryItem = (props) => {

    const imageUrl = PathHelper.getModuleCollectionImagePath(props.data.responsiveImageUrl,
        props.data?.fkIModuleId, props.data?.collectionId)

    if (props.width == 1) {
        return (
            <View>

            </View>
        )
    }

    return (
        <TouchableOpacity onPress={() => props.onPress(props.data, Constants.SearchScreenTypes.Module)} activeOpacity={0.8} style={styles.imageContainer}>
            <ProgressiveImage
                width={props.width}
                height={props.height}
                borderRadius={Scale.moderateScale(3)}
                source={imageUrl}
                containerStyle={styles.imageStyle}
                resizeMode={FastImage.resizeMode.contain}
            />
        </TouchableOpacity>
    );
};

CategoryItem.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func
};

CategoryItem.defaultProps = {
    width: Scale.moderateScale(110),
    height: Scale.moderateScale(110)
};

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(2),
    },
    imageStyle: {
        paddingVertical: Scale.moderateScale(2)
    }
});

export default CategoryItem;