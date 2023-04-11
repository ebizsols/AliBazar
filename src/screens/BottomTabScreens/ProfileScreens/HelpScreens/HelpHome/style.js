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

  },
  headerContainer: {

  },
  headerContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
  headerInputContainer: {
    width: '70%'
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: Scale.moderateScale(8),
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.WHITE,
    paddingHorizontal: Scale.moderateScale(18),
    borderWidth: Scale.moderateScale(0.7),
    borderColor: Colors.WHITE,
  },
  inputLabel: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.WHITE,
  },
  // items container
  itemsContainer: {

  },
  // item
  itemShadowContainer: {
    paddingHorizontal: Scale.moderateScale(20),
    borderRadius: Scale.moderateScale(10)
  },
  shadowContentContainer: {
    borderRadius: Scale.moderateScale(5)
  },
  itemContainer: {
    flexDirection: 'row',
    // marginHorizontal: Scale.moderateScale(10),
    // marginVertical: Scale.moderateScale(10)
    paddingVertical: Scale.moderateScale(10),
    paddingRight: Scale.moderateScale(10)
  },
  itemImageContainer: {
    justifyContent:  'center',
    alignItems: 'center',
    paddingHorizontal: Scale.moderateScale(20)
  },
  itemBodyContainer: {
    flex: 1
  },
  itemTitle: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(7),
    textAlign: 'left'
  },
  itemDescription: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    textAlign: 'left'
  },
  itemFooter: {
    marginTop: Scale.moderateScale(10)
  },
  itemLine: {
    height: Scale.moderateScale(1.5),
    width: '100%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  itemFooterText: {
    marginTop: Scale.moderateScale(5),
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE,
    textAlign: 'left'
  }
  

});