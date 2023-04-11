import React from 'react';
import {
  View,
  ViewPropTypes,
  Text
} from 'react-native';
import styles from './style';
import MemoStar from 'assets/icons/Star';
import { Scale } from 'common';
import PropTypes from 'prop-types';

const renderFields = (rate, allcount, margin, width = null, height = null) => {
  const fields = [];
  for (let i = 0; i < allcount; i++) {
    const marginRight = (margin && i != allcount - 1) ? margin : Scale.moderateScale(2);

    if (i < rate) {
      fields.push(
        <MemoStar
          key={'guest_' + i}
          style={{ marginRight: marginRight }}
          width={width ? width : Scale.moderateScale(16)}
          height={height ? height : Scale.moderateScale(16)}
          fill={'#ffb300'}
          viewBox={'0 0 30 30'}

        />,
      );
    } else {
      fields.push(
        <MemoStar
          key={'guest_' + i}
          style={{ marginRight: marginRight }}
          resizeMode="stretch"
          width={width ? width : Scale.moderateScale(16)}
          height={height ? height : Scale.moderateScale(16)}
          fill={'#bdbdbd'}
          viewBox={'0 0 30 30'}
        />,
      );
    }

  }
  return fields;
}


const Stars = props => {
  return (
    <View style={[styles.starsContainer, props.containerStyle]}>
      <View style={styles.starsWrapper}>
        {renderFields(Math.round(props.rate), props.starsAllCount, props.margin, props.width, props.height)}
      </View>
      {props.showText == true ?
        <View style={styles.textContainer}>
          <Text style={[styles.text, props.textStyle]}>({props.rateOrCountShowText})</Text>
        </View>
        :
        null
      }
    </View>
  );
}

Stars.propTypes = {
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  rate: PropTypes.number,
  starsAllCount: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  rateOrCountShowText: PropTypes.string,
  showText: PropTypes.bool
};

Stars.defaultProps = {
  showText: true,
  starsAllCount: 5,
  margin: Scale.moderateScale(5),
};

export default Stars; 