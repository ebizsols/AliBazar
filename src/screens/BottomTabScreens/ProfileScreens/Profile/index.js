/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  I18nManager
} from 'react-native';
import { clientAuth, clientHome, clientProfile } from 'api/client';
import styles from './style'
import BottomSheet from 'reanimated-bottom-sheet';

import { BottomSheetHeader, BottomSheetBackView, CustomModal, } from 'components';
import { IconRow, ShadowWrapper, RadioButton, RequestLoader } from 'components/UI';
import { AppConfig, Constants, Languages, Scale, Tools } from 'common';

import SignedInProfileHeader from './SignedInProfileHeader';

import CreateAccountIcon from 'assets/icons/member-plus.svg';
import SignInIcon from 'assets/icons/sign-in.svg';

import ExclamationIcon from 'assets/icons/exclamation-with-circle.svg';
import PhoneIcon from 'assets/icons/phone-with-circle.svg';
import WhatappIcon from 'assets/icons/whatapp-with-circle.svg';

import FacebookIcon from 'assets/icons/socialMediaIcons/facebook.svg';
import InstagramIcon from 'assets/icons/socialMediaIcons/instagram.svg';
import TwitterIcon from 'assets/icons/socialMediaIcons/twitter.svg';
import LinkedinIcon from 'assets/icons/socialMediaIcons/linkedin.svg';

import AddressesIcon from 'assets/icons/menu-addresses.svg';
import CreditIcon from 'assets/icons/menu-credit.svg';
import PreferenceIcon from 'assets/icons/menu-preference.svg';
import ClaimsIcon from 'assets/icons/menu-claims.svg';
import SignoutIcon from 'assets/icons/menu-signout.svg';
import TrackingIcon from 'assets/icons/order-tracking.svg';
import StoreListIcon from 'assets/icons/store-list.svg';
import DealsIcon from 'assets/icons/deals.svg';

import ModalLogoutIcon from 'assets/icons/log-out-modal.svg';

import BahrainIcon from 'assets/icons/countries/bahrain.svg';
import USAIcon from 'assets/icons/countries/united-states.svg';
import { LazyHOC } from 'HOCs';
import { DeviceStorage } from 'services';
import Animated from 'react-native-reanimated';
import axiosClient from "api/axios";
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'store/actions/auth.action';
import { fcmService } from 'NotificationServices/FCMService';
import { CommonActions } from '@react-navigation/routers';

const currencies = [
  {
    title: Constants.PossibleLangAndCur.currencies.arabic.name,
    icon: BahrainIcon
  },
  {
    title: Constants.PossibleLangAndCur.currencies.dollar.name,
    icon: USAIcon
  }
]

const languages = [
  {
    value: Constants.PossibleLangAndCur.langs.arabic.name,
    title: "العربية",
    icon: BahrainIcon
  },
  {
    value: Constants.PossibleLangAndCur.langs.english.name,
    title: "English",
    icon: USAIcon
  }
]

const ProfileScreen = (props) => {

  const domain = useSelector(state => state.baseStateReducer.domain);

  const [signedIn, setSignedIn] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [signoutModalIsVisible, setSignoutModalIsVisible] = useState(false);
  const token = useSelector(state => state.authReducer.token);

  const [links, setLinks] = useState(null);
  const [selectedCurrAndLang, setSelecctedCurrAndLang] = useState({
    currency: null,
    lang: null
  });

  const bottomSheetRef = useRef(null);
  const bottomSheetLangRef = useRef(null);
  const childRef = useRef();
  const childLangRef = useRef();
  const [fall] = useState(new Animated.Value(1));
  const [fallLang] = useState(new Animated.Value(1));

  const dispatchToken = useDispatch();
  const setTokenRedux = useCallback((token) => {
    dispatchToken(setToken(token))
  }, [dispatchToken]);

  const getFooter = () => {
    setIsLoading(true);
    clientHome.getMobileFooter()
      .then((response) => {
        const res = response.data;
        console.log(res.result);
        setLinks(res.result.links);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
  };

  const getCustomerProfileHeader = () => {
    clientProfile.getCustomerProfileHeader()
      .then((response) => {
        const res = response.data;
        setProfileData(res.result)
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token != null && token != undefined && token != '') {
      setSignedIn(true);
      getCustomerProfileHeader()
    }

    getFooter();

    setSelecctedCurrAndLang({
      lang: axiosClient.getLang(),
      currency: axiosClient.getCurrency()
    })
  }, []);

  useEffect(() => {
    if (token) {
      if (token != null && token != undefined && token != '') {
        setSignedIn(true);
        getCustomerProfileHeader()
      }

      getFooter();

      setSelecctedCurrAndLang({
        lang: axiosClient.getLang(),
        currency: axiosClient.getCurrency()
      })
    }
  }, [token]);

  useEffect(() => {
    if (props.route.params?.editProfileObject) {
      setProfileData((prev) => ({
        ...prev,
        fullName: props.route.params?.editProfileObject.name + ' ' + props.route.params?.editProfileObject.family
      }))
    }
  }, [props.route.params?.editProfileObject]);

  useEffect(() => {
    console.log('fireChange');
    if (props.route.params?.fireChange) {
      console.log('fireChange execute');
      getCustomerProfileHeader();
    }
  }, [props.route.params?.fireChange]);


  const signinPressHandler = () => {
    props.navigation.navigate('SignIn')
  };

  const signupPressHandler = () => {
    props.navigation.navigate('SignUp')
  };

  const onWhatsAppUsPressHandler = () => {
    Linking.canOpenURL(`whatsapp://send?phone=${links.supportPhone}&text=${''}`)
      .then((res) => {
        console.log(res);
        if (res) {
          Linking.openURL(`whatsapp://send?phone=${links.supportPhone}&text=${''}`);
        } else {
          try {
            Linking.openURL(`whatsapp://send?phone=${links.supportPhone}&text=${''}`);
          } catch (error) {
            console.log("Error in openning open URI: " + `whatsapp://send?phone=${links.supportPhone}&text=${''}`);
          }
          console.log("Don't know how to open URI: " + `whatsapp://send?phone=${links.supportPhone}&text=${''}`);
        }
      });
  };

  const onSocialIconPresshandler = (type) => {
    switch (type) {
      case 'fb':
        Linking.canOpenURL(links.facebookUrl)
          .then((res) => {
            if (res) {
              Linking.openURL(links.facebookUrl);
            } else {
              try {
                Linking.openURL(links.facebookUrl);
              } catch (error) {
                console.log('Error in openning: ', error);
              }
            }
          });
        break;
      case 'tw':
        Linking.canOpenURL(links.twitterUrl)
          .then((res) => {
            if (res) {
              Linking.openURL(links.twitterUrl);
            } else {
              try {
                Linking.openURL(links.twitterUrl);
              } catch (error) {
                console.log('Error in openning: ', error);
              }
            }
          });
        break;
      case 'ins':
        Linking.canOpenURL(links.instagramUrl)
          .then((res) => {
            if (res) {
              Linking.openURL(links.instagramUrl);
            } else {
              try {
                Linking.openURL(links.instagramUrl);
              } catch (error) {
                console.log('Error in openning: ', error);
              }
            }
          });
        break;
      case 'link':
        Linking.canOpenURL(links.linkedinUrl)
          .then((res) => {
            if (res) {
              Linking.openURL(links.linkedinUrl);
            } else {
              try {
                Linking.openURL(links.linkedinUrl);
              } catch (error) {
                console.log('Error in openning: ', error);
              }
            }
          });
        break;
      default:
        break;
    }
  };

  const onChangeCurrencyHandler = (item) => {
    if (item.title != selectedCurrAndLang.currency) {
      // change storageItems
      DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId)
        .then((res) => {
          if (res) {
            res.currency = item.title
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, res);

            setSelecctedCurrAndLang((prev) => ({
              ...prev,
              currency: item.title
            }));
            axiosClient.setCurrency(item.title);

            RNRestart.Restart();
          } else {
            // storage is empty so add new object
            const storeObj = Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartIdObject;
            storeObj.currency = item.title;
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeObj);

            setSelecctedCurrAndLang((prev) => ({
              ...prev,
              currency: item.title
            }));
            axiosClient.setCurrency(item.title);

            RNRestart.Restart();
          }
        })
    }
    bottomSheetRef.current.snapTo(1)
    closeEnd()
  };

  const onChangeLangHandler = (item) => {
    if (item.value != selectedCurrAndLang.lang) {
      // change storageItems
      if (item.value == Constants.PossibleLangAndCur.langs.arabic.name) {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId)
        .then((res) => {
          if (res) {
            res.language = item.value
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, res);

            setSelecctedCurrAndLang((prev) => ({
              ...prev,
              lang: item.value
            }));
            axiosClient.setLang(item.value);

            RNRestart.Restart();
          } else {
            // storage is empty so add new object
            const storeObj = Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartIdObject;
            storeObj.language = item.value;
            DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeObj);

            setSelecctedCurrAndLang((prev) => ({
              ...prev,
              lang: item.value
            }));
            axiosClient.setLang(item.value);

            RNRestart.Restart();
          }
        })
    }
    bottomSheetLangRef.current.snapTo(1)
    closeLangEnd()
  };

  const onContactUsPressHandler = () => {
    Tools.callNumber(links.phone);
  };

  const closeEnd = () => {
    childRef.current.closeEnd()
  };

  const openEnd = () => {
    childRef.current.openEnd()
  };

  const closeLangEnd = () => {
    childLangRef.current.closeEnd()
  };

  const openLangEnd = () => {
    childLangRef.current.openEnd()
  };


  const openCurrencyBottomSheet = () => {
    bottomSheetRef.current.snapTo(0)
  }

  const openLanguageBottomSheet = () => {
    bottomSheetLangRef.current.snapTo(0)
  }

  const RenderCurrencyBottomSheetContent = () => {

    return (
      <View style={styles.bottomSheetContentContainer}>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>{Languages.Common.SelectCurrency}</Text>
        </View>
        {
          currencies.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => onChangeCurrencyHandler(item)} key={index}>
                <View style={styles.bottomSheetItemContainer}>
                  <View style={styles.bottomSheetRadioContainer}>
                    <RadioButton onPress={() => onChangeCurrencyHandler(item)} isSelected={selectedCurrAndLang.currency == item.title} />
                  </View>
                  <View style={styles.bottomSheetIconRowContainer}>
                    <IconRow
                      clickable={false}
                      icon={item.icon}>
                      <View style={styles.bottomSheetIconRowTextContainer}>
                        <Text style={[
                          styles.bottomSheetIconRowText,
                          selectedCurrAndLang.currency == item.title ? styles.selectedBottomSheetItem : {}]}>{item.title}</Text>
                      </View>
                    </IconRow>
                  </View>
                </View>
                {index != currencies.length - 1 ?
                  <View style={styles.bottomSheetItemLine}></View>
                  :
                  null
                }
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  };

  const RenderLanguageBottomSheetContent = () => {

    return (
      <View style={styles.bottomSheetContentContainer}>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>{Languages.Profile.SelectLanguage}</Text>
        </View>
        {
          languages.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => onChangeLangHandler(item)} key={index}>
                <View style={styles.bottomSheetItemContainer}>
                  <View style={styles.bottomSheetRadioContainer}>
                    <RadioButton onPress={() => onChangeLangHandler(item)} isSelected={selectedCurrAndLang.lang == item.value} />
                  </View>
                  <View style={styles.bottomSheetIconRowContainer}>
                    <IconRow
                      clickable={false}
                      icon={item.icon}>
                      <View style={styles.bottomSheetIconRowTextContainer}>
                        <Text style={[
                          styles.bottomSheetIconRowText,
                          item.value == Constants.PossibleLangAndCur.langs.arabic.name ? styles.bottomSheetArabicLangText : {},
                          selectedCurrAndLang.lang == item.value ?
                            item.value == Constants.PossibleLangAndCur.langs.arabic.name ? styles.selectedBottomSheetItemArabic : styles.selectedBottomSheetItem : {}]}>{item.title}</Text>
                      </View>
                    </IconRow>
                  </View>
                </View>
                {index != currencies.length - 1 ?
                  <View style={styles.bottomSheetItemLine}></View>
                  :
                  null
                }
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  };

  const updateUserNotificationKey = (notificationKey, type = 2) => {
    clientAuth.updateUserNotificationKey(notificationKey, type = 2)
      .then((response) => {

      }).catch((err) => {
        console.log('[Splash]', err);
      });

    // {"cartCount": 0, "defualtCurrency": "BHD", "defualtLanguage": "En"}
  };

  const signOutHandler = async () => {
    setSignoutModalIsVisible(false);
    setIsLoading(true);
    const storeData = await DeviceStorage.getJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId);
    await updateUserNotificationKey(null);
    const isLoggedIn = false;

    fcmService.subscribeToTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN); // Subscribe to logged in or not logged in

    fcmService.unsubscribeFromTopic(isLoggedIn ? Constants.NotificationTopics.CLIENT_MOBILE__NOT_LOGGEDIN : Constants.NotificationTopics.CLIENT_MOBILE_LOGGEDIN); // Unsubscribe to logged in or not logged in
    if (storeData)
      storeData.token = null;
    DeviceStorage.storeJsonData(Constants.StorageKeys.TokenAndCurrencyAndLanguageAndCartId, storeData);
    axiosClient.setToken(null);
    setTokenRedux(null);
    setSignedIn(false);

    const notifDataModel = Constants.StorageKeys.NotificationKeyDataObject;
    notifDataModel.notificationKey = null;
    DeviceStorage.storeJsonData(Constants.StorageKeys.NotificationKeyDataKey, notifDataModel);
    setIsLoading(false);

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  }

  const closeSignoutModal = () => {
    setSignoutModalIsVisible(false);
  };

  const openSignoutModal = () => {
    setSignoutModalIsVisible(true);
  };

  const onProfileHeaderPressHandler = () => {
    props.navigation.navigate('EditProfile');
  }

  const onHelpPressHandler = () => {
    props.navigation.navigate('HelpHome');
  }

  const onDealsPressHandler = () => {
    props.navigation.navigate('Search', { type: Constants.SearchScreenTypes.Deals });
  }

  const onOrderTrackingPressHandler = () => {
    props.navigation.navigate('Tracking');
  }

  const onStoreListPressHandler = () => {
    props.navigation.navigate('StoreList');
  }

  const onAddressesPressHandler = () => {
    props.navigation.navigate('Addresses');
  }

  const onAjyalCreditsPressHandler = () => {
    props.navigation.navigate('Credits');
  }

  const onPreferencePressHandler = () => {
    props.navigation.navigate('Preference');
  }

  const onOrdersPressHandler = () => {
    props.navigation.navigate('Orders');
  }

  const onPaymentPressHandler = () => {
    props.navigation.navigate('ProfilePayment');
  }

  const onReturnsPressHandler = () => {
    props.navigation.navigate('Returns');
  }

  const onSellWithUsPressHandler = () => {
    // props.navigation.navigate('CreateStore');
    const lang = axiosClient.getLang();
    const curr = axiosClient.getCurrency();

    const domainAddress = domain || AppConfig.ApiConfig.baseUrl;

    const route = links.createStoreRoute || (`${domainAddress}${curr.toLowerCase()}-${lang.toLowerCase()}/${'becomeSeller'}`);

    console.log(route);
    Linking.canOpenURL(route)
      .then(supported => {
        if (supported) {
          return Linking.openURL(route);
        } else {
          console.log("Don't know how to open URI: " + route);
          try {
            Linking.openURL(route);
          } catch (error) {
            console.log('Error in openning: ', error);
          }
          return false;
        }
      }).catch(err => console.log(err));
  };

  const onPressEmailVerifyHandler = () => {
    props.navigation.navigate('VerifyEmail', { email: profileData?.email });
  };

  const onContentPressHandler = (contentType, screenTitle) => {
    props.navigation.navigate('Content', { contentType: contentType, screenTitle: screenTitle });
  };

  return (
    <LazyHOC>
      {isLoading == true ? <RequestLoader /> : null}

      <ScrollView
        style={styles.container}>

        {signedIn == false ?
          <View style={styles.contentContainer}>
            <ShadowWrapper shadowContainerStyle={{ paddingTop: 0, paddingBottom: Scale.moderateScale(5) }}>
              <View style={[styles.topNotLoginContainer, styles.shadowBox]}>
                <TouchableOpacity onPress={signinPressHandler} style={styles.topNotLoginItem}>
                  <View style={styles.headerIconContainer}>
                    <SignInIcon width={Scale.moderateScale(30)}
                      height={Scale.moderateScale(30)} />
                  </View>
                  <Text style={styles.headerItemFirstText}>{Languages.Profile.WelcomeBack}!</Text>
                  <Text style={styles.headerItemSecondText}>{Languages.Profile.SignInToYourAccount}</Text>
                </TouchableOpacity>
                <View style={styles.topNotLoginLineContainer}>
                  <View style={styles.topNotLoginLine}></View>
                </View>
                <TouchableOpacity onPress={signupPressHandler} style={styles.topNotLoginItem}>
                  <View style={styles.headerIconContainer}>
                    <CreateAccountIcon width={Scale.moderateScale(30)}
                      height={Scale.moderateScale(30)} />
                  </View>
                  <Text style={styles.headerItemFirstText}>{Languages.Profile.NewHere}</Text>
                  <Text style={styles.headerItemSecondText}>{Languages.Profile.CreateAnAccount}</Text>
                </TouchableOpacity>
              </View>
            </ShadowWrapper>
          </View>
          :
          <ShadowWrapper shadowContainerStyle={{ paddingTop: 0, paddingBottom: Scale.moderateScale(5) }}>
            <SignedInProfileHeader
              onPressEmailVerifyHandler={onPressEmailVerifyHandler}
              onReturnsPress={onReturnsPressHandler}
              onOrdersPress={onOrdersPressHandler}
              onPaymentPress={onPaymentPressHandler}
              onPress={onProfileHeaderPressHandler}
              profileData={profileData}
            />
          </ShadowWrapper>
        }

        {signedIn == true ?
          <View style={styles.contentContainer}>
            <ShadowWrapper>
              <View style={styles.contactSection}>

                <View style={styles.contactItemContainer}>
                  <IconRow
                    onPress={onAddressesPressHandler}
                    iconWidth={Scale.moderateScale(30)}
                    iconHeight={Scale.moderateScale(30)}
                    icon={AddressesIcon}
                    containerStyle={styles.contactItemStyle}>
                    <View style={styles.contactItemTextWrapper}>
                      <Text style={styles.contactitemText}>{Languages.Profile.Addresses}</Text>
                    </View>
                  </IconRow>
                </View>
                <View style={styles.localLine}></View>
                <View style={styles.contactItemContainer}>
                  <IconRow
                    onPress={onAjyalCreditsPressHandler}
                    iconWidth={Scale.moderateScale(30)}
                    iconHeight={Scale.moderateScale(30)}
                    icon={CreditIcon}
                    containerStyle={styles.contactItemStyle}>
                    <View style={styles.contactItemTextWrapper}>
                      <Text style={styles.contactitemText}>{Languages.Profile.AjyalCredits}</Text>
                    </View>
                  </IconRow>
                </View>
                <View style={styles.localLine}></View>
                <View style={styles.contactItemContainer}>
                  <IconRow
                    onPress={onPreferencePressHandler}
                    iconWidth={Scale.moderateScale(30)}
                    iconHeight={Scale.moderateScale(30)}
                    icon={PreferenceIcon}
                    containerStyle={styles.contactItemStyle}>
                    <View style={styles.contactItemTextWrapper}>
                      <Text style={styles.contactitemText}>{Languages.Profile.Preference}</Text>
                    </View>
                  </IconRow>
                </View>
                <View style={styles.localLine}></View>
                {/* <View style={styles.contactItemContainer}>
                  <IconRow
                    iconWidth={Scale.moderateScale(30)}
                    iconHeight={Scale.moderateScale(30)}
                    icon={ClaimsIcon}
                    containerStyle={styles.contactItemStyle}>
                    <View style={styles.contactItemTextWrapper}>
                      <Text style={styles.contactitemText}>{Languages.Profile.Claims}</Text>
                    </View>
                  </IconRow>
                </View>
                <View style={styles.localLine}></View> */}
                <View style={styles.contactItemContainer}>
                  <IconRow
                    onPress={openSignoutModal}
                    iconWidth={Scale.moderateScale(30)}
                    iconHeight={Scale.moderateScale(30)}
                    icon={SignoutIcon}
                    containerStyle={styles.contactItemStyle}>
                    <View style={styles.contactItemTextWrapper}>
                      <Text style={styles.contactitemText}>{Languages.Profile.SignOut}</Text>
                    </View>
                  </IconRow>
                </View>

              </View>
            </ShadowWrapper>
          </View>
          :
          null
        }

        <View style={styles.contentContainer}>
          <ShadowWrapper>
            <TouchableOpacity onPress={openLanguageBottomSheet} style={[styles.localeItemContainer]}>
              <Text style={styles.localeItemText}>{Languages.Profile.Language}</Text>
              <Text style={[styles.languageText, selectedCurrAndLang.lang == Constants.PossibleLangAndCur.langs.arabic.name ? styles.languageTextArabic : {}]}>{
                selectedCurrAndLang.lang == Constants.PossibleLangAndCur.langs.arabic.name ?
                  Languages.Language.Arabic
                  :
                  Languages.Language.English
              }</Text>
            </TouchableOpacity>
            <View style={styles.localLine}></View>
            <TouchableOpacity onPress={openCurrencyBottomSheet} style={[styles.localeItemContainer]}>
              <Text style={styles.localeItemText}>{Languages.Common.Currency}</Text>
              <View style={styles.selectedCountry}>
                <View style={styles.selectedCountryIcon}>
                  {selectedCurrAndLang.currency == Constants.PossibleLangAndCur.currencies.arabic.name ?
                    <BahrainIcon
                      width={Scale.moderateScale(25)}
                      height={Scale.moderateScale(25)}
                    />
                    :
                    <USAIcon
                      width={Scale.moderateScale(25)}
                      height={Scale.moderateScale(25)}
                    />
                  }

                </View>
                <Text style={styles.selectedCountryText}>{selectedCurrAndLang.currency}</Text>
              </View>
            </TouchableOpacity>
          </ShadowWrapper>
        </View>

        <View style={styles.contentContainer}>
          <ShadowWrapper>
            <View style={styles.contactSection}>
              {links?.supportPhone ?
                <>
                  <View style={styles.contactItemContainer}>
                    <IconRow
                      onPress={onWhatsAppUsPressHandler}
                      iconWidth={Scale.moderateScale(38)}
                      iconHeight={Scale.moderateScale(38)}
                      icon={WhatappIcon}
                      containerStyle={styles.contactItemStyle}>
                      <View style={styles.contactItemTextWrapper}>
                        <Text style={[styles.contactitemText]}>{Languages.Profile.WhatsAppUs}</Text>
                      </View>
                    </IconRow>
                  </View>
                  <View style={styles.localLine}></View>
                </>
                :
                null
              }

              {links?.phone ?
                <>
                  <View style={styles.contactItemContainer}>
                    <IconRow
                      onPress={onContactUsPressHandler}
                      iconWidth={Scale.moderateScale(38)}
                      iconHeight={Scale.moderateScale(38)}
                      icon={PhoneIcon}
                      containerStyle={styles.contactItemStyle}>
                      <View style={styles.contactItemTextWrapper}>
                        <Text style={styles.contactitemText}>{Languages.Profile.ContactUs}</Text>
                      </View>
                    </IconRow>
                  </View>
                  <View style={styles.localLine}></View>
                </>
                :
                null
              }
              <View style={styles.contactItemContainer}>
                <IconRow
                  onPress={onDealsPressHandler}
                  iconWidth={Scale.moderateScale(38)}
                  iconHeight={Scale.moderateScale(38)}
                  icon={DealsIcon}
                  containerStyle={styles.contactItemStyle}>
                  <View style={styles.contactItemTextWrapper}>
                    <Text style={styles.contactitemText}>{Languages.Profile.Deals}</Text>
                  </View>
                </IconRow>
              </View>
              <View style={styles.localLine}></View>
              <View style={styles.contactItemContainer}>
                <IconRow
                  onPress={onHelpPressHandler}
                  iconWidth={Scale.moderateScale(38)}
                  iconHeight={Scale.moderateScale(38)}
                  icon={ExclamationIcon}
                  containerStyle={styles.contactItemStyle}>
                  <View style={styles.contactItemTextWrapper}>
                    <Text style={styles.contactitemText}>{Languages.Profile.Help}</Text>
                  </View>
                </IconRow>
              </View>
              <View style={styles.localLine}></View>

              <View style={styles.contactItemContainer}>
                <IconRow
                  onPress={onOrderTrackingPressHandler}
                  iconWidth={Scale.moderateScale(38)}
                  iconHeight={Scale.moderateScale(38)}
                  icon={TrackingIcon}
                  containerStyle={styles.contactItemStyle}>
                  <View style={styles.contactItemTextWrapper}>
                    <Text style={styles.contactitemText}>{Languages.Profile.OrderTracking}</Text>
                  </View>
                </IconRow>
              </View>
              <View style={styles.localLine}></View>

              <View style={styles.contactItemContainer}>
                <IconRow
                  onPress={onStoreListPressHandler}
                  iconWidth={Scale.moderateScale(38)}
                  iconHeight={Scale.moderateScale(38)}
                  icon={StoreListIcon}
                  containerStyle={styles.contactItemStyle}>
                  <View style={styles.contactItemTextWrapper}>
                    <Text style={styles.contactitemText}>{Languages.Profile.StoreList}</Text>
                  </View>
                </IconRow>
              </View>
            </View>
          </ShadowWrapper>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.rowContainers}>
            {links?.facebookUrl ?
              <TouchableOpacity onPress={() => onSocialIconPresshandler('fb')} style={styles.rowItem}>
                <FacebookIcon
                  height={Scale.moderateScale(25)}
                  width={Scale.moderateScale(25)} />
              </TouchableOpacity>
              :
              null
            }
            {links?.twitterUrl ?
              <TouchableOpacity onPress={() => onSocialIconPresshandler('tw')} style={styles.rowItem}>
                <TwitterIcon
                  height={Scale.moderateScale(25)}
                  width={Scale.moderateScale(25)} />
              </TouchableOpacity>
              :
              null
            }
            {links?.instagramUrl ?
              <TouchableOpacity onPress={() => onSocialIconPresshandler('ins')} style={styles.rowItem}>
                <InstagramIcon
                  height={Scale.moderateScale(25)}
                  width={Scale.moderateScale(25)} />
              </TouchableOpacity>
              :
              null
            }
            {links?.linkedinUrl ?
              <TouchableOpacity onPress={() => onSocialIconPresshandler('link')} style={styles.rowItem}>
                <LinkedinIcon
                  height={Scale.moderateScale(25)}
                  width={Scale.moderateScale(25)} />
              </TouchableOpacity>
              :
              null
            }
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.rowContainers}>
            <TouchableOpacity onPress={() => onContentPressHandler('CustomerRights', Languages.Profile.CustomerRights)} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.CustomerRights}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onContentPressHandler('WarrantyPolicy', Languages.Profile.WarrantyPolicy)} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.WarrantyPolicy}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSellWithUsPressHandler} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.SellWithUs}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.rowContainers}>
            <TouchableOpacity onPress={() => onContentPressHandler('TermsOfUse', Languages.Profile.TermsOfUse)} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.TermsOfUse}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onContentPressHandler('TermsOfSale', Languages.Profile.TermsOfSale)} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.TermsOfSale}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onContentPressHandler('PrivacyPolicy', Languages.Profile.PrivacyPolicy)} style={styles.rowItem}>
              <Text style={styles.rowItemText}>{Languages.Profile.PrivacyPolicy}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>{Languages.Common.CopyRight}</Text>
        </View>

      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={1}
        snapPoints={[currencies.length * Scale.verticalScale(64) + Scale.verticalScale(60), 0]}
        onCloseEnd={closeEnd}
        onOpenEnd={openEnd}
        callbackNode={fall}
        renderHeader={() => <BottomSheetHeader />}
        renderContent={() => <RenderCurrencyBottomSheetContent />}
      />
      <BottomSheetBackView
        bottomSheetRef={bottomSheetRef} ref={childRef}
        fall={fall} />

      <BottomSheet
        ref={bottomSheetLangRef}
        initialSnap={1}
        snapPoints={[currencies.length * Scale.verticalScale(64) + Scale.verticalScale(60), 0]}
        onCloseEnd={closeLangEnd}
        onOpenEnd={openLangEnd}
        callbackNode={fallLang}
        renderHeader={() => <BottomSheetHeader />}
        renderContent={() => <RenderLanguageBottomSheetContent />}
      />

      <BottomSheetBackView
        bottomSheetRef={bottomSheetLangRef} ref={childLangRef}
        fall={fallLang} />

      <CustomModal
        onCancelPress={closeSignoutModal}
        onRequestClose={closeSignoutModal}
        onOkPress={signOutHandler}
        icon={ModalLogoutIcon}
        visible={signoutModalIsVisible}
        title={Languages.Common.Signout}
        description={Languages.Common.AreYourSure}
        okText={Languages.Common.YesSignout}
        cancelText={Languages.Common.Cancel}
      />

    </LazyHOC>
  );
};

export default ProfileScreen;
