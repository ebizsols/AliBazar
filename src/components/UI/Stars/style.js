import { StyleSheet } from 'react-native';
import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
import { Scale } from 'common';
import { Typography, Colors } from 'styles';

export default StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: Scale.moderateScale(7)
  },
  text: {
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_12
  }
});
