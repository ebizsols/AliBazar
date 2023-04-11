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
  cartItemLine: {
    height: Scale.moderateScale(1.5),
    width: '92%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  // Order Section
  orderSection: {
    paddingVertical: Scale.moderateScale(10)
  },
  orderSummarySection: {
    backgroundColor: Colors.ALABASTER,
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(18),
    // borderRadius: Scale.moderateScale(5),
    marginBottom: Scale.moderateScale(20)
  },
  orderSummarySectionTitle: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    textAlign: 'left'
  },
  summaryItem: {
    flexDirection: "row",
    marginVertical: Scale.moderateScale(10)
  },
  summaryItemTitleContainer: {
    flex: 1,
    flexDirection: "row"
  },
  itemTitleText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD
  },
  itemItemsCount: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE,
    marginLeft: Scale.moderateScale(15)
  },
  summaryItemValueContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  itemValueText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
  },
  shippingValueText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.LOCHMARA,
  },
  discountTitle: {
    color: Colors.BIGSTONE
  },
  discountValue: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.SHAMROCK,
  },
  summaryLine: {
    height: Scale.moderateScale(2),
    width: '100%',
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  extraPaddingHorizontal: {
    paddingHorizontal: Scale.moderateScale(5)
  },
  totalTitle: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE
  },
  totalSummaryValueContainer: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end"
  },
  summaryOffContainer: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end"
  },
  summaryItemOffLabelText: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE,
  },
  summaryInclusiveOfVat: {
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE
  },
  summaryInclusiveItemValue: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE
  },
  //
  screenPadding: {
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(15)
  },
  // payment
  payWithCashContainer: {
    flexDirection: "row",
    backgroundColor: Colors.ALABASTER,
    paddingVertical: Scale.moderateScale(10)
  },
  paymentText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(5)
  },
  switchContainer: {
    paddingRight: Scale.moderateScale(5)
  },
  textsContainer: {

  },
  paymentFirstText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE
  },
  paymentSecText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    marginTop: Scale.moderateScale(8)
  },
  // pay with
  payWithSection: {
    paddingHorizontal: Scale.moderateScale(10)
  },
  payWithItemContainer: {
    paddingVertical: Scale.moderateScale(15)
  },
  payWithItem: {
    flexDirection: "row"
  },
  payWithItemLeft: {
    paddingRight: Scale.moderateScale(8)
  },
  payWithItemRight: {
    flexDirection: "row"
  },
  payWithItemIconContainer: {
    marginRight: Scale.moderateScale(15)
  },
  payWithItemTextContainer: {
    justifyContent: 'center'
  },
  payWithItemText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.BIGSTONE
  },
  withCashText: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    marginTop: Scale.moderateScale(10)
  },
  withCashTextDiff: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.FIORD
  },
  // 
  carouselHeader: {
    alignItems: "center",
    flexDirection: "row"
  },
  headerLeftColor: {
    backgroundColor: Colors.TULIPTREE,
    width: Scale.moderateScale(10),
    height: Scale.moderateScale(50),
    borderTopRightRadius: Scale.moderateScale(15),
    borderBottomRightRadius: Scale.moderateScale(15),
  },
  carouselHeaderTextsContainer: {

  },
  title: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    marginHorizontal: Scale.moderateScale(15)
  },
  itemCountText: {
    color: Colors.BOMBAY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    marginHorizontal: Scale.moderateScale(15),
    marginTop: Scale.moderateScale(3)
  },
  itemLine: {
    height: Scale.moderateScale(1.5),
    width: '90%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },
  //
  paymentMethodsContainer: {
    paddingHorizontal: Scale.moderateScale(15),
    paddingTop: Scale.moderateScale(10)
  },
  paymentMethodItem: {
    flexDirection: "row",
    paddingVertical: Scale.moderateScale(5),
    alignItems: "center"
  },
  paymentMethodItemRadioContainer: {

  },
  paymentLogoContainer: {
    marginLeft: Scale.moderateScale(8)
  },
  paymentMethodItemText: {
    marginLeft: Scale.moderateScale(8),
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
  },
  //
  dataBox: {
    backgroundColor: Colors.ALABASTER,
    paddingHorizontal: Scale.moderateScale(15),
    paddingVertical: Scale.moderateScale(8),
    borderWidth: Scale.moderateScale(0.5),
    borderColor: Colors.BOMBAY,
    borderRadius: Scale.moderateScale(2),
    marginTop: Scale.moderateScale(5)
  },
  dataBoxText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    textAlign: 'left'
  },
  crediMaxInputsContainer: {
    paddingVertical: Scale.moderateScale(10)
  },
  //
  inputContainer: {
    marginTop: Scale.moderateScale(17)
  },
  expireInputsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  expireInputContainer: {
    width: Scale.moderateScale(100)
  },
  monthExpireInputContainer: {
    marginRight: Scale.moderateScale(10)
  },
  yearExpireInputContainer: {

  },
  inputStyle: {
    backgroundColor: Colors.WHITE,
    height: Scale.moderateScale(40)
  },

});