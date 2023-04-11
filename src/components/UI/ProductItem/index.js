import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Languages, PathHelper, Scale, Tools } from 'common';
import {
    ProgressiveImage,
    ShowPrice,
    ProductLabel,
    OffLabel,
    Stars
} from 'components/UI';
import styles from './style';
import PropTypes from 'prop-types';
const { width, heigth } = Dimensions.get('screen');

// used in search screen and ...
const ProductItem = (props) => {

    const imageUrl = PathHelper.getGoodsImagePath(props.data.goodsImage, props.data.goodsId, false)


    let productImageWidth = Scale.moderateScale(140);
    let productImageHeight = Scale.moderateScale(180);

    let itemWrapperStyle = {};
    let productContainerStyle = {};
    let imageContainerStyle = {};
    let titleContainerStyle = {};
    let titleTextStyle = {};

    let seprateLineContainerRowTypeStyle = {};
    let seprateLineRowTypeStyle = {};

    if (props.showType == 'row') {
        itemWrapperStyle = {
            width: '100%',
            paddingLeft: Scale.moderateScale(10)
        };
        productContainerStyle = {
            flexDirection: 'row'
        };
        imageContainerStyle = {
            paddingHorizontal: Scale.moderateScale(5),
            paddingTop: 0
        };
        titleContainerStyle = {
            alignItems: "flex-start",
            justifyContent: "flex-start"
        };
        titleTextStyle = {
            textAlign: "left"
        };


        productImageWidth = Scale.moderateScale(120);
        productImageHeight = Scale.moderateScale(180);

        seprateLineContainerRowTypeStyle = styles.seprateLineContainerRowType;
        seprateLineRowTypeStyle = styles.seprateLineRowType;
    };

    if (props.isForCarousel === true) {
        productImageWidth = Scale.moderateScale(120);
        productImageHeight = Scale.moderateScale(160);
    };

    return (
        <>
            <View style={[styles.itemWrapper, itemWrapperStyle, props.isForCarousel === true ? { width: width / 2.2 } : {}]}>
                <TouchableOpacity onPress={() => {
                    if (props.onPress)
                        props.onPress(props.data);
                }}
                    style={[styles.productContainer, productContainerStyle]}>
                    <View style={[styles.imageContainer, imageContainerStyle]}>
                        <View style={styles.imageWrapper}>
                            <ProgressiveImage
                                borderRadius={0}
                                height={productImageHeight}
                                width={productImageWidth}
                                source={imageUrl}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        {/* {props.data.isNew ?
                            <View style={styles.labelContainer}>
                                <ProductLabel>
                                    {Languages.Product.NewArrivals}
                                </ProductLabel>
                            </View>
                            : null
                        } */}
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={[styles.titleContainer, titleContainerStyle]}>
                            <Text numberOfLines={2} style={[styles.titleText, titleTextStyle]}>{props.data.title}</Text>
                            <Text numberOfLines={2} style={styles.fixTitleLine}>{`fix\nline`}</Text>
                        </View>
                        <View style={[styles.starsContainer, { opacity: props.data.surveyScore != null ? 1 : 0 }]}>
                            <Stars
                                rateOrCountShowText={props.data.surveyCount}
                                rate={props.data.surveyScore}
                            />
                        </View>
                        {props.checkInventory == false ?
                            <PriceSection {...props} />
                            :
                            (props.inventoryCount > 0 ?
                                <PriceSection {...props} />
                                :
                                <View style={{
                                    justifyContent: props.showType == 'col' ? 'center' : 'flex-start',
                                    flexDirection: 'row'
                                }}>
                                    <View style={[styles.unavailableContainer]}>
                                        <Text style={styles.unavailableText}>{Languages.Common.Unavailable}</Text>
                                    </View>
                                </View>

                            )
                        }
                    </View>
                </TouchableOpacity>
                <View style={[styles.seprateLineContainer, seprateLineContainerRowTypeStyle]}>
                    <View style={[styles.seprateLine, seprateLineRowTypeStyle]}></View>
                </View>
            </View>
        </>
    );
};

const PriceSection = (props) => {

    let expressIconWidth = Scale.moderateScale(65);
    let expressIconHeight = Scale.moderateScale(25);

    return (
        <>
            <View style={[styles.priceContainer]}>
                {props.checkSaleWithCall == true && props.saleWithCall == true ?
                    <Text style={styles.connectProviderText}>{Languages.Product.ConnectProvider}</Text>
                    :
                    <View style={[styles.priceWrapper]}>

                        <ShowPrice currencyStyle={styles.currencyStyle}
                            price={props.data.finalPrice}
                            currency={props.currency} />
                    </View>
                }


                {/* // Todo: if you do changes for this give look at styles.offContainerRowType and sync them all */}
                {props.showType == 'col' && (props.data.discountPercentage != 0 && props.data.discountPercentage != null) ?
                    <View style={styles.offLabelWithLine}>
                        {(props.data.discountPercentage != 0 && props.data.discountPercentage != null) || (props.data.discountAmount != 0 && props.data.discountAmount != null) ?
                            <OffLabel
                                wrapWithView={true
                                }>
                                {/* <Text><Text>{props.currency} </Text>{Tools.formatMoney(props.data.price)}</Text> */}
                                <ShowPrice
                                    currencyStyle={styles.offLabelWithLineCurrency}
                                    priceStyle={styles.offLabelWithLinePrice}
                                    afterDotStyle={styles.offLabelWithLineAfterDot}
                                    price={props.data.price + (props.data.vat || props.data.vatamount)}
                                    currency={props.currency} />
                            </OffLabel>
                            :
                            null
                        }
                    </View>
                    :
                    null
                }
            </View>

            {props.showType == 'row' ?
                <View style={styles.offContainerRowType}>
                    <View style={[styles.offLabel, { flex: 0 }]}>
                        {props.data.discountPercentage != null && props.data.discountPercentage != 0 ?
                            <ProductLabel
                                textStyle={styles.offLabelText}
                                containerStyle={styles.offLabelContainer}>
                                <Text>{props.data.discountPercentage} % {Languages.Product.OffCap}</Text>
                            </ProductLabel>
                            :
                            null
                        }
                    </View>

                    <View style={[styles.offLabelWithLine, { marginLeft: Scale.moderateScale(17) }]}>
                        {(props.data.discountPercentage != 0 && props.data.discountPercentage != null) || (props.data.discountAmount != 0 && props.data.discountAmount != null) ?
                            <OffLabel wrapWithView={true}>
                                <ShowPrice
                                    currencyStyle={styles.offLabelWithLineCurrency}
                                    priceStyle={styles.offLabelWithLinePrice}
                                    afterDotStyle={styles.offLabelWithLineAfterDot}
                                    price={props.data.price + (props.data.vat || props.data.vatamount)}
                                    currency={props.currency} />
                            </OffLabel>
                            :
                            null
                        }
                    </View>
                </View>
                :
                null
            }

            <View style={styles.expressContainer}>
                {props.data.isDownloadable == false ?
                    <View style={styles.expressWrapper}>
                        {props.saleWithCall == false ?
                            props.data.shippingPossibilities ?
                                <ProgressiveImage
                                    borderRadius={Scale.moderateScale(1)}
                                    height={expressIconHeight}
                                    width={expressIconWidth}
                                    source={Tools.getMarketPlaceIconPath()}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                :
                                <ProgressiveImage
                                    borderRadius={Scale.moderateScale(1)}
                                    // imageStyle={{ width: width }}
                                    height={expressIconHeight}
                                    width={expressIconWidth}
                                    source={Tools.getExpressIconPath()}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            :
                            null}
                    </View>
                    :
                    null}

                {/* // Todo: if you do changes for this give look at styles.offContainerRowType and sync them all */}

                {props.showType == 'col' ?
                    <View style={styles.offLabel}>
                        {props.data.discountAmount != null && props.data.discountAmount != 0 ?
                            <ProductLabel
                                textStyle={styles.offLabelText}
                                containerStyle={styles.offLabelContainer}>
                                <Text>{props.data.discountPercentage} % {Languages.Product.OffCap}</Text>
                            </ProductLabel>
                            :
                            null
                        }
                    </View>
                    :
                    null
                }
            </View>
        </>
    )
}

ProductItem.propTypes = {
    showType: PropTypes.oneOf(['col', 'row']),
    data: PropTypes.any,
    onPress: PropTypes.func,
    saleWithCall: PropTypes.bool,
    checkSaleWithCall: PropTypes.bool,
    checkInventory: PropTypes.bool,
    inventoryCount: PropTypes.any
};

ProductItem.defaultProps = {
    showType: 'col',
    saleWithCall: false,
    checkSaleWithCall: false,
    checkInventory: false
};

export default ProductItem;