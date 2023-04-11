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
  },
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
  //
  selectAddressBox: {
    backgroundColor: Colors.ALABASTER,
    paddingVertical: Scale.moderateScale(12),
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    paddingHorizontal: Scale.moderateScale(18),
    borderWidth: Scale.moderateScale(1),
    borderColor: Colors.ALTO,
    borderRadius: Scale.moderateScale(5),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selectAddressBoxText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
  },
  selectAddressBoxSelectedText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.FIORD,
  },
  inputErrorStyle: {
    borderColor: '#F44336',
  }
});