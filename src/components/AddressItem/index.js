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
  TouchableOpacity
} from 'react-native';
import {
  clientAuth,
  clientProfile
} from 'api/client';
import {
  ModuleSelection,
  HomeHeader,
  AddressesHeader,
  BottomSheetHeader,
  BottomSheetBackView
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import AlertIcon from 'assets/icons/alert.svg';
import HomeIcon from 'assets/icons/home-building.svg';
import { CommonActions } from '@react-navigation/native';

const AddressItem = (props) => {



  return (
    <>
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={!props.data.isDefualt ? props.onSetDefualtAddressPress : () => { }} style={[styles.headerBtnContainer, props.data.isDefualt ? styles.headerBtnContainerPrimary : []]}>
              <Text style={[styles.headerBtnText, props.data.isDefualt ? styles.headerBtnTextPrimary : {}]}>
                {props.data.isDefualt ?
                  Languages.Address.PrimaryAddress
                  :
                  Languages.Address.SetAsDefault
                }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => props.onMenuPress ? props.onMenuPress(props.data) : {}} style={styles.menuIconContainer}>
              <MenuIcon
                width={Scale.moderateScale(26)}
                height={Scale.moderateScale(26)}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyLeft}>
            <View style={styles.officeIconContainer}>
              {props.data.isDefualt ?
                <OfficeIcon
                  width={Scale.moderateScale(27)}
                  height={Scale.moderateScale(27)}
                />
                :
                <HomeIcon
                  width={Scale.moderateScale(27)}
                  height={Scale.moderateScale(27)}
                />}
            </View>
          </View>
          <View style={styles.bodyRight}>
            <Text numberOfLines={2}
              style={styles.bodyText}>
              {props.data.address}
            </Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerItemTitle}>{Languages.Profile.Name}</Text>
            <Text style={styles.footerItemValue}>{props.data.transfereeName + ' ' + props.data.transfereeFamily}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerItemTitle}>{Languages.Common.Phone}</Text>
            <Text style={styles.footerItemValue}>{Tools.formatPhoneNumber(props.data.transfereeMobile, props.data.iso)}</Text>
            {props.data.mobileVerifed == false ?
              <TouchableOpacity onPress={props.onVerifyPhoneNumberPress} style={styles.notVerified}>
                <View style={styles.notVerifiedIconContainer}>
                  <AlertIcon
                    width={Scale.moderateScale(17)}
                    height={Scale.moderateScale(17)}
                  />
                </View>
                <Text style={styles.notVerifiedText}>{Languages.Common.NotVerified}</Text>
              </TouchableOpacity>
              :
              null}
          </View>
        </View>

      </View>


    </>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerBtnContainer: {
    backgroundColor: Colors.LOCHMARA,
    borderRadius: Scale.moderateScale(5),
    width: Scale.moderateScale(115),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Scale.moderateScale(2)
  },
  headerBtnContainerPrimary: {
    backgroundColor: Colors.MERCURY,
  },
  headerBtnTextPrimary: {
    color: Colors.BIGSTONE
  },
  headerBtnText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  headerRight: {

  },
  menuIconContainer: {
    // backgroundColor: 'red',
    marginRight: Scale.moderateScale(-9)
  },
  bodyContainer: {
    flexDirection: "row",
    marginTop: Scale.moderateScale(10),
    marginBottom: Scale.moderateScale(10)
  },
  bodyLeft: {
    paddingRight: Scale.moderateScale(10),
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  officeIconContainer: {

  },
  bodyRight: {
    flex: 1,
    paddingRight: Scale.moderateScale(40),
    alignItems: 'flex-start'
  },
  bodyText: {
    lineHeight: Scale.moderateScale(25),
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  footerContainer: {
    flexDirection: "row"
  },
  footerLeft: {
    flex: 1,
    alignItems: 'flex-start'
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-start'
  },
  footerItemTitle: {
    marginBottom: Scale.moderateScale(4),
    color: Colors.BOMBAY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  footerItemValue: {
    color: Colors.BIGSTONE,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  },
  notVerified: {
    marginTop: Scale.moderateScale(5),
    flexDirection: "row",
    alignItems: "center"
  },
  notVerifiedIconContainer: {

  },
  notVerifiedText: {
    marginLeft: Scale.moderateScale(5),
    color: Colors.TORCHRED2,
    fontSize: Typography.FONT_SIZE_12,
    fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
  }
});


export default AddressItem;
