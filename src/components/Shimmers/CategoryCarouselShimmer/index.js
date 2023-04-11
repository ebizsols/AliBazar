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

const CategoryCarouselShimmer = (props) => {
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
        <View style={styles.container}>
            <View style={[styles.flexRow, styles.topShimmer]}>
                <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol]}>
                    <View style={[styles.topLine, styles.backColor]} />
                </Shimmer>
            </View>

            <View style={[styles.itemsContainer]}>
                <View style={styles.itemCotainer}>
                    <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.itemWrapper]}>
                        <View style={[styles.item, styles.backColor]}></View>
                    </Shimmer>
                </View>
                <View style={styles.itemCotainer}>
                    <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.itemWrapper]}>
                        <View style={[styles.item, styles.backColor]}></View>
                    </Shimmer>
                </View>
                <View style={styles.itemCotainer}>
                    <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.itemWrapper]}>
                        <View style={[styles.item, styles.backColor]}></View>
                    </Shimmer>
                </View>
                <View style={styles.itemCotainer}>
                    <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.itemWrapper]}>
                        <View style={[styles.item, styles.backColor]}></View>
                    </Shimmer>
                </View>
            </View>
        </View>
    );
};

CategoryCarouselShimmer.propTypes = {

};

CategoryCarouselShimmer.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // marginHorizontal: Scale.moderateScale(10),
        // height: Scale.moderateScale(150),
        justifyContent: "center",
        alignItems: "center"
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
        flexDirection: "row",
        // backgroundColor: 'red',
        // flex: 1,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    itemWrapper: {
        // padding: Scale.moderateScale(10),
        height: Scale.moderateScale(70),
        // backgroundColor: 'red'
    },
    item: {
        flex: 1,
        height: Scale.moderateScale(70),
        width: width / 4 - Scale.moderateScale(20),
        // backgroundColor: 'blue'
    },
    backColor: {
        backgroundColor: Colors.MERCURY,
    },
    itemCotainer: {
        marginHorizontal: Scale.moderateScale(10)
    },
    // =========================
    flexCol: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },
});

export default CategoryCarouselShimmer;