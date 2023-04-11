import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    Linking,
} from 'react-native';
import HTML from "react-native-render-html";

import { Constants, Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import CloseIcon from 'assets/icons/close-gray.svg';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import { HtmlWebviewRender } from 'components/UI';

const { width, height } = Dimensions.get('window');

const OverviewScreen = (props) => {

    const { id } = props.route.params;

    return (
        <>
            {/* {props.isLoading == true ? <RequestLoader /> : null} */}
            <ScrollView
                style={styles.container}>
                <View style={styles.closeContainer}>
                    <Text style={styles.title}>{Languages.GoodsDetail.Overview}</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                        <CloseIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <HtmlWebviewRender type={Constants.HtmlWebviewRenderComponentTypes.Goods} goodsId={id} />
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
    //
    loaderContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#0000007a',
        top: 0,
        zIndex: 21,
        // opacity: 0.5,
        position: "absolute"
    },
    lottie: {
        width: Scale.moderateScale(60),
        height: Scale.moderateScale(60),
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default OverviewScreen;
