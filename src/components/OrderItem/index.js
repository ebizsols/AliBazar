/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import {
  clientAuth,
  clientProfile
} from 'api/client';
import {

} from 'components';
import {
  OrderStatus,
  ProgressiveImage,
  ShowPrice
} from 'components/UI';
import { Languages, Scale, Constants, Tools, PathHelper } from 'common';
import { Colors, Typography } from 'styles';

import TickIcon from 'assets/icons/tick-green-circle.svg';
import CloseIcon from 'assets/icons/close-red-circle.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const OrderItem = (props) => {

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onPressOrder} style={styles.header}>
          <View style={styles.headerFirst}>
            <Text style={styles.headerText}>{Languages.Order.OrderCapWithTrackingCode(props.data.trackingCode)}</Text>
            <View style={styles.headerArrowIcnContainer}>
              <ArrowIcon
                style={{ color: Colors.BIGSTONE }}
                width={Scale.moderateScale(15)}
                height={Scale.moderateScale(15)}
              />
            </View>
          </View>
          <View style={styles.headerSec}>
            {/* <Text style={styles.headerSecText}>{Languages.Common.PlacedOn} {props.data.placedDateTime}</Text> */}
            <Text style={styles.headerSecText}>{Languages.Common.PlacedOn(props.data.placedDateTime)}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.flatListContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.data.items}
            renderItem={({ item }) => {

              const imageUrl = PathHelper.getGoodsImagePath(item.goodsImage, item.goodsId, false)

              return (
                <View style={styles.orderItemContainer}>
                  <View style={styles.orderItemImageContainer}>
                    <ProgressiveImage
                      width={Scale.moderateScale(80)}
                      height={Scale.moderateScale(100)}
                      source={imageUrl}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                  <View style={styles.orderItemFooter}>
                    <OrderStatus
                      id={item.statusId}
                      title={item.statusTitle}
                    />
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.itemId.toString()}
          // contentInset={{ // iOS ONLY
          //   top: 0,
          //   left: Scale.moderateScale(5), // Left spacing for the very first card
          //   bottom: 0,
          //   right: Scale.moderateScale(5) // Right spacing for the very last card
          // }}
          // contentContainerStyle={{ // contentInset alternative for Android
          //   paddingHorizontal: Platform.OS === 'android' ? Scale.moderateScale(5) : 0 // Horizontal spacing before and after the ScrollView
          // }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerFirst}>
            <Text style={styles.footerOrderText}>{Languages.Cart.OrderSummary}</Text>
            <Text style={styles.footerItemsText}>  {Languages.Cart.NumberItems(props.data.orderItemCount)}   </Text>
          </View>
          <View style={styles.footerPriceContainer}>
            <ShowPrice
              currencyStyle={[styles.footerPriceText]}
              priceStyle={[styles.footerPriceText]}
              afterDotStyle={[styles.footerPriceTextt]}
              price={props.data.finalPrice}
              currency={props.currency}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  header: {

  },
  headerFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Scale.moderateScale(8),
    alignItems: "center"
  },
  headerText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
  },
  headerArrowIcnContainer: {
    transform: [
      {
        rotate: I18nManager.isRTL ? '260deg' : '90deg'
      }
    ]
  },
  headerSec: {
    alignItems: 'flex-start'
  },
  flatListContainer: {
    marginVertical: Scale.moderateScale(10)
  },
  headerSecText: {
    color: Colors.FIORD,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  orderItemContainer: {
    paddingHorizontal: Scale.moderateScale(8)
  },
  orderItemImageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  orderItemFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Scale.moderateScale(5)
  },
  orderItemFooterContainer: {
    marginRight: Scale.moderateScale(5)
  },
  orderItemFooterText: {
    color: Colors.SHAMROCK,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
  },
  orderItemFooterTextCancel: {
    color: Colors.JAFFA
  },
  footer: {
    marginTop: Scale.moderateScale(5)
  },
  footerFirst: {
    flexDirection: "row",
    marginBottom: Scale.moderateScale(10),
    alignItems: "flex-end"
  },
  footerOrderText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
  },
  footerItemsText: {
    color: Colors.FIORD,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  footerPriceContainer: {

  },
  footerPriceText: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
  },
});


export default OrderItem;
