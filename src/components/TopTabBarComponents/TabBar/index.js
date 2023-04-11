import React, { useEffect } from 'react';

import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation, position }) => {

    const inputRange = state.routes.map((_, i) => i);
    const left = Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => i == 0 ? 0 : i == 1 ? width / 2 : 100),
    });

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    const opacity = Animated.interpolate(position, {
                        inputRange,
                        outputRange: inputRange.map(i => (i === index ? 1 : 0.3)),
                    });

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <Animated.Text style={{ opacity: opacity }}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Animated.View style={{
                height: 4, backgroundColor: 'red',
                width: width / 2,
                position: "absolute",
                bottom: 0,
                left: left
            }}></Animated.View>
        </View>
    );
};


const styles = StyleSheet.create({

});


export default TabBar;