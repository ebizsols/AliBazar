/* CustomTopTabBar.js (copied from `react-navigation` library)*/
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { TabBar } from "react-native-tab-view";
// import CrossFadeIcon from "./CrossFadeIcon"; // this component (for icon rendering) was ejected out from library source


const styles = {
  indicator: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 2
  },
};

export default class TabBarTop extends React.PureComponent {
  // modified renderLabel method
  _renderLabel = ({ route }) => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      showLabel,
      upperCaseLabel,
      labelStyle,
      allowFontScaling
    } = this.props;

    if (showLabel === false) {
      return null;
    }

    const { routes } = navigation.state;
    const index = routes.indexOf(route);
    const focused = index === navigation.state.index;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];

    // setting color for the each tab label
    const uniqueColor =
      index === 0 ? Colors.theme : index === 1 ? Colors.blue : Colors.green;

    const outputRange = inputRange.map(inputIndex =>
      inputIndex === index ? uniqueColor : inactiveTintColor
    );

    const color = position.interpolate({
      inputRange,
      outputRange: outputRange
    });

    const tintColor = focused ? activeTintColor : inactiveTintColor;
    const label = this.props.getLabelText({ route });

    if (typeof label === "string") {
      return (
        <Animated.Text
          style={[styles.label, { color }, labelStyle]}
          allowFontScaling={allowFontScaling}
        >
          {upperCaseLabel ? label.toUpperCase() : label}
        </Animated.Text>
      );
    }
    if (typeof label === "function") {
      return label({ focused, tintColor });
    }

    return label;
  };

  

  // didn't change this method as I am not using icons
  _renderIcon = ({ route }) => {};

  // added this method (copied from the build-in component method)
  _renderIndicator = props => {
    const { position, width, navigationState } = props;

    console.log('********', navigationState.routes.length);

    // setting color for the each phase of the indicator, in my case I have 3 routes only
    const inputRange = [0, 1, 2];
    const outputRange = [Colors.theme, Colors.blue, Colors.green];

    const indicatorColor = position.interpolate({
      inputRange,
      outputRange
    });

    const translateX = Animated.multiply(
      Animated.multiply(
        position.interpolate({
          inputRange: [0, navigationState.routes.length - 1],
          outputRange: [0, navigationState.routes.length - 1],
          extrapolate: "clamp"
        }),
        width
      ),
      I18nManager.isRTL ? -1 : 1
    );
    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            width,
            transform: [{ translateX }],
            backgroundColor: indicatorColor
          }
        ]}
      />
    );
  };

  render() {
    /* eslint-disable no-unused-vars */
    const { navigation, renderIcon, getLabelText, ...rest } = this.props;

    return (
      /* $FlowFixMe */
      <TabBar
        {...this.props}
        navigationState={navigation}
        // navigationState={}
        renderIcon={this._renderIcon}
        renderLabel={this._renderLabel}
        renderIndicator={this._renderIndicator}
      />
    );
  }
}