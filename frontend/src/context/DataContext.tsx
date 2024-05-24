import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getAllClients, Client, GetAllClientsResponse } from '@/services/Client';


interface DataContextType {
    clients: Client[];
    selectedClient: string;
    setSelectedClient: (client: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>('');

    useEffect(() => {
        const fetchClients = async () => {
            const response: GetAllClientsResponse = await getAllClients();
            if (response.success && response.clients) {
                setClients(response.clients);
            }
        };

        fetchClients();
    }, []);

    const contextValue: DataContextType = { clients, selectedClient, setSelectedClient };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};
