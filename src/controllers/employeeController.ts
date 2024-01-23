import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import { createEmployee, getAllEmployees, getEmployee, getRemoteEmployeesPerOffice, removeEmployee } from '../services/employeeService';
import { Employee } from '../types';

export const getEmployeesController = async (req: Request, res: Response) => {
    const epmloyees = await getAllEmployees();

    if (!epmloyees?.length) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'no rows found',
            data: [],
        });
    }

    return res.status(StatusCodes.OK).json({
        message: 'success',
        data: epmloyees,
    });
};

export const getEmployeeByIdController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const employee = await getEmployee(id);

    if (!employee) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Employee not found',
            data: [],
        });
    }

    return res.status(StatusCodes.OK).json({
        message: 'success',
        data: employee,
    });
};

export const createEmployeeController = async (req: Request, res: Response) => {
    const newEmployee: Employee = req.body;
    const validationErrors = validationResult(req);
    
    if (!validationErrors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: validationErrors.array() });
    }

   const result = await createEmployee(newEmployee);

    if(!result?.changes) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error in creating new employee'})
    }
    return res.status(StatusCodes.CREATED).json({ data: req.body });
};

export const deleteEmployeeController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await removeEmployee(id);

    if(!result?.changes) {
        return res.status(StatusCodes.NOT_FOUND).json({message: 'Employee with such id not found'})
    }

    return res.status(StatusCodes.OK).json({ message: 'Employee deleted' });
};

export const getRemoteEmployeesPerOfficeController =  async (req: Request, res: Response) => {
    const office_id = req.params.office_id;
    const count = await getRemoteEmployeesPerOffice(office_id)

    return res.status(StatusCodes.OK).json({ data: count });

}
