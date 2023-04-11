import { Scale } from 'common';
import {
    StyleSheet,
    I18nManager
} from 'react-native';

// FONT FAMILY
export const FONT_FAMILY_PROXIMANOVABOLDSelect = () => {
    return !I18nManager.isRTL ? 'ProximaNova-Bold' : 'HaniArb-SemiBold';
};
export const FONT_FAMILY_PROXIMANOVA_REGULARSelect = () => {
    return !I18nManager.isRTL ? 'ProximaNova-Regular' : 'HaniArb-Regular';
};
export const FONT_FAMILY_ARBFONTS_HANIMATIONARABICSEMIBOLD = 'HaniArb-SemiBold';
export const FONT_FAMILY_HANIMATION_REGULAR = 'HaniArb-Regular';
export const FONT_FAMILY_PROXIMANOVA_REGULAR = 'ProximaNova-Regular';
export const FONT_FAMILY_PROXIMANOVABOLD = 'ProximaNova-Bold';

// FONT WEIGHT
// export const FONT_WEIGHT_REGULAR = '400';
// export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
// export const FONT_SIZE_24 = Scale.moderateScale(22);
// export const FONT_SIZE_18 = Scale.moderateScale(19);
// export const FONT_SIZE_16 = Scale.moderateScale(17);
// export const FONT_SIZE_15 = Scale.moderateScale(16);
// export const FONT_SIZE_14 = Scale.moderateScale(15);
// export const FONT_SIZE_12 = Scale.moderateScale(13);
// export const FONT_SIZE_11 = Scale.moderateScale(11);
// export const FONT_SIZE_10 = Scale.moderateScale(10.8);

export const FONT_SIZE_24 = Scale.moderateScale(20);
export const FONT_SIZE_18 = Scale.moderateScale(16);
export const FONT_SIZE_16 = Scale.moderateScale(15);
export const FONT_SIZE_15 = Scale.moderateScale(14);
export const FONT_SIZE_14 = Scale.moderateScale(13);
export const FONT_SIZE_12 = Scale.moderateScale(11);
export const FONT_SIZE_11 = Scale.moderateScale(9);
export const FONT_SIZE_10 = Scale.moderateScale(8.8);

// LINE HEIGHT
// export const LINE_HEIGHT_24 = scaleFont(24);
// export const LINE_HEIGHT_20 = scaleFont(20);
// export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
// export const FONT_REGULAR = {
//   fontFamily: FONT_FAMILY_REGULAR,
//   fontWeight: FONT_WEIGHT_REGULAR,
// };

// export const FONT_BOLD = {
//   fontFamily: FONT_FAMILY_BOLD,
//   fontWeight: FONT_WEIGHT_BOLD,
// };
