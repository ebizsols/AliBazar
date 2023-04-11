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
  addressItemWrapper: {
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(15)
  },
  cartItemLine: {
    height: Scale.moderateScale(1.5),
    width: '92%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  bottomSheetContentContainer: {
    backgroundColor: Colors.WHITE,
    height: '100%',
    paddingHorizontal: Scale.moderateScale(10)
  },
  bottomSheetItemLine: {
    backgroundColor: Colors.GALLERY,
    height: Scale.moderateScale(1.8)
  },
  bottomSheetItemContainer: {
    // paddingVertical: Scale.moderateScale(15),
    height: Scale.moderateScale(55),
    justifyContent: 'center'
  },
  bottomSheetItemTextContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1
  },
  bottomSheetItemText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  bottomSheetItemTextDeleteText: {
    color: Colors.TORCHRED2,
  },
  /// empty view
  emptyViewContainer: {
    flex: 1,
    paddingHorizontal: Scale.moderateScale(20)
  },
  emptyTop: {
    flex: 1.8,
    alignItems: "center",
    justifyContent: "flex-end",

  },
  emptyIconContainer: {
  },
  emptyMiddle: {
    flex: 1,
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
    marginTop: Scale.moderateScale(20),
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  emptyBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Scale.moderateScale(20)
  }
});