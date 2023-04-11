import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes,
    Modal,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Scale } from 'common';
import { CustomButton, MainButton } from 'components/UI';
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';


const CustomModal = (props) => {

    const Icon = props.icon;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            onShow={() => console.log('showwwwww')}
            visible={props.visible}
            presentationStyle="overFullScreen"
            onRequestClose={() => {
                // setModalVisible(!modalVisible)
                props.onRequestClose()
            }}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => props.onRequestClose()} style={styles.container}>

                <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
                    <View style={{
                        // height: '100%',
                        width: '100%',
                        // justifyContent: "center",
                        // alignItems: "center",
                    }}>
                        <View style={styles.header}>
                            <View style={styles.headerIconWrapper}>
                                <Icon
                                    width={Scale.moderateScale(50)}
                                    height={Scale.moderateScale(50)}
                                />
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.bodyTextsContainer}>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.description}>{props.description}</Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.buttonWrapper}>
                                <MainButton
                                    onPress={() => {
                                        if (props.onOkPress)
                                            props.onOkPress()
                                    }}
                                    buttonStyle={[styles.reviewBtnStyle, styles.buttonStyle]}
                                    textStyle={styles.reviewBtnText}
                                >
                                    {props.okText}
                                </MainButton>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <MainButton
                                    onPress={() => {
                                        if (props.onCancelPress)
                                            props.onCancelPress()
                                    }}
                                    buttonStyle={[styles.buttonStyle]} >
                                    {props.cancelText}
                                </MainButton>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </TouchableOpacity>
        </Modal>
    )

};

CustomModal.propTypes = {
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onOkPress: PropTypes.func,
    onCancelPress: PropTypes.func,
    // clicked: PropTypes.func,
    // stylesBtn: ViewPropTypes.style,
    // textStyle: ViewPropTypes.style,
    // showBorder: PropTypes.bool,
    // showLoader: PropTypes.bool
};

CustomModal.defaultProps = {
    visible: false,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00000085',
        // position: "absolute",
        width: '100%',
        height: '100%',
        zIndex: 10000,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: '85%',
        // height: '70%',
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        // zIndex: 10000,
        borderRadius: Scale.moderateScale(15)
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Scale.moderateScale(25)
    },
    headerIconWrapper: {

    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Scale.moderateScale(25)
    },
    bodyTextsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(5)
    },
    description: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE,
    },
    footer: {
        flexDirection: 'row'
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: Scale.moderateScale(15),
        marginBottom: Scale.moderateScale(15)
    },
    reviewBtnStyle: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.LOCHMARA,
    },
    reviewBtnText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.LOCHMARA,
    },
    buttonStyle: {
        height: Scale.moderateScale(44)
    }
});



export default CustomModal;