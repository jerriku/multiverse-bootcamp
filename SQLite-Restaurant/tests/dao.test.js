// const sqlite3 = require('sqlite3').verbose();
// const createTables = require('../old_files/initialiseDB');
// const loadAndInsert = require('../old_files/populateDB');

// describe('Sqlite3', () => {
//     beforeAll(async() => {
//         await createTables();
//         await loadAndInsert();
//     });

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
// });