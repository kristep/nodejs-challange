import express from 'express';
import { body } from 'express-validator';

import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getRemoteEmployeesPerOffice,
} from '../services/employeeService';

export const employeeRouter = express.Router();

const validationCreateEmployee = [
    body('office_id').trim().notEmpty(),
    body('first_name').trim().notEmpty(),
    body('last_name').trim().notEmpty(),
];

employeeRouter.get('/all-employees', getAllEmployees);
employeeRouter.post('/create-employee', validationCreateEmployee, createEmployee);
employeeRouter.delete('/delete-employee/:id', deleteEmployee);
employeeRouter.get('/remote-employees/:office_id', getRemoteEmployeesPerOffice);
