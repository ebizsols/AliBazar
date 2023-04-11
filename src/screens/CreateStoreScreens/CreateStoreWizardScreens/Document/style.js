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
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    paddingBottom: Scale.moderateScale(40)
  },
  //
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Scale.moderateScale(25)
  },
  topText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE
  },
  //
  bottomText: {
    marginTop: Scale.moderateScale(5),
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BOMBAY
  },
});