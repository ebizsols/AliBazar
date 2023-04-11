import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages, Tools } from 'common';
import { ProgressiveImage, RadioButton, ShowPrice } from 'components/UI';

// Used in goods detail
const GoodsProverItem = (props) => {
    
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.radioButtonContainer}>
                <RadioButton onPressData={props.data} onPress={props.onSelectProvider} />
            </View>
            <View>
                <View style={[styles.providerTextsContainer, styles.marginWrapper]}>
                    <Text style={styles.soldByText}>{Languages.GoodsDetail.SoldBy}:  </Text>
                    <TouchableOpacity disabled={props.data?.microstore != true} onPress={props.onShopTitlePress}>
                        <Text style={[styles.providerTitle, props.data?.microstore != true ? styles.deActiveProviderTitle : {}]}>{props.data?.shopTitle}</Text>
                    </TouchableOpacity>
                </View>

                {props.data?.haveGuarantee ?
                    <View style={[styles.providerTextsContainer, styles.marginWrapper]}>
                        <Text style={styles.text}>{Languages.GoodsDetail.MonthWarranty(props.data?.guaranteeMonthDuration)}</Text>
                    </View>
                    :
                    null}

                {props.data?.shippingPossibilities != 1 ?
                    <View style={[styles.expressWrapper, styles.marginWrapper]}>
                        <ProgressiveImage
                            borderRadius={Scale.moderateScale(1)}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(80)}
                            source={Tools.getExpressIconPath()}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    :
                    null
                }
                {props.data?.shippingPossibilities == 1 ?
                    <View style={[styles.expressWrapper, styles.marginWrapper]}>
                        <ProgressiveImage
                            borderRadius={Scale.moderateScale(1)}
                            height={Scale.moderateScale(20)}
                            width={Scale.moderateScale(80)}
                            source={Tools.getMarketPlaceIconPath()}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    :
                    null
                }

                <View style={styles.marginWrapper}>
                    <ShowPrice
                        priceStyle={styles.priceStyle}
                        currencyStyle={styles.currencyStyle}
                        price={props.data?.finalPrice} currency={props.currency} />
                </View>
            </View>
        </View>
    );
};

GoodsProverItem.propTypes = {
    containerStyle: ViewPropTypes.style
};

GoodsProverItem.defaultProps = {
    containerStyle: {}
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    providerTextsContainer: {
        flexDirection: "row",
        alignItems: "center",
        // flex: 1,
        flexGrow: 2
    },
    soldByText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.SILVERCHALICE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    providerTitle: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LOCHMARA,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: 'left'
    },
    text: {
        textAlign: 'left',
        flexDirection: "row",
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    },
    currencyStyle: {
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    priceStyle: {
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    radioButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(30)
    },
    marginWrapper: {
        marginVertical: Scale.moderateScale(2)
    },
    deActiveProviderTitle: {
        color: Colors.FIORD,
    },
    expressWrapper: {
        justifyContent: 'flex-start'
    }
});

export default GoodsProverItem;