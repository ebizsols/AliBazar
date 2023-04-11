import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Scale } from 'common';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Animated, { Easing } from 'react-native-reanimated';
const { Value, timing } = Animated;

const BottomSheetBackView = forwardRef((props, ref) => {

    const [showBackdrop, setShowBackdrop] = useState(false);

    useImperativeHandle(ref, () => ({
        closeEnd() {
            setShowBackdrop(false);
        },
        openEnd() {
            if (!showBackdrop)
                setShowBackdrop(true);
        }

    }));


    const backdropPressed = () => {
        props.bottomSheetRef.current.snapTo(1)
    };

    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolate(props.fall, {
            inputRange: [0, 1],
            outputRange: [0.5, 0],
        })

        return (
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.shadowContainer,
                    {
                        opacity: animatedShadowOpacity,
                    },
                    {
                        top: Scale.verticalScale(-200),
                        zIndex: 11,
                    }
                ]}
            />
        )
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={backdropPressed}
                containerStyle={[styles.backdrop, {
                    position: "absolute",
                    width: '100%',
                    height: showBackdrop ? '100%' : 0,
                    backgroundColor: 'transparent',
                    zIndex: 5,
                }]}>
            </TouchableWithoutFeedback>

            {renderShadow()}
        </>
    )
})

const styles = StyleSheet.create({
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
});

export default BottomSheetBackView;