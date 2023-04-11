/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { PathHelper, Scale } from 'common';
import { Colors, Typography } from 'styles';
import PropTypes from 'prop-types';
import { ProgressiveImage } from 'components/UI';

const VarietyItem = (props) => {

    const [disabledLineData, setDisabledLineData] = useState({
        width: 50,
        height: 0,
        rotate: "90deg"
    })

    let itemTextStyle = {};

    if (props.canBeSelected == true) {
        itemTextStyle = {
            color: Colors.SILVER2
        }
    }

    let itemContainerStyle = {};

    if (props.isSelected) {
        itemContainerStyle = {
            borderColor: Colors.LOCHMARA
        };
        itemTextStyle = {
            ...itemTextStyle,
            color: Colors.LOCHMARA
        }
    }

    const onLayout = (event) => {
        // if (!isDisabled)
        //     return
        const { x, y, width, height } = event.nativeEvent.layout;
        const sum = (width * width) + (height * height);
        const diameterLength = Math.sqrt(sum);

        const triangleWidth = width / 2;
        const triangleheight = height / 2;

        const triangleDiameterLength = Math.sqrt((triangleWidth * triangleWidth) + (triangleheight * triangleheight))
        const rotateRad = Math.asin(triangleheight / triangleDiameterLength);
        const pi = Math.PI;
        const rotateDegree = rotateRad * (180 / pi);

        setDisabledLineData({
            height: Scale.moderateScale(4),
            width: diameterLength,
            rotate: `${rotateDegree}deg`
        })
    }



    const imagePath = PathHelper.getGoodsVarietyImagePath(props.data.imageUrl, props.data.fkGoodsId)

    return (
        <View style={styles.container}>

            {!props.isImage ?
                <TouchableOpacity disabled={props.isSelected} onPress={() => props.onVarietyItemPress(props.data)}
                    // disabled={isDisabled}
                    onLayout={onLayout}
                    style={[styles.itemContainer, itemContainerStyle]}>
                    <Text style={[styles.itemText, itemTextStyle]}>{props.data.valueTitle}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity disabled={props.isSelected} onPress={() => props.onVarietyItemPress(props.data)}
                    // disabled={isDisabled}
                    onLayout={onLayout}
                    style={[styles.itemContainer, styles.itemImageContainer, itemContainerStyle]}>
                    <ProgressiveImage
                        source={imagePath}
                        width={Scale.moderateScale(70)}
                        opacity={props.canBeSelected == true ? 0.5 : 1}
                        height={Scale.moderateScale(100)}
                    />
                </TouchableOpacity>
            }


            {/* {isDisabled == true ?
                <View style={styles.disableLineContainer}>
                    <View style={[
                        styles.disableLine,
                        {
                            width: disabledLineData.width - Scale.moderateScale(4),
                            transform: [
                                { rotate: disabledLineData.rotate }
                            ]
                        }]} >
                    </View>
                </View>
                :
                null
            } */}
        </View>
    );
};

VarietyItem.propTypes = {
    isImage: PropTypes.bool,
    selectedVariety: PropTypes.any,
    onVarietyItemPress: PropTypes.func,
    canBeSelected: PropTypes.bool,
    isSelected: PropTypes.bool
};

VarietyItem.defaultProps = {
    isImage: false
};

const styles = StyleSheet.create({
    container: {
    },
    itemContainer: {
        borderWidth: Scale.moderateScale(1),
        borderColor: Colors.ALTO,
        alignSelf: "baseline",
        borderRadius: Scale.moderateScale(6),
        paddingVertical: Scale.moderateScale(5),
        paddingHorizontal: Scale.moderateScale(20),
        position: "relative",
    },
    itemImageContainer: {
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(10),
    },
    itemText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    disableLineContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    disableLine: {
        position: "absolute",
        backgroundColor: Colors.ALTO,
        height: Scale.moderateScale(1),
        borderRadius: Scale.moderateScale(5),
        borderRadius: Scale.moderateScale(2),
    },
});


export default VarietyItem;