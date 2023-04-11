/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  I18nManager
} from 'react-native';
import styles from './style'
import {
  MainInput, MainButton,
  SnackBar, RequestLoader, FloatButtonWrapper, IconRow,
  RadioButton,
  ProgressiveImage
} from 'components/UI';
import { Languages, Scale, Constants, PathHelper } from 'common';
import { DeviceStorage } from "services";
import axiosClient from "api/axios";
import ArrowIcon from 'assets/icons/arrow-left.svg';

import BahrainIcon from 'assets/icons/countries/bahrain.svg';
import { clientAuth, clientForm } from 'api/client';
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


const Country = (props) => {

  const snackBarRef = useRef(null);

  return (
    <>
      {props.isLoading == true ? <RequestLoader /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.topContainer}>
            <Text style={styles.topText}>{Languages.CreateStore.WhereIsYourBusiness}</Text>
          </View>
          <View >
            {props.showCities == true ?
              <TouchableOpacity onPress={props.onBackToCountriesPress} style={[styles.arrowContainer, I18nManager.isRTL ? styles.arrowContainerRtl : {}]}>
                <ArrowIcon
                  height={Scale.moderateScale(28)}
                  width={Scale.moderateScale(28)} />
              </TouchableOpacity>
              :
              null}
            <Text style={[styles.chooseText, props.showCities == true ? styles.chooseCityText : {}]}>
              {props.showCities == false ?
                Languages.CreateStore.ChooseProvince
                :
                Languages.CreateStore.ChooseCity}
            </Text>
          </View>
          <View style={styles.radioContentContainer}>

            {props.showCities == false ?
              <View style={{}}>
                <FlatList
                  data={props.provinces}
                  renderItem={({ item, index }) => {
                    // const image = PathHelper.getFlagIconImagePath(item.flagUrl);
                    return (
                      <View>
                        <TouchableOpacity onPress={() => props.onSelectProvince(item)} style={styles.selectItemContainer}>
                          <View style={styles.radioWrapper}>
                            <RadioButton
                              onPress={() => props.onSelectProvince(item)}
                              isSelected={props.selectedProvinceId == item.provinceId} />
                          </View>
                          <View style={[styles.iconRowWrapper, styles.cityIconRowWrapper]}>
                            <View style={styles.iconRowTextContainer}>
                              <Text style={styles.iconRowText}>{item.provinceName}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        {index != props.provinces?.length - 1 ?
                          <View style={styles.itemLine}></View>
                          :
                          null}
                      </View>
                    )
                  }}
                  keyExtractor={(item) => item.provinceId.toString()}
                />
              </View>
              :
              <View style={{}}>
                <FlatList
                  data={props.cities}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <TouchableOpacity onPress={() => props.onSelectCity(item)} style={styles.selectItemContainer}>
                          <View style={styles.radioWrapper}>
                            <RadioButton
                              onPress={() => props.onSelectCity(item)}
                              isSelected={props.selectedCityId == item.cityId} />
                          </View>
                          <View style={[styles.iconRowWrapper, styles.cityIconRowWrapper]}>
                            <View style={styles.iconRowTextContainer}>
                              <Text style={styles.iconRowText}>{item.cityTitle}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        {index != props.cities?.length - 1 ?
                          <View style={styles.itemLine}></View>
                          :
                          null}
                      </View>
                    )
                  }}
                  keyExtractor={(item) => item.cityId.toString()}
                />
              </View>
            }

          </View>
        </View>
      </ScrollView>

      <FloatButtonWrapper>
        <MainButton onPress={() => props.goToNexStep()}>
          {Languages.Common.Next}
        </MainButton>
      </FloatButtonWrapper>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default Country;
