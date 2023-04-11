import { SET_DOMAIN } from '../actions/baseState.action';

// memberData {
//     profileImage: "member4.jpg"
//     gender: true
//     memberId: "1"
// }

const initialState = {
    domain: null
};

const baseStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOMAIN:
            // console.log('auth reducer, setting token', action.token);
            return {
                ...state,
                domain: action.value
            }
        default:
            return state;
    }
};

export default baseStateReducer;
