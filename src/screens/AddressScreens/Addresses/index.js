import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  BackHandler
} from 'react-native';
import { clientProfile, clientUserActivity } from 'api/client';
import styles from './style'
import {
  AddressesHeader,
  AddressItem,
  BottomSheetBackView,
  BottomSheetHeader
} from 'components';
import {
  IconRow,
  ShadowWrapper,
  MainButton,
  SnackBar,
  RequestLoader
} from 'components/UI';
import { Languages, Scale } from 'common';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import CloseIcon from 'assets/icons/close-unfill-circle.svg';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyAddressIcon from 'assets/icons/empty-address.svg';
import { LazyHOC } from 'HOCs';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AddressesScreen = (props) => {

  const reduxFireChange = useSelector(state => state.fireChangeReducer.addressesFireChange);

  const [isLoading, setIsLoading] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);

  // useEffect(() => {
  //   getAddress();
  // }, []);

  const getAddress = () => {
    console.log('Get Addresses...........');
    setIsLoading(true);
    clientProfile.getAddress()
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        setAddresses(res.result);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err.response.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  useEffect(() => {
    console.log('redux firechange: ', reduxFireChange);
    if (reduxFireChange) {
      console.log('doing firechange job');
      getAddress();
    } else {
      getAddress();
    }
  }, [reduxFireChange]);

  const setDefualtAddress = (addressId) => {
    setIsLoading(true);
    clientProfile.setDefualtAddress(addressId)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);

        const tempAddresses = [...addresses];

        const findPrevPrimaryAddressIndex = addresses.findIndex(x => x.isDefualt == true);
        const findNewPrimaryAddressIndex = addresses.findIndex(x => x.addressId == addressId);

        if (findPrevPrimaryAddressIndex != -1) {
          tempAddresses[findPrevPrimaryAddressIndex].isDefualt = false;
        }

        if (findNewPrimaryAddressIndex != -1) {
          tempAddresses[findNewPrimaryAddressIndex].isDefualt = true;
        }

        setAddresses(tempAddresses);
      }).catch((err) => {
        setIsLoading(false)
        console.log('err', err.response.data);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const deleteAddress = (addressId) => {
    setIsLoading(true);
    clientUserActivity.deleteAddress(addressId)
      .then(() => {
        setIsLoading(false);
        getAddress();
      }).catch((err) => {
        setIsLoading(false)
        console.log(err.response?.data);
        snackBarRef.current.show(err.response?.data?.message, 2);
      });
  };

  const snackBarRef = useRef(null);

  const childRef = useRef();
  const bottomSheetRef = useRef(null);

  const [fall] = useState(new Animated.Value(1));

  const closeEnd = () => {
    childRef.current.closeEnd()
  };

  const openEnd = () => {
    childRef.current.openEnd()
  };

  const RenderContent = () => {
    return (
      <View style={styles.bottomSheetContentContainer}>
        <View style={styles.bottomSheetItemContainer}>
          <IconRow
            containerStyle={styles.bottomSheetItem}
            showArrowIcon={false}
            icon={EditMapIcon}
            onPress={editAddressPressHandler}
          >
            <View style={styles.bottomSheetItemTextContainer}>
              <Text style={styles.bottomSheetItemText}>{Languages.Address.EditAddress}</Text>
            </View>
          </IconRow>
        </View>
        <View style={styles.bottomSheetItemLine}></View>
        <View style={styles.bottomSheetItemContainer}>
          <IconRow
            containerStyle={styles.bottomSheetItem}
            showArrowIcon={false}
            icon={CloseIcon}
            onPress={deleteAddressHandler}>
            <View style={styles.bottomSheetItemTextContainer}>
              <Text style={[styles.bottomSheetItemText, styles.bottomSheetItemTextDeleteText]}>{Languages.Address.Delete}</Text>
            </View>
          </IconRow>
        </View>
      </View>
    )
  };

  const onAddressMenuPressHandler = (addressItem) => {
    setSelectedAddress(addressItem);
    bottomSheetRef.current.snapTo(0)
  }

  const deleteAddressHandler = () => {
    bottomSheetRef.current.snapTo(1);
    childRef.current.closeEnd();
    deleteAddress(selectedAddress.addressId);
  }

  const editAddressPressHandler = () => {
    bottomSheetRef.current.snapTo(1);
    childRef.current.closeEnd();
    props.navigation.navigate('AddAddressDetail', { editItem: selectedAddress })
  }

  const addAddressPressHanlder = () => {
    props.navigation.navigate('AddressMap')
  }

  const setDefaultAddressHandler = (item, index) => {
    setDefualtAddress(item.addressId)
  }

  const onVerifyPhoneNumberPressHandler = (item, index) => {
    console.log(item.addressId);
    console.log(item.transfereeMobile);
    setIsLoading(true);
    clientProfile.changeMobileNumberAddress(item.addressId, item.transfereeMobile)
      .then((response) => {
        const res = response.data;
        setIsLoading(false);
        console.log('[Addresses] onVerifyPhoneNumberPressHandler()', res.result);
        props.navigation.navigate('AddressVerifyPhone', {
          addressId: item.addressId,
          countryCode: item.iso,
          phoneCode: item.phoneCode,
          requestId: res.result.requestId,
          mobile: item.transfereeMobile,
        });
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response?.data?.message)
          snackBarRef.current.show(err.response?.data?.message, 2);
      });

  }

  useEffect(() => {
    if (props.route.params?.fireChange) {
      console.log('[Addresses] fire change');
      getAddress();
    }
  }, [props.route.params?.fireChange]);

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

      <AddressesHeader onPressBack={() => props.navigation.goBack()} onPressRightIcon={addAddressPressHanlder} showBackIcon={true} />
      <View style={[styles.container]}>
        {addresses?.length > 0 ?
          <ShadowWrapper
            shadowContainerStyle={{
              flex: 1,
              paddingBottom: 0,
            }}
            contentContainer={{
              flex: 1
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={addresses}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <View style={styles.addressItemWrapper}>
                      <AddressItem
                        onSetDefualtAddressPress={() => setDefaultAddressHandler(item, index)}
                        onVerifyPhoneNumberPress={() => onVerifyPhoneNumberPressHandler(item, index)}
                        onMenuPress={onAddressMenuPressHandler}
                        data={item} />
                    </View>
                    {
                      index != addresses.length - 1 ?
                        <View style={styles.cartItemLine}></View>
                        :
                        null
                    }
                  </>
                )
              }}
              keyExtractor={(item) => item.addressId.toString()}
            />
          </ShadowWrapper>
          :
          null
        }

        {addresses?.length == 0 && isLoading == false ?
          <View style={styles.emptyViewContainer}>
            <View style={styles.emptyTop}>
              <View style={styles.emptyIconContainer}>
                <EmptyAddressIcon
                  width={Scale.moderateScale(200)}
                  height={Scale.moderateScale(200)}
                />
              </View>
            </View>
            <View style={styles.emptyMiddle}>
              <Text style={styles.emptyTextFirst}>{Languages.Address.WhereAreYourSavedAddresses}</Text>
              <Text style={styles.emptyTextSecond}>{Languages.Address.AddAnAddressGetCrackingDelivery}</Text>
            </View>
            <View style={styles.emptyBottom}>
              <MainButton onPress={addAddressPressHanlder}>{Languages.Address.AddAnAddress}</MainButton>
            </View>
          </View>
          :
          null
        }
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={1}
        snapPoints={[Scale.moderateScale(55) * 2 + Scale.moderateScale(50), 0]}
        onCloseEnd={closeEnd}
        onOpenEnd={openEnd}
        callbackNode={fall}
        renderHeader={() => <BottomSheetHeader />}
        renderContent={() => <RenderContent />}
      />

      <BottomSheetBackView
        bottomSheetRef={bottomSheetRef} ref={childRef}
        fall={fall} />

      <SnackBar
        ref={snackBarRef}
      />
    </LazyHOC>
  );
};


export default AddressesScreen;

const data = [
  {
    "address": "214 Rd No 907, Manama 309, Bahrain",
    "addressId": 65,
    "cityName": "Madinat `Isa",
    "countryName": "Bahrain",
    "fkCityId": 1053,
    "fkCountryId": 137,
    "isDefualt": true,
    "iso": "BH",
    "locationX": 26.219900175281804,
    "locationY": 50.5820682272315,
    "mobileVerifed": false,
    "phoneCode": "973",
    "postalCode": "",
    "transfereeFamily": "Fhhh",
    "transfereeMobile": "37755546   ",
    "transfereeName": "Ramin"
  },
  {
    "address": "Wali AlAhed Highway4/Clock R/A, Riffa, Bahrain",
    "addressId": 66,
    "cityName": "Madinat Hamad",
    "countryName": "Bahrain",
    "fkCityId": 1054,
    "fkCountryId": 137,
    "isDefualt": false,
    "iso": "BH",
    "locationX": 26.134933,
    "locationY": 50.533683,
    "mobileVerifed": false,
    "phoneCode": "973",
    "postalCode": "",
    "transfereeFamily": "dsfsdf",
    "transfereeMobile": "37755546   ",
    "transfereeName": "Jurisdfsdf"
  },
  {
    "address": "Rd 2721, Saar, Bahrain",
    "addressId": 67,
    "cityName": "Madinat Hamad",
    "countryName": "Bahrain",
    "fkCityId": 1054,
    "fkCountryId": 137,
    "isDefualt": false,
    "iso": "BH",
    "locationX": 26.1873791,
    "locationY": 50.4904362,
    "mobileVerifed": false,
    "phoneCode": "973",
    "postalCode": "",
    "transfereeFamily": "dfdsfds",
    "transfereeMobile": "37755548   ",
    "transfereeName": "Jurisdfsdf"
  },
  {
    "address": "Flat-31, Bldg-263, Road-2807، Manama, Bahrain",
    "addressId": 68,
    "cityName": "Madinat `Isa",
    "countryName": "Bahrain",
    "fkCityId": 1053,
    "fkCountryId": 137,
    "isDefualt": false,
    "iso": "BH",
    "locationX": 26.215605,
    "locationY": 50.5798088,
    "mobileVerifed": false,
    "phoneCode": "973",
    "postalCode": "44455",
    "transfereeFamily": "ghhghg",
    "transfereeMobile": "37755540   ",
    "transfereeName": "ghgf"
  },
  {
    "address": "Rd No 2831, Riffa, Bahrain",
    "addressId": 69,
    "cityName": "Madinat Hamad",
    "countryName": "Bahrain",
    "fkCityId": 1054,
    "fkCountryId": 137,
    "isDefualt": false,
    "iso": "BH",
    "locationX": 26.13205796914806,
    "locationY": 50.521035231649876,
    "mobileVerifed": false,
    "phoneCode": "973",
    "postalCode": "",
    "transfereeFamily": "Hgr",
    "transfereeMobile": "37755542   ",
    "transfereeName": "Gdvh"
  }
]

