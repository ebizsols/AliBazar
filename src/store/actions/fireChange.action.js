export const SET_CART_FIRECHANGE = 'SET_CART_FIRECHANGE';
export const SET_SHIPPINGADDRESS_FIRECHANGE = 'SET_SHIPPINGADDRESS_FIRECHANGE';
export const SET_ADDRESSES_FIRECHANGE = 'SET_ADDRESSES_FIRECHANGE';
export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_CANCEL_ORDER = 'SET_CANCEL_ORDER';

export const setCartFireChange = (value) => {
    return { type: SET_CART_FIRECHANGE, value: value };
};

export const setShippingAddressChange = (value) => {
    return { type: SET_SHIPPINGADDRESS_FIRECHANGE, value: value };
};

export const setAddressesFireChange = (value) => {
    return { type: SET_ADDRESSES_FIRECHANGE, value: value };
};

export const setOrderDetailFireChange = (value) => {
    return { type: SET_ORDER_DETAIL, value: value };
};

export const setOrdersFireChange = (value) => {
    return { type: SET_ORDERS, value: value };
};

export const setCancelOrderFireChange = (value) => {
    return { type: SET_CANCEL_ORDER, value: value };
};