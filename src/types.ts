export interface Office {
    id: string;
    city: string;
    address: string;
    name: string;
}

export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    address: string;
    office_id: string;
    title: string;
    prefers_remote: boolean;
}
