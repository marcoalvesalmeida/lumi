import { api } from "../api";

export interface Client {
    id: number;
    clientCode: string;
}

export interface GetAllClientsResponse {
    success: boolean;
    clients?: Client[];
    error?: string;
}

const ERROR_MESSAGE = 'Houve um problema ao listar os clientes!';

export const getAllClients = async (): Promise<GetAllClientsResponse> => {
    try {
        const { data } = await api.get('/clients');

        if (data?.success) {
            return {
                success: true,
                clients: data.data
            };
        } else {
            return {
                success: false,
                error: ERROR_MESSAGE
            };
        }
    } catch (error) {
        return {
            success: false,
            error: ERROR_MESSAGE
        };
    }
};