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
        width: Scale.moderateScale(100),
        // paddingTop: Scale.moderateScale(10),
        marginHorizontal: Scale.moderateScale(6)
    },
    productContainer: {
        // paddingHorizontal: Scale.moderateScale(10),
        // position: "relative",
        paddingVertical: Scale.moderateScale(10),
        width: '100%'
    },
    imageContainer: {
        paddingTop: Scale.moderateScale(10),
    },
    imageWrapper: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red',
        paddingVertical: Scale.moderateScale(7),
        paddingHorizontal: Scale.moderateScale(5)
    },   
    bodyContainer: {
        paddingHorizontal: Scale.moderateScale(10),
        // flex: 1
    },
    titleContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Scale.moderateScale(4)
    },
    titleText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "center"
    },
    productCountContainer: {

    },
    productCountText: {
        marginTop: Scale.moderateScale(3),
        fontSize: Typography.FONT_SIZE_10,
        color: Colors.BOMBAY,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        textAlign: "center"
    }
});