import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import { Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';

const RequestLoader = props => {

    return (
        <View style={styles.loaderContainer} >
            <LottieView
                imageAssetsFolder="lottie"
                style={styles.lottie}
                autoPlay={true}
                loop={true}
                speed={1}
                // resizeMode='cover'
                source={require('./../../../assets/animations/screen-loader-new.json')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff91',
        top: 0,
        zIndex: 21,
        // opacity: 0.5,
        position: "absolute"
    },
    lottie: {
        width: Scale.moderateScale(400),
        height: Scale.moderateScale(400),
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default RequestLoader;