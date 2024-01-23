import { Office } from '../types';
import { addOffice, deleteOffice, getOffices, updateOffice } from '../data/officeData';

export const getAllOffices = async () => {
    try {
        const offices = await getOffices();
        return offices;
    } catch (error) {
        return;
    }
};

export const createOffice = async (newOffice: Office) => {
    try {
        const office = await addOffice(newOffice);
        return office;
    } catch (error) {
        return;
    }
};

export const updateOfficeName = async (id: string, name: string) => {
    try {
        const office = await updateOffice(id, name);
        return office;
    } catch (error) {
        return;
    }
};

export const removeOffice = async (id: string) => {
    try {
        const result = await deleteOffice(id);
        return result;
    } catch (error) {
        return;
    }
};
