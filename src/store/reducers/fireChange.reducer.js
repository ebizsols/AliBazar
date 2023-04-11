import {
    SET_CART_FIRECHANGE,
    SET_SHIPPINGADDRESS_FIRECHANGE,
    SET_ADDRESSES_FIRECHANGE,
    SET_ORDERS,
    SET_ORDER_DETAIL,
    SET_CANCEL_ORDER
} from '../actions/fireChange.action';

// memberData {
//     profileImage: "member4.jpg"
//     gender: true
//     memberId: "1"
// }

const initialState = {
    cartFireChange: null,
    shippingAdressFireChange: null,
    addressesFireChange: null,
    orderDetailFireChange: null,
    ordersFireChange: null,
    cancelOrderFireChange: null
};

const fireChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART_FIRECHANGE:
            return {
                ...state,
                cartFireChange: action.value
            }
        case SET_SHIPPINGADDRESS_FIRECHANGE:
            return {
                ...state,
                shippingAdressFireChange: action.value
            }
        case SET_ADDRESSES_FIRECHANGE:
            return {
                ...state,
                addressesFireChange: action.value
            }
        case SET_ORDERS:
            return {
                ...state,
                ordersFireChange: action.value
            }
        case SET_ORDER_DETAIL:
            return {
                ...state,
                orderDetailFireChange: action.value
            }
        case SET_CANCEL_ORDER:
            return {
                ...state,
                cancelOrderFireChange: action.value
            }
        default:
            return state;
    }
};

export default fireChangeReducer;
