import RestaurantDAO from './old_dao';

const restaurant: RestaurantDAO = new RestaurantDAO('../restaurants.json', '../restaurants.db');
restaurant.initialise();
restaurant.populate();