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
  inputContainer: {
    marginTop: Scale.moderateScale(30)
  },
  cancelContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    // marginBottom: Scale.moderateScale(800),
    flex: 1
    // height: '100%'
  },
  cancelText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DODGERBLUE,
    marginBottom: Scale.moderateScale(180),
  }
});