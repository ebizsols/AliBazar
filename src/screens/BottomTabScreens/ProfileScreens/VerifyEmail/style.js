import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';
import { Colors, Typography } from 'styles';

const { width, height } = Dimensions.get('window');
const realHeight = Platform.OS === 'android' ? Dimensions.get('window').height - StatusBar.currentHeight : Dimensions.get('window').height;

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
    height: realHeight
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
    // height: height / 2 - Scale.moderateScale(90)

  },
  firstToText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(8)
  },
  secTopText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    textAlign: "center",
    paddingHorizontal: Scale.moderateScale(20)
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
  buttonContainer: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center",
    marginTop: Scale.verticalScale(50)
  },

  bottomSection: {
    width: '100%',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: Scale.verticalScale(0)
  },
  bottomTexts: {
    flexWrap: "wrap",
    flexDirection: "row",
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
  emailText: {
    color: Colors.LOCHMARA,
  },
  //
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Scale.moderateScale(30)
  },
  //
  iconTop: {
    marginBottom: Scale.moderateScale(30),
    marginTop: Scale.moderateScale(10)
  },
  iconContainer: {

  }

});