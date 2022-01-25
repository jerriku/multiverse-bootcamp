import React from 'react';
import Menu from './Menu';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = { restaurants: [] };
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

    render() {
        function flipFront(event) {
            console.log(event.target);
            const card = event.target.offsetParent;
            card.classList.add('flip-card');
        }


        return(
            <div className="content">
            {
                this.state.restaurants.map(restaurant => {
                    const menus = restaurant.menus;
                    console.log(menus);
                    return(
                        <div key={restaurant.id} id={restaurant.id} className="restaurant-card">
                        <div className="inner-card">
                            <section className="front-card restaurant-content" onClick={flipFront}>
                                <div><h1>{restaurant.name}</h1></div>
                                <img className="restaurant-image" alt="restaurant" src={restaurant.image}/>
                            </section>
                            <section className="back-card restaurant-details">
                                <Menu id={restaurant.id} />
                            </section>
                        </div>
                        </div>
                    )
                })
            }
            </div>
        );
    }
}

export default Restaurant;