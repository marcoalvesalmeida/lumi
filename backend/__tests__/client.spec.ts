import { Request, Response } from 'express';
import { clientController } from '../src/modules/client/ClientController';
import { ClientRepository } from '../src/modules/client/ClientRepository';

jest.mock('../src/modules/client/ClientRepository');

describe('ClientController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('handleListAllClients', () => {
        it('should return all clients', async () => {
            const mockClients = [
                { id: 1, name: 'Client 1' },
                { id: 2, name: 'Client 2' },
            ];
            (
                ClientRepository.prototype.findAll as jest.Mock
            ).mockResolvedValueOnce(mockClients);

            await clientController.handleListAllClients(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: mockClients,
            });
        });

        it('should handle internal server error', async () => {
            (
                ClientRepository.prototype.findAll as jest.Mock
            ).mockRejectedValueOnce(new Error('Database error'));

            await clientController.handleListAllClients(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                error: 'There was an internal server problem, please try again!',
            });
        });
    });
});
