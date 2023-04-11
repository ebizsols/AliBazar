import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { Scale } from 'common';
import { Colors, Typography } from 'styles';
import { useSelector } from 'react-redux';
import { Badge } from 'components/UI';


const HomeBottomTab = ({ state, descriptors, navigation }) => {

    const cartCount = useSelector(state => state.cartReducer.cartCount);

    return (
        <View style={[{
            flexDirection: 'row',
            backgroundColor: '#fff',
            shadowColor: "#000",
            borderTopColor: '#eee',
            borderTopWidth: Scale.moderateScale(0.7),
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            padding: Scale.moderateScale(6),
        }, styles._shadowStyle]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const Icon = options.Icon;
                const routeName = options.routeName;
                const isFocused = state.index === index;

                const onPress = () => {
                    //('preseeeeeeed');

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // navigation.navigate(route.name);
                        navigation.navigate(routeName);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabContainer}
                    >
                        <View style={{ marginBottom: Scale.moderateScale(3) }}>
                            {routeName == 'Cart' && cartCount > 0 ?
                                <View style={styles.itemBadgeContainer}>
                                    <Badge textStyle={styles.badgeText} containerStyle={styles.badgeStyle}>{cartCount}</Badge>
                                </View>
                                :
                                null}
                            <Icon
                                style={{ color: isFocused ? Colors.TULIPTREE : Colors.BOMBAY, }}
                                height={Scale.moderateScale(25)}
                                width={Scale.moderateScale(23)} />
                        </View>
                        <Text style={[styles.label, {
                            color: isFocused ? Colors.BIGSTONE : Colors.BOMBAY,
                            fontFamily: isFocused ? Typography.FONT_FAMILY_PROXIMANOVABOLDSelect() : Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
                        }]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    _shadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: "rgba(0,0,0,0.11)",
                shadowOffset: {
                    width: 1.5,
                    height: 1.5
                },
                shadowRadius: 6,
                shadowOpacity: 1
            },
            android: {
                elevation: 2
            }
        })
    },
    label: {
        fontSize: Typography.FONT_SIZE_12,
    },
    tabContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    //
    itemBadgeContainer: {
        // marginLeft: Scale.moderateScale(3)
        position: 'absolute',
        right: Scale.moderateScale(-8),
        top: Scale.moderateScale(-4),
        zIndex: 1
    },
    badgeStyle: {
        // borderRadius: Scale.moderateScale(3),
        // position: 'absolute',
        // paddingVertical: Scale.moderateScale(7),
        // paddingHorizontal: Scale.moderateScale(3),
        backgroundColor: Colors.TORCHRED
    },
    badgeText: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
});

export default HomeBottomTab;
