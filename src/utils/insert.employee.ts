import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.run(
    `INSERT INTO employees(id, first_name, last_name, address, office_id, title, prefers_remote) VALUES('100', 'Jonas', 'Jonaitis', 'Address Jonas', '1', 'Developer', true), ('105', 'Petras', 'Petraitis', 'Address Petras', '1', 'Developer', true), ('108', 'Aldona', 'Aldonaite', 'Address Aldona', '1', 'Administrator', false)`,
    function (err) {
        if (err) {
            return console.log(err.message);
        }
    }
);

db.close();
