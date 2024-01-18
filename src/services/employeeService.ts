import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

import { Employee } from '../types';

const PATH_DB = 'src/database/database.db';

export const getAllEmployees = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const sql = 'SELECT * FROM employees';
    const params = [];

    db.all(sql, params, (err, rows: Employee[]) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }

        if (!rows.length) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'no rows found',
                data: [],
            });
        }

        return res.status(StatusCodes.OK).json({
            message: 'success',
            data: rows,
        });
    });

    db.close();
};

export const createEmployee = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const random = uuid();
    const { first_name, last_name, address, office_id, title, prefers_remote } = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: validationErrors.array() });
    }

    db.run(
        `INSERT INTO employees(id, first_name, last_name, address, office_id, title, prefers_remote) VALUES('${random}', '${first_name}', '${last_name}','${address}', '${office_id}','${title}','${prefers_remote}')`,
        (err) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            }

            return res.status(StatusCodes.CREATED).json({ data: req.body });
        }
    );

    db.close();
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const id = req.params.id;

    db.run(`DELETE FROM employees WHERE id = '${id}'`, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        } else {
            return res.status(StatusCodes.OK).json({ message: 'Employee deleted' });
        }
    });

    db.close();
};

export const getRemoteEmployeesPerOffice = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const office_id = req.params.office_id;

    db.get(
        `SELECT COUNT(prefers_remote) AS remote_employees FROM employees WHERE office_id = '${office_id}' AND prefers_remote`,
        (err, count) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            } else {
                return res.status(StatusCodes.OK).json({ data: count });
            }
        }
    );

    db.close();
};
