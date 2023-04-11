import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Scale, Languages } from "common";
import { Colors, Typography } from "styles";
import TickIcon from "assets/icons/tick.svg";
import PropTypes from 'prop-types';

const RadioButton = (props) => {

  let radiobuttonStyle = {};
  if (props.isCheckBox) {
    radiobuttonStyle = {
      borderRadius: Scale.moderateScale(6),
    };
  }

  return (
    <View style={{}}>
      <TouchableOpacity disabled={props.disabled} onPress={() => {
        if (props.onPress)
          props.onPress(props.onPressData)
      }}
        style={[styles.radioButton,
        {
          backgroundColor: props.isSelected && props.styleType == 'tick' ? Colors.DODGERBLUE : 'transparent',
          borderColor: props.isSelected ? Colors.DODGERBLUE : Colors.MERCURY,
          width: props.width ? props.width : Scale.moderateScale(25),
          height: props.height ? props.height : Scale.moderateScale(25),
        },
          radiobuttonStyle,
        props.styleType == 'circle' ? styles.circleRadioButton : {}
        ]}>
        {props.isSelected && props.styleType == 'tick' ?
          <TickIcon style={{ color: "#FAFAFA" }} width={Scale.moderateScale(12)} height={Scale.moderateScale(12)} />
          :
          null}
        {props.isSelected && props.styleType == 'circle' ?
          <View style={styles.fillCircle}>

          </View>
          :
          null}
      </TouchableOpacity>
    </View>
  );
}

RadioButton.propTypes = {
  isSelected: PropTypes.bool,
  isCheckBox: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  onPressData: PropTypes.any,
  styleType: PropTypes.oneOf(['tick', 'circle']),
  width: PropTypes.any,
  height: PropTypes.any
};

RadioButton.defaultProps = {
  isSelected: false,
  isCheckBox: false,
  disabled: false,
  styleType: 'tick',
  width: Scale.moderateScale(25),
  height: Scale.moderateScale(25)
};

const styles = StyleSheet.create({
  radioButton: {
    borderColor: '#E4E6E7',
    borderWidth: Scale.moderateScale(3),
    width: Scale.moderateScale(25),
    height: Scale.moderateScale(25),
    borderRadius: Scale.moderateScale(50),
    justifyContent: "center",
    alignItems: "center"
  },
  circleRadioButton: {
    borderWidth: Scale.moderateScale(2),
  },
  fillCircle: {
    width: '80%',
    height: '80%',
    backgroundColor: Colors.DODGERBLUE,
    borderRadius: Scale.moderateScale(50)
  }
})

export default RadioButton;