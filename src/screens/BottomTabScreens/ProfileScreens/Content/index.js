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

import { Constants, Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import CloseIcon from 'assets/icons/close-gray.svg';
import { HtmlWebviewRender } from 'components/UI';

const ContentScreen = (props) => {

    const contentWidth = useWindowDimensions().width;

    const { contentType, screenTitle } = props.route?.params;

    return (
        <>
            <ScrollView
                style={styles.container}>
                <View style={styles.closeContainer}>
                    <Text style={styles.title}>{screenTitle}</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                        <CloseIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {/* <HTML html={description} contentWidth={contentWidth} /> */}
                    <HtmlWebviewRender type={Constants.HtmlWebviewRenderComponentTypes.Content} contentType={contentType} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: Scale.moderateScale(20),
        // paddingHorizontal: Scale.moderateScale(15),
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    title: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    contentScrollView: {
        // height: Scale.verticalScale(300)
    },
    closeContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: Scale.moderateScale(15),
        // paddingTop: Scale.moderateScale(8),
        marginVertical: Scale.moderateScale(10)
    },
    closeIconWrapper: {

    },
});

export default ContentScreen;
