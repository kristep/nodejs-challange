import { Employee } from '../types';
import { addEmployee, getEmployees, getEmployeeById, deleteEmployee, countRemoteEmployeesPerOffice } from '../data/employeeData';

export const getAllEmployees = async () => {
    try {
        const employees = await getEmployees();
        return employees;
    } catch (error) {
        return null;
    }
};

export const getEmployee = async (id: string) => {
    try {
        const employee = await getEmployeeById(id);
        return employee;
    } catch (error) {
        return null;
    }
};

export const createEmployee = async (newEmployee: Employee) => {
    try {
        const employee = await addEmployee(newEmployee);
        return employee;
    } catch (error) {
        return null;
    }
};

export const removeEmployee = async (id: string) => {
    try {
        const result = await deleteEmployee(id);
        return result;
    } catch (error) {
        return null;
    }
};

export const getRemoteEmployeesPerOffice = async (office_id: string) => {
    try {
        const res = await countRemoteEmployeesPerOffice(office_id);
        return res;
    } catch (error) {
        return null;
    }
};
