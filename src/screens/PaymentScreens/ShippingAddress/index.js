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
    Animated as ReactAnimated,
} from 'react-native';
import {
    clientAuth,
    clientProfile,
    clientUserActivity,
    clientUserOrder
} from 'api/client';
import {
    ModuleSelection,
    HomeHeader,
    AddressesHeader,
    BottomSheetHeader,
    BottomSheetBackView,
    CommonHeader
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    ProductItemSec,
    TextWithRadio,
    FloatButtonWrapper,
    DropdownPickerInput
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import PlusIcon from 'assets/icons/plus.svg';
import CloseIcon from 'assets/icons/close-gray.svg';
import LogoIcon from 'assets/icons/logo-white.svg';
import Animated from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import AddresssWithRadio from './AddresssWithRadio';
import BottomSheet from 'reanimated-bottom-sheet';
import EditMapIcon from 'assets/icons/edit-map.svg';
import EmptyAddressIcon from 'assets/icons/empty-address.svg';
import { useSelector } from 'react-redux';

const ShippingAddressScreen = (props) => {

    const reduxFireChange = useSelector(state => state.fireChangeReducer.shippingAdressFireChange);

    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState([]);

    useEffect(() => {
        getAddresses();
    }, []);

    const snackBarRef = useRef(null);

    useEffect(() => {
        console.log('redux firechange: ', reduxFireChange);
        if (reduxFireChange) {
            console.log('doing firechange job');
            getAddresses();
        };
    }, [reduxFireChange]);

    const getAddresses = () => {
        setIsLoading(true);
        clientUserActivity.getAddresses()
            .then((response) => {
                const res = response.data;
                if (res.result?.length > 0 && selectedAddressId == null) {
                    setSelectedAddressId(res.result[0].addressId);
                } else {
                    if (res.result?.length > 0) {
                        const findSelectedAddressIndex = res.result?.findIndex(x => x.addressId == selectedAddressId);
                        if (findSelectedAddressIndex != -1) {

                        } else {
                            setSelectedAddressId(res.result[0].addressId);
                            // setSelectedAddressId(null);
                        }
                    } else {
                        setSelectedAddressId(null);
                    }
                }

                setIsLoading(false);
                setAddresses(res.result);
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const onSelectAddressHandler = (item) => {
        setSelectedAddressId(item.addressId);
    };

    const changeDestination = () => {
        setIsLoading(true);
        clientUserOrder.changeDestination(selectedAddressId)
            .then((response) => {
                const res = response.data;
                setIsLoading(false);
                if (res.result == true) {
                    props.navigation.navigate('Payment', { addressId: selectedAddressId })
                } else {
                    snackBarRef.current.show(res.message, 2);
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log(err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const continuePressHandler = () => {
        if (selectedAddressId == null) {
            snackBarRef?.current?.show(Languages.Payment.PleaseSelectAddressFirst, 2);
            return;
        } else {
            const findSelectedAddressIndex = addresses?.findIndex(x => x.addressId == selectedAddressId);
            if (findSelectedAddressIndex != -1) {
                // console.log(addresses[findSelectedAddressIndex]);
                /* if (addresses[findSelectedAddressIndex].mobileVerifed == false) {
                    snackBarRef?.current?.show(Languages.Payment.YouMustVerifyMobileFirst, 2);
                    return;
                } */
            } else {
                snackBarRef?.current?.show(Languages.Payment.PleaseSelectAddressFirst, 2);
                setSelectedAddressId(null);
                return;
            }
        }
        changeDestination();
    };

    // =======================
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
                getAddresses();
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response?.data);
                snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

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
    };

    const deleteAddressHandler = () => {
        bottomSheetRef.current.snapTo(1);
        childRef.current.closeEnd();
        deleteAddress(selectedAddress.addressId);
    };

    const editAddressPressHandler = () => {
        bottomSheetRef.current.snapTo(1);
        childRef.current.closeEnd();
        props.navigation.navigate('AddAddressDetail', {
            fromEditShippingAddress: true,
            editItem: selectedAddress,
            afterScreen: 'ShippingAddress',
            afterScreenParams: { fireChange: Math.random() + 1 }
        })
    };

    const setDefaultAddressHandler = (item, index) => {
        setDefualtAddress(item.addressId)
    };

    const onVerifyPhoneNumberPressHandler = (item, index) => {

        setIsLoading(true);
        clientProfile.changeMobileNumberAddress(item.addressId, item.transfereeMobile)
            .then((response) => {
                const res = response.data;
                setIsLoading(false);
                // console.log('[Addresses] onVerifyPhoneNumberPressHandler()', res.result);
                props.navigation.navigate('AddressVerifyPhone', {
                    addressId: item.addressId,
                    countryCode: item.iso,
                    phoneCode: item.phoneCode,
                    requestId: res.result.requestId,
                    mobile: item.transfereeMobile,
                    afterScreen: 'ShippingAddress',
                    afterScreenParams: { fireChange: Math.random() + 1 }
                });
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };
    //   =============================

    const addAddressPressHanlder = () => {
        props.navigation.navigate('AddressMap',
            {
                afterScreen: 'ShippingAddress',
                afterScreenParams: { fireChange: Math.random() + 1 },
                fromAddShippingAddress: true
            })
    };

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <CommonHeader onPressRightIcon={addAddressPressHanlder} onPressBack={() => props.navigation.goBack()} showRightIcon={true} title={Languages.Payment.ShippingAddress} showBackIcon={true} />
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    {addresses?.length > 0 ?
                        <ShadowWrapper contentContainer={[styles.screenPadding, { flex: 1 }]}>
                            {
                                addresses.map((item, index) => {
                                    return (
                                        <View key={item.addressId}>
                                            <View style={styles.addressWrapper}>
                                                <AddresssWithRadio
                                                    setDefaultAddressHandler={() => setDefaultAddressHandler(item, index)}
                                                    onVerifyPhoneNumberPressHandler={() => onVerifyPhoneNumberPressHandler(item, index)}
                                                    onAddressMenuPressHandler={onAddressMenuPressHandler}
                                                    onRadioPress={() => onSelectAddressHandler(item)}
                                                    selectedAddressId={selectedAddressId}
                                                    data={item} />
                                            </View>
                                            {index == addresses.length - 1 ?
                                                null
                                                :
                                                <View style={styles.itemLine}></View>
                                            }
                                        </View>
                                    )
                                })}
                        </ShadowWrapper>
                        :
                        null}

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
                </ScrollView>
            </View>

            <FloatButtonWrapper>
                <MainButton disabled={!!!selectedAddressId} onPress={continuePressHandler}>
                    {Languages.Common.Continue}
                </MainButton>
            </FloatButtonWrapper>

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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingVertical: Scale.moderateScale(10),
    },
    screenPadding: {
        paddingHorizontal: Scale.moderateScale(20),
    },
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    //
    addressWrapper: {
        paddingVertical: Scale.moderateScale(20)
    },
    //
    cartItemLine: {
        height: Scale.moderateScale(1.5),
        width: '92%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    bottomSheetContentContainer: {
        backgroundColor: Colors.WHITE,
        height: '100%',
        paddingHorizontal: Scale.moderateScale(10)
    },
    bottomSheetItemLine: {
        backgroundColor: Colors.GALLERY,
        height: Scale.moderateScale(1.8)
    },
    bottomSheetItemContainer: {
        // paddingVertical: Scale.moderateScale(15),
        height: Scale.moderateScale(55),
        justifyContent: 'center'
    },
    bottomSheetItemTextContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1
    },
    bottomSheetItemText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    bottomSheetItemTextDeleteText: {
        color: Colors.TORCHRED2,
    },
    /// empty view
    emptyViewContainer: {
        flex: 1,
        paddingHorizontal: Scale.moderateScale(20)
    },
    emptyTop: {
        flex: 1.8,
        alignItems: "center",
        justifyContent: "flex-end",

    },
    emptyIconContainer: {
    },
    emptyMiddle: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: Scale.moderateScale(5)
    },
    emptyTextFirst: {
        textAlign: "center",
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    emptyTextSecond: {
        textAlign: "center",
        marginTop: Scale.moderateScale(20),
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    emptyBottom: {
        marginTop: Scale.moderateScale(50),
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: Scale.moderateScale(20)
    }
});


export default ShippingAddressScreen;

const data = [
    {
        "address": "Rd No 2228, Damistan, Bahrain",
        "addressId": 86,
        "cityName": "Manama",
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "fkCountryId": 137,
        "isDefualt": null,
        "iso": "BH",
        "locationX": 26.125006722834183,
        "locationY": 50.481162182986736,
        "mobileVerifed": true,
        "phoneCode": "973",
        "postalCode": "",
        "transfereeFamily": "Hhhh",
        "transfereeMobile": "37755753   ",
        "transfereeName": "Gghv"
    },
    {
        "address": "71 Rd 2801, Manama, Bahrain",
        "addressId": 87,
        "cityName": "Manama",
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "fkCountryId": 137,
        "isDefualt": false,
        "iso": "BH",
        "locationX": 26.2177403,
        "locationY": 50.5798192,
        "mobileVerifed": true,
        "phoneCode": "973",
        "postalCode": "44455",
        "transfereeFamily": "dsfsdf",
        "transfereeMobile": "37755549   ",
        "transfereeName": "Jurisdfsdf"
    },
    {
        "address": "71 Rd 2801, Manama, Bahrain",
        "addressId": 87,
        "cityName": "Manama",
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "fkCountryId": 137,
        "isDefualt": false,
        "iso": "BH",
        "locationX": 26.2177403,
        "locationY": 50.5798192,
        "mobileVerifed": true,
        "phoneCode": "973",
        "postalCode": "44455",
        "transfereeFamily": "dsfsdf",
        "transfereeMobile": "37755549   ",
        "transfereeName": "Jurisdfsdf"
    },
    {
        "address": "71 Rd 2801, Manama, Bahrain",
        "addressId": 87,
        "cityName": "Manama",
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "fkCountryId": 137,
        "isDefualt": false,
        "iso": "BH",
        "locationX": 26.2177403,
        "locationY": 50.5798192,
        "mobileVerifed": true,
        "phoneCode": "973",
        "postalCode": "44455",
        "transfereeFamily": "dsfsdf",
        "transfereeMobile": "37755549   ",
        "transfereeName": "Jurisdfsdf"
    },
    {
        "address": "71 Rd 2801, Manama, Bahrain",
        "addressId": 87,
        "cityName": "Manama",
        "countryName": "Bahrain",
        "fkCityId": 1055,
        "fkCountryId": 137,
        "isDefualt": false,
        "iso": "BH",
        "locationX": 26.2177403,
        "locationY": 50.5798192,
        "mobileVerifed": true,
        "phoneCode": "973",
        "postalCode": "44455",
        "transfereeFamily": "dsfsdf",
        "transfereeMobile": "37755549   ",
        "transfereeName": "Jurisdfsdf"
    }
]