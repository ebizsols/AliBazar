import axiosClient from "./../axios";

const clientUserOrder = {
  shippingRateCalculator: async (id) => {
    const axios = axiosClient.getAxios()
    return axios.get(`/Shipping/ShippingRateCalculater?shippingMethod=${id}`)
  },
  getShippingMethods: async () => {
    const axios = axiosClient.getAxios();
    return axios.get('/Setting/ShipingMethod');
  },
  addOrder: async (goodsId, providerId, number, countryId, cityId) => {

    const axios = axiosClient.getAxios();

    const model = { goodsId: goodsId, providerId: providerId, number: number, countryId: countryId, cityId: cityId }
    return axios.post('/UserOrder/Order', model);
  },
  getCartDetail: async (cityId = null, provinceId = null, countryId = null, code = null) => {

    const axios = axiosClient.getAxios();

    let model = null;
    if (cityId != null && countryId != null)
      model = { cityId: cityId, countryId: countryId, provinceId: provinceId };
    if (code) {
      model = { ...model, code: code };
    }
    console.log('model: ', model);
    return axios.get('/UserOrder/CartDetail', { params: model });
  },
  deleteOrder: async (itemId) => {

    const axios = axiosClient.getAxios();

    return axios.delete('/UserOrder/OrderItem/' + itemId);
  },
  increaseOrderItem: async (cityId, countryId, goodsId, number, providerId) => {

    const axios = axiosClient.getAxios();

    const model = { cityId: cityId, countryId: countryId, goodsId: goodsId, number: number, providerId: providerId }

    return axios.put('/UserOrder/IncreaseOrderItem', model);
  },
  changeDestination: async (addressId) => {

    const axios = axiosClient.getAxios();

    return axios.put('/UserOrder/ChangeDestination/' + addressId);
  },
  getOrderDetail: async () => {

    const axios = axiosClient.getAxios();

    return axios.get('/UserOrder/OrderDetail');
  },
  initOrderPayment: async (paymentType, cardMonth = null, cardName = null, cardNumber = null, cardYear = null, cardZip = null, securityCode = null, shippingMethod) => {

    const axios = axiosClient.getAxios();

    const model = {
      cardMonth: cardMonth,
      cardName: cardName,
      cardNumber: cardNumber,
      cardYear: cardYear,
      cardZip: cardZip,
      securityCode: securityCode,
      paymentType: paymentType,
      shippingMethod
    };
    console.log(model);

    return axios.post('/UserOrder/InitOrderPayment', model);
  },
  payOrder: async (paymentId, token, payerId, Code, orderId, currencyId) => {

    const axios = axiosClient.getAxios();

    const model = { paymentId: paymentId, token: token, payerId: payerId, Code: Code, orderId: orderId, currencyId: currencyId };

    return axios.post('/UserOrder/PayOrder', model);
  },
  returnOrder: async (fkOrderItemId, fkReturningReasonId, fkReturningActionId, requestComment) => {

    const axios = axiosClient.getAxios();

    const model = {
      fkOrderItemId: fkOrderItemId,
      fkReturningReasonId: fkReturningReasonId,
      fkReturningActionId: fkReturningActionId,
      requestComment: requestComment,
    };
    console.log(model);
    return axios.put('/UserOrder/ReturnOrder', model);
  },
  checkPayOrder: async (orderId) => {
    const axios = axiosClient.getAxios();
    const model = { orderId: orderId }
    return axios.get('/UserOrder/CheckPayOrder', { params: model });
  },
  cancelOrder: async (cancellItems = []) => {

    const axios = axiosClient.getAxios();

    return axios.put('/UserOrder/CancelOrder', cancellItems);
  },
};

export default clientUserOrder;


