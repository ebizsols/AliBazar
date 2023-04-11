import { Scale } from 'common';
import React from 'react';
import { View, StyleSheet, Platform, I18nManager } from 'react-native';

export default (Indicator = ({
  itemCount,
  currentIndex,
  indicatorStyle,
  indicatorActiveStyle,
  indicatorInActiveStyle,
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth = 6,
  indicatorActiveHeight = 6,
}) => {

  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {renderIndicator(
        itemCount,
        currentIndex,
        indicatorStyle,
        indicatorActiveColor,
        indicatorInActiveColor,
        indicatorActiveWidth,
        indicatorActiveHeight,
        indicatorActiveStyle,
        indicatorInActiveStyle,
      )}
    </View>
  );
});

export const renderIndicator = (
  count,
  currentIndex,
  indicatorStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth,
  indicatorActiveHeight,
  indicatorActiveStyle,
  indicatorInActiveStyle,
) => {
  let indicators = [];

  for (let i = 0; i < count; i++) {

    indicators.push(
      <View
        style={[
          styles.indicator,
          indicatorStyle,
          i === currentIndex
            ? indicatorActiveColor
              ? {
                ...styles.active,
                ...{
                  backgroundColor: indicatorActiveColor,
                  // width: indicatorActiveWidth,
                  // height: indicatorActiveHeight,
                  width: Scale.moderateScale(8),
                  height: Scale.moderateScale(8)
                },
                ...indicatorActiveStyle,
              }
              : {
                ...styles.active,
                ...indicatorActiveStyle,
              }
            : {
              ...styles.inactive,
              ...{ backgroundColor: indicatorInActiveColor },
            },
          // indicatorActiveStyle,
          // indicatorInActiveStyle
        ]
        }
        key={i}
      />,
    );
  }
  return indicators;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL && Platform.OS === 'ios' ? 'row-reverse' : 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start'
  },
  indicator: {
    width: Scale.moderateScale(6),
    height: Scale.moderateScale(6),
    borderRadius: Scale.moderateScale(10),
    marginRight: 5,
  },
  active: {
    height: Scale.moderateScale(10),
    width: Scale.moderateScale(10),
  },
  inactive: {
    opacity: 0.6
  },
});
