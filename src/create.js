import  sqlite3  from 'sqlite3';

const db = new sqlite3.Database('../database/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

db.run('CREATE TABLE offices(id, city, address, name)');
db.run('CREATE TABLE employees(id, first_name, last_name, address, office_id, title, prefers_remote)');

db.close();