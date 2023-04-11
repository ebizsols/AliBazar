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
    backgroundColor: Colors.WHITE
  },
  contentContainer: {

  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Scale.moderateScale(20),
    paddingHorizontal: Scale.moderateScale(20)
  },
  emptyIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Scale.moderateScale(10)
  },
  emptyFirstText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(10)
  },
  emptySecText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.BIGSTONE,
    textAlign: "center"
  },
  cartItemLine: {
    height: Scale.moderateScale(2),
    width: '88%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  emptySignInText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center"
  }
});