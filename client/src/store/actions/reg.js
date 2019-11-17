
export const reg = (email, user_name, languages, password) => async dispatch => {
    fetch('http://127.0.0.1:8080/api/user/registration', {
        method: 'POST', body: JSON.stringify({
            email: email,
            first_name: user_name,
            language: languages,
            password: password
        }), headers: {'content-type': 'application/json'}
    }).then((response) => {
        if (response.status !== 201) {
            throw new Error("o_O");
        }
        return response.json();
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
};