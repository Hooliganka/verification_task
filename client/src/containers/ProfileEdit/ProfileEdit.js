import React, {Component} from 'react'
// import classes from './ProfileEdit.scss'
import {Link} from "react-router-dom";
// import {NavLink} from "react-router-dom";
// import {connect} from "react-redux";


class ProfileEdit extends Component {
    state = {
        formControls: {
            first_name: {
                value: 'сапро',
                type: 'text',
                label: 'Имя',
                touched: false,
            },
        }
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

    componentDidMount() {
        fetch('http://127.0.0.1:8080/api/user/', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            this.setState({
                formControls: {
                    first_name: {
                        value: data.first_name,
                        type: 'text',
                        label: 'Имя',
                        touched: false,
                    }
                }
            });
            console.log(this.state)
        })
    }

    editHandler = () => {
        fetch('http://127.0.0.1:8080/api/user/', {
            method: 'PUT',
            body: JSON.stringify({
                first_name: this.state.formControls.first_name.value,
            }),
            headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error("o_O");
            } else {
                console.log('OK!')
            }
            return response.json();
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                {this.renderInputs()}
                <Link to={'/profile_edit'} onClick={this.editHandler}>Сохранить</Link>
            </div>
        );
    }
}

export default ProfileEdit;

