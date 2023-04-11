import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import HTML from "react-native-render-html";
import { Progressbar, Stars } from 'components/UI'

import { Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import CloseIcon from 'assets/icons/close-gray.svg';

const RatingHeader = (props) => {

    return (
        <>
            <View style={styles.topContainer}>
                <Text style={styles.avgRateText}>{props.allSurveyAverage || 0}</Text>
                <View style={styles.startContainer}>
                    <Stars
                        margin={Scale.moderateScale(8)}
                        rate={props.allSurveyAverage}
                        width={Scale.moderateScale(27)}
                        height={Scale.moderateScale(27)}
                        showText={false} />
                </View>
                <Text style={styles.reviewsText}>{Languages.GoodsDetail.BaseOnCountreviews(props.goodsCommentCount)}</Text>
            </View>
            <View style={styles.barsContainer}>
                {props.surveyList?.map((item, index) => {
                    return (
                        <View style={styles.progressBarWrapper}>
                            <Progressbar value={item.value} percent={item.average} />
                        </View>
                    )
                })}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    barsContainer: {
        paddingRight: Scale.moderateScale(15),
        paddingLeft: Scale.moderateScale(8),
    },
    progressBarWrapper: {
        marginVertical: Scale.moderateScale(4)
    },
    topContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    avgRateText: {
        fontSize: Typography.FONT_SIZE_24,
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    startContainer: {
        marginVertical: Scale.moderateScale(7)
    },
    reviewsText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.SILVERCHALICE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
});

export default RatingHeader;
