/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer
} from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {
  clientAuth,
  clientProfile,
  clientForm,
  clientUserActivity
} from 'api/client';
import styles from './style'
import {
  ModuleSelection,
  HomeHeader,
  CommonHeader
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
  DropdownPickerInput,
  RadioButton
} from 'components/UI';
import { Languages, Scale, Constants } from 'common';
import { Colors } from 'styles';
import axiosClient from "api/axios";
import PenIcon from "assets/icons/pen.svg";
import { DeviceStorage } from "services";

import CloseIcon from 'assets/icons/close-gray.svg';
import { CommonActions } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { setShippingAddressChange, setAddressesFireChange } from 'store/actions/fireChange.action';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AddAddressDetailScreen = (props) => {

  const dispatch = useDispatch();

  const setShippingAddressRedux = useCallback((value) => {
    dispatch(setShippingAddressChange(value));
  }, [dispatch]);

  const dispatch2 = useDispatch();

  const setAddressesRedux = useCallback((value) => {
    dispatch2(setAddressesFireChange(value));
  }, [dispatch2]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: null,
      lastName: null,
      mobile: null,
      postalCode: null,
      flatNumber: null,
      streetNumber: null,
      direction: null,
    },
    inputValidities: {
      firstName: false,
      lastName: false,
      mobile: false,
      postalCode: true,
      flatNumber: true,
      streetNumber: true,
      direction: true,
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [countries, setCountries] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [cities, setCities] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState({
    countryId: null,
    cityId: null,
    provinceId: null,
    phoneCode: null
  });

  const snackBarRef = useRef(null);

  // const { locationAddress, editLocationAddress } = props.route.params; // {lat: 0, lng: 0, name: null, description: null, countryCode: null
  // const { editLocationAddress } = props.route.params; // {lat: 0, lng: 0, name: null, description: null, countryCode: null
  const locationAddress = props.route?.params?.locationAddress;
  const editLocationAddress = props.route?.params?.editLocationAddress;
  const fromEditShippingAddress = props.route?.params?.fromEditShippingAddress;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const mobileInputRef = useRef();

  const getAciveCountries = () => {
    clientForm.getAciveCountries()
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setCountries(result);
        if (props.route.params?.editItem) {
          console.log('edit state so get active Provinces and cities');
          getActiveProvinces(props.route.params?.editItem.fkCountryId, true);
          getActiveCities(props.route.params?.editItem.fkProvinceId, true);
        } else {
          console.log('add state so countrySelectHandler');
          countrySelectHandler(result);
        }
      }).catch((err) => {

      });
  };

  const countrySelectHandler = (countries) => {
    if (props.route.params?.editItem) {
      // Edit state
      const findIndex = countries.findIndex(x => x.iso == editLocationAddress.countryCode);
      if (findIndex != -1) {
        const findedCountry = { ...countries[findIndex] };
        const tempEditItem = { ...editItem };
        tempEditItem.phoneCode = findedCountry.phoneCode;
        tempEditItem.fkCountryId = findedCountry.countryId;
        tempEditItem.locationX = editLocationAddress.lat;
        tempEditItem.locationY = editLocationAddress.lng;
        tempEditItem.address = editLocationAddress.description;
        tempEditItem.iso = editLocationAddress.countryCode;
        if (tempEditItem.fkCountryId != editItem.fkCountryId) {
          setTimeout(() => {
            mobileInputRef?.current?.validatePhoneNumberTry(formState.inputValues.mobile, tempEditItem.iso);
            // textChangeHandler(formState.inputValues.mobile);
          }, 200);
          tempEditItem.fkCityId = null;
          tempEditItem.fkProvinceId = null;
          setCities(null);
        };
        setEditItem(tempEditItem);
        if (props.route.params?.editItem.fkProvinceId)
          // getActiveCities(props.route.params?.editItem.fkProvinceId)
          getActiveProvinces(findedCountry.countryId);
      } else {
        snackBarRef.current.show(Languages.Address.TheAddressSelectedIsNoOfActiveCountries, 2, true, 8000)
      }
    } else {
      // Add state
      const findIndex = countries.findIndex(x => x.iso == locationAddress.countryCode);
      console.log('FindInex: ', findIndex);
      if (findIndex != -1) {
        const findedCountry = { ...countries[findIndex] };
        setSelectedLocation((prev) => ({
          ...prev,
          phoneCode: findedCountry.phoneCode,
          countryId: findedCountry.countryId
        }));
        // getActiveCities(findedCountry.countryId)
        getActiveProvinces(findedCountry.countryId);
      } else {
        snackBarRef.current.show(Languages.Address.TheAddressSelectedIsNoOfActiveCountries, 2, true, 8000)
      }
    }
  };

  const getActiveProvinces = (countryId, setLoader = false, resetCitites = false) => {
    // if (setLoader == true)
    //   setIsChangeAreaModalLoading(true);
    console.log(countryId);
    clientForm.getActiveProvince(countryId)
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setProvinces(result);
        // changeAreaModalRef.current.setCities([]);
        // if (setLoader == true)
        //   setIsChangeAreaModalLoading(false);
      }).catch((err) => {
        console.log(err);
        // if (setLoader == true)
        //   setIsChangeAreaModalLoading(false);
      });
  };

  const onProvinceChangeHanlder = (provinceId, itemIndex) => {
    if (provinceId == null) {
      return;
    }
    if (props.route.params?.editItem) {
      const tempEditItem = { ...editItem };
      tempEditItem.fkProvinceId = provinceId;
      tempEditItem.fkCityId = null;
      setEditItem(tempEditItem);
      getActiveCities(provinceId, true);
    } else {
      getActiveCities(provinceId, true);
      setSelectedLocation((prev) => ({
        ...prev,
        provinceId: provinceId,
        cityId: null
      }))
    }

  }

  const getActiveCities = (provinceId, setLoader = false) => {
    console.log('getActiveCities countryId', provinceId);
    if (provinceId == null) {
      console.log('countryId is null');
      return;
    }

    if (setLoader == true)
      setIsLoading(true);
    clientForm.getActiveCities(provinceId)
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setCities(result);
        if (setLoader == true)
          setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        if (setLoader == true)
          setIsLoading(false);
      });
  };

  const addCustomerAddress = () => {
    setIsLoading(true);
    console.log('ADdddddddddddddddddddddddddd');
    console.log('addCustomerAddress', formState.inputValues.mobile);
    console.log('addCustomerAddress', selectedLocation);


    console.log('|||||||||||||||| Add Address');

    clientProfile.addCustomerAddress(
      selectedLocation.cityId,
      selectedLocation.provinceId,
      selectedLocation.countryId,
      locationAddress.description,
      isDefault,
      locationAddress.lat,
      locationAddress.lng,
      formState.inputValues.postalCode,
      formState.inputValues.lastName,
      formState.inputValues.mobile,
      formState.inputValues.firstName,
      formState.inputValues.flatNumber,
      formState.inputValues.streetNumber,
      formState.inputValues.direction
    )
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setAddressesRedux((Math.random() + 1) * 100);
        if (props.route.params?.afterScreen == 'ShippingAddress') {
          setShippingAddressRedux((Math.random() + 1) * 100);
        }
        // res.result => {"addressId": 57, "errorText": null, "requestId": "60b15f214dce4b5eb54545a387ebfce1", "status": "0"}
        if (res.message) {
          snackBarRef.current.show(res.message, 1);
        }
        setTimeout(() => {
          props.navigation.dispatch(state => {

            const routes = state.routes.filter(r => r.name !== 'AddAddressDetail' && r.name !== 'AddressMap');
            routes.push({
              name: 'AddressVerifyPhone', params: {
                data: res.result,
                addressId: res.result.addressId,
                requestId: res.result.requestId,
                mobile: formState.inputValues.mobile,
                countryCode: locationAddress.countryCode,
                phoneCode: selectedLocation.phoneCode,
                afterScreen: props.route.params?.afterScreen,
                afterScreenParams: props.route.params?.afterScreenParams
              }
            });

            return CommonActions.reset({
              ...state,
              routes,
              index: routes.length - 1,
            });

          });
        }, 1000);

        setIsLoading(false);

      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        Keyboard.dismiss();
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const editCustomerAddress = () => {
    setIsLoading(true);


    console.log('|||||||||||||||| Edit Address');
    clientUserActivity.editCustomerAddress(
      editItem.addressId,
      editItem.fkCityId,
      editItem.fkProvinceId,
      editItem.fkCountryId,
      editItem.address,
      editItem.isDefault,
      editItem.locationX,
      editItem.locationY,
      formState.inputValues.postalCode,
      formState.inputValues.lastName,
      formState.inputValues.mobile,
      formState.inputValues.firstName,
      formState.inputValues.flatNumber,
      formState.inputValues.streetNumber,
      formState.inputValues.direction
    )
      .then((response) => {
        const res = response.data;
        console.log('edit result', res.result);
        setIsLoading(false);
        Keyboard.dismiss();
        if (props.route.params?.afterScreen) {
          if (props.route.params?.afterScreen == 'ShippingAddress') {
            setShippingAddressRedux((Math.random() + 1) * 100);
          }
          if (res.message) {
            snackBarRef.current.show(res.message, 1);
          }
          setTimeout(() => {
            props.navigation.navigate(props.route.params?.afterScreen, props.route.params?.afterScreenParams);
          }, 1000);
          return;
        };
        if (res.message) {
          snackBarRef.current.show(res.message, 1);
        }
        setTimeout(() => {
          props.navigation.navigate('Addresses', { fireChange: Math.random() + 2 });
        }, 1000);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        Keyboard.dismiss();
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    getAciveCountries();
  }, []);

  useEffect(() => {
    // back from edit map
    if (editLocationAddress) {
      if (editLocationAddress.lat != editItem?.locationX && editLocationAddress?.lng != editItem?.locationY) {
        // So location changed
        console.log('[AddAddressDetail] Edit Location');
        countrySelectHandler(countries)
      }
    }
  }, [editLocationAddress]);

  console.log('formState', formState);

  useEffect(() => {
    if (props.route.params?.editItem) {
      console.log('[AddAddressDetail] Edit Item');
      setEditItem({ ...props.route.params?.editItem });
      setFormSubmitted(true);
      inputChangeHandler('firstName', props.route.params?.editItem.transfereeName, true);
      inputChangeHandler('lastName', props.route.params?.editItem.transfereeFamily, true);
      inputChangeHandler('mobile', props.route.params?.editItem.transfereeMobile, true);
      inputChangeHandler('postalCode', props.route.params?.editItem.postalCode, true);
      inputChangeHandler('flatNumber', props.route.params?.editItem.flatNumber, true);
      inputChangeHandler('streetNumber', props.route.params?.editItem.streetNumber, true);
      inputChangeHandler('direction', props.route.params?.editItem.direction, true);
    }
  }, [props.route.params?.editItem]);

  useEffect(() => {
    if (props.route.params?.formValues) {
      console.log('[AddAddressDetail] formValues');
      // setEditItem({ ...props.route.params?.editItem });
      setFormSubmitted(true);
      inputChangeHandler('firstName', props.route.params?.formValues.firstName, true);
      inputChangeHandler('lastName', props.route.params?.formValues.lastName, true);
      inputChangeHandler('mobile', props.route.params?.formValues.mobile, true);
      inputChangeHandler('postalCode', props.route.params?.formValues.postalCode, true);
      inputChangeHandler('flatNumber', props.route.params?.editItem.flatNumber, true);
      inputChangeHandler('streetNumber', props.route.params?.editItem.streetNumber, true);
      inputChangeHandler('direction', props.route.params?.editItem.direction, true);
    }
  }, [props.route.params?.formValues]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const textChangeHandler = (value) => {
    if (props.onTextChange)
      props.onTextChange(value);
  };

  const submitHandler = useCallback(async () => {
    console.log('selectedLocation.countryId', selectedLocation.countryId);
    console.log('editItem', editItem);
    const isValidPhoneNumber = mobileInputRef?.current?.isValidPhoneNumber();
    console.log('*********************', isValidPhoneNumber, '******************');
    if (selectedLocation.countryId == null && editItem == null) {
      snackBarRef.current.show(Languages.Address.TheAddressSelectedIsNoOfActiveCountries, 2, true, 8000)
    }
    if (!formSubmitted) {
      setFormSubmitted(true);
    };

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    }
    if (isValidPhoneNumber === false) {
      return;
    }
    if (editItem) {
      // Edit State
      editCustomerAddress();
    } else {
      // Add State
      addCustomerAddress();
    }
  }, [formState, selectedLocation, editItem]);

  const onCountryChangeHanlder = (countryId, itemIndex) => {
    getActiveProvinces(countryId, true, true);
  }

  const onCityChangeHanlder = (cityId) => {
    if (cityId == null)
      return;
    if (props.route.params?.editItem) {
      const tempEditItem = { ...editItem };
      console.log('cityId: ===> ', cityId);
      tempEditItem.fkCityId = cityId;
      setEditItem(tempEditItem)
    } else {
      setSelectedLocation((prev) => ({
        ...prev,
        cityId: cityId
      }))
    }
  }

  const changeisDefaultHandler = () => {
    let value = false;
    if (isDefault == true)
      value = false;
    if (isDefault == false)
      value = true;
    setIsDefault(value)
  }

  const changeLocationHandler = () => {
    if (props.route.params?.editItem) {
      props.navigation.navigate('AddressMap', {
        afterScreen: props.route?.params?.afterScreen,
        editLocation: {
          lat: editLocationAddress?.lat || props.route.params?.editItem.locationX,
          lng: editLocationAddress?.lng || props.route.params?.editItem.locationY
        },
        fromEditShippingAddress: fromEditShippingAddress
      });
    } else {
      props.navigation.navigate('AddressMap', { formValues: formState.inputValues });
    }
  }

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} title={props.route.params?.editItem ? Languages.Address.EditAddressCap : Languages.Address.AddAddress} showBackIcon={true} />

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView contentContainerStyle={{}} >

          <ShadowWrapper
            shadowContainerStyle={styles.shadowContainerStyle}
            contentContainer={styles.shadowContainerStyle}
          >
            <View style={styles.contentContainer}>
              <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>

                  <View style={styles.showAddress}>
                    <View style={styles.showAddressLeft}>
                      <Text style={styles.showAddressTitleText}>{Languages.Address.SetFromMap}:</Text>
                      <Text numberOfLines={7} style={styles.showAddressText}>{locationAddress?.description || editItem?.address}</Text>
                    </View>
                    <View style={styles.showAddressRight}>
                      <TouchableOpacity onPress={changeLocationHandler} style={styles.showAddressIconContainer}>

                        {(locationAddress || editItem) && (locationAddress?.lat || editItem.locationX) &&
                          (locationAddress?.lat != 0 || editItem.locationX != 0) ?
                          <>
                            <MapView
                              style={StyleSheet.absoluteFillObject}
                              initialRegion={{
                                latitude: locationAddress?.lat || editItem?.locationX,
                                longitude: locationAddress?.lng || editItem?.locationY,
                                latitudeDelta: 0.8922,
                                longitudeDelta: 0.8421,
                              }}
                            >
                            </MapView>
                            <View style={styles.mapOverlay}></View>
                          </>
                          :
                          null}

                        <PenIcon
                          width={Scale.moderateScale(30)}
                          height={Scale.moderateScale(30)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

                {fromEditShippingAddress !== true ?
                  <>
                    <View style={styles.inputContainer}>
                      <DropdownPickerInput
                        showLabel={true}
                        lableText={Languages.Profile.Country}
                        selectedValue={selectedLocation.countryId || editItem?.fkCountryId}
                        enabled={false}
                        showRequireStart={true}
                        formSubmitted={formSubmitted}
                        placeholder={Languages.Placeholder.PleaseSelectCountry}
                        items={countries}
                        itemTitle={'countryTitle'}
                        itemValue={'countryId'}
                        onValueChange={onCountryChangeHanlder}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <DropdownPickerInput
                        showLabel={true}
                        // enabled={fromEditShippingAddress !== true}
                        lableText={Languages.InputLabels.Province}
                        selectedValue={selectedLocation.provinceId || editItem?.fkProvinceId}
                        showRequireStart={true}
                        formSubmitted={formSubmitted}
                        placeholder={Languages.Placeholder.PleaseSelectProvince}
                        items={provinces}
                        required={true}
                        itemTitle={'provinceName'}
                        itemValue={'provinceId'}
                        onValueChange={onProvinceChangeHanlder}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <DropdownPickerInput
                        showLabel={true}
                        lableText={Languages.Address.City}
                        // enabled={fromEditShippingAddress !== true}
                        selectedValue={selectedLocation.cityId || editItem?.fkCityId}
                        showRequireStart={true}
                        formSubmitted={formSubmitted}
                        placeholder={Languages.Placeholder.PleaseSelectCity}
                        items={cities}
                        itemTitle={'cityTitle'}
                        itemValue={'cityId'}
                        onValueChange={onCityChangeHanlder}
                      />
                    </View>
                  </>
                  :
                  null}

                <View style={styles.inputContainer}>
                  <MainInput
                    ref={mobileInputRef}
                    lableText={Languages.InputLabels.MobileNumber}
                    placeholder={Languages.Placeholder.EnterMobileNumber}
                    id="mobile"
                    initialValue={formState.inputValues.mobile}
                    maxLength={50}
                    countryCode={locationAddress?.countryCode || editItem?.iso}
                    showPhonePrefix={true}
                    phoneNumber={true}
                    phonePrefix={'+' + (selectedLocation?.phoneCode || editItem?.phoneCode)}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.FirstName}
                    placeholder={Languages.Placeholder.EnterFirstName}
                    id="firstName"
                    initialValue={formState.inputValues.firstName}
                    maxLength={30}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />

                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.LastName}
                    placeholder={Languages.Placeholder.EnterLastName}
                    id="lastName"
                    initialValue={formState.inputValues.lastName}
                    maxLength={50}
                    showRequireStart={true}
                    editable={true}
                    enableRealTimeTextChangeListener={true}
                    required={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    inputStyle={styles.emailInputStyle}
                    lableText={Languages.InputLabels.PostalCode}
                    placeholder={Languages.Placeholder.EnterPostalCode}
                    id="postalCode"
                    // minLength={4}
                    maxLength={50}
                    required={false}
                    enableRealTimeTextChangeListener={true}
                    initialValue={formState.inputValues.postalCode}
                    editable={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.Flat}
                    placeholder={Languages.Placeholder.EnterFlat}
                    id="flatNumber"
                    initialValue={formState.inputValues.flatNumber}
                    maxLength={30}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />

                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.StreetNumber}
                    placeholder={Languages.Placeholder.EnterStreetNumber}
                    id="streetNumber"
                    initialValue={formState.inputValues.streetNumber}
                    maxLength={30}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />

                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.Direction}
                    placeholder={Languages.Placeholder.EnterDirection}
                    id="direction"
                    initialValue={formState.inputValues.direction}
                    maxLength={30}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    showRequireStart={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />

                </View>

                {/* <View style={styles.inputContainer}>
                <View style={styles.specItemContainer}>
                  <TouchableOpacity onPress={changeisDefaultHandler} style={styles.specItem}>
                    <View style={styles.radioContainer}>
                      <RadioButton
                        isSelected={isDefault}
                        disabled={true}
                        onPress={changeisDefaultHandler}
                        isCheckBox={true}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.specText}>{Languages.Address.SetAsDefaultAaddress}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}

              </View>

            </View>
          </ShadowWrapper>
        </ScrollView>

        <FloatButtonWrapper>
          <MainButton onPress={submitHandler}>
            {Languages.Common.Continue}
          </MainButton>
        </FloatButtonWrapper>
      </KeyboardAvoidingView>

      <SnackBar
        closeText={Languages.Common.Close}
        ref={snackBarRef}
      />
    </>
  );
};


export default AddAddressDetailScreen;
