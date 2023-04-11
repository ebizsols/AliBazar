import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Linking,
  StyleSheet
} from 'react-native';
import {
  SplashScreen,
  HomeScreen,
  SearchScreen,
  GoodsDetailScreen,
  ProfileScreen,
  SignInScreen,
  ForgotPasswordScreen,
  SignUpScreen,
  CartScreen,
  SearchDialogScreen,
  CategoryScreen,
  CategoryModulesScreen,
  WishlistScreen,
  EditProfileScreen,
  AddressesScreen,
  AddressMapScreen,
  AddAddressDetailScreen,
  AddressVerifyPhoneScreen,
  ChangeAddressMobileScreen,
  OrdersScreen,
  OrderDetailScreen,
  ReviewProductScreen,
  CancelOrderScreen,
  AfterCancelScreen,
  CreditsScreen,
  ReturnsRequstedScreen,
  ReturnsDeliveredScreen,
  ReturnsRequestFirstStepScreen,
  ReturnsRequestSecondStepScreen,
  CreateStoreScreen,
  AfterCreateStoreScreen,
  ShippingAddressScreen,
  ShippingAddressVerifyPhoneScreen,
  ShippingAddressChangeMobileScreen,
  PaymentScreen,
  AfterPaymentScreen,
  PreferenceScreen,
  ChangePasswordScreen,
  HelpHomeScreen,
  TopicDetailScreen,
  ArticleDetailScreen,
  ArticleSearchDialogScreen,
  TrackingScreen,
  TrackingOrderScreen,
  StoreListScreen,
  ProviderScreen,
  OverviewScreen,
  SpecificationsScreen,
  RatingAndReviewsScreen,
  ForgotPasswordVerifyCodeScreen,
  ForgotChangePasswordScreen,
  VerifyEmailScreen,
  ProviderTermAndConditionScreen,
  ProfilePaymentScreen,
  SignUpVerifyMobileScreen,
  ForceUpdateScreen,
  ContentScreen,
  VerifyPhoneScreen
} from "../screens";
import {
  CommonHeader,
  HomeBottomTab,
  TabBar
} from "components";
import {
  Scale,
  Languages
} from "common";
import {
  Typography
} from "styles";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeIcon from 'assets/icons/bottomTabs/home.svg';
import CategoryIcon from 'assets/icons/bottomTabs/category.svg';
import CartIcon from 'assets/icons/bottomTabs/cart.svg';
import ProfileIcon from 'assets/icons/bottomTabs/profile.svg';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './RootNavigation';

import MaterialTopTabBar from 'components/TopTabBarComponents/MaterialTopTabBar';
import linking from '../../linking';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AppNavigation = (props) => {

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage && remoteMessage.data && remoteMessage.data?.HasNavigate == '1') {
        const params = remoteMessage.data.Params ? JSON.parse(remoteMessage.data.Params) : {};
        // console.log(params);
        RootNavigation.navigate(remoteMessage.data.ScreenName, params);
      }

      if (remoteMessage && remoteMessage.data && remoteMessage.data?.HasLink == '1') {
        Linking.canOpenURL(remoteMessage.data?.Link).then(supported => {
          if (supported) {
            Linking.openURL(remoteMessage.data?.Link);
          } else {
            try {
              Linking.openURL(remoteMessage.data?.Link);
            } catch (error) {
              console.log('Error in openning: ', error);
            }
            console.log("Don't know how to open URI: " + remoteMessage.data?.Link);
          }
        });
      }
    });
  }, []);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator headerMode={"screen"} initialRouteName="Splash" screenOptions={{
      }}>

        <Stack.Screen options={{ headerShown: false, }}
          name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ForceUpdate" component={ForceUpdateScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Home" component={HomeBottomTabs} />

        <Stack.Screen options={{ headerShown: false, }}
          name="SearchDialog" component={SearchDialogScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="Search" component={SearchScreen} />


        <Stack.Screen options={{ headerShown: false, }}
          name="GoodsDetail" component={GoodsDetailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="Overview" component={OverviewScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="Specifications" component={SpecificationsScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="RatingAndReviews" component={RatingAndReviewsScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="CategoryModules" component={CategoryModulesScreen} />



        <Stack.Screen options={{ headerShown: false, }}
          name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ForgotPasswordVerifyCode" component={ForgotPasswordVerifyCodeScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ForgotChangePassword" component={ForgotChangePasswordScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="SignUpVerifyMobile" component={SignUpVerifyMobileScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ChangePassword" component={ChangePasswordScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Addresses" component={AddressesScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AddressMap" component={AddressMapScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AddAddressDetail" component={AddAddressDetailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AddressVerifyPhone" component={AddressVerifyPhoneScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ChangeAddressMobile" component={ChangeAddressMobileScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Orders" component={OrdersScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ReviewProduct" component={ReviewProductScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="CancelOrder" component={CancelOrderScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AfterCancel" component={AfterCancelScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Credits" component={CreditsScreen} />

        <Stack.Screen options={{ header: (props) => <CommonHeader containerStyle={{ borderBottomWidth: 0 }} {...props} showBackIcon={true} title={Languages.Profile.Returns} /> }}
          name="Returns" component={Returns} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ReturnsRequestFirstStep" component={ReturnsRequestFirstStepScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ReturnsRequestSecondStep" component={ReturnsRequestSecondStepScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="CreateStore" component={CreateStoreScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AfterCreateStore" component={AfterCreateStoreScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="ShippingAddress" component={ShippingAddressScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ShippingAddressVerifyPhone" component={ShippingAddressVerifyPhoneScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ShippingAddressChangeMobile" component={ShippingAddressChangeMobileScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="Payment" component={PaymentScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="AfterPayment" component={AfterPaymentScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Preference" component={PreferenceScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="VerifyEmail" component={VerifyEmailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="VerifyPhone" component={VerifyPhoneScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="HelpHome" component={HelpHomeScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="TopicDetail" component={TopicDetailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ArticleSearchDialog" component={ArticleSearchDialogScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Tracking" component={TrackingScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="TrackingOrder" component={TrackingOrderScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="StoreList" component={StoreListScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Provider" component={ProviderScreen} />
        <Stack.Screen options={{ headerShown: false, }}
          name="ProviderTermAndCondition" component={ProviderTermAndConditionScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="ProfilePayment" component={ProfilePaymentScreen} />

        <Stack.Screen options={{ headerShown: false, }}
          name="Content" component={ContentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeBottomTabs = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home" tabBar={props => <HomeBottomTab {...props} />}>
      <BottomTab.Screen name="Home" options={{ title: Languages.BottomTabs.Home, Icon: HomeIcon, routeName: 'Home' }} component={HomeScreen} />
      <BottomTab.Screen name="Category" options={{ title: Languages.BottomTabs.Category, Icon: CategoryIcon, routeName: 'Category' }} component={CategoryScreen} />
      <BottomTab.Screen name="Profile" options={{ title: Languages.BottomTabs.Profile, Icon: ProfileIcon, routeName: 'Profile' }} component={ProfileScreen} />
      <BottomTab.Screen name="Cart" options={{ title: Languages.BottomTabs.Cart, Icon: CartIcon, routeName: 'Cart' }} component={CartAndWishlist} />
    </BottomTab.Navigator>
  );
}

const CartAndWishlist = () => {
  return (
    // <Tab.Navigator tabBar={props => <MaterialTopTabBar {...props} />}>
    <Tab.Navigator tabBarOptions={{
      indicatorStyle: {
        backgroundColor: '#F0B440',
        height: Scale.moderateScale(3)
      },
      style: {
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "center"
      },
      activeColor: '#172840',
      inactiveColor: '#ACB1B8'
    }}>
      <Tab.Screen name="Wishlist" options={{ title: Languages.Common.Wishlist }} component={WishlistScreen} />
      <Tab.Screen name="Cart" options={{ title: Languages.Common.Cart }} component={CartScreen} />
    </Tab.Navigator>
  );
}

const Returns = () => {
  return (
    // <Tab.Navigator tabBar={props => <MaterialTopTabBar {...props} />}>
    <Tab.Navigator tabBarOptions={{
      indicatorStyle: {
        backgroundColor: '#F0B440',
        height: Scale.moderateScale(3)
      },
      style: {
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "center"
      },
      activeColor: '#172840',
      inactiveColor: '#ACB1B8'
    }}>
      <Tab.Screen name="ReturnsRequsted" options={{ title: Languages.Returns.ReturnsRequested }} component={ReturnsRequstedScreen} />
      <Tab.Screen name="ReturnsDelivered" options={{ title: Languages.Returns.ReturnsDelivered }} component={ReturnsDeliveredScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

});

export default AppNavigation;