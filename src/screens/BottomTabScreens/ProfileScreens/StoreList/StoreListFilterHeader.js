/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import { Languages, Scale } from 'common';
import { Badge } from 'components/UI';
import FilterIcon from 'assets/icons/filter.svg';
import MenuIcon from 'assets/icons/menu.svg';
import GridIcon from 'assets/icons/grid.svg';
import SortIcon from 'assets/icons/sort.svg';
import { Colors, Typography } from 'styles';
import PropTypes from 'prop-types';

const StoreListFilterHeader = (props) => {

    const pressChangeShowTypeHandler = () => {
        props.onChangeShowTypePress();
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainers}>
                <TouchableOpacity onPress={props.onFilterPress} style={[styles.item]}>
                    <FilterIcon
                        width={Scale.moderateScale(20)}
                        height={Scale.moderateScale(20)} />
                    <Text style={[styles.itemText]}>{Languages.Search.Filter}</Text>
                    {props.filterCount > 0 ?
                        <View style={styles.badgeContainer}>
                            <Badge>{props.filterCount}</Badge>
                        </View>
                        :
                        null}
                </TouchableOpacity>
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity onPress={props.onSelectSortPress} style={[styles.item, styles.centerItem]}>
                    <SortIcon
                        width={Scale.moderateScale(25)}
                        height={Scale.moderateScale(25)} />
                    <Text style={[styles.itemText]}>
                        {
                            props.selectedSort != null ?
                                props.selectedSort.title
                                :
                                Languages.Common.Selectdots
                        }
                    </Text>
                </TouchableOpacity>
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>
                {/* <TouchableOpacity onPress={pressChangeShowTypeHandler} style={[styles.item]}>
                    {props.showType == 'col' ?
                        <MenuIcon
                            width={Scale.moderateScale(25)}
                            height={Scale.moderateScale(25)} />
                        :
                        <GridIcon
                            width={Scale.moderateScale(25)}
                            height={Scale.moderateScale(25)} />
                    }
                    <Text style={styles.itemText}>
                        {props.showType == 'col' ?
                            Languages.Search.Row
                            :
                            Languages.Search.Grid
                        }
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

StoreListFilterHeader.propTypes = {
    onChangeShowTypePress: PropTypes.fun,
    filterCount: PropTypes.number,
    onSelectSortPress: PropTypes.fun,
    onFilterPress: PropTypes.fun,
    showType: PropTypes.oneOf(['col', 'row']),
};

StoreListFilterHeader.defaultProps = {
    showType: 'col'
};

const styles = StyleSheet.create({
    container: {
    },
    itemContainers: {
        flexDirection: "row",
        // paddingVertical: Scale.moderateScale(15),
        backgroundColor: Colors.ALABASTER,
    },
    item: {
        flex: 1,
        paddingVertical: Scale.moderateScale(5),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    itemText: {
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        marginLeft: Scale.moderateScale(10)
    },
    centerItem: {
        flex: 1.3
    },
    lineContainer: {
        // height: '100%'
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        width: Scale.moderateScale(2),
        borderRadius: Scale.moderateScale(5),
        position: "absolute",
        height: '30%',
        backgroundColor: Colors.GALLERY
    },
    badgeContainer: {
        position: "absolute",
        top: Scale.moderateScale(8),
        right: Scale.moderateScale(5),
    }
});


export default StoreListFilterHeader;