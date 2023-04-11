/** @format */
import {
  Text,
} from 'react-native';
import LocalizedStrings from "react-native-localization";
import React from 'react';

export default new LocalizedStrings({
  en: {
    Product: {
      NewArrivals: "New Arrivals",
      OffCap: "OFF",
      ConnectProvider: "Connect provider", // v2
    },
    BottomTabs: {
      Home: "Home",
      Category: "Category",
      Profile: "Profile",
      Cart: "Cart",
    },
    Splash: {
      SplashText: "We have everything you need"
    },
    Search: {
      Filter: "Filter",
      Grid: "Grid",
      Row: "Row",
      ResultsFor: (countStyle, resultForStyle, textStyle, count, text) => { // v2
        return (
          <Text numberOfLines={1}>
            <Text style={countStyle}>{count}</Text>
            <Text style={resultForStyle}> results for </Text>
            <Text style={textStyle}>{text}</Text>
          </Text>
        )
      },
      ResultsForWithoutText: (countStyle, resultForStyle, textStyle, count) => { // v2
        return (
          <Text numberOfLines={1}>
            <Text style={countStyle}>{count}</Text>
            <Text style={resultForStyle}> results </Text>
          </Text>
        )
      },
    },
    Sorts: {
      SortBy: "Sort By",
      Popularity: "Popularity",
      HighToLow: "Price: High to Low",
      LowToHigh: "Price: Low to High",
      NewArrivals: "New Arrivals",
    },
    GoodsDetail: {
      Reviews: "reviews",
      SoldBy: "Sold by",
      ModelNumber: "Model number",
      InclusiveOfVAT: "Inclusive of VAT",
      MonthWarranty: (month) => month + ' month warranty',
      ThisItemCannotBeExchangedOrReturned: "This item cannot be exchanged or returned",
      Saving: "Saving",
      NumberOtherOffer: (number) => number + ' other offer',
      Less: 'less',
      ViewAllOffers: 'View all offers',
      BaseOnCountreviews: (reviewCount) => 'Base on ' + reviewCount + ' reviews',
      InCart: "in cart",
      ThereNoCommentsForThisproduct: "There are no comments for this product",
      ThisProductNotAvailable: "This product is not available",
      DeliverTo: "Deliver to",
      ChangeArea: "Change Area",
      PostedBySeller: "Posted by the seller",
      GetFreeReturnsEligibleItems: "Get free returns on eligible items",
      SorrythisProductIsNotAvailable: "Sorry! This product is not available.",
      QTY: "QTY",
      AddToCart: "Add to cart",

      Overview: "Overview", // new
      Specifications: "Specifications", // new
      RatingReviews: "Rating & Reviews", // new
      CustomerAlsoViewed: "Customer Also Viewed",
      JustExist: "Just Exist", // v2
      ConnectProviderForPrice: "Connect provider for the price of the product",
      CallRequest: "Call request",
      WeWillContactYou: "We will contact you",
      DeliveredBy: "Delivered by"
    },
    Profile: {
      WelcomeBack: "Welcome back",
      SignInToYourAccount: "Sign in to your account",
      SignIn: "Sing in",
      NewHere: "New here?",
      CreateAnAccount: "Create an account",
      Language: "Language",
      Country: "Country",
      WhatsAppUs: "WhatsApp Us",
      ContactUs: "Contact Us",
      Help: "Help Center",
      Careers: "Careers",
      WarrantyPolicy: "Warranty Policy",
      SellWithUs: "Sell with us",
      TermsOfUse: "Terms of Use",
      TermsOfSale: "Terms of Sale",
      PrivacyPolicy: "Privacy Policy",
      Orders: "Orders",
      Payment: "Payment",
      Returns: "Returns",
      Addresses: "Addresses",
      AjyalCredits: "Ajyal Credits",
      Preference: "Preference",
      Claims: "Claims",
      SignOut: "Sign out",
      WelcomeBack: "Welcome back!",
      SignInToYourAccount: "Sign in to your account",
      Login: "Login",
      ForgetPassword: "Forget Password?",
      NewHere: "New here?",
      SignUpDiscover: "Sign up and discover our products",
      SignUp: "Sign up",
      EnterYourEmailAddressAndWellSend: "Enter your email address and we'll send you a link to reset your password",
      CreateAjyalAccount: "Create a Ajyal account",
      FullName: "Full name",
      EnterYourFullName: "Enter your full name",
      HaveAnAccount: "Have an account?",
      LogIn: "Log in",
      SelectLanguage: "Select Language",
      Name: "Name",
      Family: "Family",
      EnterYourFamily: "Enter your family",
      Password: "Password",
      EditProfile: "Edit Profile", // new
      YouCannotChangeYourEmail: "You cannot change your email", // new
      ChangePassword: "Change password", // new
      EnterYourCurrentPassword: "Enter your current password and new one to change the password",
      SavePassword: "Save password",
      OrderTracking: "Order Tracking",
      StoreList: "Store List",
      CheckYourEmail: "Check your email inbox", // v2
      WeHaveSendAnEmail: (style, email) => { // v2
        return (<>We've sent an email to <Text style={style}>{email}</Text> with 8-digit code . Please enter the code below then set a new password.</>
        )
      },
      SendNewEmail: "Send new email", // v2
      changeYourPasswordNow: "change your password now!",
      VerifyYourEmail: "Verify Email",
      EnterTheCodeThatWasSentVerifyEmail: "Enter the code that was sent to you to Verify the email",
      Deals: 'Deals', // v2
      ProfilePayment: "Payment",
      ExpiryDate: (expireStyle, dataStyle, dataText) => { // v2
        return (<><Text style={expireStyle}> Expiry </Text>
          <Text style={dataStyle}>{dataText}</Text></>
        )
      },
      YouDontHaveAnyPaymentCardYet: "You don't have any payment card yet!",
      ToProceedToRegisterOTPVerifyMobileNumber: "To proceed to register, use the OTP & verify your mobile number. We’ve sent the OTP to",
      VerifyMobile: "Verify Mobile",
      VerifyMobileNumber: "Verify Mobile Number",
      CustomerRights: "Customer Rights"
    },
    InputLabels: {
      Email: "Email",
      Password: "Password",
      ConfirmPassword: "Confirm password",
      FirstName: "First name", // new
      LastName: "Last name", // new
      EmailAddress: "Email address", // new
      PostalCode: "Postal code", //new,
      Flat: "Flat", //new,
      StreetNumber: "Street number", //new,
      Direction: "Direction", //new,
      MobileNumber: "Mobile Number", // new
      CompanyLegalName: "Company Legal Name", // new
      FullName: "Full name", // new
      PhoneNumber: "Phone Number", // new
      CompanyPhoneNumber: "Company Phone Number", // new
      WhatsYourStoreName: "What's your store name?", // new
      WhatKindOfProductDoYouSell: "What kind of product do you sell?", // new
      FullAddress: "Full Address", // new
      BeneficiaryName: "Beneficiary Name", // new
      BankName: "Bank Name", // new
      BranchName: "Branch Name", // new
      AccountNumber: "Account Number", // new
      IBANNumber: "IBAN Number", // new
      SwiftCode: "SwiftCode", // new
      Currency: "Currency", // new
      TaxRegistrationNumber: "Tax Registration Number",
      WhyReturnItem: "Why would you like to return this item?",
      Quantity: "Quantity",
      CurrentPassword: "Current Password",
      NewPassword: "New Password",
      ConfirmNewPassword: "Confirm New password",
      HowCanHelp: "How can we help?",
      PleaseEnterYourOrderTrackingNumber: "Please enter your order tracking number",
      Category: "Category",
      NationalCode: "National Code",
      Province: "Province",
      BirthDayDate: "Birthday date",
      NameOnCard: "Name on card",
      CardNumber: "Card Number",
      ExpiryDate: "Expiry Date",
      SecurityCode: "Security Code",
      ZipPostalCode: "Zip/Postal Code",
      WhyWouldYouLikeToCancelThisItem: "Why would you like to cancel this item?"
    },
    Placeholder: {
      EnterEmailSAddress: "Enter email address",
      EnterPassword: "Enter password",
      EnterConfirmPassword: "Enter confirm password",
      EnterYourName: "Enter your name",
      CouponOrGiftCard: "Coupon or Gift Card",
      EnterPassword: "Enter password",
      EnterFirstName: "Enter your first name", // new
      EnterLastName: "Enter your last name", // new 
      EnterPostalCode: "Enter postal code", // new 
      EnterFlat: "Enter flat/house/street",
      EnterStreetNumber: "Enter street number",
      EnterDirection: "Enter any direction such like floor number etc",
      EnterMobileNumber: "Enter mobile number", // new
      PleaseSelectCountry: "Please select country", // new
      PleaseSelectCity: "Please select city", // new
      TypeYourCommentHere: "Type your comment here...", // new
      EnterProductPros: "Enter product pros", // new
      EnterProductCons: "Enter product cons", // new
      EnterCompanyLegalName: "Enter Company Legal Name", // new
      EnterFullName: "Enter Full Name", // new
      EnterPhoneNumber: "Enter Phone Number", // new
      EnterCompanyPhoneNumber: "Enter Company Phone Number", // new
      EnterStoreName: "Enter store name", // new
      SelectKindOfProduct: "Select kind of product you sell", // new
      EnterFullAddress: "Enter Full Address", // new
      EnterBeneficiaryName: "Enter Beneficiary Name",
      EnterBankName: "Enter Bank Name",
      EnterBranchName: "Enter Branch Name",
      EnterAccountNumber: "Enter Account Number",
      EnterBeneficiaryName: "EnterBeneficiaryName",
      EnterIBANNumber: "Enter IBAN Number",
      EnterSwiftCode: "Enter SwiftCode",
      EnterTaxRegistrationNumber: "Enter Tax Registration Number",
      TypeDescriptionAboutItem: "Type your description about this item...",
      SelectReason: "Select a reason",
      EnterCurrentPassword: "Enter current password",
      EnterNewPassword: "Enter new password",
      ConfirmYourPassword: "Confirm your new password",
      SearchTheHelpCenter: "Search the help center",
      EnterOrderTrackingNumber: "Enter Order Tracking Number",
      SearchVendors: "Search Vendors",
      All: "All",
      VerificationCode: "Verification Code", // v2
      SearchBrand: "Search brand", // v2
      EnterYourNewPassword: "Enter your new password", // v2
      Code: "code",
      EnterNationalCode: "Enter national code",
      PleaseSelectProvince: "Please select province",
      ClickToSelectDate: "Click to select a date",
      MonthMM: "MM",
      YearYY: "YY",
      PleaseSelectProvince: "Please select province", // new
    },
    SearchDialog: {
      RecentSearches: "Recent Searches"
    },
    Common: {
      WhatAreYouLookingFor: "What are you looking for?",
      CopyRight: "© 2020 Ajyal. All Rights Reserved.",
      SubmitEmail: "Submit email",
      CreateAnAccount: "Create an account",
      ClearAll: "Clear all",
      In: (styleInText = {}, styleAfterInText = {}, text) => {
        return (<><Text style={styleInText}>in </Text><Text style={styleAfterInText}>{text}</Text></>
        )
      },
      NoResultsFound: "No results found",
      TryWithDifferentWords: "Try with different words",
      Clear: "Clear",
      SeeAll: "See All",
      Brands: "Brands",
      Apply: "Apply",
      Filters: "Filters",
      Category: "Category",
      Price: "Price",
      To: "to",
      ViewAll: "View All",
      Selectdots: "Select...",
      NothingFound: "Nothing found",
      Currency: "Currency",
      SelectCurrency: "Select Currency",
      DeliveryLocation: "Delivery Location",
      SearchCities: "Search Cities",
      PlusCountproduct: (count) => {
        return "+ " + count + " product"
      },
      Cart: "Cart", // new
      Wishlist: "Wishlist", // new
      Phone: "Phone", // new,
      NotVerified: "not verified", // new
      Save: "Save",
      Continue: "Continue", // new,
      ResendNow: "Resend now", //new
      Skip: "Skip", // new
      Cancel: "Cancel", // new
      Reason: "Reason", // new
      Close: "Close", // new
      Processing: "Processing", // new
      PlacedOn: (text = "") => { // v2
        return 'Placed on ' + text
      },
      OnText: (text = "") => { // v2
        return 'on ' + text
      },
      Review: "Review", // new
      Yes: "Yes", // new
      No: "No", // new
      Next: "Next", // new
      BrowseYourFile: "Browse your file", // new
      TakePhoto: "Take a photo", // new
      ChooseFromGallery: "Choose from gallery", // new
      Submit: "Submit",
      BackToHome: "Back to home",
      SubmitRequest: "Submit Request",
      Reset: "Reset",
      SinceDate: (style, date) => {
        return (<>Since <Text style={style}>{date} </Text></>
        )
      },
      Verify: "Verify", // v2
      Unavailable: "Unavailable", // v2
      NumberItems: (count) => { // v2
        return count + " items"
      },
      More: "see more",
      ProductsSold: (count) => { // v2
        return count + " Products sold"
      },
      TermsCondition: "Terms & condition",
      ReviewsCap: "Reviews",
      Delete: "Delete",
      CountryCode: "Country Code",
      Download: "Download",
      DownloadNewVersionDirectly: "Download new version directly",
      VatCap: "VAT",
      DownloadingWithDots: "Downloading...",
      Confirm: "Confirm",
      PickADate: "Pick a date",
      PleaseSelect: "Please Select",
      Signout: "sign out",
      AreYourSure: "Are You Sure?",
      YesSignout: "Yes, Sign out",
      FeaturedCategories: "Featured Categories",
      BackToTop: "Back to Top"
    },
    InputValidates: {
      ThisFieldIsRequired: "This field is required",
      EmailIncorrect: "Email is incorrect",
      PasswordNotMatch: "Password not match",
      MustBeAtLeastCharacter: (min) => {
        return "Must be at least " + min + " character"
      },
      PhoneNumberIsIncorrect: "Phone number is incorrect",
      MustAtLeastLength: (min) => {
        return "Must be at least " + min + " length";
      },
      MaxCharacterLengthIs: (val) => {
        return "Max character length is " + val;
      },
      UploadFileRequired: "Uploading this file is required", // new
      PasswordNotMatchSame: "Confirm password must be same"
    },
    Cart: {
      YourShoppingCartEmpty: "Your shopping cart looks empty",
      WhatAreYouWaitingFor: "What are you waiting for? Start shopping!",
      RemoveFromList: "Remove from list",
      MoveToWishlist: "Move to Wishlist",
      Quantity: "Quantity",
      OrderSummary: "Order Summary",
      Subtotal: "Subtotal",
      NumberItems: (number) => {
        return number + ' Items'
      },
      Shipping: "Shipping",
      Free: "Free",
      Discount: "Discount",
      Total: "Total",
      InclusiveOfVAT: "Inclusive of VAT",
      Apply: "Apply",
      Coupon: "Coupon",
      CheckoutNow: "Checkout Now",
      YourWishListEmpty: "Your wishlist looks empty",
      PleaseSignInFirstToSeeYourWishlist: "Please sign in first to see your wishlist",

      MoveToCart: "Move to Cart", // new
      ThisItemCannotBeShipped: "This item cannot be shipped to your selected delivery location. Please choose a different delivery location.", // v2
    },
    SortTypes: { // new
      MostView: "Most View",
      MostLiked: "Most Liked",
      Expensive: "Expensive",
      Cheapest: "Cheapest",
      MostSeller: "Most Seller",
      New: "New",
      MostDiscount: "Most Discount"
    },
    Address: { // new
      Addresses: "Addresses",
      SetAsDefault: "Set as default",
      PrimaryAddress: "Primary address",
      EditAddress: "Edit address",
      Delete: "Delete",
      WhereAreYourSavedAddresses: "Where are your saved addresses?",
      AddAnAddressGetCrackingDelivery: "Add an address so we can get cracking on the delivery!",
      AddAnAddress: "Add an address",
      AddAddress: "Add address",
      SetAsDefaultAaddress: "Set as default address",
      City: "City",
      SubmitVerifyPhone: "Submit & verify phone",
      PleaseVerifyMobileNumberToContinue: "Please verify your mobile number to continue",
      ToProceedToCheckoutOTPVerifyMobileNumber: "To proceed to checkout, use the OTP & verify your mobile number. We’ve sent the OTP to",
      ChangePhoneNumber: "Change Phone Number",
      DidNotReceiveOTP: "Didn't receive OTP",
      TheAddressShouldBeSelected: "The address should be selected",
      SetFromMap: "Set from map",
      TheAddressSelectedIsNoOfActiveCountries: "The address you selected is not in our list of active countries",
      ChangeNumber: "Change number",
      PleaseEnterMobileNumberSendNewOTP: "Please enter your new mobile number and we’ll send you a new OTP.",
      SearchForYourLocation: "Search for your location",
      EditAddressCap: 'Edit Address'
    },
    Payment: { // new
      ShippingAddress: "Shipping Address",
      Payment: "Payment",
      ShipTo: "Ship to",
      PayWithCash: "Pay with cash",
      PayWithCashDescription: (style) => {
        return (<>
          Please note there is a non-refundable fee of SAR 17.00 for our cash on delivery service. To save on this amount please <Text style={style}> proceed debit/ credit card.</Text>
        </>
        )
      },
      PayWithCard: "Pay with card",
      YourOrder: "Your Order",
      PlaceOrder: "Place Order",
      PleaseSelectPaymentMethodFirst: "Please select a payment method first",
      ThankYouForYourOrder: (name, family) => {
        return 'Thank you for your order ' + name + ' ' + family + '!'
      },
      YouWillReceiveAnEmailAt: (style, email) => {
        return (<>You'll receive an email at <Text style={style}>{email} </Text>once your order is confirmed.</>
        )
      },
      BackToOrder: "Back to orders",
      OrderWithTracking: (orderTracking) => {
        return "Order " + orderTracking
      },
      GoToOrderDetail: "Go to Order Detail",
      PleaseSelectAddressFirst: "Please select an address first", // v2
      YouMustVerifyMobileFirst: "You must verify your selected address mobile number first",
      InOrderToCompleteYourTransaction: "In order to complete your transaction, we will transfer you to payment page",
      CompletePayment: "Complete Payment",
      YourPurchaseEncounteredError: "Your purchase encountered an error"
    },
    Order: { // new
      Orders: "Orders",
      YouDontHaveAnyOrdersYet: "You don't have any orders yet",
      WhatAreYouWaitingForStartShopping: "What are you waiting for? Start shopping!",
      ContinueShopping: "Continue Shopping",
      OrderCapWithTrackingCode: (orderTracking) => {
        return 'ORDER ' + orderTracking
      },
      OrderDetail: "Order Details",
      CancelItemsFromThisOrder: "Cancel items from this order",
      PaymentMethod: "Payment Method",
      RateProduct: "Rate product",
      SubmitReview: "Submit Review",
      PleaseRateProduct: "Please rate this product",
      Pros: "Pros",
      Cons: "Cons",
      CreditCard: (paymentTitle) => "Credit Card" + " (" + paymentTitle + ")", // v2
      YouAlreadyReviewed: "You have already reviewed"
    },
    Preference: { // new
      Preference: "Preference",
      SelectYourDefaultRefundMethod: "Select your default refund method for returns and cancellations",
      WalletRefund: "Wallet refund",
      WalletRefundDescription: "The amount of returned or canceled purchases will be refunded to your wallet",
      CardRefund: "Card refund",
      CardRefundDescription: "If you paid with cash or used ajyal Credits To complement a card payment, the amount will be refunded to your wallet",
    },
    Credits: { // new 
      Credits: "Ajyal Credits",
      AvailableBalance: "Available Balance",
      YouDoNotHaveAnyAjyaCreditsYet: "You don't have any ajyal credits yet!",
      Balance: "Balance"
    },
    CreateStore: { // new
      SellWithUs: "Sell with us",
      Login: "Login",
      Country: "Country",
      Store: "Store",
      Document: "Document",
      Bank: "Bank",
      Vat: "Vat",
      WhereIsYourBusiness: "Where is your business based?",
      ChooseCountry: "Choose Country",
      ChooseCity: "Choose City",
      Person: "Person",
      Legal: "Legal",
      Natural: "Natural",
      SelectAddressFromMap: "Select address from map",
      LocationSelected: "Location Selected",
      DocumentVerification: "Document Verification",
      UploadWithTitle: (txt) => {
        return 'Upload ' + txt
      },
      Dollar: "Dollar",
      Dinar: "Dinar",
      BankDetails: "Bank Details",
      VATDetails: "VAT Details",
      AgreedText: "I acknowledge and agree that ajyal will be raising and facilitating VAT invoices and credit notes on behalf of my company in relation to consumer transactions on the ajyal site",
      CreatingYourStore: "Creating Your Store",
      TheLatestWorkIsUnderway: "The latest work is underway",
      Register: "Register", // v2
      AccountInformation: "Account Information",
      TheSelectedCountry: "The selected country must be the same as the city you selected in step two",
      ChangeRegisterData: "Change Register Data",
      ChooseProvince: "Choose Province",
    },
    AfterCreateStore: {
      ThankYou: "Thank You!",
      YourStoreHasBeenCreated: "Your store has been created",
      PleaseAllowUsToCheck: "Please allow us to check the documents within 48 hours, then we will allow you to sell and display the products in your store. You can proceed to adjust your store settings.",
      IfYouHaveAnyConcerns: (style, email) => {
        return (<>If you have any concerns regarding the creation of your account please do not hesitate to contact us on <Text style={style}>{email}</Text></>
        )
      },
    },
    Returns: {
      WeDontSeeAnyReturnsRequested: "We don't see any returns requested",
      NeedSubmitRequest: "Need to submit a request?",
      JustClickButton: "Just click on the button!",
      FileRequest: "File a new return request",
      ReturnCapWithTrackingCode: (orderTracking) => {
        return 'RETURN ' + orderTracking
      },
      RefundMethod: "Refund Method",
      WeDontSeeReturnsDelivered: "We don't see any returns delivered",
      NeedSubmitRequest: "Need to submit a request?",
      SelectItemsForReturn: "Select Items for return",
      ReturnsRequest: "Returns Request",
      SelectItems: "Select Items",
      ChooseRequestType: "Choose your request type",
      FileANewReturnRequest: "File a new return request", // v2
      ReturnsRequested: "Returns Requested",
      ReturnsDelivered: "Returns Delivered",
      PickupAddress: "Pickup Address"
    },
    Language: { // new
      Arabic: "العربية",
      English: "English"
    },
    HelpCenter: { // new
      HelpCenter: "Help Center",
      ArticlesCount: (count) => {
        return count + ' articles'
      },
      Article: "Article",
      WasArticleHelpful: "Was this article helpful?",
      ArticlesInThisSection: "Articles in this section",
      HowCanWeHelp: "How can we help?",
      SearchTheHelpCenter: "Search the help center"
    },
    OrderTracking: { // new
      OrderTracking: "Order Tracking",
      TrackYourOrdersDetailsMoreInformation: "Track your orders for details and more information",
      Tracking: "Tracking"
    },
    ShopList: { // new
      VisitStore: "Visit Store"
    },
    ShopListSortTypes: { // new
      MostPopular: "most popular",
      MostRecent: "most recent",
      MostReviewed: "most reviewed",
    },
    Cancel: {
      SelectReasonRequired: "Select a reason is required",
      SelectItemsForCancellation: "Select items for cancellation",
      ClickHereChangeDefaultRefundMethod: "Click here to change your default refund method",
      OnlyAppliesToPrepaidAmounts: "Only applies to prepaid amounts and take up to 7-14 business days to reflect on your card. Cash payments and Ajyal credits used to complement a card payment will be refunded to your wallet.",
      CancelItemsWithCount: (count) => `Cancel ${count} ${count > 1 ? 'items' : 'item'}`,
      BackToOrder: "Back to order",
      ThisItemSuccessfullyRemovedFromYourOrder: "This item was successfully removed from your order",
      RemovedItems: "Removed Items"
    }
  },

  ar: {
    Product: {
      NewArrivals: "جديدنا",
      OffCap: "خصم",
      ConnectProvider: "ربط مزود", // v2
    },
    BottomTabs: {
      Home: "الصفحة الرئيسية",
      Category: "الفئة",
      Profile: "حسابك",
      Cart: "عربة التسوق",
    },
    Splash: {
      SplashText: "لدينا كل ما تحتاجه"
    },
    Search: {
      Filter: "فلتر",
      Grid: "جريد",
      Row: "صف",
      ResultsFor: (countStyle, resultForStyle, textStyle, count, text) => { // v2
        return (
          <Text numberOfLines={1}>
            <Text style={countStyle}>{count}</Text>
            <Text style={resultForStyle}> نتائج البحث عن </Text>
            <Text style={textStyle}>{text}</Text>
          </Text>
        )
      },
      ResultsForWithoutText: (countStyle, resultForStyle, textStyle, count) => { // v2
        return (
          <Text numberOfLines={1}>
            <Text style={countStyle}>{count}</Text>
            <Text style={resultForStyle}> نتائج </Text>
          </Text>
        )
      },
    },
    Sorts: {
      SortBy: "ترتيب حسب",
      Popularity: "الأكثر رواجاً",
      HighToLow: "السعر: من الأعلى إلى الأقل",
      LowToHigh: "السعر: من الأقل إلى الأعلى",
      NewArrivals: "جديدنا",
    },
    GoodsDetail: {
      Reviews: "تقييم واحد",
      SoldBy: "البائع",
      ModelNumber: "رقم الموديل",
      InclusiveOfVAT: "تتضمن الـ VAT",
      MonthWarranty: (month) => 'ضمان لمدة ' + month + ' شهراً',
      ThisItemCannotBeExchangedOrReturned: "مينفعش تستبدل أو ترجع المنتج ده",
      Saving: "التوفير",
      NumberOtherOffer: (number) => 'عروض أخرى' + ' ' + number,
      Less: 'أقل',
      ViewAllOffers: 'عرض جميع العروض',
      BaseOnCountreviews: (reviewCount) => 'بناء على ' + reviewCount + ' تقييمات',
      InCart: "في العربة",
      ThereNoCommentsForThisproduct: "لا توجد تعليقات لهذا المنتج",
      ThisProductNotAvailable: "هذا المنتج غير متوفر",
      DeliverTo: "توصيل إلى",
      ChangeArea: "تغيير المنطقة",
      PostedBySeller: "أرسلت بواسطة البائع",
      GetFreeReturnsEligibleItems: "مينفعش تستبدل أو ترجع المنتج ده",
      SorrythisProductIsNotAvailable: "المعذرة، هذا المنتج غير متوفر.",
      QTY: "الكمية",
      AddToCart: "اضافة الی عربة التسوق",

      Overview: "نظرة سريعة", // new
      Specifications: "المواصفات", // new
      RatingReviews: "التقييم", // new
      CustomerAlsoViewed: "قد يعجبك أيضاً",
      JustExist: "المتوفر", // v2
      ConnectProviderForPrice: "ربط مزود بسعر المنتج",
      CallRequest: "طلب اتصال", // v2
      WeWillContactYou: "سوف نتصل بك",
      DeliveredBy: "توصلك يوم"
    },
    Profile: {
      WelcomeBack: "!أهلا بك مجدداً",
      SignInToYourAccount: "تسجيل الدخول إلى حسابك",
      SignIn: "تسجيل الدخول",
      NewHere: "هل أنت زائر جديد؟",
      CreateAnAccount: "إنشاء حساب",
      Language: "اللغة",
      Country: "البلد",
      WhatsAppUs: "راسلنا علی",
      ContactUs: "اتصل بنا",
      Help: "مرکزالمساعدة",
      Careers: "فرص التوظيف",
      WarrantyPolicy: "سياسة الضمان",
      SellWithUs: "البيع معنا",
      TermsOfUse: "شروط الاستخدام",
      TermsOfSale: "شروط البيع",
      PrivacyPolicy: "سياسة الخصوصية",
      Orders: "الطلبيات",
      Payment: "عمليات الدفع",
      Returns: "الإرجاع",
      Addresses: "العناوين",
      AjyalCredits: "رصید اجیال",
      Preference: "تفضيلات",
      Claims: "طلبات الضمان",
      SignOut: "تسجيل الخروج",
      WelcomeBack: "!أهلا بك مجدداً",
      SignInToYourAccount: "تسجيل الدخول إلى حسابك",
      Login: "تسجيل الدخول",
      ForgetPassword: "نسيت كلمة المرور؟",
      NewHere: "هل أنت زائر جديد؟",
      SignUpDiscover: "سجل واكتشف منتجاتنا",
      SignUp: "اشتراك",
      EnterYourEmailAddressAndWellSend: "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور",
      CreateAjyalAccount: "إنشاء حساب على أجيال",
      FullName: "اسم العائلة",
      EnterYourFullName: "أدخل اسم العائلة",
      HaveAnAccount: "ليس لديك حساب؟",
      LogIn: "تسجيل الدخول",
      SelectLanguage: "اختيار اللغة",
      Name: "الاسم الأول",
      Family: "اسم العائلة",
      EnterYourFamily: "أدخل اسم عائلتك",
      Password: "كلمة المرور",
      EditProfile: "تعديل الملف الشخصي", // new
      YouCannotChangeYourEmail: "لا يمكنك تغيير بريدك الإلكتروني", // new
      ChangePassword: "تغيير كلمة المرور", // new
      EnterYourCurrentPassword: "أدخل كلمة السر الحالية وكلمة السر الجديدة لتغيير كلمة السر",
      SavePassword: "حسناً",
      OrderTracking: "تتبع الطلب",
      StoreList: "قائمة المتجر",
      CheckYourEmail: "تحقق من صندوق البريد الإلكتروني الخاص بك", // v2
      WeHaveSendAnEmail: (style, email) => { // v2
        return (<>لقد أرسلنا بريدًا إلكترونيًا إلى <Text style={style}>{email}</Text> برمز مكون من 8 أرقام. الرجاء إدخال الرمز أدناه ثم تعيين كلمة مرور جديدة</>
        )
      },
      SendNewEmail: "إرسال بريد إلكتروني جديد", // v2
      changeYourPasswordNow: "تغيير كلمة المرور الخاصة بك الآن!!",
      VerifyYourEmail: "قم بتأكيد بريدك الألكتروني",
      EnterTheCodeThatWasSentVerifyEmail: "أدخل الرمز الذي تم إرساله إليك للتحقق من البريد الإلكتروني",
      Deals: 'صفقات', // v2
      ProfilePayment: "الدفع",
      ExpiryDate: (expireStyle, dataStyle, dataText) => { // v2
        return (<><Text style={expireStyle}>{'\u00A0'}تنتهي في{'\u00A0'}</Text>
          <Text style={dataStyle}>{dataText}</Text></>
        )
      },
      YouDontHaveAnyPaymentCardYet: "!ليس لديك أي بطاقة دفع حتى الآن",
      ToProceedToRegisterOTPVerifyMobileNumber: "عشان نكمّل لإتمام الشراء، استخدم رمز OTP وأكد رقم موبايلك. بعتنا رمز OTP إلى",
      VerifyMobile: "تحقق من الهاتف المحمول",
      VerifyMobileNumber: "تحقق من رقم الهاتف المحمول",
      CustomerRights: "فرص التوظيف"
    },
    InputLabels: {
      Email: "البريد الإلكتروني",
      Password: "كلمة المرور",
      ConfirmPassword: "تأكيد كلمة المرور",
      FirstName: "الاسم الأول", // new
      LastName: "اسم العائلة", // new
      EmailAddress: "البريد الإلكتروني", // new
      PostalCode: "الكود البريدى", //new,
      Flat: "رقم الشقة", //new,
      StreetNumber: "رقم الشارع", //new,
      Direction: "التوجيه", //new,
      MobileNumber: "رقم الجواّل", // new
      CompanyLegalName: "اسم متجرك؟", // new
      FullName: "الاسم الكامل", // new
      PhoneNumber: "رقم هاتف", // new
      CompanyPhoneNumber: "رقم هاتف الشركة", // new
      WhatsYourStoreName: "اسم متجرك؟", // new
      WhatKindOfProductDoYouSell: "ما هي أنواع المنتجات التي تقوم ببيعها؟", // new
      FullAddress: "العنوان", // new
      BeneficiaryName: "اسم المستفيد", // new
      BankName: "اسم البنك", // new
      BranchName: "اسم الفرع", // new
      AccountNumber: "رقم الحساب", // new
      IBANNumber: "IBAN رقم", // new
      SwiftCode: "رمز سويفت", // new
      Currency: "العملة", // new
      TaxRegistrationNumber: "رقم التسجيل الضريبي",
      WhyReturnItem: "للماذا ترغب في إرجاع هذا المنتج؟",
      Quantity: "الكمية",
      CurrentPassword: "كلمة المرور الحالية",
      NewPassword: "كلمة سر جديدة",
      ConfirmNewPassword: "تأكيد كلمة المرور الجديدة",
      HowCanHelp: "كيف يمكن أن نساعد?",
      PleaseEnterYourOrderTrackingNumber: "الرجاء إدخال رقم تتبع طلبك",
      Category: "Category",
      NationalCode: "رمز دولي",
      Province: "المحافظة",
      BirthDayDate: "تاريخ الميلاد",
      NameOnCard: "الاسم على البطاقة",
      CardNumber: "رقم البطاقة",
      ExpiryDate: "تاريخ الانتهاء",
      SecurityCode: "رمز الحماية",
      ZipPostalCode: "الرمز البريدي",
      WhyWouldYouLikeToCancelThisItem: "لماذا تريد إلغاء هذا المنتج؟"
    },
    Placeholder: {
      EnterEmailSAddress: "أدخل عنوان البريد الإلكتروني",
      EnterPassword: "أدخل كلمة المرور",
      EnterConfirmPassword: "أدخل تأكيد كلمة المرور",
      EnterYourName: "أدخل أسمك",
      CouponOrGiftCard: "كوبون أو كود على كارت الهدية",
      EnterPassword: "أدخل كلمة المرور",
      EnterFirstName: "أدخل الاسم الأول", // new
      EnterLastName: "أدخل الاسم العائلة", // new 
      EnterPostalCode: "أدخل الرمز البريدي", // new 
      EnterFlat: "أدخل الشقة", // new
      EnterStreetNumber: "أدخل رقم الشارع", // new
      EnterDirection: "أدخل الاتجاه", // new
      EnterMobileNumber: "أدخل رقم الجواّل", // new
      PleaseSelectCountry: "الرجاء تحديد الدولة", // new
      PleaseSelectCity: "الرجاء تحديد المدينة", // new
      TypeYourCommentHere: "...اكتب تعليقك هنا", // new
      EnterProductPros: "أدخل إيجابيات المنتج", // new
      EnterProductCons: "أدخل سلبيات المنتج", // new
      EnterCompanyLegalName: "أدخل  اسم متجرك", // new
      EnterFullName: "أدخل  الاسم الكامل", // new
      EnterPhoneNumber: "أدخل رقم هاتف", // new
      EnterCompanyPhoneNumber: "أدخل رقم هاتف الشركة", // new
      EnterStoreName: "أدخل اسم الشركة القانوني", // new
      SelectKindOfProduct: "ما هي أنواع المنتجات التي تقوم ببيعها", // new
      EnterFullAddress: "يرجى إدخال العنوان بالكامل", // new
      EnterBeneficiaryName: "أدخل اسم المستفيد",
      EnterBankName: "أدخل  اسم البنك",
      EnterBranchName: "أدخل  اسم الفرع",
      EnterAccountNumber: "أدخل  رقم الحساب",
      EnterIBANNumber: "IBAN أدخل رقم",
      EnterSwiftCode: "أدخل رمز سويفت",
      EnterTaxRegistrationNumber: "أدخل رقم التسجيل الضريبي",
      TypeDescriptionAboutItem: "...اكتب تعليقك هنا",
      SelectReason: "اختر سببا",
      EnterCurrentPassword: "أدخل كلمة المرور الحالية",
      EnterNewPassword: "أدخل كلمة السر",
      ConfirmYourPassword: "قم بتأكيد كلمة المرور الجديدة الخاصة بك",
      SearchTheHelpCenter: "ابحث في مركز المساعدة",
      EnterOrderTrackingNumber: "أدخل رقم تتبع الطلب",
      SearchVendors: "البحث عن البائعين",
      All: "جميع",
      VerificationCode: "شيفرة التأكيد", // v2
      SearchBrand: "بحث عن المادرکه", // v2
      EnterYourNewPassword: "أدخل كلمة المرور الجديدة", // v2
      Code: "code",
      EnterNationalCode: "أدخل رقم الهوية الوطنية",
      PleaseSelectProvince: "الرجاء اختيار المحافظة",
      ClickToSelectDate: "انقر لتحديد التاريخ",
      MonthMM: "MM",
      YearYY: "YY",
    },
    SearchDialog: {
      RecentSearches: "عمليات البحث الأخيرة"
    },
    Common: {
      WhatAreYouLookingFor: "عما تبحث؟",
      CopyRight: "© 2020 اجیال جميع الحقوق محفوظة",
      SubmitEmail: "إرسال البريد الإلكتروني",
      CreateAnAccount: "إنشاء حساب",
      ClearAll: "مسح الكل",
      // In: "in",
      In: (styleInText = {}, styleAfterInText = {}, text) => {
        return (<><Text style={styleInText}>{'\u00A0'}في{'\u00A0'}</Text><Text style={styleAfterInText}>{text}</Text></>
        )
      },
      NoResultsFound: "لم نعثر على ما تبحث عنه",
      TryWithDifferentWords: "تابع البحث فلدينا الكثير من المنتجات الأخرى التي ستعجبك!",
      Clear: "مسح الكل",
      SeeAll: "إظهار الكل",
      Brands: "الماركات",
      Apply: "تفعيل",
      Filters: "فلتر",
      Category: "الفئة",
      Price: "السعر",
      To: "إلى",
      ViewAll: "عرض الكل",
      Selectdots: "تحديد ...",
      NothingFound: "لم يتم العثور على شيء",
      Currency: "العملة",
      SelectCurrency: "اختيار العملة",
      DeliveryLocation: "مكان التوصيل",
      SearchCities: "بحث عن مدينة",
      PlusCountproduct: (count) => {
        return "+ " + count + " منتج"
      },
      Cart: "عربة التسوق", // new
      Wishlist: "قائمتي المفصلة", // new
      Phone: "رقم التليفون", // new,
      NotVerified: "لم يتم التحقق", // new
      Save: "حفظ",
      Continue: "استمرار", // new,
      ResendNow: "إعادة إرسال الآن", //new
      Skip: "تخطى", // new
      Cancel: "إلغاء", // new
      Reason: "السبب", // new
      Close: "أغلق", // new
      Processing: "معالجة", // new
      PlacedOn: (text = "") => { // v2
        return '\u00A0تاريخ النشر\u00A0' + text
      },
      OnText: (text = "") => { // v2
        return '\u00A0فيفي\u00A0' + text
      },
      Review: "تقييم واحد", // new
      Yes: "نعم", // new
      No: "لا", // new
      Next: "التالي", // new
      BrowseYourFile: "تصفح ملفك", // new
      TakePhoto: "التقاط صورة", // new
      ChooseFromGallery: "اختر مع المعرض", // new
      Submit: "إرسال",
      BackToHome: "العودة إلى المنزل",
      SubmitRequest: "تقديم الطلب",
      Reset: "إعادة ضبط",
      SinceDate: (style, date) => {
        return (<>منذ  <Text style={style}>{date} </Text></>
        )
      },
      Verify: "تحقق", // v2
      Unavailable: "غير متوفره", // v2
      NumberItems: (count) => { // v2
        return count + " عناصر"
      },
      More: "اظهار الكل",
      ProductsSold: (count) => { // v2
        return count + " بيع المنتجات"
      },
      TermsCondition: "الشروط والأحكام",
      ReviewsCap: "تقييم واحد",
      Delete: "حذف",
      CountryCode: "رمز الدولة",
      Download: "Download",
      DownloadNewVersionDirectly: "Download new version directly", // download directly no work
      VatCap: "ضريبة القيمة المضافة  (VAT)",
      DownloadingWithDots: "جاري التحميل...",
      Confirm: "تأكيد",
      PickADate: "اختر تاريخاً",
      PleaseSelect: "الرجاء تحديد",
      Signout: "تسجيل الخروج",
      AreYourSure: "هل أنت متأكد؟",
      YesSignout: "نعم، تسجيل الخروج",
      FeaturedCategories: "الأكثر شهرة",
      BackToTop: "العودة الى الأعلى"
    },
    InputValidates: {
      ThisFieldIsRequired: "هذه الخانة مطلوبة",
      EmailIncorrect: "البريد الإلكتروني غير صحيح",
      PasswordNotMatch: "كلمة المرور غير صالحة",
      MustBeAtLeastCharacter: (min) => {
        return "يجب أن لا تقل كلمة المرور عن " + min + " أحرف"
      },
      PhoneNumberIsIncorrect: "رقم الهاتف المحمول غير صحيح",
      MustAtLeastLength: (min) => {
        return "يجب أن لا يقل طوله عن " + min;
      },
      MaxCharacterLengthIs: (val) => {
        return " أقصى عدد للأحرف المسموحة" + val;
      },
      UploadFileRequired: "تحميل (هذا الملف مطلوب)", // new
      PasswordNotMatchSame: "يجب أن تتطابق كلمة المرور"
    },
    Cart: {
      YourShoppingCartEmpty: "عربة التسوق خالية",
      WhatAreYouWaitingFor: "ماذا تنتظر؟ ابدأ التسوق!",
      RemoveFromList: "حذف",
      MoveToWishlist: "إضافة إلى منتجاتك المفضلة",
      Quantity: "الكمية",
      OrderSummary: "ملخص الطلبية",
      Subtotal: "المجموع الفرعي",
      NumberItems: (number) => {
        return number + " عناصر"
      },
      Shipping: "الشحن",
      Free: "مجاناً",
      Discount: "خصم",
      Total: "المجموع",
      InclusiveOfVAT: "تتضمن الـ VAT",
      Apply: "تفعيل",
      Coupon: "قسيمة",
      CheckoutNow: "إتمام الشراء الآن",
      YourWishListEmpty: "قائمة أمنياتك تبدو فارغة",
      PleaseSignInFirstToSeeYourWishlist: "يجب عليك تسجيل الدخول لمشاهدة قائمة الرغبات الخاصة بك",

      MoveToCart: "إضافة إلى عربة التسوق", // new
      ThisItemCannotBeShipped: "لا يمكن شحن هذا المنتج إلى موقع التسليم المحدد، الرجاء اختيار موقع آخر.", // v2
    },
    SortTypes: { // new
      MostView: "الأكثر مشاهدة",
      MostLiked: "الأكثر إعجابًا",
      Expensive: "مكلفة",
      Cheapest: "أرخص",
      MostSeller: "معظم البائعين",
      New: "جدید",
      MostDiscount: "معظم الخصم"
    },
    Address: {
      Addresses: "العناوين",
      SetAsDefault: "تعيين كافتراضي",
      PrimaryAddress: "العنوان الرئيسي",
      EditAddress: "تعديل العنوان",
      Delete: "حذف العنوان",
      WhereAreYourSavedAddresses: "فين العناوين المحفوظة؟",
      AddAnAddressGetCrackingDelivery: "!عنوانك بقى عشان نعرف نوصلك الطلب",
      AddAnAddress: "إضافة عنوان جديد",
      AddAddress: "أضف عنوان",
      SetAsDefaultAaddress: "تعيين كعنوان افتراضي",
      City: "مدينة",
      SubmitVerifyPhone: "إرسال الرمز",
      PleaseVerifyMobileNumberToContinue: "لازم تأكد رقم موبايلك عشان نكمّل",
      ToProceedToCheckoutOTPVerifyMobileNumber: "عشان نكمّل لإتمام الشراء، استخدم رمز OTP وأكد رقم موبايلك. بعتنا رمز OTP إلى",
      ChangePhoneNumber: "تغيير الرقم",
      DidNotReceiveOTP: "لم يصلك رمز OTP",
      TheAddressShouldBeSelected: "يجب تحديد العنوان",
      SetFromMap: "تعيين من الخريطة",
      TheAddressSelectedIsNoOfActiveCountries: "العنوان الذي حددته غير موجود في قائمة البلدان النشطة لدينا",
      ChangeNumber: "غير رقم الهاتف",
      PleaseEnterMobileNumberSendNewOTP: "اكتب رقم موبايلك الجديد وهنبعتلك رمز OTP جديد.",
      SearchForYourLocation: "بحث عن موقعك",
      EditAddressCap: 'تعديل العنوان'
    },
    Payment: { // new
      ShippingAddress: "عنوان الشحن",
      Payment: "الدفع",
      ShipTo: "الشحن الی",
      PayWithCash: "الدفع نقدا",
      PayWithCashDescription: (style) => { // not used
        return (<>
          Please note there is a non-refundable fee of SAR 17.00 for our cash on delivery service. To save on this amount please <Text style={style}> proceed debit/ credit card.</Text>
        </>
        )
      },
      PayWithCard: "الدفع بالبطاقه",
      YourOrder: "قائمتي المفضلة",
      PlaceOrder: "تاکید الطلبیه",
      PleaseSelectPaymentMethodFirst: "الرجاء تحديد طريقة الدفع أولاً",
      ThankYouForYourOrder: (name, family) => {
        return ' شكرا لك على طلبك يا ' + name + ' ' + family + '!'
      },
      YouWillReceiveAnEmailAt: (style, email) => {
        return (<>ستتلقى بريدًا إلكترونيًا على <Text style={style}>{email} </Text>بمجرد تأكيد طلبك.</>
        )
      },
      BackToOrder: "رجوع إلى الطلب",
      OrderWithTracking: (orderTracking) => {
        return "الطلبية " + orderTracking
      },
      GoToOrderDetail: "انتقل إلى تفاصيل الطلب",
      PleaseSelectAddressFirst: "الرجاء تحديد عنوان أولا", // v2
      YouMustVerifyMobileFirst: "يجب عليك التحقق من رقم الهاتف المحمول الخاص بالعنوان المحدد أولاً",
      InOrderToCompleteYourTransaction: "لإتمام معاملتك ، سنقوم بتحويلك إلى صفحة الدفع",
      CompletePayment: "الدفع",
      YourPurchaseEncounteredError: "واجهت عملية الدفع خطأ"
    },
    Order: { // new
      Orders: "الطلبيات",
      YouDontHaveAnyOrdersYet: "ليس لديك أي طلبات حتى الآن",
      WhatAreYouWaitingForStartShopping: "قم باختيار المنتجات التي تعجبك",
      ContinueShopping: "أكمل التسوق",
      OrderCapWithTrackingCode: (orderTracking) => {
        return 'الطلبية ' + orderTracking
      },
      OrderDetail: "تفاصيل الطلب",
      CancelItemsFromThisOrder: "إلغاء العناصر من هذا الطلب",
      PaymentMethod: "طريقة الدفع او السداد",
      RateProduct: "قيم المنتج",
      SubmitReview: "إرسال المراجعة",
      PleaseRateProduct: "يرجى تقييم هذا المنتج",
      Pros: "الايجابيات",
      Cons: "سلبيات",
      CreditCard: (paymentTitle) => "بطاقة الإئتمان" + " (" + paymentTitle + ") ", // v2
      YouAlreadyReviewed: "لقد قمت فعلاً بالمراجعة"
    },
    Preference: { // new
      Preference: "تفضيلات",
      SelectYourDefaultRefundMethod: "اختر طريقة إسترداد المبلغ التلقائية عند الإلغاء أو الإسترجاع",
      WalletRefund: "إرجاع قيمة المنتجات إلى المحفظة",
      WalletRefundDescription: "ستضاف قيمة المنتجات المسترجعة أو الملغاة لمحفظتك",
      CardRefund: "إرجاع قيمة المنتجات إلى البطاقة",
      CardRefundDescription: "إذا دفعت نقدًا أو استخدمت رصيد نون لتكملة عملية الدفع بجانب البطاقة ستضاف قيمة المنتجات المسترجعة أو الملغاة لمحفظتك",
    },
    Credits: { // new 
      Credits: "محفظة أجيال",
      AvailableBalance: "الرصید المتوفر",
      YouDoNotHaveAnyAjyaCreditsYet: "!ليس لديك أي رصيد من اجیال بعد",
      Balance: "الرصید"
    },
    CreateStore: { // new // create store redirecet to web so this translates not used
      SellWithUs: "البيع معنا",
      Login: "تسجيل الدخول",
      Country: "البلد",
      Store: "المتجر",
      Document: "المستند",
      Bank: "البنك",
      Vat: "ضريبة القيمة المضافة",
      WhereIsYourBusiness: "أين يقع محلك التجاري؟",
      ChooseCountry: "اختر الدولة",
      ChooseCity: "اختر مدينة",
      Person: "شخص",
      Legal: "سجل تجاري",
      Natural: "فرد",
      SelectAddressFromMap: "حدد العنوان من الخريطة",
      LocationSelected: "الموقع المحدد",
      DocumentVerification: "التحقق من المستند",
      UploadWithTitle: (txt) => {
        return ' تحميل الهوية الوطنية ' + txt
      },
      Dollar: "دولار أميركي",
      Dinar: "دينار بحريني",
      BankDetails: "تفاصيل البنك الخاص بك",
      VATDetails: "تفاصيل ضريبة القيمة المضافة",
      AgreedText: "I acknowledge and agree that ajyal will be raising and facilitating VAT invoices and credit notes on behalf of my company in relation to consumer transactions on the ajyal site",
      CreatingYourStore: "Creating Your Store",
      TheLatestWorkIsUnderway: "The latest work is underway",
      Register: "تسجيل الدخول", // v2
      AccountInformation: "Account Information",
      TheSelectedCountry: "يجب أن تكون الدولة المحددة هي نفس الدولة التي حددتها في الخطوة الثانية",
      ChangeRegisterData: "تغيير بيانات التسجيل",
      ChooseProvince: "اختر المقاطعة",
    },
    AfterCreateStore: {
      ThankYou: "!شكراً",
      YourStoreHasBeenCreated: "Your store has been created",
      PleaseAllowUsToCheck: "Please allow us to check the documents within 48 hours, then we will allow you to sell and display the products in your store. You can proceed to adjust your store settings.",
      IfYouHaveAnyConcerns: (style, email) => {
        return (<>If you have any concerns regarding the creation of your account please do not hesitate to contact us on <Text style={style}>{email}</Text></>
        )
      },
    },
    Returns: {
      WeDontSeeAnyReturnsRequested: ".لا يوجد أي منتجات مطلوب إرجاعها",
      NeedSubmitRequest: "!تحتاج إلى تقديم طلب؟",
      JustClickButton: "!فقط اضغط على الزر أدناه",
      FileRequest: "إنشاء طلب إرجاع جديد",
      ReturnCapWithTrackingCode: (orderTracking) => {
        return ' إرجاع ' + orderTracking
      },
      RefundMethod: "طریقه الاسترداد",
      WeDontSeeReturnsDelivered: "لا توجد منتجات لتسليمها",
      NeedSubmitRequest: "تحتاج إلى تقديم طلب؟",
      SelectItemsForReturn: "حدد المنتح للارجاع",
      ReturnsRequest: "طلبات الإرجاع المقدمة",
      SelectItems: "اختيار العناصر",
      ChooseRequestType: "هل السلعة كما وصفها البائع؟",
      FileANewReturnRequest: "إنشاء طلب إرجاع جديد",
      ReturnsRequested: "طلبات الإرجاع المقدمة",
      ReturnsDelivered: "طلبات الإرجاع المستلمة",
      PickupAddress: "عنوان الاستلام"
    },
    Language: {
      Arabic: "العربية",
      English: "English"
    },
    HelpCenter: { // new
      HelpCenter: "مركز المساعدة",
      ArticlesCount: (count) => {
        return count + ' مقالة'
      },
      Article: "مقال",
      WasArticleHelpful: "هل كان المقال مساعدا",
      ArticlesInThisSection: "مقالات في هذا القسم",
      HowCanWeHelp: "كيف يمكن أن نساعد",
      SearchTheHelpCenter: "ابحث في مركز المساعدة"
    },
    OrderTracking: { // new
      OrderTracking: "تتبع الطلب",
      TrackYourOrdersDetailsMoreInformation: "تتبع طلباتك للحصول على التفاصيل ومزيد من المعلومات",
      Tracking: "تتبع"
    },
    ShopList: { // new
      VisitStore: "قم بزيارة المعرض او المتجر"
    },
    ShopListSortTypes: { // new
      MostPopular: "الأكثر شعبية",
      MostRecent: "الأحدث",
      MostReviewed: "الأكثر مراجعة",
    },
    Cancel: {
      SelectReasonRequired: "تحديد سبب مطلوب",
      SelectItemsForCancellation: "حدد المنتجات المراد الغائها",
      ClickHereChangeDefaultRefundMethod: "اضغط هنا لتغییر طریقة ارجاع قیمة المشتریات",
      OnlyAppliesToPrepaidAmounts: "تنطبق فقط على المبالغ المدفوعة مسبقًا وتستغرق ما يصل إلى 7-14 يوم عمل لتصل إلى بطاقتك. سيتم رد المدفوعات النقدية في محفظة أجيال الخاصة بك في الموقع",
      CancelItemsWithCount: (count) => `إلغاء ${count} منتج`,
      BackToOrder: "رجوع إلى الطلبية",
      ThisItemSuccessfullyRemovedFromYourOrder: "تمت إزالة هذا المنتج من الطلبية بنجاح",
      RemovedItems: "العناصر المحذوفة"
    }
  },
});
