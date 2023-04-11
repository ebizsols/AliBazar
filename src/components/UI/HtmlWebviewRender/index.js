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

import { AppConfig, Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import CloseIcon from 'assets/icons/close-gray.svg';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import axiosClient from 'api/axios';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const HtmlWebviewRender = (props) => {

    const domain = useSelector(state => state.baseStateReducer.domain);

    const lang = axiosClient.getLang();
    const currency = axiosClient.getCurrency();

    const contentWidth = useWindowDimensions().width;
    const [contentHeight, setContentHeight] = useState(200);

    const htmlStr = '<pre style="background-color: #23241f;color: #f8f8f2;overflow: visible;white-space: pre-wrap;margin-bottom: 5px;margin-top: 5px;padding: 5px 10px; " spellcheck="false">log atom hello</pre><blockquote><span style="color: rgb(34, 34, 34); "> To better introduce the product to customers, Enter a complete description about it </span></blockquote><p><span style="color: rgb(230, 0, 0); "> To better introduce the product to customers, Enter a complete description about it </span></p><p><span style="color: rgb(34, 34, 34); background - color: rgb(255, 255, 102); "> To better introduce the product to customers, Enter a complete description about it </span></p><p><strong style="color: rgb(34, 34, 34); "> To better introduce the product to customers, Enter a complete description about it </strong></p><p><em style="color: rgb(34, 34, 34); "> To better introduce the product to customers, Enter a complete description about it </em></p><p><u style="color: rgb(34, 34, 34); "> To better introduce the product to customers, Enter a complete description about it </u></p><p><span style="color: rgb(34, 34, 34); "> </span><s style="color: rgb(34, 34, 34); ">To better introduce the product to customers, Enter a complete description about it </s></p><h1><span style="color: rgb(34, 34, 34); ">To better introduce the product to customers, Enter a complete description about it </span></h1><p><span style="color: rgb(34, 34, 34); " class="ql - font - proximaNova - black">To better introduce the product to customers, Enter a complete description about it</span></p><p><span style="color: rgb(34, 34, 34); " class="ql - font - proximaNova - extrabld">To better introduce the product to customers, Enter a complete description about it</span></p><p><br></p><p><span style="color: rgb(34, 34, 34); " class="ql - font - proximaNovaA - bold">To better introduce the product to customers, Enter a complete description about it</span></p><h1><span style="color: rgb(34, 34, 34); ">To better introduce the product to customers, Enter a complete description about it</span></h1><p><a href="https://ajyal.bh/bhd-en/product/93/1090/starsat-32%22-hd-smart-led-tv" rel="noopener noreferrer" target="_blank">linkkkkkkkkkkkkkkkk</a></p><pre class="ql-syntax" spellcheck="false">fdfdfdff</pre><p><img src="http://192.168.1.5:6400/Uploads/CkEditorImages/N41247174A-1.jpg"></p>'

    // const jsStr = "(function() { document.body.style.backgroundColor = 'red';console.log('hello');window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); true; })();"
    const jsStr = "(function() { window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); true; })();"

    const js = `${jsStr}`;

    const runFirst = `
    ${js}
    `;

    console.log(domain);
    const baseUrl = `${domain || AppConfig.ApiConfig.baseUrl}${currency.toLowerCase()}-${lang.toLowerCase()}`;
    console.log(baseUrl);

    return (
        <WebView
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
            containerStyle={{ width: '100%', height: contentHeight }}
            injectedJavaScript={runFirst}
            domStorageEnabled={true}
            onMessage={event => {
                console.log('messages', event.nativeEvent.data);
                setContentHeight(parseInt(event.nativeEvent.data));
            }}
            source={
                {
                    uri: baseUrl + '/mobileHtmlDesc?' + `lang=${lang}&curr=${currency}&type=${props.type}&goodsId=${props.goodsId || 0}&articleId=${props.articleId || 0}&storeName=${props.storeName || ""}&contentType=${props.contentType || ""}`,
                    headers: {
                        'Language': lang,
                        'Currency': currency
                    }
                }}
            javaScriptEnabled={true}
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn(
                    'WebView received error status code: ',
                    nativeEvent.statusCode,
                );
            }}
            renderError={(errorName) => <Error name={errorName} />}
            startInLoadingState={true}
            renderLoading={() => <View style={styles.loaderContainer} >
                <LottieView
                    imageAssetsFolder="lottie"
                    style={styles.lottie}
                    autoPlay={true}
                    loop={true}
                    speed={1}
                    // resizeMode='cover'
                    source={require('./../../../assets/animations/screen-loader2.json')}
                />
            </View>}
        />
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

export default HtmlWebviewRender;
