import React from 'react';
import axios from 'axios';

class AddMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { restaurants: [], mTitle: "", rId: 0 };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    fetchAPI() {
        fetch("http://localhost:8080/restaurants")
            .then(response => response.json())
            .then(response => {
                this.setState({ restaurants: response })
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.fetchAPI();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const title = this.state.mTitle;
        const restaurant_id = this.state.rId;

        const menu = {
            title,
        }

        axios
            .post(`http://localhost:8080/restaurants/${restaurant_id}/menus`, menu)
            .then(() => {
                alert('menu created');
                window.location.href = "/";
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1>Add Menu</h1>
                <form onSubmit={this.handleSubmit}>
                    <select name="rId" onChange={this.handleInputChange} >
                        <option> Choose a Restaurant: </option>
                        {
                            this.state.restaurants.map(restaurant => {
                                return (
                                    <option value={restaurant.id}>{restaurant.name}</option>
                                )
                            })
                        }
                    </select>  <br /><br />
                    <label htmlFor="mTitle" >Menu Title:</label> <br />
                    <input type="text" key="mtitle" name="mTitle" onChange={this.handleInputChange} /> <br />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default AddMenu;