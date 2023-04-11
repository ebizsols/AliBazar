import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import ClockIcon from 'assets/icons/clock.svg';
import CloseIcon from 'assets/icons/close-gray.svg';

const RecentSearchItem = (props) => {

    return (
        <TouchableOpacity onPress={() => props.onPress(props.data)} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <ClockIcon
                        width={Scale.moderateScale(16)}
                        height={Scale.moderateScale(16)} />
                </View>
                <View style={styles.textsContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{props.data.title}</Text>
                    </View>
                    <View style={styles.categoryTextContainer}>
                        {Languages.Common.In(styles.categoryTextIn, styles.categoryText, props.data.categoryTitle)}
                        {/* <Text style={styles.categoryTextIn}>{Languages.Common.In}</Text>
                        <Text style={styles.categoryText}> {props.data.categoryTitle} </Text> */}
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => props.onRemovePress(props.data)} style={styles.closeIconContainer}>
                <CloseIcon
                    width={Scale.moderateScale(18)}
                    height={Scale.moderateScale(18)} />
            </TouchableOpacity>
            <View style={styles.line}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    content: {
        paddingHorizontal: Scale.moderateScale(2),
        flexDirection: "row",
        paddingVertical: Scale.moderateScale(10)
    },
    iconContainer: {
        paddingHorizontal: Scale.moderateScale(7),
        paddingTop: Scale.moderateScale(2)
    },
    textsContainer: {
        paddingRight: Scale.moderateScale(30),
        flex: 1
    },
    titleContainer: {
        // justifyContent: "flex-start",
        // alignItems: "flex-start"
    },
    titleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.FIORD,
        textAlign: "left"
    },
    categoryTextContainer: {
        flexDirection: "row",
        marginTop: Scale.moderateScale(5)
    },
    categoryTextIn: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
    },
    categoryText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LOCHMARA,
    },
    closeIconContainer: {
        position: "absolute",
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        width: Scale.moderateScale(40)
    },
    line: {
        height: Scale.moderateScale(1),
        backgroundColor: Colors.GALLERY,
        width: '100%',
    }
});

export default RecentSearchItem;