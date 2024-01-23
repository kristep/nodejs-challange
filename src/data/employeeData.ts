import sqlite3, { RunResult } from 'sqlite3';
import { v4 as uuid } from 'uuid';

import { Employee } from '../types';

const db = new sqlite3.Database('src/database.db');

export const getEmployees = () => {
    const query = 'SELECT * FROM employees';

    return new Promise<Employee[]>((resolve, reject) => {
        db.all(query, [], (err, rows: Employee[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const getEmployeeById = async (id: string) => {
    const query = 'SELECT * FROM employees WHERE id = ?';
    const params = [id];

    return new Promise<Employee>((resolve, reject) => {
        db.get(query, params, (err, row: Employee) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

export const addEmployee = async (employee: Employee) => {
    const random = uuid();
    const { first_name, last_name, address, office_id, title, prefers_remote } = employee;
    const query =
        'INSERT INTO employees(id, first_name, last_name, address, office_id, title, prefers_remote) VALUES(?,?,?,?,?,?,?)';
    const params = [random, first_name, last_name, address, office_id, title, prefers_remote];

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

export const deleteEmployee = async (id: string) => {
    const query = 'DELETE FROM employees WHERE id = ?';
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

export const countRemoteEmployeesPerOffice = async (office_id: string) => {
    const query =
        'SELECT COUNT(prefers_remote) AS remote_employees FROM employees WHERE office_id = ? AND prefers_remote';
    const params = [office_id];

    return new Promise((resolve, reject) => {
        db.get(query, params, (err, count) => {
            if (err) {
                reject(err);
            } else {
                resolve(count);
            }
        });
    });
};

// Close the database connection when the application is shutting down
process.on('exit', () => db.close());
