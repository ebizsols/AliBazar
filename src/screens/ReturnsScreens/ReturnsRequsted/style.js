import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { Colors, Typography } from 'styles';
// const realHeight = Platform.OS === 'android' ? Dimensions.get('window').height - StatusBar.currentHeight : Dimensions.get('window').height;

// const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    position: 'relative',
    height: '100%'
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Scale.moderateScale(20)
  },
  emptyTop: {
    alignItems: "center",
    justifyContent: "flex-end",
    
  },
  emptyIconContainer: {
    marginBottom: Scale.moderateScale(20)
  },
  emptyMiddle: {
    alignItems: "center",
    paddingHorizontal: Scale.moderateScale(5)
  },
  emptyTextFirst: {
    textAlign: "center",
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
  },
  emptyTextSecond: {
    textAlign: "center",
    marginTop: Scale.moderateScale(15),
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  //
  iteWrapper: {
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(20)
  },
  //
  //
  lottie: {
    width: Scale.moderateScale(50),
    height: Scale.moderateScale(50),
    justifyContent: "center",
    alignSelf: "center",
},
});