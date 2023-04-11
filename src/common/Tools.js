import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();
import { Dimensions, Linking, Alert, Platform } from 'react-native';
const win = Dimensions.get('window');
import { Languages, Constants, AppConfig } from "common";
// import ImageResizer from 'react-native-image-resizer';
import moment from "moment";
// import axiosClient from 'api/axios';

export default class Tools {
  static formatPhoneNumber(phoneNumber, countryCode) {
    if (!phoneNumber)
      return

    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
      return phoneUtil.formatOutOfCountryCallingNumber(number, PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
      return phoneNumber;
    }

  };

  static getMonthName(dt) {
    const currentLang = Languages.getLanguage();

    mlist = Constants.DateTime.months[currentLang];
    return mlist[dt.getMonth()];
  };

  static isValidPhoneNumber(phoneNumber, countryCode) {
    let number = null;
    console.log(phoneNumber);
    if (!phoneNumber)
      return;
    try {
      number = phoneUtil.parse(phoneNumber, countryCode);
      console.log('success in try');
      const result = phoneUtil.isValidNumberForRegion(number, countryCode);
      console.log(result);
      return result;
    } catch (error) {
      console.log('error in catch', error);
      console.log('errr', error);
      return false;
    }
  };

  static getDayName(dt) {
    const currentLang = Languages.getLanguage();

    var days = Constants.DateTime.weekDaysFull[currentLang];
    var dayName = days[dt.getDay()];
    return dayName;
  };

  static getDateTimeString(dt) {
    let formatedDepartureDate = '';
    let formatedDepartureTime = '';

    formatedDepartureDate += dt.getFullYear();
    formatedDepartureDate += '-' + ((dt.getMonth() + 1) < 10 ? '0' : '') + (dt.getMonth() + 1);
    formatedDepartureDate += '-' + (dt.getDate() < 10 ? '0' : '') + dt.getDate();
    formatedDepartureTime += ((dt.getHours()) < 10 ? '0' : '') + (dt.getHours()) + ':' +
      ((dt.getMinutes()) < 10 ? '0' : '') + (dt.getMinutes()) + ':' + ((dt.getSeconds()) < 10 ? '0' : '') + (dt.getSeconds());

    return formatedDepartureDate + ' ' + formatedDepartureTime;
  };

  static getDateString(dt) {
    let formatedDepartureDate = '';

    formatedDepartureDate += dt.getFullYear();
    formatedDepartureDate += '.' + ((dt.getMonth() + 1) < 10 ? '0' : '') + (dt.getMonth() + 1);
    formatedDepartureDate += '.' + (dt.getDate() < 10 ? '0' : '') + dt.getDate();

    return formatedDepartureDate;
  };

  static getTimeString(dt) {
    let formatedDepartureTime = '';

    formatedDepartureTime += ((dt.getHours()) < 10 ? '0' : '') + (dt.getHours()) + ':' +
      ((dt.getMinutes()) < 10 ? '0' : '') + (dt.getMinutes());

    return formatedDepartureTime;
  };

  static getImageHeight(targetWidth, imageRealWidth, imageRealHeight) {
    const ratio = targetWidth / imageRealWidth;
    const height = imageRealHeight * ratio;
    return height;
  };

  static convertArrayToChunk(array = [], paramChunk = 2) {
    let i, j, temparray, chunk = paramChunk;
    let tArray = []
    for (i = 0, j = array.length; i < j; i += chunk) {
      temparray = array.slice(i, i + chunk);
      tArray.push(temparray);
      // do whatever
    }
    return tArray
  };

  static roundDecimalNumber(number) {
    if (number == 0)
      return 0;
    if (number < 10) {
      if (number < 5) {
        return number
      } else {
        return 5;
      }
    }
    if (number < 100) {
      let tempNumber = number / 10;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 10;
      return tempNumber;
    }
    if (number < 1000) {
      let tempNumber = number / 100;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 100;
      return tempNumber;
    }
    if (number < 10000) {
      let tempNumber = number / 100;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 100;
      return tempNumber;
    }
    if (number < 100000) {
      let tempNumber = number / 100;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 100;
      return tempNumber;
    }
    if (number < 1000000) {
      let tempNumber = number / 1000;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 1000;
      return tempNumber;
    }
    if (number < 1000000) {
      let tempNumber = number / 1000;
      tempNumber = parseInt(tempNumber);
      tempNumber = tempNumber * 1000;
      return tempNumber;
    }
    return number;
  };

  static callNumber = (phoneNumber) => {
    console.log('callNumber ----> ', phoneNumber);
    console.log('phoneNumber ----> ', phoneNumber);
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    else {
      phoneNumber = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          // Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  static getSortTypes = () => {
    return [
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
    ];
  };

  static getStoreListSortTypes = () => {
    return [
      {
        title: Languages.ShopListSortTypes.MostPopular,
        id: 0
      },
      {
        title: Languages.ShopListSortTypes.MostRecent,
        id: 1
      },
      {
        title: Languages.ShopListSortTypes.MostReviewed,
        id: 2
      }
    ];
  };

  // static reduceImageSize = (fileData, rotation = 0) => {
  //   let quality = 90;
  //   if ((fileData.fileSize / 1000000) > 2.5) {
  //     quality = 60;
  //   }
  //   if ((fileData.fileSize / 1000000) < 1) {
  //     quality = 100;
  //   }

  //   console.log('********************* with Quality: ', quality);
  //   return ImageResizer.createResizedImage(fileData.uri, fileData.width,
  //     fileData.height,
  //     'JPEG', quality, rotation);
  //   // .then(responses => {
  //   //   // carModel.ownershipPhotoFront = responses;
  //   //   console.log('New resize File size: ', responses.size / 1000000 + ' MB');
  //   //   // navigation.navigate('ShowPhotoScreen', { source: responses, carModel: carModel, nextScreen: 'UploadOwnershipPhotoBackScreen' });
  //   //   // response.uri is the URI of the new image that can now be displayed, uploaded...
  //   //   // response.path is the path of the new image
  //   //   // response.name is the name of the new image with the extension
  //   //   // response.size is the size of the new image
  //   //   return responses;
  //   // })
  //   // .catch(err => {
  //   //   // Oops, something went wrong. Check that the filename is correct and
  //   //   //
  //   //   console.log(err);
  //   //   return null;
  //   // })
  // };

  static getStringDateFormat = (dateTimeString) => {
    let dateTimeString2 = dateTimeString.replace(/[a-z]/gi, ' ');
    const lastIndexOfDot = dateTimeString2.lastIndexOf('.');
    if (lastIndexOfDot != -1) {
      dateTimeString2 = dateTimeString2.substring(0, lastIndexOfDot);
    }
    let formatedDate = moment(dateTimeString2).format('DD.MM.YY');
    return formatedDate;
    // return '';
  };

  static getStringTimeFormat = (dateTimeString) => {
    let dateTimeString2 = dateTimeString.replace(/[a-z]/gi, ' ');
    const lastIndexOfDot = dateTimeString2.lastIndexOf('.');
    if (lastIndexOfDot != -1) {
      dateTimeString2 = dateTimeString2.substring(0, lastIndexOfDot);
    }

    let formatedTime = moment(dateTimeString2).format('HH:mm');
    return formatedTime;
    // return '';
  };

  static formatMoney = (
    amount,
    decimalCount = 2,
    decimal = ".",
    thousands = ","
  ) => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  };

  static getGeocodeLocationData(result) {

    try {

      let country = null, countryCode = null, city = null, cityAlt = null, address = null, address2 = null;

      if (result[0])
        address = result[0].formatted_address
      if (result[1])
        address2 = result[1].formatted_address

      const resultLength = result.length;
      for (let index = 0; index < resultLength; index++) {
        const address_components = result[index];
        const addressComponentsLength = address_components.address_components.length;
        for (let index2 = 0; index2 < addressComponentsLength; index2++) {
          const address_component = address_components.address_components[index2];

          if (!city && address_component.types.includes('locality')) {
            console.log('City finded', address_component.long_name);
            city = address_component.long_name;
          }

          if (!city && !cityAlt && (address_component.types.includes('administrative_area_level_1') || address_component.types.includes('administrative_area_level_2'))) {
            console.log('cityAlt finded', address_component.long_name);

            cityAlt = address_component.long_name;
          }
          if (!country && address_component.types.includes('country')) {
            console.log('country finded', address_component.long_name);
            country = address_component.long_name;
            countryCode = address_component.short_name;
          }

          if ((city || cityAlt) && country) {
            console.log('In 2 for');
            console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
            return {
              city: city,
              cityAlt: cityAlt,
              country: country,
              countryCode: countryCode,
              address: address,
              address2: address2
            }
          }

        }

        // if ((city || cityAlt) && country) {
        //   return {
        //     city: city,
        //     cityAlt: cityAlt,
        //     country: country,
        //     countryCode: countryCode
        //   }
        // } else {
        //   return {
        //     city: city,
        //     cityAlt: cityAlt,
        //     country: country,
        //     countryCode: countryCode
        //   }
        // }
      }

      console.log('Outer');
      console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
      return {
        city: city,
        cityAlt: cityAlt,
        country: country,
        countryCode: countryCode,
        address: address,
        address2: address2
      }

    } catch (error) {
      console.log('Erorr in getcityname catch: ', error);

      return {
        city: null,
        cityAlt: null,
        country: null,
        countryCode: null,
        address: null,
        address2: null
      }
    }
  }

  static getGooglePlaceData(result) {

    try {

      let country = null, countryCode = null, city = null, cityAlt = null, address = null, address2 = null;

      if (result.address)
        address = result.address

      const resultLength = result.addressComponents.length;
      for (let index = 0; index < resultLength; index++) {
        const address_component = result.addressComponents[index];

        if (!city && address_component.types.includes('locality')) {
          console.log('City finded', address_component.name);
          city = address_component.name;
        }

        if (!city && !cityAlt && (address_component.types.includes('administrative_area_level_1') || address_component.types.includes('administrative_area_level_2'))) {
          console.log('cityAlt finded', address_component.name);

          cityAlt = address_component.name;
        }
        if (!country && address_component.types.includes('country')) {
          console.log('country finded', address_component.name);
          country = address_component.name;
          countryCode = address_component.shortName;
        }

        if ((city || cityAlt) && country) {
          console.log('In 2 for');
          console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
          return {
            city: city,
            cityAlt: cityAlt,
            country: country,
            countryCode: countryCode,
            address: address,
            address2: address2
          }
        }
      }

      console.log('Outer');
      console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
      return {
        city: city,
        cityAlt: cityAlt,
        country: country,
        countryCode: countryCode,
        address: address,
        address2: address2
      }

    } catch (error) {
      console.log('Erorr in getcityname catch: ', error);

      return {
        city: null,
        cityAlt: null,
        country: null,
        countryCode: null,
        address: null,
        address2: null
      }
    }
  };
  static formatDateTypeOne(date) {
    let str = '';
    str = moment(date).format("MMM MM[,]YYYY");
    return str;
  };
  static formatDateTypeNormal(date) {
    let str = '';
    str = moment(date).format("D[/]MM[/]YYYY");
    return str;
  };
  static getExpressIconPath() {
    const currentLang = Languages.getLanguage();

    if (currentLang == Constants.PossibleLangAndCur.langs.english.code) {
      const iconPath = AppConfig.ApiConfig.baseUrl + 'Uploads/Images/MarketImage/express.png';
      return iconPath;
    } else {
      const iconPath = AppConfig.ApiConfig.baseUrl + 'Uploads/Images/MarketImage/express-ar.png';
      return iconPath;
    }
  };
  static getMarketPlaceIconPath() {
    const currentLang = Languages.getLanguage();

    if (currentLang == Constants.PossibleLangAndCur.langs.english.code) {
      const iconPath = AppConfig.ApiConfig.baseUrl + 'Uploads/Images/MarketImage/marketplace.png';
      return iconPath;
    } else {
      const iconPath = AppConfig.ApiConfig.baseUrl + 'Uploads/Images/MarketImage/marketplace-ar.png';
      return iconPath;
    }
  };
}