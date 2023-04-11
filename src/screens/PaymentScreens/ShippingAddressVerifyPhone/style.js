import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { Colors, Typography } from 'styles';
const realHeight = Platform.OS === 'android' ? Dimensions.get('window').height - StatusBar.currentHeight : Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    // position: 'relative',
    // height: '100%'
  },
  shadowContainerStyle: {
    flex: 1,
    height: '100%',
    paddingBottom: 0
  },
  contentContainer: {
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(20)
  },
  topSection: {

  },
  topFirstText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    textAlign: "center"
  },
  topSecText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    textAlign: "center",
    marginTop: Scale.moderateScale(25),
    marginBottom: Scale.moderateScale(30)
  },
  phoneNumberContainer: {
    marginBottom: Scale.moderateScale(10)
  },
  phoneNumberText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    textAlign: "center"
  },
  changePhoneContainer: {

  },
  changePhoneText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DODGERBLUE,
    textAlign: "center"
  },
  verifyCodeContainer: {
    marginTop: Scale.moderateScale(15),
    marginBottom: Scale.moderateScale(20),
    justifyContent: "center",
    alignItems: "center"
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendFirstText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BIGSTONE,
  },
  resendSecText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DODGERBLUE,
  },
  skipContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Scale.moderateScale(50)
  },
  skipText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DODGERBLUE,
  },
  underlineStyleBase: {
    borderColor: Colors.ALTO,
    borderWidth: Scale.moderateScale(2),
    backgroundColor: Colors.ALABASTER,
    borderRadius: Scale.moderateScale(8),
    height: Scale.moderateScale(55),
    width: Scale.moderateScale(45),
    color: Colors.FIORD
  },

  underlineStyleHighLighted: {
    borderColor: Colors.LOCHMARA,
    borderWidth: Scale.moderateScale(2),
    borderRadius: Scale.moderateScale(8),
    color: Colors.FIORD,
  },
  otpContainer: {
    height: Scale.moderateScale(100),
    width: width - Scale.moderateScale(150),
    justifyContent: "center",
    alignItems: "center"
  }
});