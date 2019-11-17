import React, {Component} from 'react'
import classes from './MyCars.scss'

class MyCars extends Component {
    state = {
        cars: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8080/api/cars', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            this.setState({cars: data});
            console.log(this.state)
        })
    }

    renderCars () {
        return this.state.cars.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        <p>{item.name}</p>
                        <p>{item.year}</p>
                        <button>Взять в аренду</button>
                    </div>
                    <hr/>
                </div>
            )
        });
    }

    render() {
        return (
            <div className={classes.AllCars}>
                Мои машины
                {this.renderCars()}
            </div>
        );
    }
}

export default MyCars;

