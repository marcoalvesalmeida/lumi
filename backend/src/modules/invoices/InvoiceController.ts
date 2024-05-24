import { Request, Response } from 'express';
import { z } from 'zod';
import path from 'path';

import { InvoiceService } from './InvoiceService';
import { InstallationRepository } from '../installation/InstallationRepository';

const inputSchema = z.object({
    client: z.string().refine(val => !isNaN(Number(val)), {
        message: 'client must be a number',
    }).transform(val => Number(val)),
});

class InvoiceController {
    async handleFindInvoiceByClient(request: Request, response: Response): Promise<Response> {
        try {
            const installationRepository = new InstallationRepository();
            
            const {client} = inputSchema.parse(request.params);

            const installations = await installationRepository.findByClientId(client, true);

            return response.status(200).json({
                success: true,
                data: installations.flatMap(installation => installation.invoices),
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({
                    success: false,
                    error: 'Bad request, clientID is required and must be a number.',
                    strack: error
                });
            }
            return response.status(500).json({
                success: false,
                error: 'There was an internal server problem, please try again!',
            });
        }
    }

    async handleFindInvoicePathByClient(request: Request, response: Response): Promise<Response> {
        try {
            const installationRepository = new InstallationRepository();
            
            const {client} = inputSchema.parse(request.params);

            const installations = await installationRepository.findByClientId(client, false);

            const invoiceService = new InvoiceService();

            const paths = [];

            for(const installation of installations){
                const invoicesDir = path.join(process.cwd(), 'src', 'modules', 'extractor', 'invoices', installation.installationCode);

                const list = invoiceService.listInvoiceFiles(invoicesDir);

                if(list.length > 0){
                    paths.push({installation: installation.installationCode, files: list});
                }                
            }     

            return response.status(200).json({
                success: true,
                baseURL: 'http://' + request.headers.host + '/files',
                data: paths,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({
                    success: false,
                    error: 'Bad request, clientID is required and must be a number.',
                    strack: error
                });
            }
            return response.status(500).json({
                success: false,
                error: 'There was an internal server problem, please try again!'
            });
        }
    }
}

export const invoiceController = new InvoiceController();