import express from 'express';

import { createOffice, deleteOffice, getAllOffices, updateOfficeName } from '../services/officeService';

export const officeRouter = express.Router();

officeRouter.get('/all-offices', getAllOffices);
officeRouter.post('/create-office', createOffice);
officeRouter.put('/update-office-name/:id', updateOfficeName);
officeRouter.delete('/delete-office/:id', deleteOffice);
