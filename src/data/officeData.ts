import sqlite3, { RunResult } from 'sqlite3';
import { v4 as uuid } from 'uuid';

import { Office } from '../types';

const db = new sqlite3.Database('src/database.db');

export const getOffices = () => {
    const query = 'SELECT * FROM offices';

    return new Promise<Office[]>((resolve, reject) => {
        db.all(query, [], (err, rows: Office[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const addOffice = async (office: Office) => {
    const random = uuid();
    const { city, address, name } = office;
    const query = 'INSERT INTO offices(id, city, address, name) VALUES(?,?,?,?)';
    const params = [random, city, address, name];

    return new Promise<RunResult>((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

export const updateOffice = async (id: string, name: string) => {
    const query = 'UPDATE offices SET name = ? WHERE id = ?';
    const params = [name, id];

    return new Promise<RunResult>((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

export const deleteOffice = async (id: string) => {
    const query = 'DELETE FROM offices WHERE id = ?';
    const params = [id];

    return new Promise<RunResult>((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

// Close the database connection when the application is shutting down
process.on('exit', () => db.close());
