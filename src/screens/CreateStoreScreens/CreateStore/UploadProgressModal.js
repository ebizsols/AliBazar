import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TouchableOpacity,
    Animated
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Languages, Scale } from 'common';
import {
    MainButton,
    MainInput,
    ShadowWrapper,
    TextWithRadio,
    ScreenLoader,
    DropdownPickerInput
} from 'components/UI';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/icons/close-gray.svg';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';

const UploadProgressModal = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

    }));

    const _animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log('Animated');
        console.log('Percent', props.percentCompleted);
        Animated.timing(_animatedHeight, {
            toValue: props.percentCompleted,
            duration: 700,
            useNativeDriver: false,
        }).start();
    }, [props.percentCompleted]);

    const widthStyle = {
        width: _animatedHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        }),
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <View style={styles.contentBox}>
                    <View style={styles.titleContainer}>
                        {props.percentCompleted < 100 ?
                            <Text style={styles.titleText}>{Languages.CreateStore.CreatingYourStore}</Text>
                            :
                            <Text style={styles.titleText}>{Languages.CreateStore.TheLatestWorkIsUnderway}</Text>}

                    </View>

                    {props.percentCompleted < 100 ?
                        <View style={styles.progressWideBody}>
                            <View style={styles.progressbarContainer}>
                                <TouchableOpacity disabled={props.percentCompleted > 95}
                                    onPress={props.onCancelPressHandler}
                                    style={styles.progressbarWrapper}>
                                    <Animated.View style={[styles.progressBarPercent, widthStyle]}>
                                    </Animated.View>
                                    <View style={styles.percentContainer}>
                                        <Text style={styles.percentText}>{props.percentCompleted}%</Text>
                                    </View>

                                    <View style={styles.cancelContainer}>
                                        {
                                            props.percentCompleted < 95 ?
                                                <Text style={styles.cancelText}>Press To Cancel</Text>
                                                :
                                                <Text style={[styles.cancelText, {
                                                    fontSize: Typography.FONT_SIZE_16
                                                }]}>Please Wait</Text>
                                        }
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={styles.loaderContainer} >
                            <LottieView
                                imageAssetsFolder="lottie"
                                style={styles.lottie}
                                autoPlay={true}
                                loop={true}
                                speed={1}
                                // resizeMode='cover'
                                source={require('./../../../assets/animations/screen-loader.json')}
                            />
                        </View>
                    }

                </View>
            </View>
        </Modal>
    );
});

UploadProgressModal.propTypes = {
    visible: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onCancelPressHandler: PropTypes.func
};

UploadProgressModal.defaultProps = {
    visible: false
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#00000094',
        width: '100%',
        height: '100%',
        // opacity: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    contentBox: {
        backgroundColor: Colors.WHITE,
        width: '80%',
        // height: Scale.moderateScale(150),
        borderRadius: Scale.moderateScale(7),
        paddingHorizontal: Scale.moderateScale(8),
        paddingVertical: Scale.moderateScale(10)
    },
    titleContainer: {

    },
    titleText: {
        textAlign: "center",
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.FIORD,
    },
    //
    progressWideBody: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        height: Scale.moderateScale(20),
        marginVertical: Scale.moderateScale(15)
    },
    progressbarContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    progressbarWrapper: {
        width: '90%',
        height: Scale.verticalScale(20),
        backgroundColor: 'transparent',
        borderRadius: Scale.moderateScale(4),
        borderColor: Colors.LOCHMARA,
        borderWidth: Scale.moderateScale(2)
        // justifyContent: "center"
    },
    progressBarPercent: {
        height: '100%',
        width: '50%',
        // transform: [{translateX: 20}],
        backgroundColor: Colors.LOCHMARA,
        // borderTopLeftRadius: Scale.moderateScale(4),
        // borderBottomLeftRadius: Scale.moderateScale(4),
    },
    percentContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    cancelContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentText: {
        color: '#E0E0E0',
        // position: "absolute",
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        // top: Scale.verticalScale(5),
        bottom: 0,
        left: Scale.moderateScale(10)
    },
    cancelText: {
        color: '#E0E0E0',
        // position: "absolute",
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        // top: Scale.verticalScale(5),
        bottom: 0,
        // left: Scale.moderateScale(10)
    },
    //
    loaderContainer: {
        marginVertical: Scale.moderateScale(15)
    },
    lottie: {
        width: Scale.moderateScale(50),
        height: Scale.moderateScale(50),
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default UploadProgressModal;