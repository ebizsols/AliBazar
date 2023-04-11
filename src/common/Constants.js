import Languages from "./Languages";
import { Dimensions } from "react-native";

const Constants = {
    GoogleMapApiKey: "AIzaSyDA1IUurSPV52x4PbyUM3aeVA3AAIEtAwo",
    FilePathes: {
        SLIDER: "/Uploads/Images/Slider/",
        MODULECOLLECTIONS: "/Uploads/Images/ModuleCollections/",
        GOODS: "/Uploads/Images/Goods/",
        CATEGORY: "/Uploads/Images/Category/",
        FLAG: "/assets/flags/",
        LOGOFOLDER: "Uploads/Images/Logo/",
        TOPICICON: "Uploads/Images/Topic/",
        SHOP: "Uploads/Images/Shop/",
        PAYMENTLOG: "Uploads/Images/PaymentLogo",
        DOWNLOADLYFILES: "/Uploads/Private/File",
        SHIPPINGMETHOD: "/Uploads/Images/ShippingMethod"
    },
    StorageKeys: {
        SearchDialogItems: "@recent_searches",
        TokenAndCurrencyAndLanguageAndCartId: "@app_data_store",
        TokenAndCurrencyAndLanguageAndCartIdObject: {
            token: null,
            currency: null,
            cartId: null,
            language: null
        },
        NotificationKeyDataKey: "@notification_data",
        NotificationKeyDataObject: {
            notificationKey: null
        }
    },

    SearchScreenTypes: {
        Slider: 1,
        Category: 2,
        Module: 3,
        Search: 4,
        Deals: 5,
    },

    SearchScreenSortType: [
        {
            title: Languages.SortTypes.MostView,
            id: 1
        },
        {
            title: Languages.SortTypes.MostLiked,
            id: 2
        },
        {
            title: Languages.SortTypes.Expensive,
            id: 3
        },
        {
            title: Languages.SortTypes.Cheapest,
            id: 4
        },
        {
            title: Languages.SortTypes.MostSeller,
            id: 5
        },
        {
            title: Languages.SortTypes.New,
            id: 6
        },
        {
            title: Languages.SortTypes.MostDiscount,
            id: 7
        }
    ],
    PossibleLangAndCur: {
        langs: {
            english: { code: "en", name: "En" },
            arabic: { code: "ar", name: "Ar" },
        },
        currencies: {
            dollar: { code: "usd", name: "USD" },
            arabic: { code: "bhd", name: "BHD" },
        },
    },
    CaptchaToken: "6Lfh-usZAAAAAAna-cdhTEWUjnCJHBloInsYneBN",
    SplashConstants: {
        splashTimeout: 2000,
        defaultLanguage: 'en'
    },
    NotificationTopics: {
        CLIENT_MOBILE: "client-mobile",
        CLIENT_MOBILE_ANDROID: "client-mobile-android",
        CLIENT_MOBILE_IOS: "client-mobile-ios",
        CLIENT_MOBILE_LOGGEDIN: "client-mobile-loggedin",
        CLIENT_MOBILE__NOT_LOGGEDIN: "client-mobile-not-loggedin",
        CLIENT_WEB: "client-web",
        CLIENT_WEB_LOGGEDIN: "client-web-loggedin",
        CLIENT_WEB_NOT_LOGGEDIN: "client-web-not-loggedin",
        PROVIDER_PANEL: "provider-panel"
    },
    ShippingMethods: {
        MARKET: 1,
        AJYAL: 2,
        UBEX: 3,
        DHL: 4,
        ARAMEX: 5,
        EXPRESS: 6,
        NOT_POSSIBL: 7
    },
    QuantitySelectMax: 10,
    HtmlWebviewRenderComponentTypes: {
        Goods: "goods",
        Article: "article",
        StoreTerms: "storeTerms",
        AfterCreateStore: "afterCreateStore",
        Content: "content"
    },
};

export default Constants;
