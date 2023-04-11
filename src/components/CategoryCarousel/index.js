import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    Image
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, PathHelper, Tools } from 'common';
import { CategoryItem } from 'components/UI';

const CategoryCarousel = (props) => {

    const [imageWH, setImageWH] = useState({
        width: 1,
        height: 1
    });
    const [imageRealHW, setImageRealHW] = useState({
        width: 1,
        height: 1
    });;

    const imageurl = PathHelper.getModuleCollectionImagePath(props.data?.webModuleCollections?.[0]?.responsiveImageUrl,
        props.data?.webModuleCollections[0]?.fkIModuleId,
        props.data?.webModuleCollections[0]?.collectionId);

    if (imageWH.width == 1)
        Image.getSize(imageurl, (width, height) => { setImageWH({ width: width, height: height }) });

    useEffect(() => {
        if (imageWH.width == 1)
            return;

        let targetWidth = Scale.moderateScale(75);

        let h = Tools.getImageHeight(targetWidth, imageWH.width, imageWH.height);

        setImageRealHW((prev) => {
            return {
                width: targetWidth,
                height: h
            }
        });
    }, [imageWH]);

    return (
        <View style={styles.componentWrapper}>
            {props.data.iModuleTitle ?
                <View style={styles.titleContainer}>
                    <View style={[styles.titleRightSide, styles.lineContainer]}>
                        <View style={styles.line}></View>
                    </View>
                    <Text style={styles.title}>{props.data.iModuleTitle}</Text>
                    <View style={[styles.titleLeftSide, styles.lineContainer]}>
                        <View style={styles.line}></View>
                    </View>
                </View>
                :
                null}
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.data?.webModuleCollections}
                renderItem={({ item }) => <CategoryItem
                    onPress={props.onPressItem}
                    width={imageRealHW.width}
                    height={imageRealHW.height}
                    data={item} />}
                keyExtractor={(item, index) => item?.collectionId.toString()}
                contentInset={{ // iOS ONLY
                    top: 0,
                    left: Scale.moderateScale(5), // Left spacing for the very first card
                    bottom: 0,
                    right: Scale.moderateScale(5) // Right spacing for the very last card
                }}
                contentContainerStyle={{ // contentInset alternative for Android
                    paddingHorizontal: Platform.OS === 'android' ? Scale.moderateScale(5) : 0 // Horizontal spacing before and after the ScrollView
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    componentWrapper: {
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: Scale.moderateScale(12)
    },
    titleRightSide: {

    },
    line: {
        height: Scale.moderateScale(2.4),
        width: Scale.moderateScale(23),
        backgroundColor: Colors.TULIPTREE,
        borderRadius: Scale.moderateScale(3)
    },
    lineContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Scale.moderateScale(3)
    },
    title: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        marginHorizontal: Scale.moderateScale(15)
    }
});

export default CategoryCarousel;