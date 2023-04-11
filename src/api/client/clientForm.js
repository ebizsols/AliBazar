import axiosClient from "./../axios";

const clientForm = {
  getAciveCountries: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ActiveCountry');
  },
  getActiveCities: async (provinceId) => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ActiveCity/' + provinceId);
  },
  getActiveProvince: async (countryId) => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ActiveProvince/' + countryId);
  },
  getActivePaymentMethod: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ActivePaymentMethod');
  },
  getParentAcitveCategory: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ParentAcitveCategory');
  },
  getActiveShopDocumentsType: async (groupId) => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ActiveShopDocumentsType/' + groupId);
  },
  getReturningReason: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ReturningReason');
  },
  getReturningAction: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ReturningAction');
  },
  getParentAcitveCategory: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/Form/ParentAcitveCategory');
  },
  getBrandForWebsiteWithFillter: async (filterModel, cancelToken) => {

    const axios = axiosClient.getAxios();
    axios.defaults.cancelToken = cancelToken.token;

    return axios.post('/Form/BrandForWebsiteWithFillter', filterModel)
      .catch(function (thrown) {
        console.log('[clientForm] getBrandForWebsiteWithFillter() Request canceled', thrown.message);
      });
  },
  getRegistrationFinalMessage: async () => {

    const axios = axiosClient.getAxios();
    return axios.get('/Form/RegistrationFinalMessage');
  },
  getActiveCancelingReason: async () => {

    const axios = axiosClient.getAxios();
    return axios.get('/Form/ActiveCancelingReason');
  },
};

export default clientForm;


