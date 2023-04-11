/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    ViewPropTypes,
    I18nManager
} from 'react-native';
import { Scale } from 'common';
import ArrowIcon from 'assets/icons/arrow-left.svg';
import PlusIcon from 'assets/icons/plus.svg';

import LogoIcon from 'assets/icons/logo-black.svg';
import { Colors } from 'styles';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

const HeaderWrapper = (props) => {

    let containerStyle = {};
    if (props.showBackIcon == true) {
        containerStyle = {
            paddingLeft: 0
        }
    }

    return (
        <View style={[styles.container, containerStyle, props.containerStyle]}>
            {props.showBackIcon == true ?
                <TouchableOpacity style={[styles.backIconContainer, props.backIconStyle]} onPress={() => {
                    if (props.onPressBackIcon)
                        props.onPressBackIcon();
                }}>
                    <View style={[styles.arrowContainer, I18nManager.isRTL ? styles.arrowContainerRtl : {}]}>
                        <ArrowIcon
                            height={Scale.moderateScale(28)}
                            width={Scale.moderateScale(28)} />
                    </View>
                </TouchableOpacity>
                :
                null
            }
            <View style={styles.headerContent}>
                {props.children}
            </View>
            {props.showRightIcon == true ?
                <TouchableOpacity style={[styles.rightIconContainer, props.rightIconStyle]} onPress={() => {
                    if (props.onPressRightIcon)
                        props.onPressRightIcon();
                }}>
                    <View style={[styles.arrowContainer]}>
                        <PlusIcon
                            style={{ color: Colors.LOCHMARA }}
                            height={Scale.moderateScale(23)}
                            width={Scale.moderateScale(23)} />
                    </View>
                </TouchableOpacity>
                :
                null
            }
        </View>
    );
};

HeaderWrapper.propTypes = {
    containerStyle: ViewPropTypes.style,
    onPressBackIcon: PropTypes.func,
    onPressRightIcon: PropTypes.func,
    backIconStyle: ViewPropTypes.style,
    rightIconStyle: ViewPropTypes.style,
    showRightIcon: PropTypes.bool,
    showBackIcon: PropTypes.bool
};

HeaderWrapper.defaultProps = {
    showRightIcon: false
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: Scale.moderateScale(10),
        // paddingHorizontal: Scale.moderateScale(20),
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        borderBottomWidth: Scale.moderateScale(1),
        borderBottomColor: '#D5D5D5',
        flexDirection: "row",
        // zIndex: 10,
        height: Scale.verticalScale(56)
    },
    arrowContainer: {
        // marginRight: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(15),
        // height: '100%',
        // backgroundColor: 'blue',
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    rightIconContainer: {
        right: 0,
        position: "absolute"
    },
    arrowContainerRtl: {
        transform: [
            {
                rotate: '180deg',
            }
        ]
    },
    headerContent: {
        // backgroundColor: 'blue',
        alignItems: "center",
        flexDirection: 'row',
        flex: 1
        // paddingVertical: Scale.moderateScale(15)
    },
    backIconContainer: {
        // backgroundColor: 'red',
        zIndex: 100
    }
});


export default HeaderWrapper;
