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
            .then(() => console.log('menu created'))
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1>Add Menu</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="rId" >Choose a Restaurant:</label> <br />
                    <select name="rId" onChange={this.handleInputChange} >
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