import {AUTH_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    auth: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, auth: true
            };
        default:
            return state
    }
}