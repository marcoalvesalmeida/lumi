import { Request, Response } from 'express';
import { InstallationRepository } from '../installation/InstallationRepository';
import { z } from 'zod';

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

            const installations = await installationRepository.findByClientId(client);

            return response.status(200).json({
                success: true,
                data: installations.map(installation => installation.invoices),
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({
                    success: false,
                    error: 'Bad request, clientID is required and must be a number.',
                    strack: error
                });
            }
            console.error('Internal server error:', error);
            return response.status(500).json({
                success: false,
                error: 'There was an internal server problem, please try again!',
            });
        }
    }
}

export const invoiceController = new InvoiceController();