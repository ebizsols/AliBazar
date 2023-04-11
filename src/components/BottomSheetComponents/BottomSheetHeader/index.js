import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Scale } from 'common';

const BottomSheetHeader = () => (
    <View style={styles.headerContainer}>
        <View style={styles.headerLine}></View>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: "center",
        paddingVertical: Scale.moderateScale(10),
        borderTopRightRadius: Scale.moderateScale(25),
        borderTopLeftRadius: Scale.moderateScale(25),
    },
    headerLine: {
        width: Scale.moderateScale(45),
        height: Scale.verticalScale(6),
        borderRadius: Scale.moderateScale(10),
        backgroundColor: '#E4E6E7'
    }
});

export default BottomSheetHeader;