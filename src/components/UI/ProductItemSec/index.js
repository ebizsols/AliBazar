import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    I18nManager
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Constants, Languages, PathHelper, Scale, Tools } from 'common';
import {
    ProgressiveImage,
    ShowPrice,
    ProductLabel,
    OffLabel
} from 'components/UI';
import styles from './style';
import PropTypes from 'prop-types';
import axiosClient from 'api/axios';

const ProductItemSec = (props) => {

    const lang = axiosClient.getLang();

    let imageUrl = null;
    if (props.data.goodsImage)
        imageUrl = PathHelper.getGoodsImagePath(props.data.goodsImage, props.data.goodsId, false);
    else {
        imageUrl = PathHelper.getGoodsImagePath(props.image, props.data.goodsId, false);
    }

    let expressIconWidth = Scale.moderateScale(65);
    let expressIconHeight = Scale.moderateScale(25);

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
            paddingTop: 0
        };
        titleContainerStyle = {
            alignItems: "flex-start",
            justifyContent: "flex-start"
        };
        titleTextStyle = {
            textAlign: "left"
        };

        expressIconWidth = Scale.moderateScale(85);
        expressIconHeight = Scale.moderateScale(35);

        productImageWidth = Scale.moderateScale(90);
        productImageHeight = Scale.moderateScale(150);

        seprateLineContainerRowTypeStyle = styles.seprateLineContainerRowType;
        seprateLineRowTypeStyle = styles.seprateLineRowType;
    };



    return (
        <>
            <View style={[styles.itemWrapper, itemWrapperStyle]}>
                <TouchableOpacity disabled={props.onPress ? false : true} onPress={() => {
                    if (props.onPress)
                        props.onPress(props.onPressValue);
                }} style={[styles.productContainer, productContainerStyle]}>
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
                        {props.data.isNew ?
                            <View style={styles.labelContainer}>
                                <ProductLabel>
                                    {Languages.Product.NewArrivals}
                                </ProductLabel>
                            </View>
                            : null
                        }
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={[styles.titleContainer, titleContainerStyle]}>
                            <Text numberOfLines={2} style={[styles.titleText, titleTextStyle, props.titleTextStyle]}>{props.title}</Text>
                        </View>
                        <View style={styles.varietySection}>
                            {props.data?.goodsVariety?.map((item) => {
                                return (
                                    <View style={[styles.varietyContainer]}>
                                        <Text style={styles.varietyTitle}>{item.parameterTitle}:</Text>
                                        <Text style={styles.varietyValue}> {item.valueTitle}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        {props.modelNumber ?
                            <View style={[styles.modelTitleContainer]}>
                                <Text numberOfLines={1} style={[styles.modelTitleText]}>{props.modelNumber}</Text>
                            </View>
                            :
                            null}
                        {/* <View style={[styles.starsContainer, { opacity: props.data.surveyScore != null ? 1 : 0 }]}>
                            <Stars
                                rateOrCountShowText={props.data.surveyCount}
                                rate={props.data.surveyScore}
                            />
                        </View> */}
                        {props.showProverInToOfPrice == true && props.provider ?
                            <View style={styles.provider}>
                                <Text style={styles.soldByText}>{Languages.GoodsDetail.SoldBy}:</Text>
                                <Text style={styles.providerTitle}>{'\u00A0\u00A0'}{props.provider}{I18nManager.isRTL ? '\u00A0\u00A0' : ''}</Text>
                            </View>
                            :
                            null}

                        {props.checkInventory == false ?
                            <ItemSection {...props} />
                            :
                            (props.inventoryCount > 0 ?
                                <ItemSection {...props} />
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


                        {props.reason && props.showReason == true ?
                            <View style={styles.reason}>
                                <Text style={styles.reasonTitleText}>{Languages.Common.Reason}:</Text>
                                <Text style={styles.reasonText}>{'\u00A0\u00A0'}{props.reason}{I18nManager.isRTL ? '\u00A0\u00A0' : ""}</Text>
                            </View>
                            :
                            null}


                        {props.checkInventory == true && props.inventoryCount <= 0 ?
                            null
                            :
                            (props.data.isDownloadable != true ?
                                (props.showShippingMethod == false ?
                                    <View style={styles.expressContainer}>
                                        <View style={styles.expressWrapper}>
                                            {props.showMarketOrExpress == true ?
                                                <ProgressiveImage
                                                    borderRadius={Scale.moderateScale(1)}
                                                    height={expressIconHeight}
                                                    width={expressIconWidth}
                                                    source={Tools.getMarketPlaceIconPath()}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                                :
                                                null
                                            }
                                            {props.showMarketOrExpress == false ?
                                                <ProgressiveImage
                                                    borderRadius={Scale.moderateScale(1)}
                                                    height={expressIconHeight}
                                                    width={expressIconWidth}
                                                    source={Tools.getExpressIconPath()}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                                :
                                                null
                                            }

                                        </View>
                                    </View>
                                    :
                                    (
                                        props.shippingMethodType !== Constants.ShippingMethods.NOT_POSSIBL ?
                                            <View style={styles.expressContainer}>
                                                <ProgressiveImage
                                                    borderRadius={Scale.moderateScale(1)}
                                                    height={expressIconHeight}
                                                    width={expressIconWidth}
                                                    source={PathHelper.getShippingMethodPathWithType(props.shippingMethodType, lang)}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                            </View>
                                            :
                                            null
                                    ))
                                :
                                null)
                        }
                    </View>
                </TouchableOpacity>
                {/* <View style={[styles.seprateLineContainer, seprateLineContainerRowTypeStyle]}>
                    <View style={[styles.seprateLine, seprateLineRowTypeStyle]}></View>
                </View> */}
            </View>
        </>
    );
};

const ItemSection = (props) => {
    return (
        <>
            {props.displayPrice ?
                <>
                    {props.showReturningAllowed == true && props.returningAllowed == false ?
                        <View style={styles.cannotChangeContainer}>
                            <Text style={styles.cannotChangeText}>{Languages.GoodsDetail.ThisItemCannotBeExchangedOrReturned}</Text>
                        </View>
                        :
                        null}
                    <View style={styles.priceContainer}>
                        {props.checkSaleWithCall == true && props.saleWithCall == true ?
                            <Text style={styles.connectProviderText}>{Languages.Product.ConnectProvider}</Text>
                            :
                            (
                                props.showMainPrice === true && (
                                    <View style={styles.priceWrapper}>
                                        <ShowPrice price={props.showPrice} currency={props.currency} />
                                    </View>
                                )
                            )
                        }

                        {props.showItemCount == true ?
                            <View style={styles.itemCountWrapper}>
                                <Text style={styles.itemCountText}>{Languages.Common.NumberItems(props.itemCount)}</Text>
                            </View>
                            :
                            null}
                    </View>
                </>
                :
                null}

            {props.showType == 'row' ?
                <View style={styles.offContainerRowType}>
                    <View style={[styles.offLabel, { flex: 0 }]}>
                        {props.discountPercent != null && props.discountPercent != 0 ?
                            <ProductLabel
                                textStyle={styles.offLabelText}
                                containerStyle={styles.offLabelContainer}>
                                <Text>{props.discountPercent} % {Languages.Product.OffCap}</Text>
                            </ProductLabel>
                            :
                            null
                        }
                    </View>

                    <View style={[styles.offLabelWithLine, { marginLeft: Scale.moderateScale(17) }]}>
                        {(props.discountPercent != 0 && props.discountPercent != null) || (props.discountAmount != 0 && props.discountAmount != null) ?
                            <OffLabel
                                wrapWithView={true}
                            >
                                {/* <Text><Text>{props.currency} </Text>{props.offLineLabelPrice}</Text> */}
                                <ShowPrice
                                    currencyStyle={styles.offLabelWithLineCurrency}
                                    priceStyle={styles.offLabelWithLinePrice}
                                    afterDotStyle={styles.offLabelWithLineAfterDot}
                                    price={props.offLineLabelPrice}
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

            {props.provider && props.showProverInToOfPrice == false ?
                <View style={styles.provider}>
                    <Text style={styles.soldByText}>{Languages.GoodsDetail.SoldBy}:</Text>
                    <Text style={styles.providerTitle}>{'\u00A0\u00A0'}{props.provider}{I18nManager.isRTL ? '\u00A0\u00A0' : ''}</Text>
                </View>
                :
                null}

        </>
    )
}

ProductItemSec.propTypes = {
    showType: PropTypes.oneOf(['col', 'row']),
    data: PropTypes.any,
    displayPrice: PropTypes.bool,
    showProverInToOfPrice: PropTypes.bool,
    saleWithCall: PropTypes.bool,
    checkSaleWithCall: PropTypes.bool,
    checkInventory: PropTypes.bool,
    inventoryCount: PropTypes.any,
    showReturningAllowed: PropTypes.bool,
    showShippingMethod: PropTypes.bool,
    shippingMethodType: PropTypes.number,
    canGoDetail: PropTypes.bool,
    showMainPrice: PropTypes.bool
};

ProductItemSec.defaultProps = {
    showType: 'row',
    displayPrice: true,
    showProverInToOfPrice: false,
    saleWithCall: false,
    checkSaleWithCall: false,
    checkInventory: false,
    returningAllowed: true,
    showShippingMethod: false,
    canGoDetail: false,
    showMainPrice: true
};

export default ProductItemSec;