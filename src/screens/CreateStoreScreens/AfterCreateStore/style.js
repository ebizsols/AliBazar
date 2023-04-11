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
    position: 'relative',
    // flex: 1,
    // height: '100%'
  },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
    // paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    // height: realHeight
  },
  closeContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: Scale.moderateScale(8),
    paddingHorizontal: Scale.moderateScale(15),
  },
  closeIconWrapper: {

  },
  tickIconContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  topTextsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Scale.moderateScale(10),
    marginBottom: Scale.moderateScale(20)
  },
  firstText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(8)
  },
  secText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    textAlign: "center"
  },
  contentText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    marginTop: Scale.moderateScale(25),
    lineHeight: Scale.moderateScale(23)
  },
  emailText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
  },
  //
  btnContainer: {
    position: "absolute",
    bottom: Scale.moderateScale(20),
    paddingHorizontal: Scale.moderateScale(20),
    width: '100%',
  }
});