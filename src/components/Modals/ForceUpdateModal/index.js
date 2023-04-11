import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity,
    I18nManager,
    Switch,
    Platform,
    Linking,
    NativeModules
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import {
    FilterSpecificationItem,
    FilterCategoryItem,
    FilterPriceItem,
    FilterBrandItem,
    FilterBrandItemProvider,
    MainButton,
    ShadowWrapper
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import UpdateIcon from 'assets/icons/update.svg';
import GooglePlayIcon from 'assets/icons/download-google-play.svg';
import AppStoreIcon from 'assets/icons/app-store.svg';
import RNFS from 'react-native-fs';

const ForceUpdateModal = forwardRef((props, ref) => {


    useImperativeHandle(ref, () => ({
        test() {

        }
    }));

    useEffect(() => {

    }, []);

    const onDownloadFromStoreHandler = () => {
        if (Platform.OS === 'android') {
            Linking.canOpenURL(props.data?.googlePlayeLink).then(supported => {
                if (supported) {
                    Linking.openURL(props.data?.googlePlayeLink);
                } else {
                    try {
                        Linking.openURL(props.data?.googlePlayeLink);
                    } catch (error) {
                        console.log('Error in openning: ', error);
                    }
                    console.log("Don't know how to open URI: " + props.data?.googlePlayeLink);
                }
            });
        } else {
            Linking.canOpenURL(props.data?.appStoreLink).then(supported => {
                if (supported) {
                    Linking.openURL(props.data?.appStoreLink);
                } else {
                    try {
                        Linking.openURL(props.data?.appStoreLink);
                    } catch (error) {
                        console.log('Error in openning: ', error);
                    }
                    console.log("Don't know how to open URI: " + props.data?.appStoreLink);
                }
            });
        }

    };

    const downloadDirectlyPressHandler = () => {
        var filePath = RNFS.ExternalDirectoryPath + '/com.alibazar.bh.apk'; // Todo: check this when package name changed (maybe)
        var download = RNFS.downloadFile({
            fromUrl: 'https://api.tayqa.az/Uploads/Static/Common/alibazar.apk',
            toFile: filePath,
            progress: res => {
                console.log('progress', (res.bytesWritten / res.contentLength).toFixed(2));
            },
            progressDivider: 1
        });

        download.promise.then(result => {
            console.log(result);
            if (result.statusCode == 200) {
                console.log('Install Apk');
                console.log('filePath', filePath);
                NativeModules.InstallApk.install(filePath);
            }
        }).catch(err => {
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
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { }}
            style={styles.modal}
        >
            <TouchableOpacity disabled={true} activeOpacity={1} onPress={() => { }} style={styles.container}>

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
                                        <Text style={styles.bodyTitle}>{props.data?.title}</Text>
                                    </View>
                                    <View style={styles.bodyDescriptionContainer}>
                                        <Text style={styles.bodyDescription}>{props.data?.description}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footerInner}>
                                    {(props.data?.activeAndroidGooglePlayDownload && Platform.OS === 'android') || (props.data?.activeIosAppStoreDownload && Platform.OS === 'ios') ?
                                        <TouchableOpacity onPress={onDownloadFromStoreHandler} style={styles.downloadFromStorBtn}>
                                            {Platform.OS === 'android' && props.data?.activeAndroidGooglePlayDownload ?
                                                <GooglePlayIcon
                                                    width={Scale.moderateScale(120)}
                                                    height={Scale.moderateScale(50)}
                                                />
                                                :
                                                null}

                                            {Platform.OS === 'ios' && props.data?.activeIosAppStoreDownload ?
                                                <AppStoreIcon
                                                    width={Scale.moderateScale(120)}
                                                    height={Scale.moderateScale(50)}
                                                />
                                                :
                                                null}

                                        </TouchableOpacity>
                                        :
                                        null}

                                    {props.data?.activeAndroidDirectDownload === true && Platform.OS === 'android' && (
                                        <TouchableOpacity onPress={downloadDirectlyPressHandler} style={styles.downloadDirectlyContainer}>
                                            <Text style={styles.downloadDirectlyText}>{Languages.Common.DownloadNewVersionDirectly}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </TouchableOpacity>
        </Modal>
    );
});

ForceUpdateModal.propTypes = {
    visible: PropTypes.bool,
    onCloseModal: PropTypes.func,
};

ForceUpdateModal.defaultProps = {
    visible: false,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00000085',
        width: '100%',
        height: '100%',
        zIndex: 10000,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: '85%',
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

export default ForceUpdateModal;