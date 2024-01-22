import express from 'express';
import { body } from 'express-validator';

import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployee,
    getRemoteEmployeesPerOffice,
} from '../services/employeeService';

export const employeeRouter = express.Router();

const validationCreateEmployee = [
    body('office_id').trim().notEmpty(),
    body('first_name').trim().notEmpty(),
    body('last_name').trim().notEmpty(),
];

employeeRouter.get('/all-employees', getAllEmployees);
employeeRouter.get('/employee/:id', getEmployee);
employeeRouter.post('/create-employee', validationCreateEmployee, createEmployee);
employeeRouter.delete('/delete-employee/:id', deleteEmployee);
employeeRouter.get('/remote-employees/:office_id', getRemoteEmployeesPerOffice);
