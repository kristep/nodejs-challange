import express from 'express';
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getRemoteEmployeesPerOffice,
} from '../services/employeeService';

export const employeeRouter = express.Router();

employeeRouter.get('/all-employees', getAllEmployees);
employeeRouter.post('/create-employee', createEmployee);
employeeRouter.delete('/delete-employee/:id', deleteEmployee);
employeeRouter.get('/remote-employees/:office_id', getRemoteEmployeesPerOffice);
