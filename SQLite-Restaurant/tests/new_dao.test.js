// const sqlite3 = require('sqlite3').verbose();
// const RestaurantDAO = require('../js/dao');
// const restaurant_dao = new RestaurantDAO('./restaurants.db', './restaurants.json');

// describe('Sqlite3', () => {
//     beforeEach( () => {
//         restaurant_dao.initialise();
//         restaurant_dao.createTable();
//         restaurant_dao.populate();
//     });

//     afterEach(() => {
//         restaurant_dao.close();
//     })

//     test('can load restaurants into the database', (done) => {
//         const db = new sqlite3.Database('./restaurants.db');

//         try {
//             db.get("SELECT count(*) FROM restaurants",
//                 function (err, rows) {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         //console.log(rows);
//                         expect(rows['count(*)']).toBe(8);
//                     }
//                     done();
//                 })
//         } finally {
//             db.close();
//             done();
//         }
//     });

//     // test('can load database from in memory', (done) => {
//     //     const db = new sqlite3.Database(':memory:');

//     //     try {
//     //         db.get("SELECT count(*) FROM restaurants",
//     //             function (err, rows) {
//     //                 if (err) {
//     //                     console.log(err)
//     //                 } else {
//     //                     //console.log(rows);
//     //                     expect(rows['count(*)']).toBe(9);
//     //                 }
//     //                 done();
//     //             })
//     //     } finally {
//     //         db.close();
//     //         done();
//     //     }
//     // })
// });