import {Request, Response} from 'express';
import { ClientRepository } from './ClientRepository';

class ClientController {
    async handleListAllClients(request: Request, response: Response){
        try{
            const clientRepository = new ClientRepository();
            const clients = await clientRepository.findAll();

            return response.status(200).json({
                success: true,
                data: clients
            })
        }catch(error){
            return response.status(500).json({
                success: false,
                error: 'There was an internal server problem, please try again!',
            });
        }
    }   
}

export const clientController = new ClientController();