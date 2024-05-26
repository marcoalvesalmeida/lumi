import { Request, Response } from 'express';
import { invoiceController } from '../src/modules/invoices/InvoiceController';
import { InstallationRepository } from '../src/modules/installation/InstallationRepository';
import { InvoiceService } from '../src/modules/invoices/InvoiceService';
import { jest } from '@jest/globals';

jest.mock('../src/modules/installation/InstallationRepository');
jest.mock('../src/modules/invoices/InvoiceService');

interface Invoice {
    id: number;
    monthRef: string;
    kwhCount: number;
    price: number;
    sceeKwh: number;
    sceePrice: number;
    gdKwh: number;
    gdPrice: number;
    publicContrib: number;
    installationId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Installation {
    installationCode: string;
    invoices: Invoice[];
}

describe('InvoiceController', () => {
    let invoiceService: jest.Mocked<InvoiceService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        invoiceService =
            new (InvoiceService as any)() as jest.Mocked<InvoiceService>;
        mockRequest = {
            params: {
                client: '1',
            },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any,
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('handleFindInvoiceByClient', () => {
        it('should return invoices for a valid client ID', async () => {
            const mockInstallations: Installation[] = [
                {
                    installationCode: '123',
                    invoices: [
                        {
                            id: 1,
                            monthRef: '2023-05',
                            kwhCount: 100,
                            price: 200,
                            sceeKwh: 50,
                            sceePrice: 100,
                            gdKwh: 50,
                            gdPrice: 100,
                            publicContrib: 50,
                            installationId: 1,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                },
            ];
            (
                InstallationRepository.prototype.findByClientId as jest.Mock
            ).mockResolvedValueOnce(mockInstallations as never);

            await invoiceController.handleFindInvoiceByClient(
                mockRequest as Request,
                mockResponse as unknown as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
        it('should handle internal server error', async () => {
            (InstallationRepository.prototype.findByClientId as jest.Mock)
                //@ts-ignore
                .mockRejectedValueOnce(new Error('Database error'));

            await invoiceController.handleFindInvoiceByClient(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });
});
