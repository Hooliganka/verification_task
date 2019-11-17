import React, {Component} from 'react'
import classes from './Registration.scss'
import {connect} from "react-redux";
import {reg} from "../../store/actions/reg";
// import {NavLink} from "react-router-dom";
// import {connect} from "react-redux";


class Registration extends Component {
    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                touched: false,
                errorMessage: 'Поле не может быть пустым'
            },
            user_name: {
                value: '',
                type: 'text',
                label: 'Name',
                touched: false,
                errorMessage: 'Поле не может быть пустым'
            },
            languages: {
                value: '',
                type: 'text',
                label: 'language',
                touched: false,
                errorMessage: 'Поле не может быть пустым',
                placeholder:"ru or en"
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

    registrationHandler = () => {
        this.props.reg(
            this.state.formControls.email.value,
            this.state.formControls.user_name.value,
            this.state.formControls.languages.value,
            this.state.formControls.password.value,
        );
        console.log(this.props)
    };

    submitHandler = event => {
        event.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        // if (validation.email) {
        //     isValid = is.email(value) && isValid
        // }

        return isValid
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
                        placeholder={control.placeholder}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />
                </div>
            )
        });
    }
    render() {
        return (
            <div className={classes.Registration}>
                Регистрация
                {this.renderInputs()}
                <button className={classes.Button} onClick={this.registrationHandler}>
                    ЗАРЕГИСТРИРОВАТЬСЯ
                </button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reg: (email, user_name, languages, password) => dispatch(reg(email, user_name, languages, password))
    }
}
export default connect(null, mapDispatchToProps)(Registration);

