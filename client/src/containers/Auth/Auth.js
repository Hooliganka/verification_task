import React, {Component} from 'react'
import classes from './Auth.scss'
import {auth} from "../../store/actions/auth";
import {connect} from "react-redux";


class Auth extends Component {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                touched: false,
                errorMessage: 'Поле не может быть пустым'
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                touched: false,
                errorMessage: 'Поле не может быть пустым'
            },
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value
        );
    };

    validateControl(value, validation) {
        return true
    }

    onChangeHandler = (event, controlName) => {

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;

        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        formControls[controlName] = control;

        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            const htmlFor = `${control.type}-${Math.random()}`;
            return (
                <div key={controlName + index}>
                    <label htmlFor={htmlFor}>{control.label}</label>
                    <input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />
                </div>
            )
        });
    }


    render() {
        return (
            <div className={classes.Auth}>
                Авторизация
                    {this.renderInputs()}
                    <button className={classes.Button} onClick={this.loginHandler}>
                        ВОЙТИ
                    </button>
            </div>
        );
    }
}

//
function mapDispatchToProps(dispatch) {
    return {
        auth: (email,password) => dispatch(auth(email, password))
    }
}
//
// function mapStateToProps(state) {
//     return {
//         // message: state.auth.error_message,
//     }
// }
export default connect(null, mapDispatchToProps)(Auth);
// export default Auth;

