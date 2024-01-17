import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

import { Office } from '../types';

export const officeRouter = express.Router();

officeRouter.get('/all-offices', async (req: Request, res: Response) => {
    const db = new sqlite3.Database('./database/database.db');
    const sql = 'SELECT * FROM offices';
    const params = [];

    db.all(sql, params, (err, rows: Office[]) => {
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
});

officeRouter.post('/create-office', async (req: Request, res: Response) => {
    const db = new sqlite3.Database('./database/database.db');
    const random = uuid();
    const { city, address, name } = req.body;

    db.run(
        `INSERT INTO offices(id, city, address, name) VALUES('${random}', '${city}', '${address}', '${name}')`,
        (err) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            }

            return res.status(StatusCodes.CREATED).json({ data: req.body });
        }
    );

    db.close();
});

officeRouter.put('/update-office-name/:id', async (req: Request, res: Response) => {
    const db = new sqlite3.Database('./database/database.db');
    const { name } = req.body;
    const id = req.params.id;

    db.run(`UPDATE offices SET name = '${name}' WHERE id = '${id}'`, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }

        return res.status(StatusCodes.OK).json({ message: 'Office name updated', data: req.body });
    });

    db.close();
});

officeRouter.delete('/delete-office/:id', async (req: Request, res: Response) => {
    const db = new sqlite3.Database('./database/database.db');
    const id = req.params.id;

    db.run(`DELETE FROM offices WHERE id = '${id}'`, (err) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        } else {
            return res.status(StatusCodes.OK).json({ message: 'Office deleted' });
        }
    });

    db.close();
});
