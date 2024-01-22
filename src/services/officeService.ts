import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

import { Office } from '../types';

const PATH_DB = 'src/database/database.db';

export const getAllOffices = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const query = 'SELECT * FROM offices';

    db.all(query, [], (err, rows: Office[]) => {
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

export const createOffice = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const random = uuid();
    const { city, address, name } = req.body as Office;
    const query = 'INSERT INTO offices(id, city, address, name) VALUES(?,?,?,?)';
    const params =  [random, city, address, name]
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: validationErrors.array() });
    }

    db.run(query,params, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }

        return res.status(StatusCodes.CREATED).json({ data: req.body });
    });

    db.close();
};

export const updateOfficeName = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const { name } = req.body;
    const query = 'UPDATE offices SET name = ? WHERE id = ?'
const params = [name, req.params.id]

    db.run(query, params, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }

        return res.status(StatusCodes.OK).json({ message: 'Office name updated', data: req.body });
    });

    db.close();
};

export const deleteOffice = async (req: Request, res: Response) => {
    const db = new sqlite3.Database(PATH_DB);
    const query = 'DELETE FROM offices WHERE id = ?'
    const params = [req.params.id];

    db.run(query, params, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        } else {
            return res.status(StatusCodes.OK).json({ message: 'Office deleted' });
        }
    });

    db.close();
};
