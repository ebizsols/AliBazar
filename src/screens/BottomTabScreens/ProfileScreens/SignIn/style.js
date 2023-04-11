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
    height: '100%',
    position: 'relative',
  },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    height: Platform.OS === 'android' ? realHeight : realHeight - Scale.moderateScale(70) // important: check this
  },
  closeContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: Scale.moderateScale(8)
  },
  closeIconWrapper: {

  },
  topTextsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 3 - Scale.moderateScale(70)
  },
  welcomeText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(8)
  },
  signYourAccountText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  textAndForgetContainer: {
    marginTop: Scale.verticalScale(20)
  },
  inputsContainer: {
    // height: height / 3
  },
  inputContainer: {
    paddingBottom: Scale.moderateScale(20)
  },
  foregetPasswordText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center",
    marginTop: Scale.moderateScale(15)
  },

  bottomSection: {
    width: '100%',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: Scale.verticalScale(0)
  },
  bottomTexts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  firstText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  secText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  signupText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center",
    marginTop: Scale.moderateScale(5)
  },

});