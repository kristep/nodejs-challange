import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { createOffice, getAllOffices, removeOffice, updateOfficeName } from '../services/officeService';

export const getOfficesController = async (req: Request, res: Response) => {
    try {
        const offices = await getAllOffices();

        if (!offices?.length) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'no rows found',
                data: [],
            });
        }

        return res.status(StatusCodes.OK).json({
            message: 'success',
            data: offices,
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
};

export const createOfficeController = async (req: Request, res: Response) => {
    const newEmployee = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: validationErrors.array() });
    }

    try {
        const result = await createOffice(newEmployee);

        if (!result?.changes) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in creating the new office' });
        }
        return res.status(StatusCodes.CREATED).json({ data: req.body });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
};

export const deleteOfficeController = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const result = await removeOffice(id);

        if (!result?.changes) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Office with such id not found' });
        }

        return res.status(StatusCodes.OK).json({ message: 'Office deleted' });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
};

export const updateOfficeNameController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body.name;

    try {
        const result = await updateOfficeName(id, name);

        if (!result?.changes) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Office with such id not found' });
        }

        return res.status(StatusCodes.OK).json({ message: `Office name updated to ${name}` });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
};
