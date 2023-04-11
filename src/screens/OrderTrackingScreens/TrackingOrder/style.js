import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  I18nManager
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
  orderSectionTop: {
    paddingHorizontal: Scale.moderateScale(20),
  },
  orderSectionTopText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(15),
    textAlign: 'left'
  },
  orderSectionTopCreditCard: {
    flexDirection: "row",
    flex: 1
  },
  orderSectionTopCardNumber: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.BIGSTONE
  },
  orderSectionTopCardText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.SILVERCHALICE
  },
  orderSection: {
    // paddingHorizontal: Scale.moderateScale(10),
    paddingVertical: Scale.moderateScale(10)
  },
  orderSummarySection: {
    marginTop: Scale.moderateScale(10),
    backgroundColor: Colors.ALABASTER,
    paddingHorizontal: Scale.moderateScale(30),
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
  //
  cancelBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Scale.moderateScale(15)
  },
  cancelBtnTextStyle: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.JAFFA,
  },
  cancelBtnStyle: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.JAFFA,
    alignSelf: "baseline",
    paddingHorizontal: Scale.moderateScale(10)
  },
  //
  paymentMethodContainer: {
    paddingLeft: I18nManager.isRTL ? 0 : Scale.moderateScale(15),
    paddingRight: I18nManager.isRTL ? Scale.moderateScale(15) : 0,
    flexDirection: 'row',
    alignItems: 'center'
  }
});