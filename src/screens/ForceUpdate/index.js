import React, { useEffect, useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    I18nManager,
    Platform,
    NativeModules,
    Linking,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Languages, Scale, Constants } from 'common';
import { ForceUpdateModal } from 'components';
import { Typography, Colors } from 'styles';
import LogoIcon from 'assets/icons/logo.svg';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { DeviceStorage } from 'services';
import axiosClient from 'api/axios';
import { clientAuth, clientHome } from 'api/client';
import { useDispatch } from 'react-redux';
import { setCartCount } from 'store/actions/cart.action';
import { setToken } from 'store/actions/auth.action';
import { fcmService } from 'NotificationServices/FCMService';
import DeviceInfo from 'react-native-device-info';
var InstallAp = NativeModules.InstallAp;
import UpdateIcon from 'assets/icons/update.svg';
import GooglePlayIcon from 'assets/icons/download-google-play.svg';
import AppStoreIcon from 'assets/icons/app-store.svg';
import RNFS from 'react-native-fs';
import DownloadProgressModal from './DownloadProgressModal';

const { width, height } = Dimensions.get('window');

const forceUpdateTempData = {
    androidVersionCode: 2,
    androidVersionName: "1.0.1",
    iosBuildNumber: 2,
    iosVersionName: "1.0.1",
    forceUpdateAndroid: true,
    forceUpdateIos: true,
    activeAndroidDirectDownload: true,
    activeAndroidGooglePlayDownload: true,
    activeIosAppStoreDownload: true,
    googlePlayeLink: 'https://play.google.com/store/apps/details?id=az.arazsoft.tayqa',
    appStoreLink: "https://apps.apple.com/app/id1546378240",
    directDownloadLink: null,
    title: "New Version Is Available",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}

const ForceUpdateScreen = (props) => {

    const { data } = props.route.params;
    const [percentCompleted, setPercentCompleted] = useState(0);
    const [downloadProgressModalIsVisible, setDownloadProgressModalIsVisible] = useState(false);

    const onDownloadFromStoreHandler = () => {
        if (Platform.OS === 'android') {
            Linking.canOpenURL(data.googlePlayeLink).then(supported => {
                if (supported) {
                    Linking.openURL(data.googlePlayeLink);
                } else {
                    try {
                        Linking.openURL(data.googlePlayeLink);
                    } catch (error) {
                        console.log('Error in openning: ', error);
                    }
                    console.log("Don't know how to open URI: " + data.googlePlayeLink);
                }
            });
        } else {
            Linking.canOpenURL(data.appStoreLink).then(supported => {
                if (supported) {
                    Linking.openURL(data.appStoreLink);
                } else {
                    try {
                        Linking.openURL(data.appStoreLink);
                    } catch (error) {
                        console.log('Error in openning: ', error);
                    }
                    console.log("Don't know how to open URI: " + data.appStoreLink);
                }
            });
        }

    };

    const downloadDirectlyPressHandler = () => {
        setDownloadProgressModalIsVisible(true);
        var filePath = RNFS.ExternalDirectoryPath + '/com.alibazar.bh.apk'; // Todo: check this when package name changed (maybe)
        var download = RNFS.downloadFile({
            fromUrl: 'https://api.tayqa.az/Uploads/Static/Common/alibazar.apk',
            toFile: filePath,
            progress: res => {
                const percent = (res.bytesWritten / res.contentLength).toFixed(2) * 100;
                console.log('progress', percent);
                setPercentCompleted(Math.trunc(percent));
            },
            progressDivider: 1
        });

        download.promise.then(result => {
            console.log(result);
            setDownloadProgressModalIsVisible(false);
            if (result.statusCode == 200) {
                console.log('Install Apk');
                console.log('filePath', filePath);
                NativeModules.InstallApk.install(filePath);
            }
        }).catch(err => {
            setDownloadProgressModalIsVisible(false);

            console.log('Download apk error: ', err);
        });

        // create a path you want to write to
        // var path = RNFS.ExternalDirectoryPath + '/test.txt';

        // // write the file
        // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        //     .then((success) => {
        //         console.log('FILE WRITTEN!', path);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        // NativeModules.InstallApk.Update("https://s16.picofile.com/d/8424981742/b051c45e-a353-4338-9454-795d3e67c256/app_release.apk")
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.modalBox}>
                    <ScrollView>
                        <View style={styles.innerContainer}>
                            <View style={styles.header}>
                                <View style={styles.headerIconContainer}>
                                    <UpdateIcon
                                        width={Scale.moderateScale(70)}
                                        height={Scale.moderateScale(70)}
                                    />
                                </View>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.bodyTexts}>
                                    <View style={styles.bodyTitleContainer}>
                                        <Text style={styles.bodyTitle}>{data?.title}</Text>
                                    </View>
                                    <View style={styles.bodyDescriptionContainer}>
                                        <Text style={styles.bodyDescription}>{data?.description}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footerInner}>
                                    {(data?.activeAndroidGooglePlayDownload && Platform.OS === 'android') || (data?.activeIosAppStoreDownload && Platform.OS === 'ios') ?
                                        <TouchableOpacity onPress={onDownloadFromStoreHandler} style={styles.downloadFromStorBtn}>
                                            {Platform.OS === 'android' && data?.activeAndroidGooglePlayDownload ?
                                                <GooglePlayIcon
                                                    width={Scale.moderateScale(120)}
                                                    height={Scale.moderateScale(50)}
                                                />
                                                :
                                                null}

                                            {Platform.OS === 'ios' && data?.activeIosAppStoreDownload ?
                                                <AppStoreIcon
                                                    width={Scale.moderateScale(120)}
                                                    height={Scale.moderateScale(50)}
                                                />
                                                :
                                                null}

                                        </TouchableOpacity>
                                        :
                                        null}

                                    {data?.activeAndroidDirectDownload === true && Platform.OS === 'android' && (
                                        <TouchableOpacity onPress={downloadDirectlyPressHandler} style={styles.downloadDirectlyContainer}>
                                            <Text style={styles.downloadDirectlyText}>{Languages.Common.DownloadNewVersionDirectly}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </View>

            <DownloadProgressModal
                visible={downloadProgressModalIsVisible}
                onRequestClose={() => { }}
                // onCancelPressHandler={onCancelSubmitPressHandler}
                percentCompleted={percentCompleted}
            />

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#00000085',
        width: '100%',
        height: '100%',
        // zIndex: 10000,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.WHITE,
        zIndex: 10000,
        borderRadius: Scale.moderateScale(5)
    },
    innerContainer: {

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Scale.moderateScale(25)
    },
    body: {
        paddingHorizontal: Scale.moderateScale(30)
    },
    footer: {
        paddingTop: Scale.moderateScale(35)
    },
    headerIconContainer: {

    },
    bodyTexts: {

    },
    bodyTitleContainer: {
        alignItems: 'center',
        marginBottom: Scale.moderateScale(5)
    },
    bodyTitle: {
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
    },
    bodyDescriptionContainer: {

    },
    bodyDescription: {
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        lineHeight: Scale.moderateScale(20)
    },
    footerInner: {
        paddingHorizontal: Scale.moderateScale(20)
    },
    downloadFromStorBtn: {
        backgroundColor: Colors.BLACK,
        borderRadius: Scale.scale(5),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Scale.moderateScale(22)
    },
    downloadDirectlyContainer: {
        alignItems: 'center',
        marginBottom: Scale.moderateScale(25)
    },
    downloadDirectlyText: {
        color: Colors.LOCHMARA,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
    }
});

export default ForceUpdateScreen;