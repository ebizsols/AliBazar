import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale } from 'common';
import { ProductItem } from 'components/UI';
const { width, heigth } = Dimensions.get('screen');

const ProductCarousel = (props) => {

    return (
        <View style={styles.componentWrapper}>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselHeader}>
                    <View style={styles.headerLeftColor}></View>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={props.goods}
                    renderItem={({ item }) => <ProductItem
                        isForCarousel={true}
                        checkInventory={true}
                        inventoryCount={item.inventoryCount}
                        currency={props.currency}
                        onPress={props.onPressItem}
                        checkSaleWithCall={true}
                        saleWithCall={item.saleWithCall}
                        data={item} />}
                    keyExtractor={(item) => item.goodsId.toString()}

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
        paddingBottom: Scale.moderateScale(20),
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
        flexDirection: "row"
    },
    headerLeftColor: {
        backgroundColor: Colors.TULIPTREE,
        width: Scale.moderateScale(10),
        height: Scale.moderateScale(50),
        borderTopRightRadius: Scale.moderateScale(15),
        borderBottomRightRadius: Scale.moderateScale(15),
    },
    title: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        marginHorizontal: Scale.moderateScale(15)
    }
});

export default ProductCarousel;