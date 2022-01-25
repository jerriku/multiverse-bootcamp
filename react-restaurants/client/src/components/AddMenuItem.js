import React from 'react';
import axios from 'axios';

class AddMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { menus: [], iName: "", iPrice: 0.00, mId: 0 };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    fetchAPI() {
        fetch("http://localhost:8080/menus")
            .then(response => response.json())
            .then(response => {
                this.setState({ menus: response })
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.fetchAPI();
    }

    handleInputChange(event) {
        console.log({ [event.target.name]: event.target.value });
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const name = this.state.iName;
        const price = parseFloat(this.state.iPrice);
        const menu_id = this.state.mId;

        const menuItem = {
            name,
            price,
        }

        axios
            .post(`http://localhost:8080/menus/${menu_id}/items`, menuItem)
            .then(() => console.log('menu item created'))
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1>Add Menu</h1>
                <form onSubmit={this.handleSubmit}>
                    <select name="mId" onChange={this.handleInputChange} >
                        <option> Choose a Menu: </option>
                        {
                            this.state.menus.map(menu => {
                                return (
                                    <option value={menu.id}>{menu.title}</option>
                                )
                            })
                        }
                    </select>  <br /><br />
                    <label htmlFor="iName" >Menu item name:</label> <br />
                    <input type="text" key="iname" name="iName" onChange={this.handleInputChange} /> <br />
                    <label htmlFor="iPrice" >Menu item price:</label> <br />
                    <input type="text" key="iprice" name="iPrice" onChange={this.handleInputChange} /> <br />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default AddMenuItem;