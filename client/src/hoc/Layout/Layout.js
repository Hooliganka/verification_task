import React, {Component} from 'react';
import classes from './Layout.scss';
// import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                {
                    this.props.auth ?
                        <ul>
                            <li>
                                <NavLink to={'/'}>Все машины</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/add_car'}>Добавить машину</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/my_cars'}>Мои машины</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/all_users'}>Все пользователи</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/profile'}>Мой профиль</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/profile_edit'}>Редактировать профиль</NavLink>
                            </li>
                        </ul> :
                        <ul>
                            <li>
                                <NavLink to={'/'}>Авторизация</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/registration'}>Регистрация</NavLink>
                            </li>
                        </ul>
                }
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
    }
}


export default connect(mapStateToProps)(Layout)
