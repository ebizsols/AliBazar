import Scale from 'common/Scale';
import {
  StyleSheet,
} from 'react-native';
import { Colors, Typography } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },



  bottomSheetContentContainer: {
    backgroundColor: Colors.WHITE,
    height: '100%',
    paddingHorizontal: Scale.moderateScale(20)
  },
  bottomSheetItem: {
    height: Scale.moderateScale(55)
  },
  sortByText: {
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'left'
  },
  bottomSheetItemLine: {
    backgroundColor: Colors.GALLERY,
    height: Scale.moderateScale(1.8)
  },
  sortItemContainer: {
    paddingHorizontal: Scale.moderateScale(5)
  },
  sortByContainer: {
    marginVertical: Scale.moderateScale(10)
  },
  emptyViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  emptyViewText: {
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_18
  },

  shimmerPlaceHolderWrapper: {
    marginTop: Scale.moderateScale(80)
  },

  loaderContainer: {
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE
  },
  lottie: {
    width: Scale.moderateScale(50),
    height: Scale.moderateScale(50),
    justifyContent: "center",
    alignSelf: "center",
  },
});