import { StyleSheet } from 'react-native'
import { Scale } from "common";
import { Colors, Typography } from "styles";

export default StyleSheet.create({
    button: {
        height: Scale.verticalScale(48),
        backgroundColor: Colors.LOCHMARA,
        borderRadius: Scale.scale(5),
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        backgroundColor: '#9cc5db',
        borderColor: '#9cc5db'
    },
    buttonText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontWeight: "700",
        color: Colors.WHITE,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonBorder: {
        borderStyle: "solid",
        borderWidth: Scale.moderateScale(1.9),
        borderColor: Colors.LOCHMARA
    },
    loaderContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center"
    },
    lottie: {
        width: Scale.moderateScale(150),
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        alignContent: 'center',
        marginLeft: Scale.moderateScale(18),
    },
})
