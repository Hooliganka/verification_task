import {AUTH_SUCCESS} from "./actionsTypes";

export const auth = (email, password) => async dispatch => {
    fetch('http://127.0.0.1:8080/api/user/login', {
        method: 'POST', body: JSON.stringify({
            email: email,
            password: password
        }), headers: {'content-type': 'application/json'}
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error("o_O");
        }
        return response.json();
    }).then((data) => {
        if (data.token) {
            dispatch(authSuccess(data.token));
        }
    }).catch((error) => {
        console.log(error);
    });
};

export function authSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: AUTH_SUCCESS
    }
}