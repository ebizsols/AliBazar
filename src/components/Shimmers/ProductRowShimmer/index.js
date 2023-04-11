import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    Dimensions,
    Platform
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';
import Shimmer from 'react-native-shimmer';
const { width, height } = Dimensions.get('window');

const ProductRowShimmer = (props) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // This Fixed ios not animating shimmers
        if (Platform.OS === 'android')
            return;
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [])

    return (
        <View style={styles.flexCol}>
            <View style={[styles.itemsContainer]}>
                <View style={styles.itemCotainer}>
                    <View style={styles.itemImageContainer}>
                        <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.itemWrapper]}>
                            <View style={[styles.item, styles.backColor]}></View>
                        </Shimmer>
                    </View>
                    <View style={styles.textsContainer}>
                        <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer]}>
                            <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.firstLine]} />
                        </Shimmer>
                        <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer]}>
                            <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.secLine]} />
                        </Shimmer>
                        <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer]}>
                            <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.thirdLine]} />
                        </Shimmer>
                    </View>
                </View>
            </View>
        </View>
    );
};

ProductRowShimmer.propTypes = {

};

ProductRowShimmer.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // marginHorizontal: Scale.moderateScale(10),
        // height: Scale.moderateScale(150),
        // justifyContent: "center",
        // alignItems: "center"
    },
    firstLine: {
        width: Scale.moderateScale(140)
    },
    secLine: {
        width: Scale.moderateScale(160)
    },
    thirdLine: {
        width: Scale.moderateScale(80)
    },
    topLine: {
        width: Scale.moderateScale(100),
        height: Scale.moderateScale(15),
        borderRadius: Scale.moderateScale(20)
    },
    topShimmer: {
        marginBottom: Scale.moderateScale(10)
    },
    itemsContainer: {
        // flexDirection: "row",
        // backgroundColor: 'red',
        // flex: 1,
        // width: '100%',
        // justifyContent: "flex-start",
        // alignItems: "flex-start"
    },
    itemWrapper: {
        // padding: Scale.moderateScale(10),
        height: Scale.moderateScale(140),
        // backgroundColor: 'red'
    },
    item: {
        flex: 1,
        height: Scale.moderateScale(80),
        width: Scale.moderateScale(120),
        // backgroundColor: 'blue'
    },
    backColor: {
        backgroundColor: Colors.MERCURY,
    },
    itemCotainer: {
        marginHorizontal: Scale.moderateScale(10),
        flexDirection: "row"
    },
    itemImageContainer: {

    },
    textsContainer: {
        flexDirection: "column",
        paddingHorizontal: Scale.moderateScale(15),
        // backgroundColor: 'red',
        flex: 1
    },
    shimmerBottomTextPlaceHolder: {
        width: Scale.moderateScale(115),
        // marginVertical: Scale.moderateScale(10),
        height: Scale.moderateScale(14),
        borderRadius: Scale.moderateScale(20)
    },
    textPlaceHolderContainer: {
        marginVertical: Scale.moderateScale(5),
        // justifyContent: "center",
        // alignItems: "center"
    },
    // =========================
    flexCol: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },
});

export default ProductRowShimmer;