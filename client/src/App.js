import React, {Component} from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Registration from "./containers/Registration/Registration";
import AddCar from "./containers/AddCar/AddCar";
import MyCars from "./containers/MyCars/MyCars";
import AllUsers from "./containers/AllUsers/AllUsers";
import Profile from "./containers/Profile/Profile";
import ProfileEdit from "./containers/ProfileEdit/ProfileEdit";
import AllCars from "./containers/AllCars/AllCars";
import {connect} from "react-redux";
import {authSuccess} from "./store/actions/auth";

// import {connect} from "react-redux";

class App extends Component {
    render() {
        if (!this.props.auth) {
            const token = localStorage.getItem('token');
            if (token) {
                this.props.setAuth(token);
                return false
            }
        }
        return (
            <Layout>
                {
                    this.props.auth ?
                        <Switch>
                            <Route path="/" exact component={AllCars}/>
                            <Route path="/add_car" component={AddCar}/>
                            <Route path="/my_cars" component={MyCars}/>
                            <Route path="/all_users" component={AllUsers}/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/profile_edit" component={ProfileEdit}/>
                            <Route path="*" render={() => (<Redirect to="/"/>)}/>
                        </Switch> :
                        <Switch>
                            <Route path="/" exact component={Auth}/>
                            <Route path="/registration" component={Registration}/>
                            <Route path="*" render={() => (<Redirect to="/"/>)}/>
                        </Switch>
                }
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuth: (token) => dispatch(authSuccess(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

