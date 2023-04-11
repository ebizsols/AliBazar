import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Languages, PathHelper, Scale, Tools } from 'common';
import {
    ProgressiveImage
} from 'components/UI';
import styles from './style';
import CategoryIcon from 'assets/icons/category.svg'
import PropTypes from 'prop-types';

// used in search screen and ...
const CategoryCarouselItem = (props) => {

    let imagePath = null;
    if (props.data.imageUrl)
        imagePath = PathHelper.getCategoryImagePath(props.data.imageUrl, props.data.categoryId);

    return (
        <>
            <View style={[styles.itemWrapper]}>
                <TouchableOpacity onPress={() => {
                    if (props.onPress)
                        props.onPress(props.data);
                }}
                    style={[styles.productContainer]}>
                    <View style={[styles.imageContainer]}>
                        <View style={styles.imageWrapper}>

                            {props.data.imageUrl ?
                                <ProgressiveImage
                                    borderRadius={0}
                                    height={Scale.moderateScale(100)}
                                    width={Scale.moderateScale(90)}
                                    source={imagePath}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                :
                                <View style={{
                                    width: Scale.moderateScale(100),
                                    height: Scale.moderateScale(90),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CategoryIcon
                                        width={Scale.moderateScale(60)}
                                        height={Scale.moderateScale(60)}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={[styles.titleContainer]}>
                            <Text numberOfLines={2} style={[styles.titleText]}>{props.data.categoryTitle}</Text>
                        </View>
                        <View style={[styles.productCountContainer]}>
                            <Text numberOfLines={2} style={[styles.productCountText]}>{Languages.Common.PlusCountproduct(Tools.roundDecimalNumber(props.data.goodsCount))}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

CategoryCarouselItem.propTypes = {
    onPress: PropTypes.func
};

CategoryCarouselItem.defaultProps = {

};

export default CategoryCarouselItem;