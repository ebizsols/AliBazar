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
    backgroundColor: Colors.WHITE
  },
  contentContainer: {

  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Scale.moderateScale(20),
    paddingHorizontal: Scale.moderateScale(20)
  },
  emptyIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Scale.moderateScale(10)
  },
  emptyFirstText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(10)
  },
  emptySecText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.BIGSTONE,
    textAlign: "center"
  },
  cartItemLine: {
    height: Scale.moderateScale(2),
    width: '88%',
    alignSelf: "center",
    backgroundColor: Colors.GALLERY,
    borderRadius: Scale.moderateScale(3)
  },

  // order section
  orderSection: {
    paddingHorizontal: Scale.moderateScale(10),
    paddingVertical: Scale.moderateScale(10)
  },
  orderSummarySection: {
    backgroundColor: Colors.ALABASTER,
    paddingHorizontal: Scale.moderateScale(8),
    paddingVertical: Scale.moderateScale(12),
    borderRadius: Scale.moderateScale(5),
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
  // .....
  couponCodeInputContainer: {

  },
  couponCodeInputStyle: {
    paddingRight: Scale.moderateScale(110)
  },
  couponCodeApplyBtnContainer: {
    height: '100%',
    position: "absolute",
    width: Scale.moderateScale(100),
    top: 0,
    right: Scale.moderateScale(4),
    alignSelf: "center",
    // right: Scale.moderateScale(4),
    // top: Scale.moderateScale(4),
    justifyContent: "center",
    // alignItems: "center"
  },
  couponCodeApplyBtnStyle: {
    height: Scale.moderateScale(40),
  },
  //
  addedCouponCode: {
    marginTop: Scale.moderateScale(10)
  },
  addedCouponCodeWrapper: {
    backgroundColor: Colors.ALABASTER,
    paddingVertical: Scale.moderateScale(12),
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD,
    paddingHorizontal: Scale.moderateScale(18),
    borderWidth: Scale.moderateScale(1),
    borderColor: Colors.ALTO,
    borderRadius: Scale.moderateScale(5),
    flexDirection: "row",
    paddingRight: Scale.moderateScale(35)
  },
  addedCouponText: {
    color: Colors.BOMBAY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  addedCouponValueText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  addedCouponCloseIconContainer: {
    position: "absolute",
    right: 0,
    paddingRight: Scale.moderateScale(10),
    justifyContent: "center",
    alignSelf: "center",
    height: Scale.moderateScale(40),
  },
  // checkout
  chackOutSection: {
    flexDirection: "row",
    paddingHorizontal: Scale.moderateScale(10),
    paddingVertical: Scale.moderateScale(10),
    backgroundColor: Colors.WHITE,
    borderTopWidth: Scale.moderateScale(1),
    borderTopColor: Colors.GALLERY
  },
  chackOutPricesSection: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'flex-start'
  },
  chackOutItemCountText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),

  },
  chackOutPriceText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),

  },
  chackOutBtnSection: {
    flex: 1
  },
  //
  deliverToSection: {
    // marginBottom: Scale.verticalScale(10),
    backgroundColor: Colors.ALABASTER,
    paddingHorizontal: Scale.moderateScale(20)
  },
  deliverToContainer: {
    paddingVertical: Scale.moderateScale(8)
  },
  changeAreaRow: {
    flexDirection: "row"
  },
  deliverToTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  deliverToText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  deliverToValueText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    marginLeft: Scale.moderateScale(7)
  },
  changeAreaContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  changeAreaText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.LOCHMARA,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
});