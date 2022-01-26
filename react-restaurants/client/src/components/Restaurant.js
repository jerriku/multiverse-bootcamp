import axios from 'axios';
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

    handleDeleteItem(event) {
        event.preventDefault();
        const id = parseInt(event.target.value);
        
        axios
            .delete(`http://localhost:8080/restaurants/${id}`)
            .then(() => {
                alert('restaurant deleted');
                document.getElementById(`restaurant-${id}`).remove();
                window.location.href = "/";
            })
            .catch(err => console.log(err.message));
    }

    render() {
        function flipFront(event) {
            
            const rId = event.currentTarget.id.replace(/\D+/g, '');

            setTimeout(() => {
                const title = document.getElementById(`restaurant-name-${rId}`);
                title.classList.add('hidden');
            }, 0);

            const card = document.getElementById(`inner-card-${rId}`);
            card.classList.add('flip-card');
        }

        function flipBack(event) {

            const rId = event.currentTarget.id.replace(/\D+/g, '');
            
            setTimeout(() => {
                const title = document.getElementById(`restaurant-name-${rId}`);
                title.classList.remove('hidden');
            }, 0);

            const card = document.getElementById(`inner-card-${rId}`);
            card.classList.remove('flip-card');
        }


        return(
            <div className="content">
            {
                this.state.restaurants.map(restaurant => {
                    return(
                        <div key={restaurant.id} id={`restaurant-${restaurant.id}`} className="restaurant-card" onClick={flipFront} onMouseLeave={flipBack}>
                        <div id={`inner-card-${restaurant.id}`} className="inner-card">
                            <section className="front-card restaurant-content">
                                <div id={`restaurant-name-${restaurant.id}`} className="never-rotate"><h1>{restaurant.name}</h1></div>
                                <img className="restaurant-image" alt="restaurant" src={restaurant.image}/>
                            </section>
                            <section className="back-card restaurant-details">
                                <div>
                                    <h2>Menus</h2>
                                    <button value={restaurant.id} onClick={this.handleDeleteItem}>Delete Restaurant</button>
                                </div>
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