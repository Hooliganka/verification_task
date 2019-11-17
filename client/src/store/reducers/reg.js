// import {AUTH_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    auth: false
};

export default function regReducer(state = initialState, action) {
    switch (action.type) {
        // case AUTH_SUCCESS:
        //     return {
        //         ...state, auth: true
        //     };
        default:
            return state
    }
}