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
    // position: 'relative',
    // height: '100%'
  },
  contentContainer: {
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(10),
    // height: realHeight
  },
  createAccountText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  inputsContainer: {
    // height: height / 3
    height: '100%'
  },
  inputContainer: {
    paddingBottom: Scale.moderateScale(17)
  },

  bottomSection: {
    // width: '100%',
    // flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
    // bottom: Scale.verticalScale(0)
  },
  secText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  bottomText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.LOCHMARA,
    textAlign: "center",
    marginTop: Scale.moderateScale(40)
  },
  shadowContainerStyle: {
    flex: 1,
    // height: '100%',
    paddingBottom: 0
  },
  // showAddress
  showAddress: {
    backgroundColor: Colors.ALABASTER,
    paddingVertical: Scale.moderateScale(5),
    color: Colors.FIORD,
    paddingHorizontal: Scale.moderateScale(18),
    borderWidth: Scale.moderateScale(1),
    borderColor: Colors.ALTO,
    borderRadius: Scale.moderateScale(5),
    textAlign: "left",
    paddingRight: Scale.moderateScale(5),
    flexDirection: "row"
  },
  showAddressLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-start'
  },
  showAddressTitleText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.SILVERCHALICE,
    marginBottom: Scale.moderateScale(7)
  },
  showAddressText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
  },
  showAddressRight: {

  },
  showAddressIconContainer: {
    width: Scale.moderateScale(50),
    height: Scale.moderateScale(50),
    backgroundColor: '#868686',
    borderRadius: Scale.moderateScale(5),
    justifyContent: "center",
    alignItems: "center"
  },
  mapOverlay: {
    position: "absolute",
    backgroundColor: '#000',
    borderRadius: Scale.moderateScale(5),
    opacity: 0.5,
    height: '100%',
    width: '100%'
  },
  specItemContainer: {
    marginVertical: Scale.moderateScale(5)
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioContainer: {
    marginRight: Scale.moderateScale(15)
  },
  textContainer: {

  },
  specText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
});