import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { Scale } from 'common';
import { Typography, Colors } from 'styles';

const { width, heigth } = Dimensions.get('screen');

export default StyleSheet.create({
    itemWrapper: {
        // backgroundColor: 'red',
        //    marginRight: 5,
        // width: width / 2,
        // paddingTop: Scale.moderateScale(10)
    },
    productContainer: {
        // paddingHorizontal: Scale.moderateScale(10),
        // position: "relative",
        paddingVertical: Scale.moderateScale(10),
        // width: '100%',
        flexDirection: 'row'
    },
    imageContainer: {
        paddingHorizontal: Scale.moderateScale(5),
        paddingTop: Scale.moderateScale(10),
    },
    imageWrapper: {
        justifyContent: "center",
        alignItems: "center"
    },
    labelContainer: {
        position: "absolute",
        top: Scale.moderateScale(15)
    },
    bodyContainer: {
        paddingHorizontal: Scale.moderateScale(10),
        flex: 1
    },
    titleContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Scale.moderateScale(4)
    },
    titleText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "center"
    },
    starsContainer: {
        marginVertical: Scale.moderateScale(5)
    },
    priceContainer: {
        flexDirection: "row",
        marginVertical: Scale.moderateScale(5),
    },
    priceWrapper: {
        // flex: 1,
        justifyContent: "center",
        marginRight: Scale.moderateScale(15)
    },
    itemCountWrapper: {

    },
    itemCountText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    },
    offLabel: {
        flex: 1,
        justifyContent: "center"
    },
    currency: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE
    },
    price: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    expressContainer: {
        flexDirection: "row"
    },
    offLabelContainer: {
        backgroundColor: Colors.PINK,
        borderRadius: Scale.moderateScale(3),
        paddingHorizontal: Scale.moderateScale(4),
        paddingVertical: Scale.moderateScale(1),
        alignSelf: "baseline"
    },
    expressWrapper: {
        flex: 1,
        justifyContent: "center"
    },
    //
    offLabelWithLine: {
        flex: 1,
        justifyContent: "center"
    },
    offLabelText: {
        color: Colors.TORCHRED2,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    offLabelWithLineCurrency: {
        color: Colors.SILVER,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    offLabelWithLinePrice: {
        color: Colors.SILVER,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    offLabelWithLineAfterDot: {
        color: Colors.SILVER,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
    seprateLineContainer: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red',
        // width: Scale.moderateScale(2),
        height: '100%',
        position: "absolute"
    },
    seprateLine: {
        backgroundColor: Colors.GALLERY,
        width: Scale.moderateScale(1.3),
        height: '95%',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        // left: Scale.moderateScale(-0.6),
        // position: "absolute"
    },
    seprateLineContainerRowType: {
        height: Scale.moderateScale(2),
        width: '100%',
        top: Scale.moderateScale(-5.5)
    },
    seprateLineRowType: {
        height: Scale.moderateScale(1.2),
        width: '80%',
        // top: Scale.moderateScale(-10)
    },
    offContainerRowType: {
        flexDirection: "row"
    },
    modelTitleContainer: {
        // marginVertical: Scale.moderateScale(4),
    },
    modelTitleText: {
        color: Colors.SILVERCHALICE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "left"
    },
    varietySection: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: Scale.moderateScale(3)
    },
    varietyContainer: {
        flexDirection: "row",
        marginRight: Scale.moderateScale(8)
    },
    varietyTitle: {
        color: Colors.SILVERCHALICE,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    varietyValue: {
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
    provider: {
        flexDirection: "row"
    },
    soldByText: {
        color: Colors.SILVERCHALICE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    providerTitle: {
        color: Colors.LOCHMARA,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
    reason: {
        flexDirection: "row",
        textAlign: 'left'
        // flex: 1
    },
    reasonTitleText: {
        color: Colors.SILVERCHALICE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: 'left'
    },
    reasonText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        flex: 1,
        textAlign: 'left'
    },
    //
    unavailableContainer: {
        backgroundColor: Colors.GALLERY,
        paddingVertical: Scale.moderateScale(4),
        paddingHorizontal: Scale.moderateScale(10),
        borderRadius: Scale.moderateScale(5),
        alignSelf: 'baseline',
        flexDirection: 'row'
    },
    unavailableText: {
        color: Colors.BOMBAY,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    },
    //
    connectProviderText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.SILVER,
    },
    // 
    cannotChangeContainer: {
        alignItems: 'flex-start'
    },
    cannotChangeText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.FIORD,
    }
});