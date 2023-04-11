import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { PathHelper } from 'common';
import Scale from 'common/Scale';
import { ProgressiveImage } from 'components/UI';
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
  type
}) => {

  let imageUrl = null;
  if (type == 'provider') {
    imageUrl = item;
  } else {
    imageUrl = PathHelper.getSliderImagePath(item[imageKey])
  }

  return (
    <TouchableOpacity disabled={item.haveLink != true} activeOpacity={1} style={styles.container} onPress={() => onPress(item)}>
      {/* <Image
        style={[styles.image, style, { height: height }]}
        source={local ? imageUrl : { uri: imageUrl }}
      /> */}
      {height != 1 ?
        <ProgressiveImage
          borderRadius={Scale.moderateScale(1)}
          imageStyle={{ width: width }}
          height={height}
          width={width}
          source={imageUrl}
          resizeMode={FastImage.resizeMode.contain}
        />
        :
        null}

    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    height: Scale.verticalScale(210),
    resizeMode: "cover",
  },
});
