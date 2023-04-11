import axiosClient from "./../axios";

const clientUserActivity = {
  likeGoods: async (goodsId) => {

    const axios = axiosClient.getAxios();

    return axios.post('/UserActivity/LikeGoods/' + goodsId);
  },
  deleteAddress: async (addressId) => {

    const axios = axiosClient.getAxios();

    return axios.delete('/UserActivity/Address/' + addressId);
  },
  editCustomerAddress: async (addressId, fkCityId, fkProvinceId, fkCountryId, address, isDefualt,
    locationX, locationY, postalCode, transfereeFamily, transfereeMobile, transfereeName, flatNumber, streetNumber, direction) => {
    const axios = axiosClient.getAxios();
    const model = {
      addressId: addressId,
      fkCityId: fkCityId,
      fkProvinceId: fkProvinceId,
      fkCountryId: fkCountryId,
      address: address,
      isDefualt: isDefualt,
      locationX: locationX,
      locationY: locationY,
      postalCode: postalCode,
      transfereeFamily: transfereeFamily,
      transfereeMobile: transfereeMobile,
      transfereeName: transfereeName,
      flatNumber, streetNumber, direction
    };
    console.log(model);
    return axios.put('/UserActivity/Address', model);
  },
  getAddresses: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/UserActivity/Address');
  },
  getCustomerGoodsComment: async (goodsId, orderItemId) => {
    const axios = axiosClient.getAxios();
    return axios.get('/UserActivity/CustomerGoodsComment/' + goodsId + '/' + orderItemId);
  },
  checkShopEmail: async (email, mobileNumber, checkMobileNumber = true) => {
    const axios = axiosClient.getAxios();
    const model = { email: email, mobileNumber: mobileNumber, checkMobileNumber: checkMobileNumber }
    return axios.get('/UserActivity/CheckShopEmail', { params: model });
  },
  registerProvider: async (formData, cancelToken, onUploadProgress) => {
    const axios = axiosClient.getAxios();
    return axios.post(`/UserActivity/RegisterProvider`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      cancelToken: cancelToken.token,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onUploadProgress) {
          onUploadProgress(percentCompleted);
        }
      }
    });
  },
  callRequestGoods: async (goodsId, providerId) => {
    const axios = axiosClient.getAxios();
    return axios.post('/UserActivity/CallRequestGoods/' + goodsId + '/' + providerId);
  },
  addCustomerGoodsComment: async (model) => {
    const axios = axiosClient.getAxios();
    return axios.post('/UserActivity/CustomerGoodsComment', model);
  },
  viewGoods: async (goodsId) => {
    const axios = axiosClient.getAxios();
    return axios.post('/UserActivity/ViewGoods/' + goodsId);
  },
  verifyProviderMobileNumber: async (mobileNumber, code, requestId = true) => {
    const axios = axiosClient.getAxios();
    const model = { mobileNumber: mobileNumber, code: code, requestId: requestId }
    return axios.get('/UserActivity/VerifyProviderMobileNumber', { params: model });
  },
  checkAddressArea: async (lat, lng) => {
    const axios = axiosClient.getAxios();
    const model = { lat: lat, long: lng }
    return axios.get('/UserActivity/CheckAddressArea', { params: model });
  },
  addAddressCard: async (address, locationX, locationY, postalCode, transfereeFamily, transfereeMobile, transfereeName, mobileVerifed = false, flat,
    streetNumber,
    direction) => {
    const axios = axiosClient.getAxios();
    const model = { address: address, locationX: locationX, locationY: locationY, postalCode: postalCode, transfereeFamily: transfereeFamily, transfereeMobile: transfereeMobile, transfereeName: transfereeName, mobileVerifed: mobileVerifed, flat, streetNumber, direction };
    console.log(model);
    return axios.post('/UserActivity/AddressCard', model);
  },
  editAddressOrder: async (address, locationX, locationY, postalCode, transfereeFamily, transfereeMobile, transfereeName, addressId, mobileVerifed = false, flatNumber,
    streetNumber,
    direction) => {
    const axios = axiosClient.getAxios();
    const model = {
      address: address,
      locationX: locationX,
      locationY: locationY,
      postalCode: postalCode,
      transfereeFamily: transfereeFamily,
      transfereeMobile: transfereeMobile,
      transfereeName: transfereeName,
      mobileVerifed: mobileVerifed,
      addressId: addressId,
      flatNumber,
      streetNumber,
      direction
    };
    console.log(model);
    return axios.put('/UserActivity/AddressOrder', model);
  },
};

export default clientUserActivity;


