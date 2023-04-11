import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated as ReactAnimated,
    I18nManager,
    ScrollView
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import { RadioButton, ShowPrice } from 'components/UI';
import { } from 'components';
import PropTypes from 'prop-types';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import Collapsible from 'react-native-collapsible';

const CategoryItemHeight = Scale.moderateScale(45);

// Used in goods detail
const FilterCategoryItem = (props) => {
    const _animatedRotate = useRef(new ReactAnimated.Value(isCollapsed ? 1 : 0)).current;

    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        ReactAnimated.timing(_animatedRotate, {
            toValue: (isCollapsed) ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isCollapsed]);

    let headerStyle = {};
    if (isCollapsed == false) {
        headerStyle = {
            borderBottomWidth: Scale.moderateScale(0),
        }
    }

    const rotateStyle = {
        transform: [
            {
                rotate: _animatedRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', I18nManager.isRTL ? '270deg' : '90deg'],
                }),
            }
        ]
    };

    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.header, headerStyle]} onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={styles.headerTextsContainer}>
                    <Text style={styles.headerText}>{props.isProviderScreen === true ? Languages.Common.FeaturedCategories : Languages.Common.Category}</Text>
                    {props.isProviderScreen !== true && (
                        <Text style={styles.headerCategoryTitleText}>{props.titleCategory}</Text>
                    )}
                </View>
                <ReactAnimated.View style={[rotateStyle]}>
                    <ArrowIcon style={{ color: Colors.BIGSTONE }}
                        width={Scale.moderateScale(15)}
                        height={Scale.moderateScale(15)} />
                </ReactAnimated.View>
            </TouchableOpacity>
            <Collapsible enablePointerEvents={true} collapsed={isCollapsed}>
                {/* <ScrollView> */}
                <View style={styles.contentContainer}>
                    <View style={styles.categoryItemContainer}>
                        {/* Parent */}
                        {/* <CategoryItem
                            onCategoryPress={(item) => props.onCategoryPress(item)}
                            item={props.childCategory?.categoryTitle}
                            disabled={true}
                            indentLevel={0}
                            title={props.childCategory?.categoryTitle}
                            id={props.childCategory?.categoryId} /> */}
                        {
                            Array.isArray(props.childCategory) ?
                                props.childCategory?.map((item, index) => {
                                    return (
                                        <CategoryItem
                                            key={item.categoryId}
                                            onCategoryPress={(item) => props.onCategoryPress(item)}
                                            item={item}
                                            indentLevel={0}
                                            title={item.categoryTitle}
                                            id={item.categoryId} />
                                    )
                                })
                                :
                                null
                        }


                    </View>
                </View>
                {/* </ScrollView> */}
            </Collapsible>
        </View>
    );
};

const CategoryItem = ({ title, id, indentLevel, onCategoryPress, item, disabled = false }) => {

    // console.log('iteeeeeem', item);
    // console.log('indentLevel', indentLevel);
    const [showCollapse, setShowCollapse] = useState(false);
    // console.log('showCollapse', showCollapse);

    const _animatedHeight = useRef(new ReactAnimated.Value(showCollapse ? 1 : 0)).current;
    const _animatedRotate = useRef(new ReactAnimated.Value(showCollapse ? 1 : 0)).current;

    let paddingLeft = Scale.moderateScale(20);
    if (indentLevel === 1) {
        paddingLeft = Scale.moderateScale(40);
    } else if (indentLevel === 2) {
        paddingLeft = Scale.moderateScale(60);
    }

    const toggleShowCollapse = () => {
        const tragetValue = !showCollapse;
        setShowCollapse(tragetValue);
    };

    useEffect(() => {
        ReactAnimated.timing(_animatedHeight, {
            toValue: (showCollapse) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        ReactAnimated.timing(_animatedRotate, {
            toValue: (showCollapse) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [showCollapse]);

    const viewStyle = {
        height: _animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (CategoryItemHeight * (item?.child?.length || 0))],
        }),
    };

    const rotateStyle = {
        transform: [
            {
                rotate: _animatedRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [I18nManager.isRTL ? '270deg' : '90deg', '180deg'],
                }),
            }
        ]
    };

    return (
        <View>
            <View disabled={disabled} onPress={toggleShowCollapse} style={styles.categoryItem}>
                <View style={[styles.categoryItemWrapper, { paddingLeft: paddingLeft }]}>
                    <TouchableOpacity onPress={() => onCategoryPress(item)} style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.categoryText}>{title}</Text>
                    </TouchableOpacity>
                    {item.child?.length > 0 && (
                        <TouchableOpacity onPress={toggleShowCollapse} style={[styles.iconContainer]}>
                            <ReactAnimated.View style={[
                                rotateStyle
                            ]}>
                                <ArrowIcon style={{ color: Colors.BIGSTONE }}
                                    width={Scale.moderateScale(10)}
                                    height={Scale.moderateScale(10)} />
                            </ReactAnimated.View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.line}></View>
            </View>

            {item.child?.length > 0 ?
                <View style={[]}>
                    {
                        Array.isArray(item.child) && showCollapse === true ?
                            item.child?.map((cat, index) => {
                                return (
                                    <CategoryItem
                                        key={cat.categoryId}
                                        onCategoryPress={(cat) => onCategoryPress(cat)}
                                        item={cat}
                                        indentLevel={indentLevel + 1}
                                        title={cat.categoryTitle}
                                        id={cat.categoryId} />
                                )
                            })
                            :
                            null
                    }
                </View>
                :
                null}
        </View>
    )
}

FilterCategoryItem.propTypes = {
    // childCategory: PropTypes.any
};

FilterCategoryItem.defaultProps = {
};

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: Scale.moderateScale(25),
        paddingVertical: Scale.moderateScale(18),
        alignItems: "center",

        // borderTopWidth: Scale.moderateScale(1),
        // borderBottomWidth: Scale.moderateScale(1),
        // borderBottomColor: Colors.GALLERY,
        // borderTopColor: Colors.GALLERY
    },
    headerText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    headerCategoryTitleText: {
        marginTop: Scale.moderateScale(3),
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    contentContainer: {
        // borderBottomWidth: Scale.moderateScale(1),
        // borderBottomColor: Colors.GALLERY,
        paddingHorizontal: Scale.moderateScale(35),
        paddingBottom: Scale.moderateScale(10)
    },
    categoryItemContainer: {

    },
    categoryItem: {
        // backgroundColor: 'red',
        height: CategoryItemHeight
    },
    categoryItemWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        // backgroundColor: 'red',
        height: '100%'
        // paddingHorizontal: Scale.moderateScale(20),
        // paddingVertical: Scale.moderateScale(20)
    },
    textContainer: {
        // backgroundColor: 'red',
        paddingLeft: Scale.moderateScale(20),
        justifyContent: 'center',
        // paddingVertical: Scale.moderateScale(20),
        flex: 1
    },
    iconContainer: {
        width: Scale.moderateScale(45),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    categoryText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: 'left'
    },
    categoryArrowContainer: {
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
    categoryArrowContainerRtl: {
        transform: [
            {
                rotate: '270deg'
            }
        ]
    },
    line: {
        height: Scale.moderateScale(1),
        width: '100%',
        backgroundColor: Colors.GALLERY,
        position: "absolute",
        bottom: 0
    }
});

export default FilterCategoryItem;