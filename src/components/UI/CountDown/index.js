import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState
} from 'react-native';
import { Languages, Scale } from 'common';
import { Typography, Colors } from 'styles';

const CountDown = forwardRef((props, ref) => {

  const [timerState, setTimerState] = useState({
    minutes: '03',
    seconds: '00'
  });
  const [resetTimer, setResetTimer] = useState(false);

  useImperativeHandle(ref, () => ({

    resetTimer() {
      clearInterval(timerRef)
      setTimerState({
        minutes: '03',
        seconds: '00'
      }),
        setResetTimer(!resetTimer);
    }

  }));


  const [timerRef, setTimerRef] = useState(null);

  const resendHandler = () => {
    setTimerState({
      minutes: '03',
      seconds: '00'
    }),
      setResetTimer(true);
    props.onResendPressed();
  };

  useEffect(() => {
    const duration = props.minutes * 60;
    // const duration = 5;

    let timer = duration, minutes, seconds;
    const timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimerState({
        minutes: minutes,
        seconds: seconds
      });
      if (--timer < 0) {
        // timer = duration;
        clearInterval(timerInterval);
      }
    }, 1000);
    setTimerRef(timerRef)
    return () => {
      clearInterval(timerInterval);
    }
  }, [resetTimer]);

  return (
    <View style={styles.timerContainer}>
      {timerState.minutes == '00' && timerState.seconds == '00' ?
        <TouchableOpacity onPress={() => resendHandler()}>
          <Text style={styles.timerText}>{props.resendText}</Text>
        </TouchableOpacity>
        :
        <Text style={styles.timerText}>{`${timerState.minutes}: ${timerState.seconds}`}</Text>
      }
    </View>
  );
});


CountDown.propTypes = {
  onResendPressed: PropTypes.func,
  minutes: PropTypes.number,
  resendText: PropTypes.string
};

CountDown.defaultProps = {
  minutes: 3,
  resendText: Languages.Common.ResendNow
}

const styles = StyleSheet.create({
  timerContainer: {

  },
  timerText: {
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.DODGERBLUE,
  }
});

export default CountDown;