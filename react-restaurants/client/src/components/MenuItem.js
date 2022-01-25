import React from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { items: [] }
    }

    fetchAPI() {
        fetch(`http://localhost:8080/menus/${this.props.id}/menuitems`)
            .then(response => response.json())
            .then(response => {
                this.setState({ items: response.items })
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.fetchAPI();
    }

    render() {
        return(
            <ul className="menu-items">
                {
                    this.state.items.map(item => {
                        return(
                            <li>{item.name} - £{item.price}</li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default MenuItem;