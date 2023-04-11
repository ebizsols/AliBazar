import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import HTML from "react-native-render-html";
import { clientHome } from 'api/client';

import { Languages, Scale } from 'common'
import { Stars } from 'components/UI'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import PlusIcon from 'assets/icons/plus.svg';
import MinusIcon from 'assets/icons/minus.svg';

const CommentItem = (props) => {
    // console.log('rops.data.tGoodsCommentPoints', props.data.tGoodsCommentPoints);
    const pros = props.data.tGoodsCommentPoints?.filter(x => x.pointType == true);
    // console.log('pros', pros);
    const prosTexts = pros?.map(function (elem) {
        return elem.pointText;
    }).join(", ");
    // console.log('prosTexts', prosTexts);
    const cons = props.data.tGoodsCommentPoints?.filter(x => x.pointType == false);;
    const consText = cons?.map(function (elem) {
        return elem.pointText;
    }).join(", ");
    // console.log('consText', consText);

    return (
        <View style={styles.container} >

            <View style={styles.contentContainer}>
                <Text style={styles.commentUsernameText}>{props.data.customerName}</Text>
                <View style={styles.starsContainer}>
                    <Stars
                        width={Scale.moderateScale(18)}
                        height={Scale.moderateScale(18)}
                        rate={props.data.reviewPoint}
                        textStyle={styles.starsTextStyle}
                        rateOrCountShowText={props.data?.reviewPoint} />
                </View>
                <View style={styles.commentTextContainer}>
                    <Text style={styles.commentText}>{props.data.commentText}</Text>
                </View>
                <View style={styles.consProsSection}>
                    {pros?.length > 0 ?
                        <View style={[styles.itemContainer, styles.prosItemContainer]}>
                            <View style={styles.itemIconContainer}>
                                <PlusIcon
                                    style={{ color: '#3AD976' }}
                                    height={Scale.moderateScale(20)}
                                    width={Scale.moderateScale(20)} />
                            </View>
                            <View style={styles.itemTextsContainer}>
                                <Text style={styles.itemText}>{prosTexts}</Text>
                            </View>
                        </View>
                        :
                        null}
                    {cons?.length > 0 ?
                        <View style={styles.itemContainer}>
                            <View style={styles.itemIconContainer}>
                                <MinusIcon
                                    style={{ color: '#F07040' }}
                                    height={Scale.moderateScale(20)}
                                    width={Scale.moderateScale(20)} />
                            </View>
                            <View style={styles.itemTextsContainer}>
                                <Text style={styles.itemText}>{consText}</Text>
                            </View>
                        </View>
                        :
                        null}

                </View>
            </View>

        </View>
    );
};

CommentItem.propTypes = {

};

CommentItem.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        paddingBottom: Scale.moderateScale(20),
        paddingTop: Scale.moderateScale(5)
    },
    contentContainer: {
        paddingHorizontal: Scale.moderateScale(5),
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    commentUsernameText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    starsContainer: {
        marginVertical: Scale.moderateScale(5)
    },
    commentTextContainer: {

    },
    commentText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "left"
    },
    consProsSection: {
        marginTop: Scale.moderateScale(12)
    },
    itemContainer: {
        flexDirection: "row",
        width: '100%'
        // flex: 1

    },
    itemIconContainer: {
        marginRight: Scale.moderateScale(12),
        justifyContent: "center"
    },
    itemTextsContainer: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        width: '100%',
        flexDirection: "row",
        textAlign: "left"
    },
    itemText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "left"
    },
    starsTextStyle: {
        fontSize: Typography.FONT_SIZE_12,
    },
    prosItemContainer: {
        marginBottom: Scale.moderateScale(6)
    }
});

export default CommentItem;