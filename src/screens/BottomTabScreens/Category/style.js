import Scale from 'common/Scale';
import {
  StyleSheet,
} from 'react-native';
import { Colors } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    minHeight: '100%'
  },
  shadowWrapper: {
    paddingVertical: Scale.moderateScale(6)
  }
});