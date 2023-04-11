import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { PathHelper, Scale } from 'common';
import { ProgressiveImage } from 'components/UI';
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

export default (GoodsSliderItem = ({
    item,
    style,
    onPress,
    index,
    imageKey,
    local,
    height,
}) => {

    return (
        <TouchableOpacity disabled={true} style={styles.container} onPress={() => onPress(index)}>
            <ProgressiveImage
                borderRadius={Scale.moderateScale(1)}
                imageStyle={{ width: width }}
                height={height}
                width={width}
                source={item}
                resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image
                style={[styles.image, style, { height: height }]}
                source={local ? imageUrl : { uri: item[imageKey] }}
            /> */}
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingVertical: Scale.moderateScale(15),
        // backgroundColor: 'red'
    },
    image: {
        // height: Scale.verticalScale(210),
        // resizeMode: "cover",
    },
});
