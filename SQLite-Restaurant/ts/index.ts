import RestaurantDAO from './dao';

const restaurant: RestaurantDAO = new RestaurantDAO('../restaurants.json', '../restaurants.db');
restaurant.initialise();
restaurant.populate();