import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { Colors, Typography } from 'styles';
// const realHeight = Platform.OS === 'android' ? Dimensions.get('window').height - StatusBar.currentHeight : Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    // flex: 1,
    position: 'relative',
    height: height - Scale.moderateScale(100)
  },
  cartItemLine: {
    height: Scale.moderateScale(1.5),
    width: '92%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  /// empty view
  emptyViewContainer: {
    flex: 1,
    paddingHorizontal: Scale.moderateScale(20)
  },
  emptyTop: {
    // flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Scale.moderateScale(40),
    marginBottom: Scale.moderateScale(30)
  },
  emptyIconContainer: {
  },
  emptyMiddle: {
    // flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: '100%',
    // flex: 1,
    // flexGrow: 1,
    justifyContent: 'flex-end'
  },
  emptyTextFirst: {
    textAlign: "center",
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    marginBottom: Scale.moderateScale(30)
  },
  emptyTextSecond: {
    textAlign: "center",
    marginTop: Scale.moderateScale(20),
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  emptyBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Scale.moderateScale(20)
  },
});