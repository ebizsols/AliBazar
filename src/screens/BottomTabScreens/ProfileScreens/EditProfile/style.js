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
  contentContainer: {
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    // height: realHeight
  },
  createAccountText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  bottomTextContainer: {
    marginTop: Scale.verticalScale(0)
  },
  inputsContainer: {
    // height: height / 3
    height: '100%'
  },
  inputContainer: {
    paddingBottom: Scale.moderateScale(17)
  },

  bottomSection: {
    // width: '100%',
    // flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
    // bottom: Scale.verticalScale(0)
  },
  bottomTexts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  secText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  bottomText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center",
    marginTop: Scale.moderateScale(40)
  },
  emailInputStyle: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BOMBAY,
  },
  emailCanNotChangeTextContainer: {
    marginTop: Scale.moderateScale(6)
  },
  emailCanNotChangeText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.BOMBAY,
  },
  shadowContainerStyle: {
    flex: 1,
    // height: '100%',
    paddingBottom: 0
  },
  //
  emailSection: {
    // flex: 1
  },
  emailLabel: {
    alignItems: 'flex-start'
  },
  emailLabelText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD
  },
  emailContainer: {
    paddingVertical: Scale.moderateScale(12),
    paddingLeft: Scale.moderateScale(18),
    textAlign: "left",
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start'
  },
  emailText: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
  },
  verifyEmailContainer: {
    // flex: 1
  },
  verifyEmailText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.TORCHRED,
  },
});