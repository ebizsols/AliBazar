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

const StoreItemShimmer = (props) => {

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
                    <View style={styles.textsContainer}>
                        <View>
                            <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer, styles.titlePlaceHolder]}>
                                <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.firstLine]} />
                            </Shimmer>
                        </View>
                        <View style={{ marginTop: Scale.moderateScale(20) }}>
                            <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer]}>
                                <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.secLine]} />
                            </Shimmer>
                            <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer]}>
                                <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.thirdLine]} />
                            </Shimmer>
                        </View>
                        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
                            <View>
                                <Shimmer animating={Platform.OS === 'android' ? true : loading} style={[styles.flexCol, styles.textPlaceHolderContainer, styles.btnShimmerContainer]}>
                                    <View style={[styles.shimmerBottomTextPlaceHolder, styles.backColor, styles.thirdLine, styles.btnShimmer]} />
                                </Shimmer>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

StoreItemShimmer.propTypes = {

};

StoreItemShimmer.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // marginHorizontal: Scale.moderateScale(10),
        // height: Scale.moderateScale(150),
        // justifyContent: "center",
        // alignItems: "center"
        // height: Scale.moderateScale(200)
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
        height: Scale.moderateScale(140),
    },
    item: {
        flex: 1,
        height: Scale.moderateScale(80),
        width: Scale.moderateScale(120),
    },
    backColor: {
        backgroundColor: Colors.MERCURY,
    },
    itemCotainer: {
        marginHorizontal: Scale.moderateScale(10),
        height: Scale.moderateScale(160),
        flexDirection: "row"
    },
    itemImageContainer: {

    },
    textsContainer: {
        flexDirection: "column",
        paddingHorizontal: Scale.moderateScale(15),
        flex: 1,
    },
    shimmerBottomTextPlaceHolder: {
        width: Scale.moderateScale(115),
        // marginVertical: Scale.moderateScale(10),
        height: Scale.moderateScale(14),
        borderRadius: Scale.moderateScale(20)
    },
    textPlaceHolderContainer: {
        marginVertical: Scale.moderateScale(5),
    },
    titlePlaceHolder: {
        width: '30%'
    },
    btnShimmerContainer: {
        width: Scale.moderateScale(100)
    },
    btnShimmer: {
        width: Scale.moderateScale(80),
        height: Scale.moderateScale(30),
        borderRadius: Scale.moderateScale(8)
    },
    // =========================
    flexCol: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },
});

export default StoreItemShimmer;