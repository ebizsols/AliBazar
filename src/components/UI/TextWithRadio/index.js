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
} from 'react-native';
import { Scale, Languages } from "common";
import { RadioButton } from "components/UI";
import { Colors, Typography } from "styles";
import PropTypes from 'prop-types';

const TextWithRadio = (props) => {

  let textStyle = {};
  if (props.isSelected && props.boldTextWhenSelected) {
    textStyle = {
      fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
    }
  }

  return (
    <TouchableOpacity onPress={() => props.onPress ? props.onPress() : {}} style={[styles.container, props.containerStyle]}>
      <View style={styles.checkIconContainer}>
        <RadioButton onPress={() => props.onPress ? props.onPress() : {}} isCheckBox={props.isCheckBox} isSelected={props.isSelected} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, props.textStyle, textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

TextWithRadio.propTypes = {
  isSelected: PropTypes.bool,
  isCheckBox: PropTypes.bool,
  title: PropTypes.string,
  textStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  boldTextWhenSelected: PropTypes.bool
};

TextWithRadio.defaultProps = {
  isSelected: false,
  isCheckBox: false,
  textStyle: {},
  containerStyle: {},
  boldTextWhenSelected: true
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: Scale.moderateScale(15)
  },
  textContainer: {
    marginLeft: Scale.moderateScale(15),
    justifyContent: 'center',
  },
  text: {
    color: Colors.BIGSTONE,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_16
  }
})

export default TextWithRadio;