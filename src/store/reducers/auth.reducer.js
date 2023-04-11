import { SET_DATA } from '../actions/auth.action';

// memberData {
//     profileImage: "member4.jpg"
//     gender: true
//     memberId: "1"
// }

const initialState = {
    token: null
};

const autReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            // console.log('auth reducer, setting token', action.token);
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
};

export default autReducer;
