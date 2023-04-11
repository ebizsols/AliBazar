/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Platform,
    BackHandler
} from 'react-native';
import {
    clientForm,
    clientUserActivity
} from 'api/client';
import {
    BottomSheetHeader,
    BottomSheetBackView,
    CommonHeader
} from 'components';
import {
    SnackBar,
} from 'components/UI';
import { Constants, Languages, Scale } from 'common';
import { Colors } from 'styles';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');

import CreateStoreStepsWizard from './CreateStoreStepsWizard';

import Login from './../CreateStoreWizardScreens/Login';
import Country from './../CreateStoreWizardScreens/Country';
import Store from './../CreateStoreWizardScreens/Store';
import Document from './../CreateStoreWizardScreens/Document';
import BankDetails from './../CreateStoreWizardScreens/BankDetails';
import VatDetails from './../CreateStoreWizardScreens/VatDetails';

import BottomSheetUploadImage from './BottomSheetUploadImage';
import axios from 'axios';
import UploadProgressModal from './UploadProgressModal';

import Geocoder from 'react-native-geocoding';
Geocoder.init(Constants.GoogleMapApiKey, { language: Languages.getLanguage() }); // use a valid API key

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const CreateStoreScreen = (props) => {

    const childRef = useRef();
    const bottomSheetRef = useRef(null);

    const [cancelToken, setCancelToken] = useState(null);
    const [uploadProgressModalIsVisible, setUploadProgressModalIsVisible] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState(0);

    const [fall] = useState(new Animated.Value(1));

    const snackBarRef = useRef(null);
    const flatlistRef = useRef();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [storeData, setStoreData] = useState({
        shopId: 0,
        fkStatusId: 0,
        fkCountryId: null,
        fkProvinceId: null,
        fkCityId: null,
        fkPersonId: null,
        vendorUrlid: null,
        storeName: null,
        email: null,
        password: null,
        phone: null,
        companyName: null,
        fullName: null,
        locationX: null | null,
        locationY: null,
        address: null,
        bankBeneficiaryName: null,
        bankName: null,
        bankBranch: null,
        bankAccountNumber: null,
        bankIban: null,
        bankSwiftCode: null,
        fkCurrencyId: null,
        taxRegistrationNumber: null,
        captchaToken: Constants.CaptchaToken,
        phoneCode: null,
        tShopCategory: [],
        tShopFiles: [],
        phone: null,
        phoneCode: null,
    });

    const [loginScreenData, setLoginScreenData] = useState({
        countries: null,
        selectedCountry: null,
        countryModalVisible: false,
        showMobileVerfiy: false,
        verifyCode: null,
        verifyMobileRequestId: null
    });
    const [verifiedMobileNumbers, setVerifiedMobileNumbers] = useState([]);

    const [countryScreenData, setCountryScreenData] = useState({
        selectedCountryId: null,
        selectedProvinceId: null,
        selectedCityId: null,
        showCities: false,
        countries: [],
        cities: [],
        provinces: [],
        iso: null,
        phonePrefix: null,
        selectedCityName: null
    });
    const [selectedCityLocation, setSelectedCityLocation] = useState({
        lat: null,
        lng: null
    });
    const [storeScreenData, setStoreScreenData] = useState({
        selectedPersonType: 1,
        categories: null,
        selectedCategoryId: false,
        lat: 0,
        lng: 0
    });
    const [documentScreenData, setDocumentScreenData] = useState({
        activeShopDocuments: []
    });
    const [bankDetailsScreenData, setBankDetailsScreenData] = useState({
        activeDocuments: [],
        selectedCurrencyId: 0
    });
    const [vatDetailsScreenData, setVatDetailsScreenData] = useState({
        activeDocuments: [],
        agreed: false
    });

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isCountryLoading, setIsCountryLoading] = useState(false);
    const [isStoreLoading, setIsStoreLoading] = useState(false);
    const [isDocumentLoading, setIsDocumentLoading] = useState(false);
    const [isBankDetailsLoading, setIsBankDetailsLoading] = useState(false);
    const [isVatDetailsLoading, setIsVatDetailsLoading] = useState(false);

    const [documentFiles, setDocumentFiles] = useState([]);
    const [documentFilesModel, setDocumentFilesModel] = useState([]);

    const [bankDetailsFiles, setBankDetailsFiles] = useState([]);
    const [bankDetailsFilesModel, setBankDetailsFilesModel] = useState([]);

    const [vatDetailsFiles, setVatDetailsFiles] = useState([]);
    const [vatDetailsFilesModel, setVatDetailsFilesModel] = useState([]);

    const [currentlyWantSelectImageValues, setCurrentlyWantSelectImageValues] = useState({
        screen: null,
        documentTypeId: null,
        index: 0
    });

    // 
    const openLoginScreenModal = () => {
        setLoginScreenData((prev) => ({
            ...prev,
            countryModalVisible: true
        }));
    };
    const closeLoginScreenModal = () => {
        setLoginScreenData((prev) => ({
            ...prev,
            countryModalVisible: false
        }));
    };

    const onLoginScreenSelectCountry = (item) => {
        setLoginScreenData((prev) => ({
            ...prev,
            selectedCountry: item,
            countryModalVisible: false
        }));
    };

    const verifyCodeChanged = (code) => {
        setLoginScreenData((prev) => ({
            ...prev,
            verifyCode: code
        }))
    };

    const verifyMobile = () => {
        setIsLoginLoading(true);
        clientUserActivity.verifyProviderMobileNumber(`+${loginScreenData?.selectedCountry?.phoneCode}${storeData.phone}`, loginScreenData.verifyCode, loginScreenData.verifyMobileRequestId)
            .then((response) => {
                const res = response.data;
                setIsLoginLoading(false);

                const tempVerifiedMobileNumbers = [...verifiedMobileNumbers];
                tempVerifiedMobileNumbers.push(storeData.phone);
                setVerifiedMobileNumbers(tempVerifiedMobileNumbers);

                setSelectedIndex(1);
                flatlistRef.current.scrollToIndex({ animated: true, index: 1 });
                getActiveProvinces(loginScreenData?.selectedCountry?.countryId);

                setLoginScreenData((prev) => ({
                    ...prev,
                    showMobileVerfiy: false,
                    verifyCode: null,
                    verifyMobileRequestId: null
                }))
            }).catch((err) => {
                setIsLoginLoading(false);
                console.log(err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });

    };

    const loginChangeRegisterDataPressHandler = () => {
        setLoginScreenData((prev) => ({
            ...prev,
            showMobileVerfiy: false
        }))
    };
    // 

    //
    const getAciveCountries = () => {
        setIsCountryLoading(true);
        clientForm.getAciveCountries()
            .then((response) => {
                const res = response.data;
                setCountryScreenData((prev) => ({
                    ...prev,
                    countries: res.result
                }));
                setIsCountryLoading(false);
            }).catch(() => {
                setIsCountryLoading(false);
            });
    };

    const getActiveProvinces = (countryId, setLoader = false, resetCitites = false) => {
        setIsCountryLoading(true);
        console.log(countryId);
        clientForm.getActiveProvince(countryId)
            .then((response) => {
                const res = response.data;

                setCountryScreenData((prev) => ({
                    ...prev,
                    provinces: res.result,
                }));
                setIsCountryLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsCountryLoading(false);
            });
    };

    const getActiveCities = (countryId) => {
        setIsCountryLoading(true);
        clientForm.getActiveCities(countryId)
            .then((response) => {
                const res = response.data;
                setCountryScreenData((prev) => ({
                    ...prev,
                    cities: res.result,
                    showCities: true
                }))
                setIsCountryLoading(false);
            }).catch(() => {
                setIsCountryLoading(false);
            });
    };
    //

    //
    const getCityLocation = () => {
        setIsStoreLoading(true);
        Geocoder.from(countryScreenData.selectedCityName)
            .then(json => {
                try {
                    const address = json.results[0].geometry;
                    console.log('selected city location: ', address.location.lat, address.location.lng,);
                    setSelectedCityLocation({
                        lat: address.location.lat,
                        lng: address.location.lng,
                    })
                } catch (error) {
                    setIsStoreLoading(false);
                }

                setIsStoreLoading(false);
            })
            .catch(error => {
                setIsStoreLoading(false);
                console.warn(error)
            });
    };

    const getParentAcitveCategory = () => {
        setIsStoreLoading(true);
        clientForm.getParentAcitveCategory()
            .then((response) => {
                const res = response.data;
                setStoreScreenData((prev) => ({
                    ...prev,
                    categories: res.result
                }));
                setIsStoreLoading(false);
            }).catch(() => {
                setIsStoreLoading(false);
            });
    };

    //
    const getActiveShopDocumentsType = (groupId) => {
        if (groupId == 2)
            setIsDocumentLoading(true);
        else if (groupId == 4)
            setIsBankDetailsLoading(true);
        else if (groupId == 1)
            setIsVatDetailsLoading(true);
        clientForm.getActiveShopDocumentsType(groupId)
            .then((response) => {
                const res = response.data;
                if (groupId == 2) {
                    setDocumentScreenData((prev) => ({
                        ...prev,
                        activeShopDocuments: res.result
                    }));
                    setIsDocumentLoading(false);
                } else if (groupId == 4) {
                    setBankDetailsScreenData((prev) => ({
                        ...prev,
                        activeDocuments: res.result
                    }));
                    setIsBankDetailsLoading(false);
                } else if (groupId == 1) {
                    setVatDetailsScreenData((prev) => ({
                        ...prev,
                        activeDocuments: res.result
                    }));
                    setIsVatDetailsLoading(false);
                }

            }).catch(() => {
                if (groupId == 2)
                    setIsDocumentLoading(false);
                else if (groupId == 4)
                    setIsBankDetailsLoading(false);
                else if (groupId == 1)
                    setIsVatDetailsLoading(true);
            });

        // {
        //     documentTitle: "test"
        //     documentTypeId: 10
        //     fkGroupd: 2
        //     fkPersonId: 1
        //     groupTitle: "Identity"
        //     personTitle: "Legal "
        // }
    };

    useEffect(() => {
        getAciveCountries();
        // setStoreData({
        //     shopId: null,
        //     fkStatusId: null,
        //     fkCountryId: null,
        //     fkCityId: null,
        //     fkPersonId: null,
        //     vendorUrlid: null,
        //     storeName: null,
        //     email: null,
        //     password: null,
        //     phone: null,
        //     companyName: null,
        //     fullName: string,
        //     locationX: null | null,
        //     locationY: null,
        //     address: null;
        //     bankBeneficiaryName: null,
        //     bankName: null,
        //     bankBranch: null,
        //     bankAccountNumber: null,
        //     bankIban: null,
        //     bankSwiftCode: null,
        //     fkCurrencyId: null,
        //     taxRegistrationNumber: null,
        //     tShopCategory: null,
        //     tShopFiles: null
        // });
        // tShopFiles = {
        //     fileId: null,
        //     fkShopId: null,
        //     fkDocumentTypeId: null,
        //     fileUrl: null
        // }
        // tShopCategory = {
        //     shopCategoryId: null,
        //     fkShopId: null,
        //     fkCategoryId: null
        // }
        // setTimeout(() => {
        //     flatlistRef.current.scrollToIndex({ animated: true, index: 5 });
        //     getActiveShopDocumentsType(1);
        // }, 500);

    }, []);

    const loginGoToNexStep = (data) => {
        let checkMobileNumber = true;
        const findVerifiedMobileIndex = verifiedMobileNumbers.findIndex(x => x === data.mobile);
        if (findVerifiedMobileIndex !== -1) {
            // This mobile number verified befor so not need to check
            checkMobileNumber = false;
            return;
        }

        setIsLoginLoading(true);
        clientUserActivity.checkShopEmail(data.email, `+${loginScreenData?.selectedCountry?.phoneCode}${data.mobile}`, checkMobileNumber)
            .then((response) => {
                const res = response.data;
                setIsLoginLoading(false);
                if (res.status == 200) {
                    setStoreData((prev) => ({
                        ...prev,
                        email: data.email,
                        password: data.password,
                        phone: data.mobile,
                        phoneCode: loginScreenData?.selectedCountry?.phoneCode,
                        fkCountryId: loginScreenData?.selectedCountry.countryId
                    }));

                    if (checkMobileNumber === false) {
                        setSelectedIndex(1);
                        flatlistRef.current.scrollToIndex({ animated: true, index: 1 });
                        getAciveCountries();
                    } else {
                        setLoginScreenData((prev) => ({
                            ...prev,
                            showMobileVerfiy: true,
                            verifyMobileRequestId: res.result?.requestId
                        }));
                    }
                } else {
                    snackBarRef.current.show(res.message, 2);
                }
            }).catch((err) => {
                setIsLoginLoading(false);
                console.log(err);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });

    }

    const countryGoToNexStep = () => {
        if (countryScreenData.selectedProvinceId == null) {
            snackBarRef.current.show(Languages.Placeholder.PleaseSelectCountry, 2);
            return;
        }
        if (countryScreenData.selectedCityId == null) {
            snackBarRef.current.show(Languages.Placeholder.PleaseSelectCity, 2);
            return;
        }
        setStoreData((prev) => ({
            ...prev,
            // fkCountryId: countryScreenData.selectedCountryId,
            fkProvinceId: countryScreenData.selectedProvinceId,
            fkCityId: countryScreenData.selectedCityId,
        }))
        setSelectedIndex(2)
        flatlistRef.current.scrollToIndex({ animated: true, index: 2 });
        getParentAcitveCategory();
        getCityLocation();
    }

    const storeGoToNexStep = (data) => {
        console.log('storeGoToNexStep', data);
        // {"address": "Unnamed Road, الرفاع، Bahrain", "companyLegalName": "", "fullName": "Fjvjv", "phoneNumber": "67567", "storeName": "Cbvmgvgg  hhh"}
        setStoreData((prev) => ({
            ...prev,
            address: data.address,
            locationX: storeScreenData.lat,
            locationY: storeScreenData.lng,
            fkPersonId: storeScreenData.selectedPersonType,
            fullName: storeScreenData.selectedPersonType == 2 ? data.fullName : null,
            companyName: storeScreenData.selectedPersonType == 1 ? data.companyLegalName : null,
            // phone: data.phoneNumber,
            storeName: data.storeName,
            tShopCategory: [{
                shopCategoryId: 0,
                fkShopId: 0,
                fkCategoryId: storeScreenData.selectedCategoryId
            }]
        }));
        getActiveShopDocumentsType(2);
        setSelectedIndex(3)
        flatlistRef.current.scrollToIndex({ animated: true, index: 3 });
    }

    const documentGoToNexStep = () => {
        getActiveShopDocumentsType(4);
        setSelectedIndex(4)
        flatlistRef.current.scrollToIndex({ animated: true, index: 4 });
    }

    const bankDetailsGoToNexStep = (data) => {
        // data => {"accountNumber": "Bnh", "bankName": "Hjvb", "beneficiaryName": "Hhbh", "branchName": "Hhvgh", "iBANNumber": "Gjhjy6655", "swiftCode": "665t5"}
        setStoreData((prev) => ({
            ...prev,
            bankAccountNumber: data.accountNumber,
            bankName: data.bankName,
            bankBeneficiaryName: data.beneficiaryName,
            bankBranch: data.branchName,
            bankIban: data.iBANNumber,
            bankSwiftCode: data.swiftCode,
            fkCurrencyId: bankDetailsScreenData.selectedCurrencyId
        }));

        getActiveShopDocumentsType(1);
        setSelectedIndex(5)
        flatlistRef.current.scrollToIndex({ animated: true, index: 5 });
    }

    const vatDetailsGoToNexStep = (data) => {
        // data =>  {"taxRegistrationNumber": "5252525sg"}
        const storeDataCopy = { ...storeData };


        let filesDto = documentFilesModel.concat(
            bankDetailsFilesModel,
            vatDetailsFilesModel
        );

        filesDto = filesDto.filter(x => x != undefined && x != null);

        console.log('0000');
        // console.log(filesDto);
        console.log(filesDto.length);

        setStoreData((prev) => ({
            ...prev,
            taxRegistrationNumber: data.taxRegistrationNumber,
            tShopFiles: filesDto
        }));

        storeDataCopy.taxRegistrationNumber = data.taxRegistrationNumber;
        storeDataCopy.tShopFiles = filesDto;
        storeDataCopy.phoneCode = countryScreenData.phonePrefix;
        storeDataCopy.captchaToken = Constants.CaptchaToken;

        let allFiles = documentFiles.concat(
            bankDetailsFiles,
            vatDetailsFiles
        );
        allFiles = allFiles.filter(x => x != undefined && x != null);

        console.log('111');
        // console.log(allFiles);
        console.log(allFiles.length);

        let formData = new FormData();

        allFiles.forEach((element) => {
            formData.append("FilesDto", {
                uri: Platform.OS === 'android' ? element.uri : element.uri.replace('file://', ''),
                name: element.fileName,
                type: element.type,
            });
        });

        // console.log('storeDataCopy', storeDataCopy);
        formData.append("Shop", JSON.stringify(storeDataCopy));

        // console.log(storeDataCopy);

        let newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        setUploadProgressModalIsVisible(true);
        clientUserActivity.registerProvider(formData, newCancelToken, onUploadProgress)
            .then((response) => {
                const res = response.data;
                console.log(res);
                setUploadProgressModalIsVisible(false);
                props.navigation.navigate('AfterCreateStore');
                setTimeout(() => {
                    setPercentCompleted(0);
                }, 500);
            }).catch((err) => {
                setUploadProgressModalIsVisible(false);
                setTimeout(() => {
                    setPercentCompleted(0);
                }, 500);
                console.log(err);
                console.log('err message', err.response?.data?.message);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    }

    function onUploadProgress(percentCompleted) {
        setPercentCompleted(percentCompleted);
    }

    const onCancelSubmitPressHandler = () => {
        if (typeof cancelToken != typeof undefined && cancelToken != null) {
            cancelToken.cancel("Operation canceled due to new request.");
            setUploadProgressModalIsVisible(false);
        }
    }

    //
    const onSelectProvinceHandler = (province) => {
        console.log(province);
        if (province.provinceId == countryScreenData.selectedProvinceId) {
            // Pressed on previews selected country
            setCountryScreenData((prev) => ({
                ...prev,
                showCities: true,
                iso: loginScreenData.selectedCountry?.iso,
                phonePrefix: loginScreenData.selectedCountry?.phoneCode
            }));
        } else {
            getActiveCities(province.provinceId);
            setCountryScreenData((prev) => ({
                ...prev,
                selectedProvinceId: province.provinceId,
                selectedCountryId: loginScreenData.selectedCountry.countryId,
                selectedCityId: null,
                iso: loginScreenData.selectedCountry?.iso,
                phonePrefix: loginScreenData.selectedCountry?.phoneCode
            }));
        }

    }

    const onSelectCityHanlder = (city) => {
        setCountryScreenData((prev) => ({
            ...prev,
            selectedCityId: city.cityId,
            selectedCityName: city.cityTitle
        }));
    }

    const onBackToCountriesPressHanlder = () => {
        setCountryScreenData((prev) => ({
            ...prev,
            showCities: false
        }));
    }

    //
    const selectedPersonTypeChangeHandler = (value) => {
        setStoreScreenData((prev) => ({
            ...prev,
            selectedPersonType: value
        }));
    }

    const categorySelectHandler = (value) => {
        setStoreScreenData((prev) => ({
            ...prev,
            selectedCategoryId: value
        }));
    }

    const locationAddressChangedHandler = (lat, lng) => {
        setStoreScreenData((prev) => ({
            ...prev,
            lat: lat,
            lng: lng
        }));
    }

    //
    const currencyTypeChangedHandler = (value, index) => {
        setBankDetailsScreenData((prev) => ({
            ...prev,
            selectedCurrencyId: value
        }))
    }

    //
    const toggleAgreedHandler = () => {
        setVatDetailsScreenData((prev) => ({
            ...prev,
            agreed: !prev.agreed
        }))
    }

    //
    const requestSelectImageHandler = (screen, documentTypeId, index) => {
        setCurrentlyWantSelectImageValues({
            documentTypeId: documentTypeId,
            index: index,
            screen: screen
        })

        bottomSheetRef.current.snapTo(0);
    }

    const closeEnd = () => {
        childRef.current.closeEnd()
    };

    const openEnd = () => {
        childRef.current.openEnd()
    };

    const takePhotoHandler = () => {
        openCamera();
    };

    const openGalleryHandler = () => {
        openGallery();
    };

    const openCamera = () => {
        console.log('User cancelled image picker');
        ImagePicker.launchCamera(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                selectImageAndAddToList(response);

                bottomSheetRef.current.snapTo(1);
                childRef.current.closeEnd()
            }
        });
    }

    const openGallery = () => {
        console.log('User cancelled image picker');
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                selectImageAndAddToList(response);

                bottomSheetRef.current.snapTo(1);
                childRef.current.closeEnd()
            }
        });
    };

    const selectImageAndAddToList = (source) => {
        if (currentlyWantSelectImageValues.screen == 'document') {
            const fileModel = {
                fileId: 0,
                fkShopId: 0,
                fkDocumentTypeId: currentlyWantSelectImageValues.documentTypeId,
                fileUrl: null
            };

            const tempFileModel = [...documentFilesModel];
            const tempFile = [...documentFiles];

            tempFileModel[currentlyWantSelectImageValues.index] = fileModel;
            tempFile[currentlyWantSelectImageValues.index] = source;

            setDocumentFiles(tempFile);
            setDocumentFilesModel(tempFileModel)
        } else if (currentlyWantSelectImageValues.screen == 'bankDetails') {
            const fileModel = {
                fileId: 0,
                fkShopId: 0,
                fkDocumentTypeId: currentlyWantSelectImageValues.documentTypeId,
                fileUrl: null
            };

            const tempFileModel = [...bankDetailsFilesModel];
            const tempFile = [...bankDetailsFiles];

            tempFileModel[currentlyWantSelectImageValues.index] = fileModel;
            tempFile[currentlyWantSelectImageValues.index] = source;

            setBankDetailsFiles(tempFile);
            setBankDetailsFilesModel(tempFileModel)
        } else if (currentlyWantSelectImageValues.screen == 'vatDetails') {
            const fileModel = {
                fileId: 0,
                fkShopId: 0,
                fkDocumentTypeId: currentlyWantSelectImageValues.documentTypeId,
                fileUrl: null
            };

            const tempFileModel = [...vatDetailsFilesModel];
            const tempFile = [...vatDetailsFiles];

            tempFileModel[currentlyWantSelectImageValues.index] = fileModel;
            tempFile[currentlyWantSelectImageValues.index] = source;

            setVatDetailsFiles(tempFile);
            setVatDetailsFilesModel(tempFileModel)
        }
    }

    wizardScreens = [
        {
            id: 1,
            screen: <Login
                countries={countryScreenData.countries}
                countryModalVisible={loginScreenData.countryModalVisible}
                selectedCountry={loginScreenData.selectedCountry}
                showMobileVerfiyState={loginScreenData.showMobileVerfiy}
                isLoading={isLoginLoading}
                verifyCodeChanged={verifyCodeChanged}
                openModal={openLoginScreenModal}
                verifyMobile={verifyMobile}
                closeModal={closeLoginScreenModal}
                onCountrySelected={onLoginScreenSelectCountry}
                verifiedMobileNumbers={verifiedMobileNumbers}
                changeRegisterDataPressHandler={loginChangeRegisterDataPressHandler}
                goToNexStep={loginGoToNexStep} {...props} />
        },
        {
            id: 2,
            screen: <Country
                isLoading={isCountryLoading}
                countries={countryScreenData.countries}
                provinces={countryScreenData.provinces}
                selectedCountryId={countryScreenData.selectedCountryId}
                selectedProvinceId={countryScreenData.selectedProvinceId}
                selectedCityId={countryScreenData.selectedCityId}
                showCities={countryScreenData.showCities}
                cities={countryScreenData.cities}
                onBackToCountriesPress={onBackToCountriesPressHanlder}
                onSelectProvince={onSelectProvinceHandler}
                onSelectCity={onSelectCityHanlder}
                goToNexStep={countryGoToNexStep}
                {...props} />
        },
        {
            id: 3,
            screen: <Store
                isLoading={isStoreLoading}
                categories={storeScreenData.categories}
                selectedCategoryId={storeScreenData.selectedCategoryId}
                selectedPersonType={storeScreenData.selectedPersonType}
                selectedPersonTypeChange={selectedPersonTypeChangeHandler}
                categorySelectHandler={categorySelectHandler}
                lat={storeScreenData.lat}
                lng={storeScreenData.lng}
                locationAddressChanged={locationAddressChangedHandler}
                goToNexStep={storeGoToNexStep}
                iso={countryScreenData.iso}
                cityLocation={selectedCityLocation}
                phonePrefix={countryScreenData.phonePrefix}
                {...props} />
        },
        {
            id: 4,
            screen: <Document
                isLoading={isDocumentLoading}
                activeDocuments={documentScreenData.activeShopDocuments}
                files={documentFiles}
                requestSelectImage={requestSelectImageHandler}
                goToNexStep={documentGoToNexStep}
                {...props}
            />
        },
        {
            id: 5,
            screen: <BankDetails
                isLoading={isBankDetailsLoading}
                activeDocuments={bankDetailsScreenData.activeDocuments}
                files={bankDetailsFiles}
                currencyTypeChanged={currencyTypeChangedHandler}
                requestSelectImage={requestSelectImageHandler}
                selectedCurrencyId={bankDetailsScreenData.selectedCurrencyId}
                goToNexStep={bankDetailsGoToNexStep}
                {...props} />
        },
        {
            id: 6,
            screen: <VatDetails
                isLoading={isVatDetailsLoading}
                activeDocuments={vatDetailsScreenData.activeDocuments}
                agreed={vatDetailsScreenData.agreed}
                toggleAgreed={toggleAgreedHandler}
                files={vatDetailsFiles}
                filesModel={vatDetailsFilesModel}
                requestSelectImage={requestSelectImageHandler}
                goToNexStep={vatDetailsGoToNexStep}
                {...props} />
        }
    ];

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    });

    const backAction = () => {
        if ((selectedIndex - 1) < 0) {
            props.navigation.goBack();
            return true;
        };
        const newSelectedIndex = selectedIndex - 1;
        setSelectedIndex(newSelectedIndex);
        flatlistRef.current.scrollToIndex({ animated: true, index: newSelectedIndex });
        return true;
    };

    return (
        <>
            <CommonHeader showBackIcon={true} title={Languages.CreateStore.SellWithUs} />
            <CreateStoreStepsWizard selectedIndex={selectedIndex} />
            <FlatList
                ref={flatlistRef}
                horizontal={true}
                keyboardShouldPersistTaps={'handled'}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEnabled={false}
                data={wizardScreens}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.wizardScreenContainer}>
                            {item.screen}
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />

            <BottomSheet
                ref={bottomSheetRef}
                initialSnap={1}
                snapPoints={[Scale.verticalScale(150), 0]}
                onCloseEnd={closeEnd}
                onOpenEnd={openEnd}
                callbackNode={fall}
                renderHeader={() => <BottomSheetHeader />}
                renderContent={() => <BottomSheetUploadImage
                    onTakePhotoPress={takePhotoHandler}
                    onOpenGallery={openGalleryHandler}
                />
                }
            />

            <BottomSheetBackView
                bottomSheetRef={bottomSheetRef} ref={childRef}
                fall={fall} />

            <UploadProgressModal
                visible={uploadProgressModalIsVisible}
                onRequestClose={() => { }}
                onCancelPressHandler={onCancelSubmitPressHandler}
                percentCompleted={percentCompleted}
            />

            <SnackBar
                ref={snackBarRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    //
    wizardScreenContainer: {
        width: width
    }
});


export default CreateStoreScreen;


// const category = {
//     categoryId: 24,
//     categoryPath: "/24/",
//     categoryTitle: "Electronics & Mobiles",
//     iconUrl: "c86bdef5-caba-45ca-b584-e1c48003eec7.png",
//     parents: null
// }