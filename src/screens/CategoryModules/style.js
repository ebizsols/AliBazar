import Scale from 'common/Scale';
import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // paddingTop: Scale.moderateScale(5),
    // paddingBottom: Scale.moderateScale(20)
  },
  shimmerItemWrapper: {
    marginVertical: Scale.moderateScale(10)
  }
});