import fs from 'fs';

export class InvoiceService {
    listInvoiceFiles = (directory: string): string[] => {
        try {
            const files = fs.readdirSync(directory);
            return files;
        } catch (error) {
            return [];
        }
    };
}
  