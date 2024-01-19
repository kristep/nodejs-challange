import express from 'express';
import { body } from 'express-validator';

import { createOffice, deleteOffice, getAllOffices, updateOfficeName } from '../services/officeService';

export const officeRouter = express.Router();

const validationCreateOffice = [body('city').trim().notEmpty(), body('address').trim().notEmpty()];

officeRouter.get('/all-offices', getAllOffices);
officeRouter.post('/create-office', validationCreateOffice, createOffice);
officeRouter.put('/update-office-name/:id', updateOfficeName);
officeRouter.delete('/delete-office/:id', deleteOffice);
