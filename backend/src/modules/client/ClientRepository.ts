import { Installation } from "@prisma/client";
import { prisma } from "../../db";

export class ClientRepository {
    async findAll(){
        const clients = await prisma.client.findMany();

        return clients;
    }
}