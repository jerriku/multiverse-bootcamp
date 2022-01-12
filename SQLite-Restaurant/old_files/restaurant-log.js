const fsp = require('fs').promises;

const load = async () => {
    const buffer = await fsp.readFile('./restaurants.json');
    return JSON.parse(String(buffer));
}

load().then(restaurants => {
    restaurants.forEach(restaurant => {
        console.log(restaurant);
    })
}).catch(err => console.error(err.message));