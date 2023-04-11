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
    // height: '100%',
    position: 'relative',
  },
  contentContainer: {
    flexDirection: "column",
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
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
  chooseText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    marginVertical: Scale.moderateScale(3)
  },
  //
  radioContentContainer: {

  },
  selectItemContainer: {
    flexDirection: "row",
    paddingVertical: Scale.moderateScale(15)
  },
  radioWrapper: {

  },
  iconRowWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  cityIconRowWrapper: {
    marginLeft: Scale.moderateScale(10)
  },
  iconContainer: {
    marginHorizontal: Scale.moderateScale(10)
  },
  iconRowTextContainer: {
    justifyContent: "center"
  },
  iconRowText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE
  },
  //
  itemLine: {
    height: Scale.moderateScale(1.5),
    width: '100%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  chooseCityText: {
    marginLeft: Scale.moderateScale(50)
  },
  arrowContainer: {
    paddingRight: Scale.moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    left: 0
  },
  arrowContainerRtl: {
    transform: [
      {
        rotate: '180deg',
      }
    ]
  },
});