import { SET_CART_COUNT } from '../actions/cart.action';

const initialState = {
  cartCount: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_COUNT:
      // console.log('in cart reducer: ', action.value);
      return {
        ...state,
        cartCount: action.value
      }
    default:
      return state;
  }
};

export default cartReducer;
