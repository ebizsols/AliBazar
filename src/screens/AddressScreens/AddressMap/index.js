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
  BackHandler
} from 'react-native';
import { clientAuth, clientProfile, clientUserActivity } from 'api/client';
import styles from './style'
import {
  ModuleSelection,
  HomeHeader,
  AddressesHeader,
  AddressItem,
  BottomSheetBackView,
  BottomSheetHeader,
  AddressMapHeader
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";
import Animated, { Easing } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import MarkerIcon from 'assets/icons/map-marker.svg';
import MapView, { Marker } from 'react-native-maps';

import RNGooglePlaces from 'react-native-google-places';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { LazyHOC } from 'HOCs';
Geocoder.init(Constants.GoogleMapApiKey); // use a valid API key

const AddressMapScreen = (props) => {

  const [isLoading, setIsLoading] = useState(null);
  const [headerInputText, setHeaderInputText] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const snackBarRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
    name: null,
    description: null,
    countryCode: null
  });
  const mapRef = useRef(null);

  const afterSaveScreen = props.route?.params?.afterSaveScreen;
  const fromEditShippingAddress = props.route?.params?.fromEditShippingAddress;

  useEffect(() => {
    if (props.route.params?.editLocation) {
      setSelectedLocation((prev) => ({
        ...prev,
        lat: props.route.params?.editLocation.lat,
        lng: props.route.params?.editLocation.lng,
      }));
    }
  }, [props.route.params?.editLocation]);

  useEffect(() => {
    if (isMapReady == true && props.route.params?.editLocation && props.route.params?.editLocation.lat != 0) {
      let region = {
        latitude: props.route.params?.editLocation.lat,
        longitude: props.route.params?.editLocation.lng,
        latitudeDelta: 0.61,
        longitudeDelta: 0.61
      }
      mapRef.current.animateToRegion(region, 500);
    } else if (isMapReady == true && props.route.params?.cityLocation) {
      let region = {
        latitude: props.route.params?.cityLocation.lat,
        longitude: props.route.params?.cityLocation.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }
      mapRef.current.animateToRegion(region, 500);
    }
  }, [isMapReady]);

  const saveLocationHanlder = () => {
    if (selectedLocation.lat == 0) {
      snackBarRef.current.show(Languages.Address.TheAddressShouldBeSelected, 2);
      return;
    }

    if (afterSaveScreen) {
      // from create store
      props.navigation.navigate(afterSaveScreen, { editLocationAddress: selectedLocation });
      return;
    }

    if (props.route.params?.editLocation) {
      props.navigation.navigate('AddAddressDetail', {
        editLocationAddress: selectedLocation,
        afterScreen: props.route.params?.afterScreen,
        afterScreenParams: props.route.params?.afterScreenParams,
        fromEditShippingAddress: fromEditShippingAddress,
        fromAddShippingAddress: props.route?.params?.fromAddShippingAddress
      });
    } else {
      props.navigation.navigate('AddAddressDetail', {
        locationAddress: selectedLocation,
        formValues: props.route.params?.formValues,
        afterScreen: props.route.params?.afterScreen,
        afterScreenParams: props.route.params?.afterScreenParams,
        fromAddShippingAddress: props.route?.params?.fromAddShippingAddress
      });
    }
  }

  const selectLocationHandler = (lat, lng) => {
    setIsLoading(true)
    // console.log(lat);
    // console.log(lng);
    /*  if (fromEditShippingAddress === true || props.route?.params?.fromAddShippingAddress === true) {
       console.log(lat, lng);
       clientUserActivity.checkAddressArea(lat, lng)
         .then((response) => {
           console.log('check address .....');
           selectLocation(lat, lng);
         }).catch((err) => {
           setIsLoading(false);
           if (err.response?.data?.message)
             snackBarRef.current.show(err.response?.data?.message, 2);
         });
     } else {
       selectLocation(lat, lng);
     }; */

    selectLocation(lat, lng);

  };

  const selectLocation = (lat, lng) => {
    setHeaderInputText('');
    // console.log(headerInputText);
    if (props.route.params?.iso) {

    } else {
      setSelectedLocation((prev) => ({
        ...prev,
        lat: lat,
        lng: lng
      }));
    }


    Geocoder.from(lat, lng)
      .then(json => {
        console.log('Geocoder success');
        // const name = json.results[1].formatted_address;
        // const addr = json.results[0].formatted_address;
        const locationData = Tools.getGeocodeLocationData(json.results);

        // console.log(locationData);
        if (props.route.params?.iso) {
          if (props.route.params?.iso != locationData.countryCode) {
            setIsLoading(false);
            snackBarRef.current.show(Languages.CreateStore.TheSelectedCountry, 2);
            return;
          }
          setSelectedLocation((prev) => ({
            ...prev,
            name: locationData.city || locationData.cityAlt,
            description: locationData.address || locationData.address2,
            countryCode: locationData.countryCode,
            lat: lat,
            lng: lng
          }));
        } else {
          setSelectedLocation((prev) => ({
            ...prev,
            name: locationData.city || locationData.cityAlt,
            description: locationData.address || locationData.address2,
            countryCode: locationData.countryCode
          }));
        }


        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.warn(error)
      });
  }

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        /* if (fromEditShippingAddress === true || props.route?.params?.fromAddShippingAddress === true) {
          clientUserActivity.checkAddressArea(place.location.latitude, place.location.longitude)
            .then((response) => {

              setSearchModalLocation(place);
            }).catch((err) => {
              setIsLoading(false);
              if (err.response?.data?.message)
                snackBarRef.current.show(err.response?.data?.message, 2);
            });
        } else {
          setSearchModalLocation(place);
        }; */

        setSearchModalLocation(place);
      })
      .catch(error => console.log('errrrr', error));  // error is a Javascript Error object
  }

  const setSearchModalLocation = (place) => {
    console.log(place);
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    const locationData = Tools.getGooglePlaceData(place);
    // console.log(locationData);
    setHeaderInputText(locationData.address || locationData.address2);

    setSelectedLocation((prev) => ({
      ...prev,
      name: locationData.city || locationData.cityAlt,
      description: locationData.address || locationData.address2,
      lat: place.location.latitude,
      lng: place.location.longitude,
      countryCode: locationData.countryCode
    }));

    let region = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.61,
      longitudeDelta: 0.61
    }
    mapRef.current.animateToRegion(region, 500);
  };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  // const backAction = () => {
  //   props.navigation.goBack()
  // };

  return (
    <LazyHOC>
      {isLoading == true ? <RequestLoader /> : null}
      <AddressMapHeader onPressBack={() => props.navigation.goBack()} inputText={headerInputText} onSearchInputPress={openSearchModal} />

      <View style={[StyleSheet.absoluteFillObject,
      {
        top: Scale.moderateScale(70),
        bottom: Scale.moderateScale(72)
      }
      ]}>
        <MapView
          initialRegion={{
            latitude: 26.064832437137248,
            longitude: 50.55588953197002,
            latitudeDelta: 1.1922,
            longitudeDelta: 1.1421,
          }}
          ref={mapRef}
          showsMyLocationButton={true}
          showsUserLocation={true}
          toolbarEnabled={true}
          rotateEnabled={false}
          onPress={(event) => selectLocationHandler(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude)}
          style={StyleSheet.absoluteFillObject}
          onMapReady={() => setIsMapReady(true)}
        >

          {selectedLocation.lat != 0 && selectedLocation.lng != 0 ?
            <Marker
              tracksViewChanges={false}
              title={selectedLocation.name}
              description={selectedLocation.description}
              coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
              flat={true}
            >
              <View>
                <MarkerIcon
                  style={{ color: '#fe1743' }}
                  width={Scale.moderateScale(45)}
                  height={Scale.moderateScale(45)}
                />
              </View>
            </Marker>
            :
            null}

        </MapView>
      </View>

      <View style={{
        position: "absolute",
        bottom: 0,
        width: '100%'
      }}>
        <FloatButtonWrapper>
          <MainButton onPress={saveLocationHanlder}>
            {Languages.Common.Save}
          </MainButton>
        </FloatButtonWrapper>
        {/* <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: Constants.GoogleMapApiKey,
            language: 'en',
          }}
        /> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity> */}
      </View>

      <SnackBar
        ref={snackBarRef}
      />
    </LazyHOC>
  );
};


export default AddressMapScreen;

const data = {
  "status": 200,
  "result":
    [
      {
        "addressId": 7,
        "transfereeMobile": "9215595257 ",
        "fkCountryId": 137,
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "cityName": "Manama",
        "postalCode": "3232323",
        "phoneCode": "973",
        "address": "Avenue 49, Bahrain",
        "locationX": 26.080548,
        "locationY": 50.5616809,
        "transfereeName": "dfsdfsdf",
        "transfereeFamily": "dfdsfds",
        "mobileVerifed": false
      }],
  "message": "Successfull"
}