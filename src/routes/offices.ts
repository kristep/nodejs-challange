import express from 'express';
import { body } from 'express-validator';

import {
    createOfficeController,
    deleteOfficeController,
    getOfficesController,
    updateOfficeNameController,
} from '../controllers/officeController';

export const officeRouter = express.Router();

const validationCreateOffice = [body('city').trim().notEmpty(), body('address').trim().notEmpty()];

officeRouter.get('/all-offices', getOfficesController);
officeRouter.post('/create-office', validationCreateOffice, createOfficeController);
officeRouter.put('/update-office-name/:id', updateOfficeNameController);
officeRouter.delete('/delete-office/:id', deleteOfficeController);
