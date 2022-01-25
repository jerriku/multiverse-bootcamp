import React from 'react';
import axios from 'axios';

class AddRestaurant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rName: "",
            rImage: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = this.state.rName;
        const image = this.state.rImage;

        const restaurant = {
            name,
            image,
        }

        axios
            .post("http://localhost:8080/restaurants", restaurant)
            .then(() => console.log('restaurant created'))
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1>Add Restaurant</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="rName" >Restaurant name:</label> <br />
                    <input type="text" key="rname" name="rName" onChange={this.handleInputChange} /> <br />
                    <label htmlFor="rImage" >Restaurant image:</label> <br />
                    <input type="url" key="rimage" name="rImage" onChange={this.handleInputChange} /> <br /><br />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default AddRestaurant;