import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  ViewPropTypes,
  Image
} from 'react-native';
import { Scale, Languages } from "common";
import { RadioButton } from "components/UI";
import { Colors, Typography } from "styles";
import PropTypes from 'prop-types';
import UploadIcon from 'assets/icons/image-upload.svg';

const UploadImageBox = (props) => {

  let textStyle = {};
  if (props.isSelected) {
    textStyle = {
      fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    }
  }

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{props.lableText}</Text>
      </View>
      <TouchableOpacity onPress={() => props.onPress ? props.onPress() : {}} style={[styles.container, props.containerStyle]}>
        <View style={styles.box}>
          <View style={styles.imageSection}>
            <View style={styles.imageWrapper}>
              {
                props.uri ?
                  <Image source={{ uri: props.uri }} style={[styles.uploadedImage]} />
                  :
                  <UploadIcon
                    width={Scale.moderateScale(40)}
                    height={Scale.moderateScale(40)}
                  />
              }
            </View>
          </View>
          <View style={styles.textsSection}>
            {props.fileName ?
              <Text style={styles.imageNameText}>{props.fileName}</Text>
              :
              null}
            <Text style={styles.browseYourFileText}>{Languages.Common.BrowseYourFile}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {props.isInvalid ?
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{Languages.InputValidates.UploadFileRequired}</Text>
        </View>
        :
        null}
    </View>
  );
}

UploadImageBox.propTypes = {
  // isSelected: PropTypes.bool,
  lableText: PropTypes.string,
  // textStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};

UploadImageBox.defaultProps = {
  // isSelected: false,
  // textStyle: {},
  containerStyle: {}
};

const styles = StyleSheet.create({
  container: {

  },
  box: {
    flexDirection: "row",
    height: Scale.moderateScale(80),
    backgroundColor: Colors.ALABASTER,
    borderStyle: 'dashed',
    borderRadius: Scale.moderateScale(5),
    borderWidth: Scale.moderateScale(2),
    borderColor: Colors.ALTO,
    alignItems: "center"
  },
  imageSection: {
    width: Scale.moderateScale(70),
    height: Scale.moderateScale(70),
    justifyContent: "center",
    alignItems: "center"
  },
  imageWrapper: {

  },
  uploadedImage: {
    height: Scale.moderateScale(60),
    width: Scale.moderateScale(60),
    borderRadius: Scale.moderateScale(5),
    resizeMode: "cover"
  },
  textsSection: {

  },
  imageNameText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.BOMBAY
  },
  browseYourFileText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: '#0187D1'
  },
  //
  labelContainer: {
    marginBottom: Scale.moderateScale(8)
  },
  labelText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.FIORD,
  },
  //
  errorTextContainer: {
    position: "absolute",
    bottom: Scale.moderateScale(-20),
    zIndex: 100,
  },
  errorText: {
    color: '#F44336',
    fontSize: Typography.FONT_SIZE_11,
    fontFamily: Typography.FONT_FAMILY_REGULAR
  },
})

export default UploadImageBox;