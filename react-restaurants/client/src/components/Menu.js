import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { menus: [] };
    }

    fetchAPI() {
        fetch(`http://localhost:8080/restaurants/${this.props.id}/menus`)
            .then(response => response.json())
            .then(response => {
                this.setState({ menus: response.menus })
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.fetchAPI();
    }

    render() {
        return(
            <div className="menu-content">
                <h2>Menus</h2>
                {
                    this.state.menus.map(menu => {
                        return (
                            <>
                                <h3 className="menu-title">{menu.title} &gt; </h3>
                                <MenuItem id={menu.id}/>
                                <Link to={`/editmenu`} state={{id: menu.id}}><button>Edit Menu</button></Link>
                            </>
                        )
                    })
                }
            </div>
        );
    }
}

export default Menu;