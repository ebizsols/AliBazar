import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import { CategoryCarouselItem } from 'components/UI';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoryProductCarousel = (props) => {

    const onCategoryPressHandler = (categoryItem) => {
        const item = {...categoryItem};
        item.childs = [];
        item.websiteBrand = [];
        if (props.onCategoryPress)
            props.onCategoryPress(item);
    };

    return (
        <View style={styles.componentWrapper}>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselHeader}>
                    <Text style={styles.title}>{props.data?.categoryTitle}</Text>
                    <TouchableOpacity onPress={() => onCategoryPressHandler(props.data)} style={styles.viewAllContainer}>
                        <Text style={styles.viewAllText}>{Languages.Common.ViewAll}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={props.data.childs}
                    renderItem={({ item }) => <CategoryCarouselItem
                        onPress={onCategoryPressHandler}
                        data={item} />}
                    keyExtractor={(item) => item.categoryId.toString()}
                // contentInset={{ // iOS ONLY
                //     top: 0,
                //     left: Scale.moderateScale(5), // Left spacing for the very first card
                //     bottom: 0,
                //     right: Scale.moderateScale(5) // Right spacing for the very last card
                // }}
                // contentContainerStyle={{ // contentInset alternative for Android
                //     paddingHorizontal: Platform.OS === 'android' ? Scale.moderateScale(5) : 0 // Horizontal spacing before and after the ScrollView
                // }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    componentWrapper: {
        paddingBottom: Scale.moderateScale(5)
        // borderWidth: Scale.moderateScale(1),
        // borderColor: '#EBEBEB',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 7,

        // elevation: 3,
    },
    carouselContainer: {

    },
    carouselHeader: {
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: 'red',
        justifyContent: "space-between",
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(10)
    },
    title: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    },
    viewAllText: {
        color: Colors.LOCHMARA,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    },
    viewAllContainer: {
        marginRight: Scale.moderateScale(8)
    }
});

export default CategoryProductCarousel;