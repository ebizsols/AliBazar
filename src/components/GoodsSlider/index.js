/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native';
import { Scale, PathHelper, Tools } from 'common';
import GoodsSliderItem from './GoodsSliderItem';
import { CategoryCarousel, ProductCarousel, FlatListSlider } from 'components'
const { width, height } = Dimensions.get('window');

const GoodsSlider = (props) => {

    const images = [];
    images.push(props.firstImage);
    for (let index = 0; index < props.images.length; index++) {
        const element = props.images[index];
        images.push(PathHelper.getGoodsImagePath(element.documentUrl, element.fkGoodsId))
    }

    return (
        <View style={styles.imageContainer}>
            <FlatListSlider
                data={images}
                timer={8000}
                imageKey={'source'}
                local={false}
                width={width}
                separator={0}
                isProductSlider={true}
                // height={height * 1.5/3}
                height={height / 2}
                loop={false}
                autoscroll={false}
                currentIndexCallback={index => {console.log(index)}}
                onPress={item => alert(JSON.stringify(item))}
                indicator
                animation
                component={<GoodsSliderItem />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "row",
        // paddingHorizontal: Scale.moderateScale(5)
    },
    imageItemContainer: {
        flex: 1,
        marginHorizontal: Scale.moderateScale(3),
        marginBottom: Scale.moderateScale(10)
    }
});


export default GoodsSlider;
