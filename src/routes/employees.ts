import express from 'express';
import { body } from 'express-validator';

import {
    createEmployeeController,
    deleteEmployeeController,
    getEmployeeByIdController,
    getEmployeesController,
    getRemoteEmployeesPerOfficeController,
} from '../controllers/employeeController';

export const employeeRouter = express.Router();

const validationCreateEmployee = [
    body('office_id').trim().notEmpty(),
    body('first_name').trim().notEmpty(),
    body('last_name').trim().notEmpty(),
];

employeeRouter.get('/all-employees', getEmployeesController);
employeeRouter.get('/employee/:id', getEmployeeByIdController);
employeeRouter.post('/create-employee', validationCreateEmployee, createEmployeeController);
employeeRouter.delete('/delete-employee/:id', deleteEmployeeController);
employeeRouter.get('/remote-employees/:office_id', getRemoteEmployeesPerOfficeController);
