import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.run(
    `INSERT INTO offices(id, city, address, name) VALUES('1', 'City 1', 'Address 1', 'First'), ('2', 'City 2', 'Address 2', 'Second'), ('3', 'City 3', 'Address 3', 'Third')`,
    function (err) {
        if (err) {
            return console.log(err.message);
        }
    }
);

db.close();
