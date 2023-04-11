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
  //
  selectItemsText: {
    color: Colors.BOMBAY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    textAlign: 'left'
  },
  //
  screenPadding: {
    paddingHorizontal: Scale.moderateScale(20),
    paddingVertical: Scale.moderateScale(15)
  },
});