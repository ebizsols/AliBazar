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
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Scale, Tools } from 'common';
import HeaderWrapper from './../HeaderWrapper';

import LogoIcon from 'assets/icons/alibazar.svg';
import ShareIcon from 'assets/icons/share.svg';
import LikeIcon from 'assets/icons/like-gray.svg';
import LikeFillIcon from 'assets/icons/like-red-fill.svg';
import axiosClient from 'api/axios';

const HomeHeader = (props) => {

    const toggleLikeHandler = () => {
        if (props.token) {
            // loggedin
            props.onToggleLikePress();
        } else {
            props.onGotoSignIn();
        }
    }

    return (
        <HeaderWrapper onPressBackIcon={props.onPressBackIcon} showBackIcon={props.showBackIcon}>
            <View>
                <LogoIcon
                    width={Scale.moderateScale(100)}
                    height={Scale.moderateScale(40)}
                />
            </View>
            <View style={styles.rightContainer}>
                {/* <TouchableOpacity style={styles.iconContainer}>
                    <ShareIcon
                        width={Scale.moderateScale(23)}
                        height={Scale.moderateScale(23)} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={toggleLikeHandler} style={styles.iconContainer}>
                    {props.liked == true ?
                        <LikeFillIcon
                            width={Scale.moderateScale(26)}
                            height={Scale.moderateScale(26)} />
                        :
                        <LikeIcon
                            width={Scale.moderateScale(26)}
                            height={Scale.moderateScale(26)} />}

                </TouchableOpacity> */}
            </View>
        </HeaderWrapper>
    );
};

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: "row",
        textAlign: "right",
        justifyContent: "flex-end",
        // flexShrink: 1,
        // alignSelf: "stretch"
        flex: 1
    },
    iconContainer: {
        // backgroundColor: 'red',
        flexDirection: "column",
        marginRight: Scale.moderateScale(5),
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(15),
    }
});


export default HomeHeader;
