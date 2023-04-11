import React, { Component } from 'react';
import { View, Text, Animated, Image, TouchableOpacity, StyleSheet } from 'react-native';

import SuccessIcon from "assets/icons/tick2.svg";
import CloseIcon from "assets/icons/close-snack.svg";

// import Info from './../../../assets/icons/info.svg'

// import Error from './../../../assets/icons/cancel.svg'

import PropTypes from 'prop-types';
import { Typography } from 'styles';
import { Scale } from 'common';

const SUCCESS = 1;
const ERROR = 2;
const INFO = 3;

class SnackBar extends Component {

  constructor() {
    super();

    this.animatedValue = new Animated.Value(Scale.moderateScale(50));

    this.snackBarShown = false;

    this.snackBarHidden = true;

    this.state = { message: '', type: 1, showTryAgainObj: false };
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  show(message, type, tryAgain = false, duration = 5000) {
    if (this.snackBarShown === false) {
      this.setState({ message: message, type: type, showTryAgainObj: tryAgain });

      this.snackBarShown = true;

      Animated.timing
        (
          this.animatedValue,
          {
            toValue: 0,
            duration: 350,
            useNativeDriver: true
          }
        ).start(this.hide(duration));
    }
  }

  hide = (duration) => {
    this.timerID = setTimeout(() => {
      if (this.snackBarHidden === true) {
        this.snackBarHidden = false;

        Animated.timing
          (
            this.animatedValue,
            {
              toValue: Scale.moderateScale(50),
              duration: 350,
              useNativeDriver: true
            }
          ).start(() => {
            this.snackBarHidden = true;
            this.snackBarShown = false;

            clearTimeout(this.timerID);
          })
      }
    }, duration);
  }

  closeSnackBar = () => {
    if (this.snackBarHidden === true) {
      this.snackBarHidden = false;

      clearTimeout(this.timerID);

      Animated.timing
        (
          this.animatedValue,
          {
            toValue: 60,
            duration: 350,
            useNativeDriver: true
          }
        ).start(() => {
          this.snackBarShown = false;
          this.snackBarHidden = true;
        });
    }
  }

  renderIcon = () => {
    switch (this.state.type) {
      case SUCCESS:
        return <SuccessIcon style={{ color: "#A5EB78" }}
          height={Scale.moderateScale(20)}
          width={Scale.moderateScale(20)} />;
      case ERROR:
        return <CloseIcon style={{ color: "red" }}
          height={Scale.moderateScale(20)}
          width={Scale.moderateScale(20)} />;
      // case INFO:
      //   return <Info height={20} width={20} fill={"#ffffff"} />;
      default:
        return <SuccessIcon style={{ color: "#A5EB78" }}
          height={Scale.moderateScale(20)}
          width={Scale.moderateScale(20)} />;
    }
  }

  getBackgroundColor = () => {
    switch (this.state.type) {
      case SUCCESS:
        return "#172840";
      // case ERROR:
      //   return "#EF5350";
      // case INFO:
      //   return "#2196F3";
      default:
        return "#172840";
    }
  }

  render() {
    return (
      <Animated.View style={[
        {
          transform: [{ translateY: this.animatedValue }],
          backgroundColor: this.getBackgroundColor(),
          zIndex: 1000,
        },
        styles.animatedView,
        this.state.showTryAgainObj == true ? { paddingRight: Scale.moderateScale(80) } : {}
      ]}
        onPress={this.closeSnackBar}>
        {this.renderIcon()}


        <Text numberOfLines={2} style={[styles.snackBarText, { color: this.props.snackBarTextColor }]}>{this.state.message}</Text>
        <TouchableOpacity onPress={this.closeSnackBar} activeOpacity={1} style={styles.closeBtn}>
          {
            (this.state.showTryAgainObj)
              ?
              (<Text style={{
                color: "#ffffff", fontWeight: 'bold',
                fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
              }}>{this.props.closeText.toUpperCase()}</Text>)
              :
              null
          }
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  animatedView:
  {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: Scale.moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Scale.moderateScale(15),
    paddingRight: Scale.moderateScale(70)
  },

  snackBarText:
  {
    fontSize: Typography.FONT_SIZE_12,
    marginLeft: Scale.moderateScale(13),
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
  },

  closeBtn:
  {
    position: 'absolute',
    right: Scale.moderateScale(10),
    justifyContent: 'center',
    padding: Scale.moderateScale(5)
  },

  closeBtnImage:
  {
    resizeMode: 'contain',
    width: Scale.moderateScale(23),
    height: Scale.moderateScale(23)
  }
});

SnackBar.propTypes =
{
  snackBarBackColor: PropTypes.string,
  closeText: PropTypes.string,
  closeTextColor: PropTypes.string,
  snackBarTextColor: PropTypes.string,
  imageColor: PropTypes.string
}

SnackBar.defaultProps =
{
  snackBarBackColor: '#00C853',
  closeTextColor: 'rgb(253,85,82)',
  snackBarTextColor: 'white',
  imageColor: 'rgb(253,85,82)'
};

module.exports = SnackBar;
