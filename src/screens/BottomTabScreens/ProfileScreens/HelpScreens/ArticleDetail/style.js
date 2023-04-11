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
    // paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(10)
  },
  articleTexts: {
    marginTop: Scale.moderateScale(15)
  },
  headerTitleText: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(15),
    textAlign: 'left'
  },
  headerDescription: {

  },
  //
  bottomSection: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(10)
  },
  wasHelpfulText: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Scale.moderateScale(70),
    height: Scale.moderateScale(35),
    borderRadius: Scale.moderateScale(2),
    borderWidth: Scale.moderateScale(1),
    borderColor: Colors.LOCHMARA,
    marginHorizontal: Scale.moderateScale(5)
  },
  buttonText: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.LOCHMARA,
  },
  activeBtn: {
    backgroundColor: Colors.LOCHMARA,
  },
  activeBtnText: {
    color: Colors.WHITE
  },
  //
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: Scale.moderateScale(10),
    paddingVertical: Scale.moderateScale(15),
    alignItems: "center",
  },
  otherArticlesText: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.FIORD,
  },
  otherArticlesContainer: {
    paddingHorizontal: Scale.moderateScale(15),
  },
  otherArticleItem: {
    paddingVertical: Scale.moderateScale(5)
  },
  otherArticleItemText: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD2,
    textAlign: 'left'
  },
});