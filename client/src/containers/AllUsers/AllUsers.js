import React, {Component} from 'react'

class AllUsers extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8080/api/users', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            this.setState({users: data});
            console.log(this.state)
        })
    }

    renderUsers () {
        return this.state.users.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        <p>{item.first_name}</p>
                        <p>{item.email}</p>
                    </div>
                    <hr/>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                Все пользователи
                {this.renderUsers()}
            </div>
        );
    }
}

export default AllUsers;

