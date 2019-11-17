import React, {Component} from 'react'
import classes from './Profile.scss'
import {Link} from "react-router-dom";
// import {NavLink} from "react-router-dom";
// import {connect} from "react-redux";


class Profile extends Component {
    state = {
        user: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8080/api/user/', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            this.setState({user: data});
            console.log(this.state)
        })
    }
    render() {
        return (
            <div className={classes.Profile}>
                <p>Имя: {this.state.user.first_name}</p>
                <p>Мыло: {this.state.user.email}</p>
                <Link to={'/profile_edit'}>Редактировать</Link>
            </div>
        );
    }
}
export default Profile;

