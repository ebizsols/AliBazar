import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import styles from './style'
import PropTypes from 'prop-types';
// import LottieView from 'lottie-react-native';
import { Colors, Typography } from "styles";

const MainButton = props => {

    return (
        <TouchableOpacity disabled={props.isLoading || props.disabled} onPress={props.onPress ? props.onPress : () => { }}>
            <View style={[styles.button, props.showBorder && styles.buttonBorder, props.buttonStyle,
                props.disabled == true ? styles.disabledButton : {}
            ]}>
                {props.isLoading ?
                    <View style={styles.loaderContainer}>
                        {/* <LottieView
                            imageAssetsFolder="lottie"
                            style={styles.lottie}
                            autoPlay={true}
                            loop={true}
                            useNativeDriver={true}
                            colorFilters={[{
                                keypath: "Mascara",
                                color: "#ffffff"
                            }, {
                                keypath: "Bar",
                                color: "#2ABDCE"
                            }, {
                                keypath: "shape",
                                color: "#E4E6E7"
                            }]}
                            speed={1.5}
                            resizeMode='cover'
                            source={require('./../../../assets/animations/btn_loader.json')}
                        /> */}
                    </View>
                    :
                    <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
                }
            </View>
        </TouchableOpacity>
    );
};

MainButton.propTypes = {
    backColor: PropTypes.string,
    onPress: PropTypes.func,
    buttonStyle: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    showBorder: PropTypes.bool,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool
};

MainButton.defaultProps = {
    isLoading: false,
    showBorder: true,
    disabled: false
};

export default MainButton;