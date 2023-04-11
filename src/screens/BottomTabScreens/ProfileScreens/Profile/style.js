import Scale from 'common/Scale';
import {
  StyleSheet,
} from 'react-native';
import { Colors, Typography } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1
  },
  contentContainer: {
    backgroundColor: Colors.WHITE,
  },


  shadowBottomContainer: {
    backgroundColor: Colors.WHITE,
    overflow: "hidden",
    paddingBottom: Scale.moderateScale(5)
  },
  shadowVerticalContainer: {
    backgroundColor: Colors.WHITE,
    overflow: "hidden",
    paddingVertical: Scale.moderateScale(10)
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },


  topNotLoginContainer: {
    flexDirection: "row",
    paddingVertical: Scale.moderateScale(22),
    backgroundColor: Colors.WHITE,
  },
  topNotLoginItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerIconContainer: {
    marginBottom: Scale.moderateScale(10)
  },
  headerItemFirstText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.BIGSTONE,
    marginBottom: Scale.moderateScale(5)
  },
  headerItemSecondText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.BIGSTONE
  },
  topNotLoginLineContainer: {
    justifyContent: "center"
  },
  topNotLoginLine: {
    width: Scale.moderateScale(1.3),
    backgroundColor: Colors.GALLERY,
    height: Scale.moderateScale(45)
  },

  localeSection: {
    backgroundColor: Colors.WHITE
  },
  localeItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(17),
    backgroundColor: Colors.WHITE,
  },
  localeItemText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    color: Colors.FIORD
  },
  languageText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },
  languageTextArabic: {
    fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR
  },
  selectedCountry: {
    flexDirection: "row",
    alignItems: "center"
  },
  selectedCountryIcon: {

  },
  selectedCountryText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
    marginLeft: Scale.moderateScale(10)
  },
  localLine: {
    height: Scale.moderateScale(1.3),
    backgroundColor: Colors.GALLERY,
    width: '90%',
    alignSelf: "center"
  },

  contactSection: {

  },
  contactItemContainer: {

  },
  contactItemStyle: {
    paddingVertical: Scale.moderateScale(12),
    paddingHorizontal: Scale.moderateScale(10)
  },
  contactItemTextWrapper: {
    justifyContent: "center",
    // alignItems: "center",
    alignItems: "flex-start",
    // alignSelf: "center",
    flex: 1
  },
  contactitemText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BIGSTONE,
  },


  rowContainers: {
    flexDirection: "row",
    marginVertical: Scale.moderateScale(18)
  },
  rowItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rowItemText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.FIORD,
    textAlign: "center"
  },


  copyrightContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Scale.moderateScale(7),
    paddingBottom: Scale.moderateScale(15)
  },
  copyrightText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_10,
    color: Colors.BOMBAY,
  },

  bottomSheetContentContainer: {
    backgroundColor: Colors.WHITE,
    height: '100%',
    paddingHorizontal: Scale.moderateScale(20)
  },
  sortByText: {
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_16
  },
  bottomSheetItemText: {

  },
  bottomSheetItemLine: {
    backgroundColor: Colors.GALLERY,
    height: Scale.moderateScale(1.8)
  },
  bottomSheetItemContainer: {
    paddingHorizontal: Scale.moderateScale(5),
    paddingVertical: Scale.moderateScale(10),
    flexDirection: "row",
    justifyContent: "center"
  },
  sortByContainer: {
    marginVertical: Scale.moderateScale(10),
    alignItems: 'flex-start'
  },
  bottomSheetRadioContainer: {
    justifyContent: "center"
  },
  bottomSheetIconRowContainer: {
    flex: 1,
    justifyContent: "center"
  },
  bottomSheetIconRowTextContainer: {
    justifyContent: "center",
    alignItems: 'flex-start',
    flex: 1
  },
  bottomSheetIconRowText: {
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16,
    // flex: 1
  },
  selectedBottomSheetItem: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
  },
  selectedBottomSheetItemArabic: {
    fontFamily: Typography.FONT_FAMILY_ARBFONTS_HANIMATIONARABICSEMIBOLD,
  },
  bottomSheetArabicLangText: {
    fontFamily: Typography.FONT_FAMILY_HANIMATION_REGULAR,
  },
  arrowIconContainerRtl: {
    transform: [
      { rotate: '270deg' }
    ]
  },
});