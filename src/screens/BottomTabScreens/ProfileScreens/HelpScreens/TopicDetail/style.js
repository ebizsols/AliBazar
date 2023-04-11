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
  },
  contentContainer: {
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(10)
  },
  header: {
    marginBottom: Scale.moderateScale(5)
  },
  headerTitleText: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    textAlign: 'left'
  },
  articleCountText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE,
    marginBottom: Scale.moderateScale(15),
    textAlign: 'left'
  },
  headerDescription: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    textAlign: 'left'
  },
  topicItemContainer: {
    paddingVertical: Scale.moderateScale(10)
  },
  //
  itemLine: {
    height: Scale.moderateScale(1.5),
    width: '90%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  }
});