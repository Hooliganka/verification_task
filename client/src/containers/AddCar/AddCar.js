import React, {Component} from 'react'
import classes from './AddCar.scss'
// import {NavLink} from "react-router-dom";
// import {connect} from "react-redux";


class AddCar extends Component {
    state = {
        formControls: {
            name_ru: {
                value: '',
                type: 'text',
                label: 'Название машины на русском',
                touched: false,
            },
            name_en: {
                value: '',
                type: 'text',
                label: 'Название машины на английском',
                touched: false,
            },
            year: {
                value: '',
                type: 'text',
                label: 'Год машины',
                touched: false,
            },
        }
    };
    addHandler = () => {
        fetch('http://127.0.0.1:8080/api/car/', {
            method: 'POST',
            body: JSON.stringify({
                year: this.state.formControls.year.value,
                name_ru: this.state.formControls.name_ru.value,
                name_en: this.state.formControls.name_en.value,
            }),
            headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((response) => {
            if (response.status !== 201) {
                throw new Error("o_O");
            } else {
                console.log('OK!')
            }
            return response.json();
        }).catch((error) => {
            console.log(error);
        });
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
            <div className={classes.AddCar}>
                {this.renderInputs()}
                <button onClick={this.addHandler}>
                    ДОБАВИТЬ
                </button>
            </div>
        );
    }
}

export default AddCar;

