import { Scale } from 'common';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { Colors, Typography } from 'styles';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: Colors.WHITE,
  },
  productSliderSection: {

  },
  contentSection: {

  },
  mainPaddingContent: {
    paddingHorizontal: Scale.moderateScale(15)
  },
  goodsInfoAndVarietySection: {
  },
  goodsTitleContainer: {
    marginTop: Scale.moderateScale(8)
  },
  goodsTitleText: {
    textAlign: "left",
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
  },
  brandTitleText: {
    textAlign: 'left',
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.LOCHMARA,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  twoTextFirst: {
    textAlign: "left",
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.SILVERCHALICE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  twoTextSecond: {
    color: Colors.FIORD,
  },
  vatText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    textAlign: 'left'
  },
  paddingWrapper: {
    paddingVertical: Scale.moderateScale(8)
  },
  separateLineContainer: {
    paddingHorizontal: Scale.moderateScale(12),
    paddingVertical: Scale.moderateScale(5)
  },
  separateLine: {
    height: Scale.moderateScale(1.5),
    backgroundColor: Colors.GALLERY
  },


  varietySection: {
    paddingTop: Scale.moderateScale(8),
  },
  deliverToSection: {
    marginVertical: Scale.verticalScale(10),
    backgroundColor: Colors.ALABASTER
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
  postByContainer: {

  },
  postByText: {
    textAlign: 'left',
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.SILVERCHALICE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  marketIconContainer: {
    marginVertical: Scale.moderateScale(10),
    // flexDirection: 'row'
  },
  shippinIconContainer: {
    flexDirection: 'row'
  },
  shippinHelpIconContainer: {
    justifyContent: 'center',
    marginLeft: Scale.moderateScale(10)
  },
  postMethodDescTextContainer: {
    marginTop: Scale.moderateScale(5),
    paddingHorizontal: Scale.moderateScale(5)
  },
  postMethodDescText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    textAlign: 'left'
  },
  deliveredByContainer: {
    marginTop: Scale.moderateScale(5)
  },
  deliverByText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },
  deliverByDayText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },

  providerSection: {
  },
  providerContainer: {
    marginBottom: Scale.verticalScale(10),
    backgroundColor: Colors.ALABASTER,
    paddingVertical: Scale.moderateScale(12),
    paddingHorizontal: Scale.moderateScale(16)
  },
  textRowContainer: {
    flex: 1
  },
  marginBottomWrapper: {
    marginBottom: Scale.moderateScale(15)
  },
  providerTextsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexGrow: 2
  },
  soldByText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.SILVERCHALICE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  providerTitle: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.LOCHMARA,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  iconText: {
    textAlign: 'left',
    flexDirection: "row",
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
  },


  otherProvidersSection: {
  },
  providerSeprateLine: {
    marginVertical: Scale.moderateScale(8),
    height: Scale.moderateScale(1),
    backgroundColor: Colors.MERCURY,
    width: '90%',
    alignSelf: "center"
  },
  otherProvidersWrapper: {
    minHeight: Scale.moderateScale(30),
    width: '100%',
  },
  providersScrollView: {
    // height: 200
  },

  otherOfferContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Scale.moderateScale(5),
    flexDirection: "row",
    marginTop: Scale.moderateScale(15),

  },
  otherOfferText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    marginRight: Scale.moderateScale(10)
  },
  lessText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.LOCHMARA,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },

  scene: {
    // flex: 1,
    height: Scale.moderateScale(300)
  },
  tabbar: {
    backgroundColor: '#fff'
  },
  indicator: {
    backgroundColor: '#F0B440',
    height: Scale.moderateScale(3)
  },
  label: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    textAlign: "center"
  },
  tabStyle: {
    width: width / 3
  },
  tabsContainer: {
    marginTop: Scale.moderateScale(30)
  },

  notAvailabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexGrow: 2
  },
  notAvailabelText: {
    fontSize: Typography.FONT_SIZE_16,
    color: '#e62525',
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  backdrop: {
    backgroundColor: Colors.BLACK,
    width: '100%',
    zIndex: 12,
    opacity: 0.5,
    height: '100%',
    position: "absolute",
    top: 0,
    left: 0
  },
  //
  goodsDetailInfo: {
    marginVertical: Scale.moderateScale(10)
  },
  rowItem: {

  },
  rowItemContainerStyle: {
    paddingVertical: Scale.moderateScale(10),
    paddingHorizontal: Scale.moderateScale(20)
  },
  rowItemTextContainer: {

  },
  rowItemText: {
    fontSize: Typography.FONT_SIZE_15,
    color: Colors.FIORD,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    textAlign: 'left'
  },
  //
  deActiveProviderTitle: {
    color: Colors.FIORD,
  },
  //
  likeIcnContainer: {
    position: 'absolute',
    right: Scale.moderateScale(15),
    top: Scale.moderateScale(20),
    zIndex: 1
  },
  likeIconContainer: {
    backgroundColor: Colors.GALLERY,
    padding: Scale.moderateScale(8),
    // paddingBottom: Scale.moderateScale(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scale.moderateScale(20)
  },
  //
  backToTopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Scale.moderateScale(5)
  },
  backToTopWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Scale.moderateScale(5),
    paddingHorizontal: Scale.moderateScale(5),
    flexDirection: 'row'
    // backgroundColor: 'red'
  },
  backToTopText: {

  }
});
