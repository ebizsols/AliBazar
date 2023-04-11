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
import { CategoryCarousel, ProductCarousel, FlatListSlider } from 'components'
import Constants from 'common/Constants';
const { width, height } = Dimensions.get('window');

const HomeSlider = (props) => {

    const [imageWH, setImageWH] = useState({
        width: 1,
        height: 1
    });
    const [imageRealHW, setImageRealHW] = useState({
        width: 1,
        height: 1
    });

    const imageurl = PathHelper.getSliderImagePath(props.data.sliders[0].responsiveImageUrl);

    if (imageWH.width == 1)
        Image.getSize(imageurl, (width, height) => { setImageWH({ width: width, height: height }) });

    useEffect(() => {
        if (imageWH.width == 1)
            return;

        let h = Tools.getImageHeight(width, imageWH.width, imageWH.height);

        setImageRealHW({
            width: width,
            height: h
        }
        );
    }, [imageWH]);

    const onPressSliderItemHandler = (item) => {
        props.onPressItem(item, Constants.SearchScreenTypes.Slider)
    }

    return (
        <View style={styles.imageContainer}>
            <FlatListSlider
                data={props.data.sliders}
                timer={10000}
                imageKey={'responsiveImageUrl'}
                local={false}
                width={width}
                separator={0}
                indicatorStyle={styles.indicatorStyle}
                indicatorActiveStyle={styles.indicatorActiveStyle}
                height={imageRealHW.height}
                loop={false}
                autoscroll={true}
                currentIndexCallback={index => { }}
                onPress={item => onPressSliderItemHandler(item)}
                indicator
                animation
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
    },
    indicatorStyle: {
        width: Scale.moderateScale(12),
        height: Scale.moderateScale(4),
        borderRadius: Scale.moderateScale(5),
    },
    indicatorActiveStyle: {
        width: Scale.moderateScale(14),
        height: Scale.moderateScale(4),
    }
});


export default HomeSlider;
