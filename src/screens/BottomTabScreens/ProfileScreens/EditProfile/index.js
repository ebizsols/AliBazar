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
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { clientForm, clientProfile } from 'api/client';
import styles from './style'
import { CommonHeader } from 'components';
import {
  ShadowWrapper,
  MainInput,
  MainButton,
  SnackBar,
  RequestLoader,
  FloatButtonWrapper,
} from 'components/UI';
import { Languages, Tools } from 'common';
import { DropdownPickerInput } from 'components/UI/DropdownPickerInput';


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

const EditProfileScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userName: null,
      firstName: null,
      lastName: null,
      nationalCode: null,
      birthDate: null
    },
    inputValidities: {
      userName: true,
      firstName: false,
      lastName: false,
      nationalCode: false,
      birthDate: false
    },
    formIsValid: false
  });
  const [isLoading, setIsLoading] = useState(null);
  const snackBarRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [cities, setCities] = useState(null);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const getCustomerDetailsProfile = () => {
    setIsLoading(true);
    clientProfile.getCustomerDetailsProfile()
      .then((response) => {
        const res = response.data;
        // res.result.email = 'raminghadirimoghadtesgsfsdam@gmail.com'
        console.log(res.result);
        setIsLoading(false)
        setProfileData(res.result);
        inputChangeHandler('firstName', res.result.name, true);
        inputChangeHandler('lastName', res.result.family, true);
        inputChangeHandler('userName', res.result.email, true);
        inputChangeHandler('nationalCode', res.result.nationalCode, true);
        inputChangeHandler('birthDate', res.result.birthDate, true);
        if (res.result.fkCountryId) {
          getActiveProvinces(res.result.fkCountryId);
        }
        if (res.result.fkProvinceId) {
          getActiveCities(res.result.fkProvinceId);
        }
        console.log(res.result);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err);
        console.log(err.response.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const getAciveCountries = () => {
    clientForm.getAciveCountries()
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setCountries(result);
      }).catch((err) => {

      });
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
        // if (setLoader == true)
        //   setIsChangeAreaModalLoading(false);
      });
  };

  const getActiveCities = (provinceId, setLoader = false) => {
    clientForm.getActiveCities(provinceId)
      .then((response) => {
        const res = response.data;

        let result = res.result;
        setCities(result);
      }).catch((err) => {
      });
  };

  useEffect(() => {
    getCustomerDetailsProfile();
    getAciveCountries();
  }, []);

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

  const onCountryChangeHanlder = (countryId, itemIndex) => {
    if (countryId) {
      const tempItem = { ...profileData };
      tempItem.fkCountryId = countryId;
      tempItem.fkProvinceId = null;
      tempItem.fkCityId = null;
      setProfileData(tempItem);

      getActiveProvinces(countryId, true);
      setCities(null);
    }
  }

  const onProvinceChangeHanlder = (provinceId, itemIndex) => {
    const tempItem = { ...profileData };
    tempItem.fkProvinceId = provinceId;
    tempItem.fkCityId = null;
    setProfileData(tempItem);

    if (provinceId) {
      getActiveCities(provinceId, true);
    }
    else {
      setCities(null);
    }

  }

  const onCityChangeHanlder = (cityId, itemIndex) => {
    const tempItem = { ...profileData };
    tempItem.fkCityId = cityId;
    setProfileData(tempItem);
  }

  const editCustomerProfile = () => {
    setIsLoading(true);
    clientProfile.editCustomerProfile(
      formState.inputValues.firstName,
      formState.inputValues.lastName,
      formState.inputValues.userName,
      formState.inputValues.nationalCode,
      formState.inputValues.birthDate,
      profileData?.fkCityId,
      profileData?.fkCountryId,
      profileData?.fkProvinceId
    )
      .then((response) => {
        const res = response.data;
        setIsLoading(false)
        console.log(res);
        props.navigation.navigate('Profile', { editProfileObject: { name: formState.inputValues.firstName, family: formState.inputValues.lastName } });
        // snackBarRef.current.show(res.message, 1);
        // props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [
        //       { name: 'Profile' },
        //     ],
        //   })
        // );

      }).catch((err) => {
        console.log(err);
        setIsLoading(false)
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };


  const submitHandler = useCallback(async () => {
    if (!formSubmitted) {
      setFormSubmitted(true);
    }

    if (!formState.formIsValid) {
      console.log('error', formState.inputValidities);
      return;
    } editCustomerProfile();
  }, [formState, profileData]);

  const onChangePasswordPressHandler = () => {
    props.navigation.navigate('ChangePassword');
  };

  const onPressEmailVerifyHandler = () => {
    props.navigation.navigate('VerifyEmail', { email: profileData?.email });
  };

  const onPressMobileVerifyHandler = () => {
    setIsLoading(true);
    // props.navigation.navigate('VerifyEmail', { email: profileData?.email });
    clientProfile.verifyCustomerMobileNumber()
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        Keyboard.dismiss();
        setIsLoading(false);
        props.navigation.navigate('VerifyPhone', { requestId: res.result.requestId, countryCode: profileData.iso, mobile: profileData.mobileNumber });
      }).catch((err) => {
        console.log('err', err);
        Keyboard.dismiss();
        setIsLoading(false);
        console.log(err.response?.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  return (
    <>
      {isLoading == true ? <RequestLoader /> : null}

      <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Profile.EditProfile} showBackIcon={true} />

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1 }}
        enabled={Platform.OS == 'ios'}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{}} >

          <ShadowWrapper
            shadowContainerStyle={styles.shadowContainerStyle}
            contentContainer={styles.shadowContainerStyle}
          >
            <View style={styles.contentContainer}>
              <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.FirstName}
                    placeholder={Languages.Placeholder.EnterFirstName}
                    id="firstName"
                    initialValue={profileData?.name}
                    maxLength={30}
                    editable={true}
                    required={true}
                    showRequireStart={true}
                    enableRealTimeTextChangeListener={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.LastName}
                    placeholder={Languages.Placeholder.EnterLastName}
                    id="lastName"
                    initialValue={profileData?.family}
                    maxLength={50}
                    showRequireStart={true}
                    editable={true}
                    required={true}
                    enableRealTimeTextChangeListener={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.NationalCode}
                    placeholder={Languages.Placeholder.EnterNationalCode}
                    id="nationalCode"
                    initialValue={profileData?.nationalCode}
                    maxLength={10}
                    // showRequireStart={true}
                    editable={true}
                    // required={true}
                    enableRealTimeTextChangeListener={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MainInput
                    lableText={Languages.InputLabels.BirthDayDate}
                    placeholder={Languages.Placeholder.ClickToSelectDate}
                    id="birthDate"
                    initialValue={profileData?.birthDate}
                    // maxLength={50}
                    type={'datepicker'}
                    // showRequireStart={true}
                    editable={false}
                    // required={true}
                    enableRealTimeTextChangeListener={true}
                    onInputChange={inputChangeHandler}
                    formSubmitted={formSubmitted}
                  />
                </View>

                {/* <View>
                <View>
                  <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                  <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View> */}

                <View style={styles.inputContainer}>
                  <DropdownPickerInput
                    showLabel={true}
                    lableText={Languages.Profile.Country}
                    selectedValue={profileData?.fkCountryId}
                    enabled={true}
                    showRequireStart={true}
                    required={true}
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
                    lableText={Languages.InputLabels.Province}
                    selectedValue={profileData?.fkProvinceId}
                    // showRequireStart={true}
                    formSubmitted={formSubmitted}
                    placeholder={Languages.Placeholder.PleaseSelectProvince}
                    items={provinces}
                    required={false}
                    itemTitle={'provinceName'}
                    itemValue={'provinceId'}
                    onValueChange={onProvinceChangeHanlder}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <DropdownPickerInput
                    showLabel={true}
                    lableText={Languages.Address.City}
                    selectedValue={profileData?.fkCityId}
                    // showRequireStart={true}
                    formSubmitted={formSubmitted}
                    placeholder={Languages.Placeholder.PleaseSelectCity}
                    items={cities}
                    required={false}
                    itemTitle={'cityTitle'}
                    itemValue={'cityId'}
                    onValueChange={onCityChangeHanlder}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.emailSection}>
                    <View style={styles.emailLabel}>
                      <Text style={styles.emailLabelText}>{Languages.InputLabels.MobileNumber}</Text>
                    </View>
                    <View style={styles.emailContainer}>
                      <View style={styles.emailWrapper}>
                        <Text numberOfLines={1} style={styles.emailText}>{Tools.formatPhoneNumber(profileData?.mobileNumber, profileData?.iso)}</Text>
                      </View>
                      {profileData?.mobileVerifed == false && profileData?.mobileNumber ?
                        <TouchableOpacity onPress={onPressMobileVerifyHandler} style={styles.verifyEmailContainer}>
                          <Text style={styles.verifyEmailText}>{Languages.Profile.VerifyMobileNumber}</Text>
                        </TouchableOpacity>
                        :
                        null}
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.emailSection}>
                    <View style={styles.emailLabel}>
                      <Text style={styles.emailLabelText}>{Languages.InputLabels.EmailAddress}</Text>
                    </View>
                    <View style={styles.emailContainer}>
                      <View style={styles.emailWrapper}>
                        <Text numberOfLines={1} style={styles.emailText}>{profileData?.email}</Text>
                      </View>
                      {profileData?.emailVerifed == false && profileData?.email ?
                        <TouchableOpacity onPress={onPressEmailVerifyHandler} style={styles.verifyEmailContainer}>
                          <Text style={styles.verifyEmailText}>{Languages.Profile.VerifyYourEmail}</Text>
                        </TouchableOpacity>
                        :
                        null}
                    </View>
                  </View>
                </View>

                <View style={styles.bottomTextContainer}>
                  <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.bottomTexts}>
                      <Text onPress={onChangePasswordPressHandler} style={styles.bottomText}>{Languages.Profile.ChangePassword}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

            </View>
          </ShadowWrapper>
        </ScrollView>

        <FloatButtonWrapper>
          <MainButton onPress={submitHandler}>
            {Languages.Common.Save}
          </MainButton>
        </FloatButtonWrapper>

      </KeyboardAvoidingView>

      <SnackBar
        ref={snackBarRef}
      />
    </>
  );
};


export default EditProfileScreen;
