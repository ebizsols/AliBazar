import axiosClient from "./../axios";

const clientAuth = {
  customerLoginWithSocial: async ({ accessToken, socialType }) => {
    console.log('pp', accessToken, socialType)
    const axios = axiosClient.getAxios();
    return await axios.post(`/Auth/CustomerRegisterGoogleFacebook`, {
      AccessToken: accessToken,
      SocialType: socialType,
    });
  },
  customerRegister: async (model) => {

    const axios = axiosClient.getAxios();
    console.log(model);
    return axios.post('/Auth/CustomerRegister', model);
  },
  customerLogin: async (userName, password, captchaToken, notificationKey = null, type = 2) => {

    const axios = axiosClient.getAxios();

    const model = { userName: userName, password: password, captchaToken: captchaToken, notificationKey: notificationKey, type: type };
    return axios.post('/Auth/CustomerLogin', model);
  },
  changeCustomerPassword: async (oldPassword, newPassword, userName) => {

    const axios = axiosClient.getAxios();

    const model = { oldPassword: oldPassword, newPassword: newPassword, userName: userName };
    return axios.post('/Auth/ChangeCustomerPassword', model);
  },
  sendEmailForgetPassword: async (email) => {

    const axios = axiosClient.getAxios();

    const model = { email: email };
    return axios.get('/Auth/SendEmailForgetPassword', { params: model });
  },
  verifyCodeEmail: async (email, code) => {

    const axios = axiosClient.getAxios();

    const model = { email: email, code: code };
    return axios.get('/Auth/VerifyCodeEmail', { params: model });
  },
  changeCustomerEmailForgetPass: async (userName, newPassword) => {

    const axios = axiosClient.getAxios();

    const model = { userName: userName, newPassword: newPassword };
    return axios.put('/Auth/ChangeCustomerEmailForgetPass', model);
  },
  sendVerifyMobileNumberCustomer: async (captchaToken, email, mobileNumber) => {

    const axios = axiosClient.getAxios();

    const model = { captchaToken: captchaToken, email: email, mobileNumber: mobileNumber };
    console.log(model);
    return axios.post('/Auth/SendVerifyMobileNumberCustomer', model);
  },
  updateUserNotificationKey: async (notificationKey, type = 2) => {

    const axios = axiosClient.getAxios();

    const model = { notificationKey: notificationKey, type: type };
    console.log(model);
    return axios.put('/Auth/UpdateUserNotificationKey', model);
  },
};

export default clientAuth;


