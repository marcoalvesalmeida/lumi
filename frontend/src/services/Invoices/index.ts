import { api } from "../api";

export interface Invoice {
    id: number;
    monthRef: string;
    kwhCount: number;
    price: string;
    sceeKwh: number;
    sceePrice: string;
    gdKwh: number;
    gdPrice: string;
    publicContrib: string;
    installationId: number;
}

export interface GetAllInvoicesResponse {
    success: boolean;
    invoices?: Invoice[];
    error?: string;
}

const ERROR_MESSAGE = 'Houve um problema ao listar as faturas!';

export const getInvoicesByClient = async (clientID: string): Promise<GetAllInvoicesResponse> => {
    try {
        const { data } = await api.get(`/invoices/${clientID}`);

        if (data?.success) {
            return {
                success: true,
                invoices: data.data
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