import axiosClient from "./../axios";

const clientProfile = {
  getCustomerProfileHeader: async () => {

    const axios = axiosClient.getAxios();
    return axios.get('/Profile/GetCustomerProfileHeader');
  },
  getCustomerDetailsProfile: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/CustomerDetailsProfile');
  },
  getAddress: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/Address');
  },
  editCustomerProfile: async (name, family, userName, nationalCode, birthDate, fkCityId, fkCountryId, fkProvinceId) => {
    const axios = axiosClient.getAxios();
    const model = {
      name: name, family: family, userName: userName, fkCityId: fkCityId,
      fkCountryId: fkCountryId, fkProvinceId: fkProvinceId, nationalCode: nationalCode,
      birthDate: birthDate
    }
    console.log(model);
    return axios.put('/Profile/EditCustomerProfile', model);
  },
  getCustomerBankCards: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Profile/GetCustomerBankCards');
  },
  removeCustomerBankCard: async (bankCardId) => {
    const axios = axiosClient.getAxios();

    return axios.delete('/Profile/RemoveCustomerBankCard/' + bankCardId);
  },
  addCustomerAddress: async (fkCityId, fkProvinceId, fkCountryId, address, isDefualt,
    locationX, locationY, postalCode, transfereeFamily, transfereeMobile, transfereeName, flatNumber, streetNumber, direction) => {
    const axios = axiosClient.getAxios();
    const model = {
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
    return axios.post('/Profile/AddCustomerAddress', model);
  },
  verifyMobileNumberAddress: async (addressId, code, requestId) => {
    const axios = axiosClient.getAxios();
    const model = { addressId: addressId, code: code, requestId: requestId };
    console.log(model);
    return axios.get('/Profile/VerifyMobileNumberAddress', { params: model });
  },
  changeMobileNumberAddress: async (addressId, mobileNumber) => {
    const axios = axiosClient.getAxios();
    const model = { addressId: addressId, mobileNumber: mobileNumber };
    console.log(model);
    return axios.get('/Profile/ChangeMobileNumberAddress', { params: model });
  },
  setDefualtAddress: async (addressId) => {
    const axios = axiosClient.getAxios();
    const model = { addressId: addressId };
    console.log(model);
    return axios.get('/Profile/SetDefualtAddress', { params: model });
  },
  getProfileOrdersList: async (pageNumber, pageSize) => {
    const axios = axiosClient.getAxios();
    const model = { pageNumber: pageNumber, pageSize: pageSize };
    return axios.get('/Profile/ProfileOrdersList', { params: model });
  },
  getProfileOrdersItem: async (orderId) => {
    const axios = axiosClient.getAxios();
    const model = { orderId: orderId };
    return axios.get('/Profile/ProfileOrdersItem', { params: model });
  },
  getCustomerRefundPreference: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/CustomerRefundPreference');
  },
  setCustomerRefundPreference: async (refundType) => {
    const axios = axiosClient.getAxios();
    return axios.put('/Profile/SetCustomerRefundPreference/' + refundType);
  },
  getProfileAjyalCredit: async (pageNumber, pageSize) => {
    const axios = axiosClient.getAxios();
    const model = { pageNumber: pageNumber, pageSize: pageSize };
    return axios.get('/Profile/ProfileAjyalCredit', { params: model });
  },
  getProfileReturnRequested: async (pageNumber, pageSize) => {
    const axios = axiosClient.getAxios();
    const model = { pageNumber: pageNumber, pageSize: pageSize };
    return axios.get('/Profile/ProfileReturnRequested', { params: model });
  },
  getProfileReturnDeliverd: async (pageNumber, pageSize) => {
    const axios = axiosClient.getAxios();
    const model = { pageNumber: pageNumber, pageSize: pageSize };
    return axios.get('/Profile/ProfileReturnDeliverd', { params: model });
  },
  getProfileOrdersItemReturned: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/ProfileOrdersItemReturned');
  },
  verifyCustomerEmail: async (email, code) => {

    const axios = axiosClient.getAxios();

    const model = { email: email, code: code };
    return axios.get('/Profile/VerifyCustomerEmail', { params: model });
  },
  sendEmailVerify: async (email) => {

    const axios = axiosClient.getAxios();

    const model = { email: email };
    return axios.get('/Profile/SendEmailVerify', { params: model });
  },
  getProfileProductReturned: async (orderItemId) => {

    const axios = axiosClient.getAxios();
    return axios.get('/Profile/ProfileProductReturned/' + orderItemId);
  },
  verifyCustomerMobileNumber: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/VerifyCustomerMobileNumber');
  },
  checkVerifyCustomerMobileNumber: async (code, requestId) => {
    const axios = axiosClient.getAxios();
    const model = { verifyCode: code, requestId: requestId };
    return axios.get('/Profile/CheckVerifyCustomerMobileNumber', { params: model });
  },
  getProfileOrdersItemCanceled: async (orderId) => {
    const axios = axiosClient.getAxios();
    return axios.get('/Profile/ProfileOrdersItemCanceled/' + orderId);
  },
};

export default clientProfile;


