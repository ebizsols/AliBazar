const config = {
    screens: {
        Home: {
            path: "Home",
        },
        AfterPayment: {
            path: "AfterPayment/:paymentId/:token/:payerID",
            parse: {
                paymentId: (paymentId) => `${paymentId}`,
                token: (token) => `${token}`,
                payerID: (payerID) => `${payerID}`,
            },
        }
    },
};

const linking = {
    prefixes: ["ajyalapp://"],
    config,
};

export default linking;