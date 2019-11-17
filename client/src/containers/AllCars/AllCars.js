import React, {Component} from 'react'
// import classes from './AllCars.scss'
// import {NavLink} from "react-router-dom";
// import {connect} from "react-redux";


class AllCars extends Component {
    state = {
        cars: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8080/api/all_cars', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            this.setState({cars: data});
            console.log(this.state)
        })
    }
    toUserHandler = (id) => {
        fetch('http://127.0.0.1:8080/api/car/' + id.toString(), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(response => response.json()).then((data) => {
            console.log("OK!", data)
        })
    };
    renderCars () {
        return this.state.cars.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        <p>{item.name}</p>
                        <p>{item.year}</p>
                        <button onClick={this.toUserHandler.bind(this, item.id)}>Взять в аренду</button>
                    </div>
                    <hr/>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                Все машины
                {this.renderCars()}
            </div>
        );
    }
}

export default AllCars;

