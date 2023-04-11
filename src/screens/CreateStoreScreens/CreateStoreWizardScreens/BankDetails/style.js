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
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    paddingBottom: Scale.moderateScale(50)
  },
  //
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Scale.moderateScale(22)
  },
  topText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE
  },
  //
  inputsContainer: {
  },
  inputContainer: {
    paddingBottom: Scale.moderateScale(17)
  },
  //
  commentInputStyle: {
    height: Scale.moderateScale(150),
    textAlignVertical: "top",
  },
});