import axiosClient from "./../axios";

const clientHome = {
  getHomeData: async () => {
    const axios = axiosClient.getAxios();
    // const result = await axios.get(`/Home/Home`);
    // return result.data;
    return axios.get('/Home/Home');
  },
  getSearchDialogSearchs: async (filter, cancelToken) => {
    const axios = axiosClient.getAxios();
    axios.defaults.cancelToken = cancelToken.token;
    return axios.get('/home/SearchAutoComplete/' + filter)
      .catch(function (thrown) {
        console.log('[clientHome] Request canceled', thrown.message);
      });
  },
  filterGoods: async (model) => {

    const axios = axiosClient.getAxios();

    return axios.post('/Home/FilterGoods', model);
  },
  getGoodsDetails: async (goodsId, providerId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/GoodsDetails/' + goodsId + '/' + providerId);
  },
  getGoodsSpecifications: async (goodsId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/Specifications/' + goodsId);
  },
  getGoodsCustomerComment: async (pageNumber, pageSize, goodsId) => {
    const axios = axiosClient.getAxios();
    const model = { pageNumber: pageNumber, pageSize: pageSize, id: goodsId };
    return axios.get('/Home/CustomerComment', { params: model });
  },
  getHeader: async (goodsId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/Header');
  },
  mobileCategory: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/MobileCategory');
  },
  getCategory: async (categoryId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/Category/' + categoryId);
  },
  getMobileFooter: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/MobileFooter');
  },
  getPostMethod: async (shopId, countryId, cityId, provinceId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/PostMethod/' + shopId + '/' + countryId + '/' + cityId + '/' + provinceId);
  },
  getCustomerLikes: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/CustomerLikes');
  },
  getHelpImage: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/GetHelpImage');
  },
  getHelp: async () => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/Help');
  },
  getTopicDetail: async (topicId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/HelpTopic/' + topicId);
  },
  getHelpParentTopicDetail: async (topicId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/HelpParentTopic/' + topicId);
  },
  getHelpArticle: async (articleId) => {
    const axios = axiosClient.getAxios();

    return axios.get('/Home/HelpArticle/' + articleId);
  },
  helpArticleYesNo: async (accept, id) => {
    const axios = axiosClient.getAxios();

    const model = { accept: accept, id: id };
    return axios.put('/Home/HelpArticle', model);
  },
  helpAutoComplete: async (filter, cancelToken) => {
    const axios = axiosClient.getAxios();
    axios.defaults.cancelToken = cancelToken.token;

    return axios.get('/Home/HelpAutoComplete/' + filter)
      .catch(function (thrown) {
        console.log('[clientHome] Request canceled', thrown.message);
      });
  },
  getOrderWithCode: async (trackingCode) => {
    const axios = axiosClient.getAxios();
    const model = { trackingCode: trackingCode };

    return axios.get('/Home/GetOrderWithCode', { params: model });
  },
  getShopList: async (filterModel, cancelToken) => {
    const axios = axiosClient.getAxios();
    axios.defaults.cancelToken = cancelToken.token;

    return axios.get('/Home/GetShopList', { params: filterModel })
      .catch(function (thrown) {
        console.log('[clientHome] getShopList() Request canceled', thrown.message);
      });
  },
  getShopGoods: async (shopName, model) => {

    const axios = axiosClient.getAxios();

    return axios.post('/Home/ShopGoods/' + shopName, model);
  },
  getMobileSplashData: async (deviceInfoData) => {
    const axios = axiosClient.getAxios();
    
    return axios.get('/Home/GetMobileSplashData', { params: deviceInfoData });
  },
};

export default clientHome;