import { DataContext } from "@/context/DataContext";
import { useContext } from "react";

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData deve ser usado dentro de um ClientProvider');
    }
    return context;
};